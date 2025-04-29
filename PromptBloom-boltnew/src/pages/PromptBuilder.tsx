import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import PromptBlock from '../components/features/prompt-builder/PromptBlock';
import PromptToolbar from '../components/features/prompt-builder/PromptToolbar';
import PromptPreview from '../components/features/prompt-builder/PromptPreview';
import { PromptBlock as PromptBlockType, BlockType } from '../types';
import { generateId } from '../lib/utils';

const PromptBuilder = () => {
  const [promptName, setPromptName] = useState('');
  const [promptDescription, setPromptDescription] = useState('');
  const [blocks, setBlocks] = useState<PromptBlockType[]>([]);
  
  const handleAddBlock = (type: BlockType) => {
    const newBlock: PromptBlockType = {
      id: generateId(),
      type,
      content: '',
      position: blocks.length,
      settings: type === 'condition' ? { condition: '' } : 
               type === 'loop' ? { loopVariable: '' } : 
               undefined
    };
    
    setBlocks([...blocks, newBlock]);
  };
  
  const handleDeleteBlock = (id: string) => {
    const updatedBlocks = blocks.filter(block => block.id !== id);
    // Recalculate positions
    const reorderedBlocks = updatedBlocks.map((block, index) => ({
      ...block,
      position: index
    }));
    setBlocks(reorderedBlocks);
  };
  
  const handleEditBlock = (id: string) => {
    // In a real app, this would open a modal or inline editor
    // For this demo, we'll just update the content with some placeholder text
    setBlocks(blocks.map(block => 
      block.id === id
        ? { 
            ...block, 
            content: block.type === 'text' ? 'Updated text content' : 
                    block.type === 'variable' ? 'user_input' :
                    block.type === 'condition' ? 'condition is true' :
                    block.type === 'loop' ? 'item in list' :
                    'This is a comment'
          }
        : block
    ));
  };
  
  const handleSave = () => {
    // In a real app, this would save to a database
    console.log('Saving prompt:', { name: promptName, description: promptDescription, blocks });
    alert('Prompt saved successfully!');
  };
  
  const handleExport = () => {
    // In a real app, this would export to JSON or other formats
    const promptData = {
      name: promptName,
      description: promptDescription,
      blocks
    };
    
    const dataStr = JSON.stringify(promptData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${promptName || 'prompt'}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  const handleImport = () => {
    // In a real app, this would open a file dialog
    alert('Import functionality would be implemented here');
  };
  
  const handleTestPrompt = () => {
    // In a real app, this would send the prompt to an AI model
    alert('Test functionality would be implemented here');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="md:w-8/12 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold mb-6">Prompt Builder</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Prompt Name"
                  placeholder="Enter a name for your prompt"
                  value={promptName}
                  onChange={(e) => setPromptName(e.target.value)}
                />
                <Input
                  label="Tags"
                  placeholder="Enter tags separated by commas"
                />
              </div>
              <div className="mb-4">
                <Input
                  label="Description"
                  placeholder="Describe what this prompt does"
                  value={promptDescription}
                  onChange={(e) => setPromptDescription(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
          
          <PromptToolbar 
            onAddBlock={handleAddBlock}
            onSave={handleSave}
            onExport={handleExport}
            onImport={handleImport}
          />
          
          <div className="bg-gray-50 p-4 rounded-lg min-h-[400px] border border-dashed border-gray-300">
            {blocks.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-xl mb-2">Your prompt is empty</p>
                <p>Add blocks using the toolbar above to start building</p>
              </div>
            ) : (
              <div>
                {blocks.map((block) => (
                  <PromptBlock
                    key={block.id}
                    block={block}
                    onDelete={handleDeleteBlock}
                    onEdit={handleEditBlock}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="md:w-4/12 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <PromptPreview 
              blocks={blocks}
              onTestPrompt={handleTestPrompt}
            />
            
            <div className="mt-6 bg-white border rounded-lg shadow-sm p-4">
              <h3 className="font-medium mb-3">Tips for Good Prompts</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start">
                  <span className="inline-block bg-primary-100 text-primary-600 rounded-full p-1 mr-2">✓</span>
                  <span>Be specific about your desired output format</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-primary-100 text-primary-600 rounded-full p-1 mr-2">✓</span>
                  <span>Use variables for dynamic content</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-primary-100 text-primary-600 rounded-full p-1 mr-2">✓</span>
                  <span>Provide context or examples when needed</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-primary-100 text-primary-600 rounded-full p-1 mr-2">✓</span>
                  <span>Keep instructions clear and unambiguous</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PromptBuilder;