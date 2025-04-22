
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

export interface OpenRouterSettings {
  modelType: string;
  temperature: number;
  apiKey: string;
}

export const generatePrompt = async (
  prompt: string,
  settings: OpenRouterSettings
): Promise<string> => {
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

    // Determine the model based on settings
    const selectedModel = getModelId(settings.modelType);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${settings.apiKey}`,
        "HTTP-Referer": window.location.origin, 
        "X-Title": "AiKnowledge Prompt Generator",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: messages,
        temperature: settings.temperature,
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
export const getModelId = (modelType: string): string => {
  const modelMap: Record<string, string> = {
    "gpt-4o-mini": "openai/gpt-4o-mini:free",
    "gpt-4o": "openai/gpt-4o:free",
    "gpt-4.5-preview": "anthropic/claude-3-opus:free", // Since GPT-4.5 isn't directly available, use Claude Opus as the premium option
    "gemini-pro": "google/gemini-2.5-pro-exp-03-25:free",
    "llama3-70b": "meta/llama-3-70b-instruct:free"
  };

  return modelMap[modelType] || "openai/gpt-4o-mini:free";
};

// Get recommended model based on prompt complexity and content
export const getRecommendedModel = (prompt: string): string => {
  // Check prompt complexity and content
  if (prompt.length > 200) {
    return "gpt-4.5-preview"; // For complex, long prompts
  } else if (prompt.includes("creative") || prompt.includes("imagine") || prompt.includes("story")) {
    return "gpt-4o"; // For creative tasks
  } else {
    return "gpt-4o-mini"; // For simple tasks
  }
};

