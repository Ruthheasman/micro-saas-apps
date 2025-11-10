import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import Anthropic from "@anthropic-ai/sdk";
import { insertAppSchema } from "@shared/schema";
import { z } from "zod";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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

      const prompt = `You are an expert React developer. Create a complete, production-ready React component for the following micro-SaaS app:

Description: ${description}
Category: ${category}
Price: $${price}

Requirements:
1. Create a single, self-contained React component using TypeScript
2. Use shadcn/ui components (Button, Card, Input, etc.) imported from "@/components/ui"
3. Use Tailwind CSS for styling
4. Make it fully functional with all necessary state management
5. Include proper TypeScript types
6. Add data-testid attributes to interactive elements
7. Keep it simple, clean, and user-friendly
8. The component should be complete and ready to use

Return ONLY the React component code, no explanations. Start with the imports.`;

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
        console.error("Anthropic API error:", error);
        if (error.status === 404) {
          return res.status(503).json({ message: "AI model is currently unavailable. Please try again later." });
        }
        if (error.status === 401) {
          return res.status(500).json({ message: "AI service authentication failed. Please contact support." });
        }
        if (error.status === 429) {
          return res.status(429).json({ message: "AI service rate limit reached. Please try again in a few moments." });
        }
        return res.status(500).json({ message: "AI service error. Please try again later." });
      }

      if (!message.content || message.content.length === 0) {
        console.error("Anthropic returned empty response");
        return res.status(500).json({ message: "AI service returned an empty response. Please try again." });
      }

      const firstContent = message.content[0];
      if (firstContent.type !== 'text' || !firstContent.text || firstContent.text.trim().length === 0) {
        console.error("Anthropic returned non-text or empty content:", firstContent);
        return res.status(500).json({ message: "AI service returned invalid content. Please try again." });
      }

      res.json({
        code: firstContent.text,
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
