
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PromptForm } from "@/components/PromptForm";
import { PromptResult } from "@/components/PromptResult";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [promptData, setPromptData] = useState<{
    prompt: string;
    settings: {
      temperature: number;
      modelType: string;
    };
  } | null>(null);

  const handleGenerate = (prompt: string, settings: any) => {
    setPromptData({ prompt, settings });
    // In a real app, this would call an API
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-prompt-50">
      <Header />
      <Hero />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-prompt-900 mb-2">
                Generate Your AI Prompt
              </h2>
              <p className="text-gray-600">
                Describe what you need and our AI will craft the perfect prompt for you.
              </p>
            </div>
            
            <PromptForm onGenerate={handleGenerate} />
            
            {promptData && (
              <div className="mt-10 animate-fade-in">
                <h2 className="text-2xl font-bold text-prompt-900 mb-6">
                  Your Generated Prompt
                </h2>
                <PromptResult
                  prompt={promptData.prompt}
                  settings={promptData.settings}
                />
              </div>
            )}
            
            <div className="mt-12 bg-white p-6 rounded-lg border border-prompt-100 shadow-sm">
              <h3 className="text-xl font-semibold text-prompt-800 mb-4">
                Why Use PromptBloom?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-prompt-700">Save Time</h4>
                  <p className="text-gray-600 text-sm">
                    Quickly generate optimized prompts without trial and error.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-prompt-700">Better Results</h4>
                  <p className="text-gray-600 text-sm">
                    Get more accurate, relevant AI outputs with expertly crafted prompts.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-prompt-700">Learn Techniques</h4>
                  <p className="text-gray-600 text-sm">
                    Improve your own prompt engineering skills by studying our examples.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
