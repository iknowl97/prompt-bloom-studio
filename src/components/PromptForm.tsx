
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Wand2, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { generatePrompt } from "@/utils/openRouterApi";

export function PromptForm({ 
  onGenerate
}: { 
  onGenerate: (prompt: string, settings: any) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      // Call OpenRouter API
      const generatedPrompt = await generatePrompt(prompt);
      
      // Pass the generated prompt to the parent component
      onGenerate(prompt, { 
        generatedPrompt 
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
          <div className="space-y-4">
            <div className="space-y-2">
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
