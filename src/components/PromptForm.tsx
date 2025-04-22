
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Wand2, Zap, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generatePrompt } from "@/utils/openRouterApi";

export function PromptForm({ 
  onGenerate, 
  apiKey 
}: { 
  onGenerate: (prompt: string, settings: any) => void;
  apiKey: string;
}) {
  const [prompt, setPrompt] = useState("");
  const [temperature, setTemperature] = useState([0.7]);
  const [modelType, setModelType] = useState("gpt-4o-mini");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenRouter API key in the settings.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Call OpenRouter API
      const generatedPrompt = await generatePrompt(prompt, {
        temperature: temperature[0],
        modelType,
        apiKey
      });
      
      // Pass the generated prompt to the parent component
      onGenerate(prompt, { 
        temperature: temperature[0], 
        modelType,
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="model" className="font-medium text-gray-900">AI Model</Label>
                <Select value={modelType} onValueChange={setModelType}>
                  <SelectTrigger id="model" className="border-gray-300 bg-white text-gray-900">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-gray-900">
                    <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="gpt-4.5-preview">Claude 3 Opus</SelectItem>
                    <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    <SelectItem value="llama3-70b">Llama 3 (70B)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="temperature" className="font-medium text-gray-900">Creativity</Label>
                  <span className="text-sm text-gray-600">{temperature[0].toFixed(1)}</span>
                </div>
                <Slider 
                  id="temperature"
                  defaultValue={temperature} 
                  max={1} 
                  step={0.1} 
                  min={0.1}
                  className="py-4" 
                  onValueChange={setTemperature}
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Precise</span>
                  <span>Creative</span>
                </div>
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
            
            {!apiKey && (
              <div className="mt-2 flex items-center p-2 bg-gray-100 rounded-md text-sm text-gray-700">
                <AlertCircle className="h-4 w-4 mr-2 text-gray-700" />
                <span>Please add your OpenRouter API key in the settings at the top of the page.</span>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
