
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2, FileEdit, Sparkles } from "lucide-react";

type PromptMode = "create" | "enhance";

interface PromptModeSelectorProps {
  onSelectMode: (mode: PromptMode) => void;
  selectedMode: PromptMode | null;
}

export function PromptModeSelector({ onSelectMode, selectedMode }: PromptModeSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-800">Choose your prompt mode</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer hover:shadow-md transition-all duration-200 ${
            selectedMode === "create" 
              ? "border-2 border-prompt-600 bg-gradient-to-br from-prompt-50 to-white" 
              : "bg-white"
          }`}
          onClick={() => onSelectMode("create")}
        >
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-prompt-100 flex items-center justify-center">
                <Wand2 className="h-6 w-6 text-prompt-600" />
              </div>
              <h3 className="font-medium text-gray-900">Create from Scratch</h3>
              <p className="text-sm text-gray-500">
                Describe what you need and we'll craft a complete prompt for you
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer hover:shadow-md transition-all duration-200 ${
            selectedMode === "enhance" 
              ? "border-2 border-prompt-600 bg-gradient-to-br from-prompt-50 to-white" 
              : "bg-white"
          }`}
          onClick={() => onSelectMode("enhance")}
        >
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-prompt-100 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-prompt-600" />
              </div>
              <h3 className="font-medium text-gray-900">Enhance Existing</h3>
              <p className="text-sm text-gray-500">
                Improve, expand, or refine your existing AI prompt
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
