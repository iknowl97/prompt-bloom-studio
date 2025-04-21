
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <div className="w-full py-6 bg-gradient-to-r from-prompt-700 to-blue-600 bg-size-200 animate-gradient-shift">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-white animate-pulse-soft" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">PromptBloom</h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-white/80 hover:text-white transition-colors">Examples</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">Guide</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">About</a>
          </div>
        </div>
      </div>
    </div>
  );
}
