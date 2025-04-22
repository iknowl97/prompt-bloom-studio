
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PromptForm } from "@/components/PromptForm";
import { PromptResult } from "@/components/PromptResult";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GalleryHorizontal, Settings, Key } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [promptData, setPromptData] = useState<{
    prompt: string;
    settings: {
      temperature: number;
      modelType: string;
      generatedPrompt?: string;
    };
  } | null>(null);
  
  const [apiKey, setApiKey] = useState(() => {
    // Get API key from localStorage
    return localStorage.getItem("aiknowledge_openrouter_key") || "";
  });
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Save API key to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("aiknowledge_openrouter_key", apiKey);
  }, [apiKey]);

  const handleGenerate = (prompt: string, settings: any) => {
    setPromptData({ prompt, settings });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />
      <Hero />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Generate Your AI Prompt
                </h2>
                <p className="text-gray-600">
                  Describe what you need and our AI will craft the perfect prompt for you.
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex items-center border-gray-300 text-gray-700"
                  onClick={() => setIsSettingsOpen(true)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  API Key
                </Button>
                
                <Link to="/gallery">
                  <Button variant="outline" className="flex items-center border-gray-300 text-gray-700">
                    <GalleryHorizontal className="mr-2 h-4 w-4" />
                    Gallery
                  </Button>
                </Link>
              </div>
            </div>
            
            <PromptForm onGenerate={handleGenerate} apiKey={apiKey} />
            
            {promptData && promptData.settings.generatedPrompt && (
              <div className="mt-10 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Your Generated Prompt
                </h2>
                <PromptResult
                  prompt={promptData.settings.generatedPrompt}
                  settings={promptData.settings}
                />
              </div>
            )}
            
            <div className="mt-12 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Why Use AiKnowledge?
                </h3>
                <Link to="/gallery">
                  <Button variant="outline" className="flex items-center border-gray-300 text-gray-700">
                    <GalleryHorizontal className="mr-2 h-4 w-4" />
                    View Gallery
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Save Time</h4>
                  <p className="text-gray-600 text-sm">
                    Quickly generate optimized prompts without trial and error.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Better Results</h4>
                  <p className="text-gray-600 text-sm">
                    Get more accurate, relevant AI outputs with expertly crafted prompts.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Organize & Share</h4>
                  <p className="text-gray-600 text-sm">
                    Save, organize, and download your prompts in various formats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>OpenRouter API Settings</DialogTitle>
            <DialogDescription>
              Enter your OpenRouter API key to enable prompt generation.
              You can get an API key from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-gray-900 underline">openrouter.ai/keys</a>.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="api-key" className="text-gray-900">API Key</Label>
              <Input
                id="api-key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your OpenRouter API key"
                className="border-gray-300 text-gray-900"
              />
              <p className="text-xs text-gray-500">
                Your API key is stored locally and never sent to our servers.
                For development, this will work with localhost.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={() => setIsSettingsOpen(false)}
              className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Index;
