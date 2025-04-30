
import React, { useState } from 'react';
import { PlusCircle, Trash2, ArrowUp, ArrowDown, GripVertical, Code, Text } from 'lucide-react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

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
      <div className="bg-white p-6 rounded-xl shadow-sm border border-[#A7C7E7]/30 hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xl font-bold text-[#2D3748] mb-1">Prompt Designer</h3>
            <p className="text-[#2D3748]/70 text-sm">
              Build your prompt by adding, arranging, and customizing blocks
            </p>
          </div>
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-[#A7C7E7]"></div>
            <div className="h-3 w-3 rounded-full bg-[#FFE5E5]"></div>
            <div className="h-3 w-3 rounded-full bg-[#C8E6C9]"></div>
          </div>
        </div>
        
        {/* Blocks container */}
        <div className="space-y-3 mb-6 max-h-96 overflow-y-auto pr-2 prompt-blocks">
          {promptBlocks.map((block, index) => (
            <div 
              key={index}
              className="flex items-start gap-2 p-4 bg-[#FAFAFA] border border-[#A7C7E7]/20 rounded-lg group hover:border-[#A7C7E7]/50 transition-all duration-300"
            >
              <div className="cursor-move p-1 text-[#2D3748]/40 mt-1">
                <GripVertical size={16} />
              </div>
              <div className="flex-1">
                <p className="text-[#2D3748]">{block}</p>
              </div>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => moveBlockUp(index)}
                  className={`p-1.5 rounded-md text-[#2D3748]/70 hover:bg-[#A7C7E7]/10 hover:text-[#2D3748] ${index === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={index === 0}
                >
                  <ArrowUp size={14} />
                </button>
                <button 
                  onClick={() => moveBlockDown(index)}
                  className={`p-1.5 rounded-md text-[#2D3748]/70 hover:bg-[#A7C7E7]/10 hover:text-[#2D3748] ${index === promptBlocks.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={index === promptBlocks.length - 1}
                >
                  <ArrowDown size={14} />
                </button>
                <button 
                  onClick={() => removeBlock(index)}
                  className="p-1.5 rounded-md text-[#2D3748]/70 hover:bg-[#FFE5E5]/30 hover:text-[#2D3748]"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add new block */}
        <div className="flex gap-2">
          <div className="flex-grow">
            <Input
              placeholder="Add a new prompt block..."
              value={newBlock}
              onChange={(e) => setNewBlock(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addBlock()}
              leftIcon={<Text size={16} />}
            />
          </div>
          <Button 
            onClick={addBlock} 
            className="bg-gradient-to-r from-[#A7C7E7] to-[#C8E6C9] text-[#2D3748] border-0 font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            <PlusCircle size={16} />
            <span>Add Block</span>
          </Button>
        </div>
        
        {/* Block suggestion buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button 
            onClick={() => setNewBlock("Use a [STYLE] tone of voice")}
            className="px-3 py-1.5 rounded-md bg-[#A7C7E7]/10 text-xs text-[#2D3748] border border-[#A7C7E7]/20 hover:bg-[#A7C7E7]/20 transition-colors duration-200"
          >
            Tone of Voice
          </button>
          <button 
            onClick={() => setNewBlock("Include [NUMBER] examples")}
            className="px-3 py-1.5 rounded-md bg-[#FFE5E5]/10 text-xs text-[#2D3748] border border-[#FFE5E5]/20 hover:bg-[#FFE5E5]/20 transition-colors duration-200"
          >
            Examples
          </button>
          <button 
            onClick={() => setNewBlock("Format the output as [FORMAT]")}
            className="px-3 py-1.5 rounded-md bg-[#C8E6C9]/10 text-xs text-[#2D3748] border border-[#C8E6C9]/20 hover:bg-[#C8E6C9]/20 transition-colors duration-200"
          >
            Output Format
          </button>
        </div>
      </div>
      
      {/* Preview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-[#A7C7E7]/30 hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xl font-bold text-[#2D3748] mb-1">Prompt Preview</h3>
            <p className="text-[#2D3748]/70 text-sm">See how your prompt looks all together</p>
          </div>
          <button className="p-2 rounded-lg bg-[#FAFAFA] hover:bg-[#A7C7E7]/10 text-[#2D3748]/70 hover:text-[#2D3748] transition-colors duration-200">
            <Code size={18} />
          </button>
        </div>
        <div className="bg-[#FAFAFA] p-5 rounded-lg border border-[#A7C7E7]/20">
          <p className="whitespace-pre-line text-[#2D3748] font-mono text-sm">
            {promptBlocks.join('\n\n')}
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <Button className="bg-gradient-to-r from-[#A7C7E7] to-[#C8E6C9] text-[#2D3748] border-0 font-medium shadow-sm hover:shadow-md transition-all duration-300">
            Copy to Clipboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignerMode;
