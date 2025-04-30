
import React from 'react';
import Button from '../../ui/Button';
import { ArrowRight, FileText, Code, MessageCircle } from 'lucide-react';

const WizardMode = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-xl font-bold mb-4">Guided Prompt Builder</h3>
      <p className="text-gray-600 mb-6">
        Answer a few questions to create a perfect prompt for your needs.
      </p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What's the purpose of your prompt?
          </label>
          <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
            <option value="">Select a purpose...</option>
            <option value="creative">Creative Writing</option>
            <option value="coding">Code Generation</option>
            <option value="analysis">Data Analysis</option>
            <option value="conversation">Conversation</option>
            <option value="education">Education</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What should the AI know to help you?
          </label>
          <textarea 
            className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Describe any context, background information, or specific details..."
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What format do you want the output in?
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button className="flex flex-col items-center border border-gray-300 rounded-md p-3 hover:bg-primary-50 hover:border-primary-300">
              <FileText size={24} className="mb-2" />
              <span className="text-sm">Text</span>
            </button>
            <button className="flex flex-col items-center border border-gray-300 rounded-md p-3 hover:bg-primary-50 hover:border-primary-300">
              <Code size={24} className="mb-2" />
              <span className="text-sm">Code</span>
            </button>
            <button className="flex flex-col items-center border border-gray-300 rounded-md p-3 hover:bg-primary-50 hover:border-primary-300">
              <MessageCircle size={24} className="mb-2" />
              <span className="text-sm">Dialogue</span>
            </button>
          </div>
        </div>
        
        <div className="pt-4 text-right">
          <Button className="flex items-center gap-2">
            <span>Continue</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WizardMode;
