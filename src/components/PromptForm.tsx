
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Wand2, MessageSquare, Image, Video, Headphones, Bot, Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { generatePrompt } from "@/utils/openRouterApi";
import { Checkbox } from "@/components/ui/checkbox";

// Define prompt purpose options
const promptPurposes = [
  { id: "chat", label: "AI chat model", icon: <MessageSquare className="h-4 w-4" /> },
  { id: "image", label: "Image generation", icon: <Image className="h-4 w-4" /> },
  { id: "video", label: "Video generation", icon: <Video className="h-4 w-4" /> },
  { id: "audio", label: "Audio generation", icon: <Headphones className="h-4 w-4" /> },
  { id: "agent", label: "AI agent prompts", icon: <Bot className="h-4 w-4" /> },
  { id: "advanced", label: "Advanced AI prompts", icon: <Settings className="h-4 w-4" /> },
];

export function PromptForm({ 
  onGenerate
}: { 
  onGenerate: (prompt: string, settings: any) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const { toast } = useToast();

  const handlePurposeToggle = (purposeId: string) => {
    setSelectedPurposes(prev => 
      prev.includes(purposeId) 
        ? prev.filter(id => id !== purposeId)
        : [...prev, purposeId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      // Include selected purposes in the system prompt
      const purposeContext = selectedPurposes.length > 0 
        ? `Create a prompt specifically optimized for: ${selectedPurposes.map(id => 
            promptPurposes.find(p => p.id === id)?.label
          ).join(", ")}. `
        : "";
      
      // Call OpenRouter API with the enhanced prompt
      const generatedPrompt = await generatePrompt(prompt, purposeContext);
      
      // Pass the generated prompt to the parent component
      onGenerate(prompt, { 
        generatedPrompt,
        selectedPurposes 
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

  return (
    <Card className="w-full shadow-lg border-gray-300 bg-white">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-gray-700" />
                <Label htmlFor="prompt" className="text-lg font-medium text-gray-900">Your Prompt Idea</Label>
              </div>
              <Textarea 
                id="prompt"
                placeholder="Describe what kind of prompt you want to generate... (e.g., 'Create a prompt for generating a fantasy story about dragons')"
                className="min-h-[120px] border-gray-300 focus:border-gray-500 focus:ring-gray-500 bg-white text-gray-900"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
            </div>
            
            {/* Prompt Purpose Selection */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-md border border-gray-200">
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
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-medium py-2 rounded-md transition-all duration-200"
              disabled={!prompt.trim() || isGenerating}
            >
              <Wand2 className="mr-2 h-5 w-5" />
              {isGenerating ? "Generating..." : "Generate Prompt"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
