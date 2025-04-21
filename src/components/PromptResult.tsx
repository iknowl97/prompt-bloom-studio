
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CheckCheck, Star, StarOff, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromptResultProps {
  prompt: string;
  settings: {
    temperature: number;
    modelType: string;
  };
}

export function PromptResult({ prompt, settings }: PromptResultProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Example generated prompts based on different inputs
  const exampleResults = [
    "Create a detailed fantasy world with unique magical systems, diverse cultures, and an ancient conflict that threatens to resurface. Describe the geography, major factions, and a central mystery that drives the narrative.",
    "Write a prompt for generating a compelling sci-fi story set on a distant planet where humans have established colonies but must contend with mysterious indigenous life forms that communicate through shared dreams.",
    "Craft a prompt that will generate an emotional character study of someone experiencing a major life transition, including their internal struggles, key relationships, and how their perspective evolves over time."
  ];
  
  // Pseudo-random but deterministic choice based on the input prompt
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };
  
  const generatedPrompt = exampleResults[hashCode(prompt) % exampleResults.length];
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard.",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      toast({
        title: "Added to favorites",
        description: "This prompt has been saved to your favorites.",
      });
    }
  };

  return (
    <Card className="w-full shadow-lg border-prompt-200 bg-gradient-to-br from-white to-prompt-50">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <MessageSquare className="h-5 w-5 text-prompt-600 mt-1 flex-shrink-0" />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-prompt-800">Generated Prompt</h3>
              <p className="text-sm text-gray-500">
                Model: {settings.modelType} • Temperature: {settings.temperature}
              </p>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-md p-4 border border-prompt-100">
            <p className="text-gray-800 whitespace-pre-wrap">{generatedPrompt}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-prompt-100 bg-prompt-50/50 py-3 px-6">
        <div className="flex justify-between w-full">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-prompt-700 hover:text-prompt-900 hover:bg-prompt-100"
            onClick={handleFavorite}
          >
            {isFavorited ? (
              <><Star className="mr-1 h-4 w-4 fill-prompt-500 text-prompt-500" /> Favorited</>
            ) : (
              <><StarOff className="mr-1 h-4 w-4" /> Add to Favorites</>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="text-prompt-700 border-prompt-200 hover:bg-prompt-100"
            onClick={handleCopy}
          >
            {isCopied ? (
              <><CheckCheck className="mr-1 h-4 w-4" /> Copied</>
            ) : (
              <><Copy className="mr-1 h-4 w-4" /> Copy Prompt</>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
