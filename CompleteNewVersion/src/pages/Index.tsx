
import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Wizard } from "@/components/Wizard";
import { promptSteps } from "@/config/promptSteps";
import { LearningCenter } from "@/components/LearningCenter";
import { PromptForm } from "@/components/PromptForm";
import { PromptResult } from "@/components/PromptResult";
import { usePrompts } from "@/contexts/PromptContext"; // Fixed import name from usePrompt to usePrompts
import ProfileMenu from "@/components/ProfileMenu";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const { savedPrompts, folders, savePrompt } = usePrompts(); // Updated to use the correct hook and extract needed properties

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <Header />

      <main className="flex-grow">
        <Hero />
          <LearningCenter />

        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
          <Wizard 
            steps={promptSteps} 
            onComplete={() => console.log("Wizard completed")}
          />
          <div className="mt-8 border-t pt-8">
            <h3 className="text-lg font-semibold mb-4 text-[#2D3748]">Advanced Mode</h3>
            <PromptForm 
              onGenerate={(generatedPrompt, settings) => {
                console.log("Generated prompt:", generatedPrompt);
              }}
            />
          </div>
        </div>
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
