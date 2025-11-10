import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import Anthropic from "@anthropic-ai/sdk";
import { insertAppSchema } from "@shared/schema";
import { z } from "zod";
import { parse } from "@babel/parser";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Validate generated code using @babel/parser for accurate syntax checking.
 * 
 * This uses parse() instead of transformSync() to avoid false positives from
 * the transform pipeline (e.g., "Missing semicolon" on valid template literals).
 * 
 * Validation strategy:
 * 1. Check for banned import/export statements (regex)
 * 2. Parse code as JSX to verify syntax (throws SyntaxError if invalid)
 * 3. Only actual syntax errors fail validation
 */
function validateCode(code: string): { valid: boolean; error?: string } {
  // First check for banned syntax (imports/exports)
  if (/^\s*import\s+/m.test(code)) {
    return { valid: false, error: 'Code contains import statements. Remove all imports and use plain JavaScript.' };
  }
  if (/^\s*export\s+/m.test(code)) {
    return { valid: false, error: 'Code contains export statements. Remove all exports and define components directly.' };
  }
  
  try {
    // Parse code with JSX and modern JS features
    // Using parse() directly avoids transform pipeline false positives
    parse(code, {
      sourceType: 'module', // Parse as module for full feature support
      plugins: [
        'jsx',
        'classProperties',
        'optionalChaining',
        'nullishCoalescingOperator',
      ],
      errorRecovery: false, // Strict parsing - fail on any syntax error
    });
    return { valid: true };
  } catch (error: any) {
    const message = error?.message || 'Unknown syntax error';
    console.error('[Code Validation Error]', message);
    return { valid: false, error: message };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post('/api/generate-app', isAuthenticated, async (req: any, res) => {
    try {
      if (!process.env.ANTHROPIC_API_KEY) {
        console.error("ANTHROPIC_API_KEY is not configured");
        return res.status(500).json({ message: "AI service is not configured. Please contact support." });
      }

      const { description, category, price } = req.body;

      if (!description || typeof description !== 'string' || description.trim().length === 0) {
        return res.status(400).json({ message: "Description is required and must be a non-empty string" });
      }
      if (!category || typeof category !== 'string') {
        return res.status(400).json({ message: "Category is required and must be a string" });
      }
      if (price === undefined || typeof price !== 'number' || price < 0.05 || price > 10) {
        return res.status(400).json({ message: "Price must be a number between 0.05 and 10" });
      }

      // Retry logic with validation
      const MAX_ATTEMPTS = 3;
      let lastError: string | undefined;
      let validatedCode: string | null = null;

      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        console.log(`[Code Generation] Attempt ${attempt}/${MAX_ATTEMPTS}`);

        // Build prompt with error feedback if this is a retry
        let prompt = `You are an expert React developer. Create a complete, production-ready React component for the following micro-SaaS app:

Description: ${description}
Category: ${category}
Price: $${price}

Requirements:
1. Create a single, self-contained React component using plain JavaScript (NOT TypeScript)
2. Use Tailwind CSS for all styling with utility classes
3. Make it fully functional with all necessary state management using React hooks
4. DO NOT include TypeScript type annotations (no ": type" syntax anywhere)
5. DO NOT use TypeScript-specific features (interfaces, type aliases, generics, "as" casting, etc.)
6. Add data-testid attributes to interactive elements for testing
7. Keep it simple, clean, and user-friendly
8. The component should be complete and ready to use
9. Use regular JavaScript/JSX syntax only
10. Build native HTML elements styled with Tailwind instead of importing UI libraries

IMPORTANT CONSTRAINTS:
- NO TypeScript syntax whatsoever - pure JavaScript only
- NO external component library imports (build your own buttons, cards, inputs using Tailwind)
- Use Tailwind CSS utility classes exclusively for styling
- The code will run in a browser with Babel JSX transformer
- Must be pure client-side code (no server-side dependencies)

STYLING GUIDELINES:
- Use Tailwind utilities for modern, professional design
- Include proper spacing, colors, shadows, and hover effects
- Make it responsive with Tailwind breakpoints (sm:, md:, lg:)
- Use rounded corners and clean layouts

Return ONLY the React component code as plain JavaScript. No explanations. No TypeScript. No imports.`;

        // Add error feedback for retries
        if (attempt > 1 && lastError) {
          prompt += `\n\nIMPORTANT: The previous attempt had a syntax error. Please fix this error and regenerate:\nError: ${lastError}`;
        }

        let message;
        try {
          message = await anthropic.messages.create({
            model: "claude-sonnet-4-20250514",
            max_tokens: 4096,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          });
        } catch (error: any) {
          console.error(`[Code Generation] Anthropic API error on attempt ${attempt}:`, error);
          if (error.status === 404) {
            return res.status(503).json({ message: "AI model is currently unavailable. Please try again later." });
          }
          if (error.status === 401) {
            return res.status(500).json({ message: "AI service authentication failed. Please contact support." });
          }
          if (error.status === 429) {
            return res.status(429).json({ message: "AI service rate limit reached. Please try again in a few moments." });
          }
          // Continue to next attempt on other errors
          if (attempt < MAX_ATTEMPTS) {
            continue;
          }
          return res.status(500).json({ message: "AI service error. Please try again later." });
        }

        if (!message.content || message.content.length === 0) {
          console.error(`[Code Generation] Empty response on attempt ${attempt}`);
          if (attempt < MAX_ATTEMPTS) {
            continue;
          }
          return res.status(500).json({ message: "AI service returned an empty response. Please try again." });
        }

        const firstContent = message.content[0];
        if (firstContent.type !== 'text' || !firstContent.text || firstContent.text.trim().length === 0) {
          console.error(`[Code Generation] Invalid content on attempt ${attempt}:`, firstContent);
          if (attempt < MAX_ATTEMPTS) {
            continue;
          }
          return res.status(500).json({ message: "AI service returned invalid content. Please try again." });
        }

        const generatedCode = firstContent.text;

        // Validate the generated code
        const validation = validateCode(generatedCode);
        
        if (validation.valid) {
          console.log(`[Code Generation] Success on attempt ${attempt}`);
          validatedCode = generatedCode;
          break;
        } else {
          console.log(`[Code Generation] Validation failed on attempt ${attempt}: ${validation.error}`);
          lastError = validation.error;
          
          // If this was the last attempt, return error
          if (attempt === MAX_ATTEMPTS) {
            return res.status(500).json({
              message: `Failed to generate valid code after ${MAX_ATTEMPTS} attempts. Last error: ${validation.error}`,
              attempts: MAX_ATTEMPTS,
              lastError: validation.error,
            });
          }
          
          // Otherwise, continue to next attempt
          await new Promise(resolve => setTimeout(resolve, 500)); // Short delay between retries
        }
      }

      if (!validatedCode) {
        return res.status(500).json({
          message: "Failed to generate valid code. Please try again.",
        });
      }

      res.json({
        code: validatedCode,
        success: true,
      });
    } catch (error) {
      console.error("Unexpected error generating app:", error);
      res.status(500).json({ message: "An unexpected error occurred. Please try again." });
    }
  });

  app.post('/api/apps', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const appData = insertAppSchema.parse({
        ...req.body,
        userId,
      });

      const app = await storage.createApp(appData);
      res.json(app);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid app data", errors: error.errors });
      }
      console.error("Error creating app:", error);
      res.status(500).json({ message: "Failed to create app" });
    }
  });

  app.get('/api/apps', async (_req, res) => {
    try {
      const apps = await storage.getAllApps();
      const publicApps = apps.map(app => ({
        id: app.id,
        name: app.name,
        description: app.description,
        category: app.category,
        price: app.price,
        thumbnail: app.thumbnail,
        status: app.status,
        createdAt: app.createdAt,
      }));
      res.json(publicApps);
    } catch (error) {
      console.error("Error fetching apps:", error);
      res.status(500).json({ message: "Failed to fetch apps" });
    }
  });

  app.get('/api/apps/my', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const apps = await storage.getAppsByUser(userId);
      res.json(apps);
    } catch (error) {
      console.error("Error fetching user apps:", error);
      res.status(500).json({ message: "Failed to fetch apps" });
    }
  });

  app.get('/api/apps/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const app = await storage.getApp(req.params.id);
      
      if (!app) {
        return res.status(404).json({ message: "App not found" });
      }

      const isOwner = app.userId === userId;
      const isDeployed = app.status === "deployed";

      if (!isOwner && !isDeployed) {
        return res.status(403).json({ message: "Forbidden" });
      }

      if (isOwner) {
        res.json(app);
      } else {
        res.json({
          id: app.id,
          name: app.name,
          description: app.description,
          category: app.category,
          price: app.price,
          thumbnail: app.thumbnail,
          status: app.status,
          createdAt: app.createdAt,
        });
      }
    } catch (error) {
      console.error("Error fetching app:", error);
      res.status(500).json({ message: "Failed to fetch app" });
    }
  });

  app.patch('/api/apps/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const app = await storage.getApp(req.params.id);

      if (!app) {
        return res.status(404).json({ message: "App not found" });
      }

      if (app.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const updatedApp = await storage.updateApp(req.params.id, req.body);
      res.json(updatedApp);
    } catch (error) {
      console.error("Error updating app:", error);
      res.status(500).json({ message: "Failed to update app" });
    }
  });

  app.delete('/api/apps/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const app = await storage.getApp(req.params.id);

      if (!app) {
        return res.status(404).json({ message: "App not found" });
      }

      if (app.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      await storage.deleteApp(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting app:", error);
      res.status(500).json({ message: "Failed to delete app" });
    }
  });

  app.get('/api/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await storage.getUserStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
