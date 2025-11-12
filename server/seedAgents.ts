import { storage } from "./storage";

const sampleAgents = [
  {
    userId: null as any,
    name: "Product Description Writer",
    description: "Generate compelling product descriptions for e-commerce listings using AI",
    category: "Content Creation",
    modelProvider: "openrouter",
    modelName: "anthropic/claude-3.5-sonnet",
    systemPrompt: "You are an expert copywriter specializing in e-commerce product descriptions. Create engaging, SEO-optimized descriptions that highlight key features and benefits. Use persuasive language and maintain a professional yet approachable tone.",
    creditCost: 10,
    status: "published",
    inputSchema: [
      { name: "product_name", label: "Product Name", type: "text" },
      { name: "features", label: "Key Features", type: "textarea" },
      { name: "target_audience", label: "Target Audience", type: "text" }
    ],
  },
  {
    userId: null as any,
    name: "Video Scene Generator",
    description: "Create stunning video scenes from text prompts using Veo 3.1",
    category: "Video Generation",
    modelProvider: "kieai",
    modelName: "veo-3.1",
    systemPrompt: "",
    creditCost: 50,
    status: "published",
    inputSchema: [
      { name: "prompt", label: "Scene Description", type: "textarea" },
      { name: "duration", label: "Duration (seconds)", type: "number" }
    ],
  },
  {
    userId: null as any,
    name: "Social Media Caption Generator",
    description: "Create engaging social media captions with relevant hashtags and emojis",
    category: "Content Creation",
    modelProvider: "openrouter",
    modelName: "meta-llama/llama-3.1-70b-instruct",
    systemPrompt: "You are a social media expert who creates viral-worthy captions. Your captions are attention-grabbing, on-brand, and include strategic hashtags. Keep the tone conversational and engaging.",
    creditCost: 8,
    status: "published",
    inputSchema: [
      { name: "content_topic", label: "Post Topic", type: "text" },
      { name: "platform", label: "Platform (Instagram/Twitter/LinkedIn)", type: "text" },
      { name: "brand_voice", label: "Brand Voice", type: "text" }
    ],
  },
  {
    userId: null as any,
    name: "Image Style Transfer",
    description: "Transform images with AI-powered style modifications using nano-banana",
    category: "Image Editing",
    modelProvider: "kieai",
    modelName: "nano-banana",
    systemPrompt: "",
    creditCost: 30,
    status: "published",
    inputSchema: [
      { name: "image_url", label: "Image URL", type: "text" },
      { name: "prompt", label: "Style Prompt", type: "textarea" }
    ],
  },
  {
    userId: null as any,
    name: "Code Explainer",
    description: "Get clear explanations of code snippets in plain English",
    category: "Developer Tools",
    modelProvider: "openrouter",
    modelName: "openai/gpt-4o",
    systemPrompt: "You are a patient programming teacher who explains code clearly. Break down complex code into simple concepts, explain what each part does, and why it's written that way. Use analogies when helpful.",
    creditCost: 12,
    status: "published",
    inputSchema: [
      { name: "code", label: "Code Snippet", type: "textarea" },
      { name: "language", label: "Programming Language", type: "text" }
    ],
  }
];

export async function seedAgents() {
  console.log("Seeding sample agents...");
  
  for (const agentData of sampleAgents) {
    try {
      const existing = await storage.getAllAgents();
      const isDuplicate = existing.some(a => a.name === agentData.name);
      
      if (!isDuplicate) {
        await storage.createAgent(agentData);
        console.log(`✓ Created agent: ${agentData.name}`);
      } else {
        console.log(`⊘ Skipped (already exists): ${agentData.name}`);
      }
    } catch (error) {
      console.error(`✗ Failed to create agent: ${agentData.name}`, error);
    }
  }
  
  console.log("Seeding complete!");
}

seedAgents()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
