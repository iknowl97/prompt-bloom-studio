
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Wand2 } from "lucide-react";

export function PromptForm({ onGenerate }: { onGenerate: (prompt: string, settings: any) => void }) {
  const [prompt, setPrompt] = useState("");
  const [temperature, setTemperature] = useState([0.7]);
  const [modelType, setModelType] = useState("gpt-4o-mini");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate generation (would connect to an API in a real app)
    setTimeout(() => {
      onGenerate(prompt, { temperature: temperature[0], modelType });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Card className="w-full shadow-lg border-prompt-200">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-prompt-500" />
                <Label htmlFor="prompt" className="text-lg font-medium">Your Prompt Idea</Label>
              </div>
              <Textarea 
                id="prompt"
                placeholder="Describe what kind of prompt you want to generate... (e.g., 'Create a prompt for generating a fantasy story about dragons')"
                className="min-h-[120px] border-prompt-200 focus:border-prompt-400 focus:ring-prompt-400"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="model" className="font-medium">AI Model</Label>
                <Select value={modelType} onValueChange={setModelType}>
                  <SelectTrigger id="model" className="border-prompt-200">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="gpt-4.5-preview">GPT-4.5 Preview</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="temperature" className="font-medium">Creativity</Label>
                  <span className="text-sm text-gray-500">{temperature[0].toFixed(1)}</span>
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
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Precise</span>
                  <span>Creative</span>
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-prompt-600 to-prompt-800 hover:from-prompt-700 hover:to-prompt-900 text-white font-medium py-2 rounded-md transition-all duration-200"
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
