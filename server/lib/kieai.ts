// kie.ai API client for video and image generation models
// Supports: Veo 3/3.1, Sora 2 Pro, Seedance, nanobanana, and more

const KIE_AI_BASE_URL = "https://api.kie.ai/v1";

interface KieAiTaskRequest {
  model: string;
  prompt?: string;
  input_image?: string;
  input_video?: string;
  parameters?: Record<string, any>;
}

interface KieAiTaskResponse {
  task_id: string;
  status: string;
  result?: {
    video_url?: string;
    image_url?: string;
    text?: string;
  };
  error?: string;
}

class KieAiClient {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.KIE_AI_API_KEY || "";
  }

  private ensureApiKey(): void {
    if (!this.apiKey) {
      throw new Error("KIE_AI_API_KEY is not configured. Please set up the kie.ai API key.");
    }
  }

  async createTask(request: KieAiTaskRequest): Promise<KieAiTaskResponse> {
    this.ensureApiKey();
    const response = await fetch(`${KIE_AI_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`kie.ai API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getTaskStatus(taskId: string): Promise<KieAiTaskResponse> {
    this.ensureApiKey();
    const response = await fetch(`${KIE_AI_BASE_URL}/tasks/${taskId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`kie.ai API error: ${response.statusText}`);
    }

    return response.json();
  }

  async pollTaskUntilComplete(
    taskId: string,
    maxAttempts: number = 60,
    intervalMs: number = 2000
  ): Promise<KieAiTaskResponse> {
    for (let i = 0; i < maxAttempts; i++) {
      const status = await this.getTaskStatus(taskId);
      
      if (status.status === "completed") {
        return status;
      }
      
      if (status.status === "failed") {
        throw new Error(`Task failed: ${status.error}`);
      }

      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }

    throw new Error("Task timed out");
  }

  // Text-to-video using Veo 3.1
  async generateVideoVeo(prompt: string, duration: number = 8): Promise<string> {
    const task = await this.createTask({
      model: "google/veo-3.1",
      prompt,
      parameters: { duration }
    });

    const result = await this.pollTaskUntilComplete(task.task_id);
    return result.result?.video_url || "";
  }

  // Text-to-video using Sora 2 Pro
  async generateVideoSora(prompt: string, size: string = "1280x720", seconds: number = 8): Promise<string> {
    const task = await this.createTask({
      model: "openai/sora-2-pro",
      prompt,
      parameters: { size, seconds }
    });

    const result = await this.pollTaskUntilComplete(task.task_id);
    return result.result?.video_url || "";
  }

  // Image editing with nano banana
  async editImageNanoBanana(imageUrl: string, prompt: string): Promise<string> {
    const task = await this.createTask({
      model: "google/nano-banana",
      prompt,
      input_image: imageUrl
    });

    const result = await this.pollTaskUntilComplete(task.task_id);
    return result.result?.image_url || "";
  }

  // Image to video with Seedance
  async generateVideoSeedance(imageUrl: string, prompt?: string): Promise<string> {
    const task = await this.createTask({
      model: "seedance",
      prompt: prompt || "Animate this image",
      input_image: imageUrl
    });

    const result = await this.pollTaskUntilComplete(task.task_id);
    return result.result?.video_url || "";
  }
}

export const kieai = new KieAiClient();
export default kieai;
