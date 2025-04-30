import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEFAULT_SETTINGS, MODEL_TYPES } from "@/config/constants";
import { useToast } from "@/hooks/use-toast";
import { usePrompts } from "@/contexts/PromptContext";
import { AuthModal } from "@/components/AuthModal";
import { useUser } from "@/hooks/use-user";

type PromptFormProps = {
  onGenerate: (prompt: string, settings: { temperature: number; modelType: string }) => void;
};

export function PromptForm({ onGenerate }: PromptFormProps) {
  const [promptText, setPromptText] = useState("");
  const [temperature, setTemperature] = useState(DEFAULT_SETTINGS.temperature);
  const [modelType, setModelType] = useState(DEFAULT_SETTINGS.modelType);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { savePrompt } = usePrompts();
  const { isAuthenticated } = useUser();
  const { toast } = useToast();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate an API call to generate the prompt
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const generated = `Generated prompt based on: ${promptText} with temperature ${temperature} and model ${modelType}`;
      setGeneratedPrompt(generated);
      onGenerate(generated, { temperature, modelType });
    } catch (error) {
      console.error("Error generating prompt:", error);
      toast({
        title: "Error generating prompt",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [promptText, temperature, modelType, onGenerate, toast]);

  const handleSavePrompt = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save prompts to your gallery",
      });
      setShowAuthModal(true);
      return;
    }
    
    if (!generatedPrompt) {
      toast({
        title: "No prompt generated",
        description: "Please generate a prompt before saving.",
        variant: "destructive",
      });
      return;
    }

    savePrompt({
      title: `Prompt ${new Date().toLocaleString()}`,
      content: generatedPrompt,
      settings: { temperature, modelType },
    });

    toast({
      title: "Prompt saved!",
      description: "Your prompt has been saved to your gallery.",
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Prompt Generator</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="prompt">Enter Prompt Text</Label>
            <Input
              id="prompt"
              placeholder="Write your prompt here"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="temperature">Temperature</Label>
            <Slider
              id="temperature"
              defaultValue={[temperature]}
              max={1}
              step={0.1}
              onValueChange={(value) => setTemperature(value[0])}
            />
            <p className="text-sm text-muted-foreground">
              Adjust the randomness of the generated prompt.
            </p>
          </div>

          <div>
            <Label htmlFor="modelType">Model Type</Label>
            <Select value={modelType} onValueChange={setModelType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {MODEL_TYPES.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate Prompt"}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleSavePrompt}
            disabled={!generatedPrompt || loading}
          >
            Save to Gallery
          </Button>
        </div>

        {generatedPrompt && (
          <div className="mt-6 p-4 border rounded-md bg-gray-50">
            <h3 className="text-md font-semibold">Generated Prompt:</h3>
            <p>{generatedPrompt}</p>
          </div>
        )}
      </div>
      
      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onSuccess={() => {
          toast({
            title: "Now you can save prompts!",
            description: "Try saving your prompt again."
          });
        }}
      />
    </>
  );
}
