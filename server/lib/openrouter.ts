import OpenAI from "openai";
import pLimit from "p-limit";
import pRetry from "p-retry";

// This is using Replit's AI Integrations service, which provides OpenRouter-compatible API access without requiring your own OpenRouter API key.
const openrouter = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENROUTER_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENROUTER_API_KEY
});

// Helper function to check if error is rate limit or quota violation
function isRateLimitError(error: any): boolean {
  const errorMsg = error?.message || String(error);
  return (
    errorMsg.includes("429") ||
    errorMsg.includes("RATELIMIT_EXCEEDED") ||
    errorMsg.toLowerCase().includes("quota") ||
    errorMsg.toLowerCase().includes("rate limit")
  );
}

// Chat completion with automatic retries for rate limits
export async function chatCompletion(
  systemPrompt: string,
  userMessage: string,
  model: string = "meta-llama/llama-3.3-70b-instruct"
): Promise<string> {
  return pRetry(
    async () => {
      try {
        const response = await openrouter.chat.completions.create({
          model: model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage }
          ],
          max_tokens: 8192,
        });
        return response.choices[0]?.message?.content || "";
      } catch (error: any) {
        if (isRateLimitError(error)) {
          throw error; // Rethrow to trigger p-retry
        }
        // For non-rate-limit errors, don't retry
        throw error;
      }
    },
    {
      retries: 7,
      minTimeout: 2000,
      maxTimeout: 128000,
      factor: 2,
    }
  );
}

// Process multiple prompts concurrently with rate limiting and automatic retries
export async function batchProcessPrompts(
  prompts: string[],
  model: string = "meta-llama/llama-3.3-70b-instruct"
): Promise<string[]> {
  const limit = pLimit(2); // Process up to 2 requests concurrently
  
  const processingPromises = prompts.map((prompt, i) =>
    limit(() =>
      pRetry(
        async () => {
          try {
            const response = await openrouter.chat.completions.create({
              model: model,
              messages: [{ role: "user", content: prompt }],
              max_tokens: 8192,
            });
            return response.choices[0]?.message?.content || "";
          } catch (error: any) {
            if (isRateLimitError(error)) {
              throw error; // Rethrow to trigger p-retry
            }
            throw error;
          }
        },
        {
          retries: 7,
          minTimeout: 2000,
          maxTimeout: 128000,
          factor: 2,
        }
      )
    )
  );
  
  return await Promise.all(processingPromises);
}

export default openrouter;
