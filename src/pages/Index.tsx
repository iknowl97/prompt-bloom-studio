import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PromptForm } from "@/components/PromptForm";
import { PromptResult } from "@/components/PromptResult";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GalleryHorizontal, Sparkles } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { AuthModal } from "@/components/AuthModal";
import ProfileMenu from "@/components/ProfileMenu";

const Index = () => {
  const [promptData, setPromptData] = useState<{
    prompt: string;
    settings: {
      generatedPrompt?: string;
      selectedPurposes?: string[];
      temperature: number;
      modelType: string;
    };
  } | null>(null);
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { isAuthenticated, user } = useUser();

  const handleGenerate = (prompt: string, settings: any) => {
    // Use user preferences for default settings if available
    const defaultTemperature = user?.preferences?.defaultTemperature || 0.7;
    const defaultModel = user?.preferences?.defaultModelType || "deepseek/deepseek-chat-v3-0324:free";
    
    setPromptData({
      prompt,
      settings: {
        ...settings,
        temperature: settings.temperature || defaultTemperature,
        modelType: settings.modelType || defaultModel
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-prompt-50">
      <Header />
      <Hero />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center">
                  Generate Your AI Prompt
                  <Sparkles className="ml-2 h-5 w-5 text-prompt-500" />
                </h2>
                <p className="text-gray-600">
                  Describe what you need and our AI will craft the perfect prompt for you.
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {!isAuthenticated ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setAuthModalOpen(true)}
                    className="border-prompt-300 text-prompt-700 hover:bg-prompt-50"
                  >
                    Sign In
                  </Button>
                ) : (
                  <ProfileMenu />
                )}
                
                <Link to="/gallery">
                  <Button variant="outline" className="flex items-center border-gray-300 text-gray-700">
                    <GalleryHorizontal className="mr-2 h-4 w-4" />
                    Gallery
                  </Button>
                </Link>
              </div>
            </div>
            
            <PromptForm onGenerate={handleGenerate} />
            
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
            
            <div className="mt-12 bg-gradient-to-br from-prompt-50 to-white p-6 rounded-lg border border-prompt-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Why Use AiKnowledge?
                </h3>
                <Link to="/gallery">
                  <Button variant="outline" className="flex items-center border-prompt-300 text-prompt-700 hover:bg-prompt-50">
                    <GalleryHorizontal className="mr-2 h-4 w-4" />
                    View Gallery
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 bg-white p-4 rounded-lg border border-prompt-100 hover:shadow-md transition-shadow duration-200">
                  <h4 className="font-medium text-gray-700">Save Time</h4>
                  <p className="text-gray-600 text-sm">
                    Quickly generate optimized prompts without trial and error.
                  </p>
                </div>
                <div className="space-y-2 bg-white p-4 rounded-lg border border-prompt-100 hover:shadow-md transition-shadow duration-200">
                  <h4 className="font-medium text-gray-700">Better Results</h4>
                  <p className="text-gray-600 text-sm">
                    Get more accurate, relevant AI outputs with expertly crafted prompts.
                  </p>
                </div>
                <div className="space-y-2 bg-white p-4 rounded-lg border border-prompt-100 hover:shadow-md transition-shadow duration-200">
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
      
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        onSuccess={() => {}}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
