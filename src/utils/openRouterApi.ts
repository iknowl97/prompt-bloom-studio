
import { API_KEYS, API_CONFIG } from "../config/constants";

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

// Get purpose-specific prompt guidance
const getPurposeSpecificPrompt = (selectedPurposes: string[]) => {
  const purposePrompts = {
    chat: "Create a conversational prompt optimized for AI chat models, focusing on natural dialogue and clear instructions.",
    image: "Design a detailed prompt for image generation, including style, composition, lighting, and artistic elements.",
    video: "Craft a comprehensive prompt for video generation with scene descriptions, transitions, and temporal elements.",
    audio: "Develop an audio generation prompt considering tone, mood, tempo, and sound characteristics.",
    agent: "Structure a prompt for AI agents with clear goals, constraints, and decision-making parameters.",
    advanced: "Engineer an advanced prompt with specific technical parameters and complex instruction chains."
  };

  if (selectedPurposes.length === 0) return "";
  
  return selectedPurposes.map(purpose => purposePrompts[purpose as keyof typeof purposePrompts]).join(" ");
};

// Get mode-specific system instructions
const getModeSpecificInstructions = (mode: "create" | "enhance") => {
  if (mode === "create") {
    return `You are an AI prompt engineer specializing in crafting high-quality prompts.
    Focus on these key aspects:
    1. Clarity and specificity in instructions
    2. Proper context and constraints
    3. Desired output format
    4. Additional parameters specific to the selected purpose(s)
    
    Create a detailed, effective prompt based on the user's request.`;
  } else {
    return `You are an AI prompt optimizer specializing in improving existing prompts.
    Analyze the provided prompt and enhance it by:
    1. Improving clarity and specificity
    2. Adding relevant context and constraints
    3. Refining output format specifications
    4. Reorganizing and structuring the prompt for better results
    5. Maintaining the original intent and purpose
    
    Return an enhanced version of the prompt that will produce better results.`;
  }
};

export const generatePrompt = async (
  promptText: string, 
  purposeContext: string = "", 
  selectedPurposes: string[] = [],
  mode: "create" | "enhance" = "create",
  temperature: number = 0.7,
  modelType: string = API_CONFIG.MODEL
): Promise<string> => {
  try {
    const purposeSpecificPrompt = getPurposeSpecificPrompt(selectedPurposes);
    const modeSpecificInstructions = getModeSpecificInstructions(mode);
    
    const systemPrompt = `${modeSpecificInstructions}
    ${purposeContext}
    ${purposeSpecificPrompt}`;
    
    const messages: OpenRouterMessage[] = [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: promptText
      }
    ];

    // Make sure we're using the API key correctly
    const apiKey = API_KEYS.OPENROUTER_API_KEY || "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";
    console.log("Using model:", modelType);

    // Add more detailed logging to help debug
    console.log("API request details:", {
      model: modelType,
      messagesCount: messages.length,
      temperature: temperature,
      apiKeyLength: apiKey.length,
      apiKeyPrefix: apiKey.substring(0, 10) + "...", // Only log part of the key for security
    });

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin || "http://localhost:8080",
        "X-Title": "Prompt Bloom Studio",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelType,
        messages: messages,
        temperature: temperature,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API error:", errorData);
      throw new Error(errorData.error?.message || `Failed to generate prompt: ${response.status} ${response.statusText}`);
    }

    const data: OpenRouterResponse = await response.json();
    return data.choices[0]?.message.content || "No response generated.";
  } catch (error) {
    console.error("Error generating prompt:", error);
    throw error;
  }
};
