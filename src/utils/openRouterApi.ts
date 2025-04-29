
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
  mode: "create" | "enhance" = "create"
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
