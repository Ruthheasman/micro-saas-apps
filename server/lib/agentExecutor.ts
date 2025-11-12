import { storage } from "../storage";
import { chatCompletion } from "./openrouter";
import kieai from "./kieai";
import type { Agent, AgentRun } from "@shared/schema";

interface ExecutionResult {
  success: boolean;
  output?: any;
  error?: string;
}

export async function executeAgent(
  agentId: string,
  userId: string,
  inputData: Record<string, any>
): Promise<ExecutionResult> {
  try {
    const agent = await storage.getAgent(agentId);
    if (!agent) {
      return { success: false, error: "Agent not found" };
    }

    const credits = await storage.getUserCredits(userId);
    if (credits < agent.creditCost) {
      return { success: false, error: "Insufficient credits" };
    }

    const run = await storage.createAgentRun({
      agentId,
      userId,
      inputData,
      creditsUsed: 0,
      status: "running",
    });

    try {
      let output: any;

      if (agent.modelProvider === "openrouter") {
        output = await executeOpenRouterAgent(agent, inputData);
      } else if (agent.modelProvider === "kieai") {
        output = await executeKieAiAgent(agent, inputData);
      } else {
        throw new Error(`Unknown model provider: ${agent.modelProvider}`);
      }

      await storage.deductCredits(userId, agent.creditCost, `Agent run: ${agent.name}`);
      
      await storage.incrementAgentUsage(agentId);
      
      await storage.updateAgentRun(run.id, {
        status: "completed",
        outputData: output,
        creditsUsed: agent.creditCost,
      });

      return { success: true, output };
    } catch (error: any) {
      const errorMessage = error?.message || "Unknown error occurred";
      
      await storage.updateAgentRun(run.id, {
        status: "failed",
        errorMessage,
        creditsUsed: 0,
      });

      return { success: false, error: errorMessage };
    }
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to execute agent" };
  }
}

async function executeOpenRouterAgent(
  agent: Agent,
  inputData: Record<string, any>
): Promise<any> {
  const userMessage = buildUserMessage(agent.inputSchema as any, inputData);
  const images = inputData.images || [];
  
  const response = await chatCompletion(
    agent.systemPrompt,
    userMessage,
    agent.modelName,
    images
  );

  return { text: response };
}

async function executeKieAiAgent(
  agent: Agent,
  inputData: Record<string, any>
): Promise<any> {
  const modelName = agent.modelName.toLowerCase();

  if (modelName.includes("veo")) {
    const prompt = inputData.prompt || inputData.text || "";
    const duration = inputData.duration || 8;
    const videoUrl = await kieai.generateVideoVeo(prompt, duration);
    return { video_url: videoUrl, type: "video" };
  }

  if (modelName.includes("sora")) {
    const prompt = inputData.prompt || inputData.text || "";
    const size = inputData.size || "1280x720";
    const seconds = inputData.seconds || 8;
    const videoUrl = await kieai.generateVideoSora(prompt, size, seconds);
    return { video_url: videoUrl, type: "video" };
  }

  if (modelName.includes("nano-banana") || modelName.includes("nanobanana")) {
    const imageUrl = inputData.image_url || inputData.imageUrl || "";
    const prompt = inputData.prompt || inputData.text || "";
    
    if (!imageUrl) {
      throw new Error("Image URL is required for nano-banana");
    }
    
    const editedImageUrl = await kieai.editImageNanoBanana(imageUrl, prompt);
    return { image_url: editedImageUrl, type: "image" };
  }

  if (modelName.includes("seedance")) {
    const imageUrl = inputData.image_url || inputData.imageUrl || "";
    const prompt = inputData.prompt || inputData.text || "";
    
    if (!imageUrl) {
      throw new Error("Image URL is required for Seedance");
    }
    
    const videoUrl = await kieai.generateVideoSeedance(imageUrl, prompt);
    return { video_url: videoUrl, type: "video" };
  }

  throw new Error(`Unsupported kie.ai model: ${agent.modelName}`);
}

function buildUserMessage(
  inputSchema: Array<{ name: string; type: string; label: string }>,
  inputData: Record<string, any>
): string {
  const parts: string[] = [];
  
  for (const field of inputSchema) {
    const value = inputData[field.name];
    if (value !== undefined && value !== null && value !== "") {
      parts.push(`${field.label}: ${value}`);
    }
  }

  return parts.join("\n");
}
