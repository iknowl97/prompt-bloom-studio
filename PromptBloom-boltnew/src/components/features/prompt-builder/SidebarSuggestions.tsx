
import React from 'react';
import { Sparkles, Settings } from 'lucide-react';

const SidebarSuggestions = () => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Sparkles className="text-primary-500" size={18} />
          AI Suggestions
        </h3>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-md text-sm border border-gray-200 cursor-pointer hover:border-primary-300">
            "Be specific about desired format"
          </div>
          <div className="p-3 bg-gray-50 rounded-md text-sm border border-gray-200 cursor-pointer hover:border-primary-300">
            "Add examples of expected output"
          </div>
          <div className="p-3 bg-gray-50 rounded-md text-sm border border-gray-200 cursor-pointer hover:border-primary-300">
            "Specify any constraints or limitations"
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Settings className="text-gray-500" size={18} />
          Prompt Settings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temperature
            </label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              defaultValue="0.7" 
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Precise</span>
              <span>Creative</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <select className="w-full p-2 text-sm border border-gray-300 rounded-md">
              <option>GPT-4</option>
              <option>Claude 3</option>
              <option>Llama 3</option>
              <option>Gemini Pro</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Output Length
            </label>
            <input 
              type="number" 
              className="w-full p-2 text-sm border border-gray-300 rounded-md" 
              defaultValue="500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarSuggestions;
