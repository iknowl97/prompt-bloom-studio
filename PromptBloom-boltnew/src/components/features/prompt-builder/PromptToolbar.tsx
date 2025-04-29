import { PlusCircle, Type, Variable, Brackets as BracketsSquare, IterationCcw, MessageSquare, Save, Download, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../ui/Button';
import { BlockType } from '../../../types';

interface PromptToolbarProps {
  onAddBlock: (type: BlockType) => void;
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
}

const PromptToolbar = ({ onAddBlock, onSave, onExport, onImport }: PromptToolbarProps) => {
  const blockTypes: Array<{ type: BlockType; label: string; icon: React.ReactNode; description: string }> = [
    { 
      type: 'text', 
      label: 'Text', 
      icon: <Type size={16} />, 
      description: 'Regular text content' 
    },
    { 
      type: 'variable', 
      label: 'Variable', 
      icon: <Variable size={16} />, 
      description: 'Dynamic values or placeholders' 
    },
    { 
      type: 'condition', 
      label: 'Condition', 
      icon: <BracketsSquare size={16} />, 
      description: 'Conditional logic (if/then)' 
    },
    { 
      type: 'loop', 
      label: 'Loop', 
      icon: <IterationCcw size={16} />, 
      description: 'Repeating content patterns' 
    },
    { 
      type: 'comment', 
      label: 'Comment', 
      icon: <MessageSquare size={16} />, 
      description: 'Notes (not included in final prompt)' 
    },
  ];

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-wrap items-center -m-1">
        <div className="p-1">
          <span className="font-medium text-sm mr-2">Add:</span>
        </div>
        
        {blockTypes.map((blockType) => (
          <motion.div 
            key={blockType.type}
            className="p-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="sm"
              variant="ghost"
              className="border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              leftIcon={blockType.icon}
              onClick={() => onAddBlock(blockType.type)}
              title={blockType.description}
            >
              {blockType.label}
            </Button>
          </motion.div>
        ))}
        
        <div className="flex-grow"></div>
        
        <div className="p-1">
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<Upload size={16} />}
            onClick={onImport}
            className="border border-gray-200"
          >
            Import
          </Button>
        </div>
        
        <div className="p-1">
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<Download size={16} />}
            onClick={onExport}
            className="border border-gray-200"
          >
            Export
          </Button>
        </div>
        
        <div className="p-1">
          <Button
            size="sm"
            variant="primary"
            leftIcon={<Save size={16} />}
            onClick={onSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromptToolbar;