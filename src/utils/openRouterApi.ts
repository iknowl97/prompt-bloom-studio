
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

export const generatePrompt = async (prompt: string, purposeContext: string = "", selectedPurposes: string[] = []): Promise<string> => {
  try {
    const purposeSpecificPrompt = getPurposeSpecificPrompt(selectedPurposes);
    
    const systemPrompt = `You are an AI prompt engineer specializing in crafting high-quality prompts.
    ${purposeContext}
    ${purposeSpecificPrompt}
    Focus on these key aspects:
    1. Clarity and specificity in instructions
    2. Proper context and constraints
    3. Desired output format
    4. Additional parameters specific to the selected purpose(s)
    
    Create a detailed, effective prompt based on the user's request.`;
    
    const messages: OpenRouterMessage[] = [
      {
        role: "system",
        content: systemPrompt
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
