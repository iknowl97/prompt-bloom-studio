
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Image, Video, AudioLines, Bot, Settings2, Rocket, Zap } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { generatePrompt } from "@/utils/openRouterApi";
import { Checkbox } from "@/components/ui/checkbox";
import { PromptModeSelector } from "./PromptModeSelector";
import { AuthModal } from "./AuthModal";
import { useUser } from "@/contexts/UserContext";

const promptPurposes = [
  { id: "chat", label: "AI chat model", icon: <MessageSquare className="h-4 w-4" /> },
  { id: "image", label: "Image generation", icon: <Image className="h-4 w-4" /> },
  { id: "video", label: "Video generation", icon: <Video className="h-4 w-4" /> },
  { id: "audio", label: "Audio generation", icon: <AudioLines className="h-4 w-4" /> },
  { id: "agent", label: "AI agent prompts", icon: <Bot className="h-4 w-4" /> },
  { id: "advanced", label: "Advanced AI prompts", icon: <Settings2 className="h-4 w-4" /> },
];

const getModelSuggestion = (selectedPurposes: string[]) => {
  if (selectedPurposes.includes("advanced") || selectedPurposes.length > 2) {
    return {
      name: "Claude 3 Opus",
      description: "Best for complex, multi-purpose tasks",
      icon: <Rocket className="h-5 w-5 text-purple-500" />,
      modelId: "anthropic/claude-3-opus:free"
    };
  } else if (selectedPurposes.includes("image") || selectedPurposes.includes("video")) {
    return {
      name: "GPT-4o",
      description: "Optimal for visual and creative tasks",
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      modelId: "openai/gpt-4o:free"
    };
  }
  return {
    name: "DeepSeek V3",
    description: "Fast and efficient for standard tasks",
    icon: <MessageSquare className="h-5 w-5 text-green-500" />,
    modelId: "deepseek/deepseek-chat-v3-0324:free"
  };
};

export function PromptForm({ 
  onGenerate
}: { 
  onGenerate: (prompt: string, settings: any) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [promptMode, setPromptMode] = useState<"create" | "enhance" | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [requiresAuth, setRequiresAuth] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const { toast } = useToast();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    updatePlaceholder(selectedPurposes, promptMode);
  }, [selectedPurposes, promptMode]);

  const updatePlaceholder = (purposes: string[], mode: "create" | "enhance" | null) => {
    if (!mode) {
      setPlaceholderText("First select a prompt mode above...");
      return;
    }

    if (mode === "enhance") {
      setPlaceholderText("Paste your existing prompt here to enhance it...");
      return;
    }
    
    if (purposes.length === 0) {
      setPlaceholderText("Describe what kind of prompt you want to generate...");
      return;
    }

    const examples: Record<string, string> = {
      chat: "Create a chatbot that helps users learn a new language...",
      image: "Generate a breathtaking landscape with sunset colors...",
      video: "Create a 30-second animation showcasing a product...",
      audio: "Compose a calming meditation background track...",
      agent: "Design an AI assistant that helps with task scheduling...",
      advanced: "Create a complex workflow combining multiple AI models..."
    };

    const selectedExample = purposes[0] ? examples[purposes[0]] : examples.chat;
    setPlaceholderText(selectedExample);
  };

  const handlePurposeToggle = (purposeId: string) => {
    setSelectedPurposes(prev => {
      const newPurposes = prev.includes(purposeId) 
        ? prev.filter(id => id !== purposeId)
        : [...prev, purposeId];
      return newPurposes;
    });
  };

  const handleSelectMode = (mode: "create" | "enhance") => {
    setPromptMode(mode);
    setPrompt("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      let purposeContext = "";
      
      if (promptMode === "create") {
        purposeContext = selectedPurposes.length > 0 
          ? `Create a prompt specifically optimized for: ${selectedPurposes.map(id => 
              promptPurposes.find(p => p.id === id)?.label
            ).join(", ")}. `
          : "";
      } else if (promptMode === "enhance") {
        purposeContext = "Enhance, improve, and expand the following AI prompt while keeping its original intent. Make it more effective and comprehensive. ";
        setOriginalPrompt(prompt);
      }
      
      const generatedPrompt = await generatePrompt(prompt, purposeContext, selectedPurposes, promptMode || "create");
      
      const modelSuggestion = getModelSuggestion(selectedPurposes);
      
      onGenerate(promptMode === "enhance" ? originalPrompt : prompt, { 
        generatedPrompt,
        selectedPurposes,
        temperature: 0.7,
        modelType: modelSuggestion.modelId
      });
    } catch (error) {
      console.error("Failed to generate prompt:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveClick = () => {
    if (!isAuthenticated) {
      setRequiresAuth(true);
      setAuthModalOpen(true);
    }
    // If authenticated, saving will proceed normally
  };

  const modelSuggestion = getModelSuggestion(selectedPurposes);

  return (
    <Card className="w-full shadow-lg border-gray-300 bg-white">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <PromptModeSelector 
            onSelectMode={handleSelectMode}
            selectedMode={promptMode}
          />

          {promptMode && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {promptMode === "create" && (
                <div className="space-y-3 bg-prompt-50 p-4 rounded-md border border-prompt-200">
                  <Label className="font-medium text-gray-800">Prompt Purpose</Label>
                  <p className="text-sm text-gray-600">Select the intended use for your prompt:</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {promptPurposes.map((purpose) => (
                      <div key={purpose.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={purpose.id}
                          checked={selectedPurposes.includes(purpose.id)}
                          onCheckedChange={() => handlePurposeToggle(purpose.id)}
                          className="border-gray-400"
                        />
                        <Label 
                          htmlFor={purpose.id} 
                          className="flex items-center space-x-2 text-sm font-normal cursor-pointer hover:text-gray-900"
                        >
                          {purpose.icon}
                          <span>{purpose.label}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <Label htmlFor="prompt" className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  {modelSuggestion.icon}
                  {promptMode === "create" ? "Your Prompt Idea" : "Your Existing Prompt"}
                  <span className="text-sm font-normal text-gray-500">
                    (Recommended: {modelSuggestion.name} - {modelSuggestion.description})
                  </span>
                </Label>
                
                <Textarea 
                  id="prompt"
                  placeholder={placeholderText}
                  className="min-h-[120px] border-gray-300 focus:border-prompt-500 focus:ring-prompt-500 bg-white text-gray-900"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-prompt-700 to-prompt-500 hover:from-prompt-800 hover:to-prompt-600 text-white font-medium py-2 rounded-md transition-all duration-200"
                disabled={!prompt.trim() || isGenerating}
              >
                {modelSuggestion.icon}
                {isGenerating 
                  ? "Generating..." 
                  : promptMode === "create" 
                    ? "Generate Prompt" 
                    : "Enhance Prompt"}
              </Button>
            </form>
          )}
        </div>
      </CardContent>

      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        onSuccess={() => {
          if (requiresAuth) {
            // Continue with saving after authentication
            setRequiresAuth(false);
            toast({
              title: "Ready to save",
              description: "You can now save prompts to your gallery!",
            });
          }
        }}
      />
    </Card>
  );
}
