
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

const API_KEY = "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";

export const generatePrompt = async (prompt: string): Promise<string> => {
  try {
    // Prepare the system message to generate a prompt
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

    // Determine the best model based on prompt content
    const selectedModel = getRecommendedModel(prompt);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": window.location.origin, 
        "X-Title": "AiKnowledge Prompt Generator",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: messages,
        temperature: 0.7, // Default temperature
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

// Map our UI model names to OpenRouter model IDs
const getModelId = (modelType: string): string => {
  const modelMap: Record<string, string> = {
    "gpt-4o-mini": "openai/gpt-4o-mini:free",
    "gpt-4o": "openai/gpt-4o:free",
    "claude-3": "anthropic/claude-3-opus:free",
    "gemini-pro": "google/gemini-2.5-pro-exp-03-25:free",
    "llama3-70b": "meta/llama-3-70b-instruct:free"
  };

  return modelMap[modelType] || "openai/gpt-4o-mini:free";
};

// Get recommended model based on prompt complexity and content
export const getRecommendedModel = (prompt: string): string => {
  // Check for creative/imaginative tasks
  if (prompt.toLowerCase().includes("creative") || 
      prompt.toLowerCase().includes("imagine") || 
      prompt.toLowerCase().includes("story") ||
      prompt.toLowerCase().includes("art")) {
    return getModelId("claude-3"); // Best for creative tasks
  }
  
  // Check for technical/analytical tasks
  if (prompt.toLowerCase().includes("code") || 
      prompt.toLowerCase().includes("analyze") || 
      prompt.toLowerCase().includes("technical") ||
      prompt.toLowerCase().includes("explain")) {
    return getModelId("gpt-4o"); // Best for technical tasks
  }

  // Check for complex or long prompts
  if (prompt.length > 200 || 
      prompt.split(" ").length > 50 ||
      prompt.toLowerCase().includes("complex")) {
    return getModelId("gemini-pro"); // Good for handling complex queries
  }

  // Default to GPT-4o Mini for simple tasks
  return getModelId("gpt-4o-mini");
};
