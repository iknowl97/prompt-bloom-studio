
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutGrid, Sparkles, ListIcon, Wand2, FileText, Code, Settings, MessageCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

// Component for each step indicator
const StepIndicator = ({ number, title, isActive, isCompleted }: { 
  number: number; 
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
          ${isActive ? 'bg-primary-500 text-white' : 
          isCompleted ? 'bg-green-500 text-white' : 
          'bg-gray-200 text-gray-500'}`}
      >
        {isCompleted ? '✓' : number}
      </div>
      <span className={`text-xs ${isActive ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
        {title}
      </span>
    </div>
  );
};

// Designer mode component
const DesignerMode = () => {
  const [promptBlocks, setPromptBlocks] = useState<string[]>([
    'As an AI assistant specializing in [DOMAIN]',
    'Please help me with [TASK]',
    'The output should be [FORMAT]',
  ]);
  const [newBlock, setNewBlock] = useState('');
  
  const addBlock = () => {
    if (newBlock.trim()) {
      setPromptBlocks([...promptBlocks, newBlock.trim()]);
      setNewBlock('');
    }
  };
  
  const removeBlock = (index: number) => {
    setPromptBlocks(promptBlocks.filter((_, i) => i !== index));
  };
  
  const moveBlockUp = (index: number) => {
    if (index > 0) {
      const newBlocks = [...promptBlocks];
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
      setPromptBlocks(newBlocks);
    }
  };
  
  const moveBlockDown = (index: number) => {
    if (index < promptBlocks.length - 1) {
      const newBlocks = [...promptBlocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      setPromptBlocks(newBlocks);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-bold mb-4">Prompt Designer</h3>
        <p className="text-gray-600 mb-6">
          Build your prompt by adding, arranging, and customizing blocks.
        </p>
        
        {/* Blocks container */}
        <div className="space-y-3 mb-6">
          {promptBlocks.map((block, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md group"
            >
              <div className="cursor-move p-1 text-gray-400">
                <ListIcon size={16} />
              </div>
              <div className="flex-1">
                <p>{block}</p>
              </div>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => moveBlockUp(index)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                  disabled={index === 0}
                >
                  ↑
                </button>
                <button 
                  onClick={() => moveBlockDown(index)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                  disabled={index === promptBlocks.length - 1}
                >
                  ↓
                </button>
                <button 
                  onClick={() => removeBlock(index)}
                  className="p-1 text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add new block */}
        <div className="flex gap-2">
          <Input
            placeholder="Add a new prompt block..."
            value={newBlock}
            onChange={(e) => setNewBlock(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addBlock()}
          />
          <Button onClick={addBlock}>Add</Button>
        </div>
      </div>
      
      {/* Preview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-bold mb-4">Prompt Preview</h3>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <p className="whitespace-pre-line">
            {promptBlocks.join('\n\n')}
          </p>
        </div>
      </div>
    </div>
  );
};

// Wizard mode component
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

// Main component
const CustomPromptBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mode, setMode] = useState<'designer' | 'wizard'>('designer');
  
  const steps = [
    { number: 1, title: 'Create' },
    { number: 2, title: 'Test' },
    { number: 3, title: 'Refine' },
    { number: 4, title: 'Save' },
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-6">Custom Prompt Builder</h1>
          
          {/* Steps indicator */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
            
            {steps.map((step) => (
              <StepIndicator
                key={step.number}
                number={step.number}
                title={step.title}
                isActive={currentStep === step.number}
                isCompleted={currentStep > step.number}
              />
            ))}
          </div>
          
          {/* Mode selector */}
          <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
            <div className="flex">
              <button
                onClick={() => setMode('designer')}
                className={`flex-1 py-3 px-4 flex justify-center items-center gap-2 rounded-md ${
                  mode === 'designer' ? 'bg-primary-50 text-primary-600 border border-primary-200' : ''
                }`}
              >
                <LayoutGrid size={20} />
                <span>Designer Mode</span>
              </button>
              <button
                onClick={() => setMode('wizard')}
                className={`flex-1 py-3 px-4 flex justify-center items-center gap-2 rounded-md ${
                  mode === 'wizard' ? 'bg-primary-50 text-primary-600 border border-primary-200' : ''
                }`}
              >
                <Wand2 size={20} />
                <span>Wizard Mode</span>
              </button>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {mode === 'designer' ? <DesignerMode /> : <WizardMode />}
            </div>
            
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomPromptBuilder;
