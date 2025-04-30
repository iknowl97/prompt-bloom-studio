
import React, { useState } from 'react';
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
                <span className="text-gray-400">≡</span>
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

export default DesignerMode;
