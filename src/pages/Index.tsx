import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PromptForm } from "@/components/PromptForm";
import { PromptResult } from "@/components/PromptResult";
import { usePrompt } from "@/contexts/PromptContext";
import ProfileMenu from "@/components/ProfileMenu"; // Fixed import statement
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const { generatedPrompt, promptSettings } = usePrompt();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        <Hero />

        <div className="container mx-auto px-4 py-8">
          <PromptForm onGenerate={() => {}} />
        </div>

        {generatedPrompt && (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Generated Prompt</h2>
            <ScrollArea className="rounded-md border p-4">
              <PromptResult prompt={generatedPrompt} settings={promptSettings} />
            </ScrollArea>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;

