
import { Sparkles, Stars, Lightbulb } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#2b2b2b] to-[#373737] py-16 text-center text-white">
      {/* Animated background elements with updated colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 left-1/4 h-8 w-8 rounded-full bg-white/5 animate-float" style={{ animationDelay: "0s" }}></div>
        <div className="absolute top-20 left-1/2 h-12 w-12 rounded-full bg-white/5 animate-float" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute top-12 right-1/4 h-10 w-10 rounded-full bg-[#8E9196]/10 animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-12 left-1/3 h-16 w-16 rounded-full bg-white/5 animate-float" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute -bottom-4 right-1/3 h-14 w-14 rounded-full bg-[#8E9196]/10 animate-float" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="relative container mx-auto px-4">
        <div className="inline-flex items-center justify-center mb-4 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full">
          <Stars className="h-4 w-4 mr-2 text-[#8E9196]" />
          <span className="text-sm font-medium">AI-Powered Prompt Engineering</span>
        </div>
        
        <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Craft Perfect
          <span className="bg-gradient-to-r from-white/90 to-[#8E9196] bg-clip-text text-transparent px-2">AI Prompts</span>
          with Ease
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-[#8E9196] mb-8">
          Generate powerful, effective prompts for any AI model with our intelligent prompt engineering assistant.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Sparkles className="h-5 w-5 text-[#8E9196]" />
            <span>Optimized Results</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Lightbulb className="h-5 w-5 text-[#8E9196]" />
            <span>Smart Templates</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Stars className="h-5 w-5 text-[#8E9196]" />
            <span>Save Favorites</span>
          </div>
        </div>
      </div>
    </div>
  );
}
