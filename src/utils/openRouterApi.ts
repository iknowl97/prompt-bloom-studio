
import { API_KEYS, API_CONFIG } from "../config/constants";

// OpenRouter API utility functions
interface OpenRouterMessage {
  role: "user" | "assistant" | "system";
  content: string | Array<{ type: string; text?: string; image_url?: { url: string } }>;
}

interface OpenRouterResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    index: number;
    finish_reason: string;
  }>;
  model: string;
  created: number;
}

export const generatePrompt = async (prompt: string): Promise<string> => {
  try {
    const messages: OpenRouterMessage[] = [
      {
        role: "system",
        content: "You are an AI prompt engineer. Create a detailed, effective prompt based on the user's request. Make the prompt clear, specific, and well-structured."
      },
      {
        role: "user",
        content: prompt
      }
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEYS.OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "AiKnowledge Prompt Generator",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: API_CONFIG.MODEL,
        messages: messages,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate prompt");
    }

    const data: OpenRouterResponse = await response.json();
    return data.choices[0]?.message.content || "No response generated.";
  } catch (error) {
    console.error("Error generating prompt:", error);
    throw error;
  }
};
