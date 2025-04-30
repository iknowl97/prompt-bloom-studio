
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <div className="w-full py-6 bg-[#1a1a1a] shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-white/90 animate-pulse-soft" />
              <h1 className="text-2xl md:text-3xl font-bold text-white">PromptHub</h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-[#8E9196] hover:text-white transition-colors">Home</Link>
            <Link to="/gallery" className="text-[#8E9196] hover:text-white transition-colors">Gallery</Link>
            <Link to="/custom-prompt-builder" className="text-[#8E9196] hover:text-white transition-colors">Prompt Builder</Link>
            <a href="#" className="text-[#8E9196] hover:text-white transition-colors">Guide</a>
            <a href="#" className="text-[#8E9196] hover:text-white transition-colors">About</a>
          </div>
          <div className="hidden md:flex">
            <Button asChild className="bg-[#A7C7E7] hover:bg-[#A7C7E7]/80 text-[#2D3748] font-medium">
              <Link to="/custom-prompt-builder">
                Create Prompt
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
