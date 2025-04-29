
import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PromptForm } from "@/components/PromptForm";
import { PromptResult } from "@/components/PromptResult";
import { usePrompts } from "@/contexts/PromptContext"; // Fixed import name from usePrompt to usePrompts
import ProfileMenu from "@/components/ProfileMenu";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const { savedPrompts, folders, savePrompt } = usePrompts(); // Updated to use the correct hook and extract needed properties

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        <Hero />

        <div className="container mx-auto px-4 py-8">
          <PromptForm onGenerate={(generatedPrompt, settings) => {
            // We can use the savePrompt function here if needed
            console.log("Generated prompt:", generatedPrompt);
          }} />
        </div>

        {savedPrompts.length > 0 && savedPrompts[0] && (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Generated Prompt</h2>
            <ScrollArea className="rounded-md border p-4">
              <PromptResult 
                prompt={savedPrompts[0].content} 
                settings={{
                  temperature: savedPrompts[0].settings.temperature,
                  modelType: savedPrompts[0].settings.modelType
                }} 
              />
            </ScrollArea>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
