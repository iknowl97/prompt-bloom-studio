
import React from 'react';
import { Sparkles, Settings, Lightbulb, Star, AlertCircle } from 'lucide-react';

const SidebarSuggestions = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-[#A7C7E7]/30 hover:shadow-md transition-all duration-300">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-[#2D3748]">
          <Sparkles className="text-[#A7C7E7]" size={20} />
          <span>AI Suggestions</span>
        </h3>
        <div className="space-y-3">
          <div className="p-3 bg-[#A7C7E7]/10 rounded-lg text-sm border border-[#A7C7E7]/20 cursor-pointer hover:bg-[#A7C7E7]/20 transition-all duration-300 flex items-start gap-2">
            <Lightbulb size={16} className="text-[#A7C7E7] mt-0.5 flex-shrink-0" />
            <span className="text-[#2D3748]">"Be specific about desired format"</span>
          </div>
          <div className="p-3 bg-[#C8E6C9]/10 rounded-lg text-sm border border-[#C8E6C9]/20 cursor-pointer hover:bg-[#C8E6C9]/20 transition-all duration-300 flex items-start gap-2">
            <Star size={16} className="text-[#C8E6C9] mt-0.5 flex-shrink-0" />
            <span className="text-[#2D3748]">"Add examples of expected output"</span>
          </div>
          <div className="p-3 bg-[#FFE5E5]/10 rounded-lg text-sm border border-[#FFE5E5]/20 cursor-pointer hover:bg-[#FFE5E5]/20 transition-all duration-300 flex items-start gap-2">
            <AlertCircle size={16} className="text-[#FFE5E5] mt-0.5 flex-shrink-0" />
            <span className="text-[#2D3748]">"Specify any constraints or limitations"</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-[#A7C7E7]/30 hover:shadow-md transition-all duration-300">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-[#2D3748]">
          <Settings className="text-[#2D3748]" size={20} />
          <span>Prompt Settings</span>
        </h3>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#2D3748] mb-2">
              Temperature
            </label>
            <div className="bg-[#FAFAFA] p-3 rounded-lg border border-[#A7C7E7]/20">
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                defaultValue="0.7" 
                className="w-full accent-[#A7C7E7]"
              />
              <div className="flex justify-between text-xs text-[#2D3748]/70 mt-1">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#2D3748] mb-2">
              Model
            </label>
            <select className="w-full p-3 text-sm border border-[#A7C7E7]/20 rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#A7C7E7]/50 text-[#2D3748]">
              <option>GPT-4</option>
              <option>Claude 3</option>
              <option>Llama 3</option>
              <option>Gemini Pro</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#2D3748] mb-2">
              Max Output Length
            </label>
            <input 
              type="number" 
              className="w-full p-3 text-sm border border-[#A7C7E7]/20 rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#A7C7E7]/50 text-[#2D3748]" 
              defaultValue="500"
            />
          </div>
          
          <button className="w-full mt-2 py-2.5 bg-gradient-to-r from-[#A7C7E7] to-[#C8E6C9] text-[#2D3748] rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Settings size={16} />
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarSuggestions;
