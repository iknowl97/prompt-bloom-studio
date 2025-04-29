import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit, GripVertical, Settings } from 'lucide-react';
import { PromptBlock as PromptBlockType } from '../../../types';
import Button from '../../ui/Button';

interface PromptBlockProps {
  block: PromptBlockType;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const getBlockColor = (type: string) => {
  switch (type) {
    case 'text':
      return 'border-blue-200 bg-blue-50';
    case 'variable':
      return 'border-purple-200 bg-purple-50';
    case 'condition':
      return 'border-amber-200 bg-amber-50';
    case 'loop':
      return 'border-emerald-200 bg-emerald-50';
    case 'comment':
      return 'border-gray-200 bg-gray-50';
    default:
      return 'border-gray-200 bg-white';
  }
};

const getBlockIcon = (type: string) => {
  switch (type) {
    case 'text':
      return '💬';
    case 'variable':
      return '🔄';
    case 'condition':
      return '⚙️';
    case 'loop':
      return '🔁';
    case 'comment':
      return '📝';
    default:
      return '📄';
  }
};

const PromptBlock = ({ block, onDelete, onEdit }: PromptBlockProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className={`relative rounded-md border-2 p-3 mb-3 shadow-sm ${getBlockColor(block.type)}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start">
        <div className="mr-2 mt-1 cursor-grab">
          <GripVertical size={16} className="text-gray-400" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <span className="mr-2">{getBlockIcon(block.type)}</span>
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {block.type}
            </span>
          </div>
          
          <div className="block-content">
            {block.type === 'comment' ? (
              <p className="text-gray-500 italic">{block.content}</p>
            ) : (
              <p>{block.content}</p>
            )}
          </div>
          
          {block.settings && Object.keys(block.settings).length > 0 && (
            <div className="mt-2 text-xs bg-white bg-opacity-50 p-2 rounded">
              <div className="flex items-center">
                <Settings size={12} className="mr-1 text-gray-500" />
                <span className="font-medium text-gray-600">Settings</span>
              </div>
              <div className="mt-1 grid grid-cols-2 gap-1">
                {Object.entries(block.settings).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-gray-500">{key}:</span>{' '}
                    <span className="text-gray-700">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute right-2 top-2 flex space-x-1"
        >
          <Button
            size="sm"
            variant="ghost"
            className="p-1.5"
            onClick={() => onEdit(block.id)}
            aria-label="Edit block"
          >
            <Edit size={14} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="p-1.5 text-error-500 hover:bg-error-50"
            onClick={() => onDelete(block.id)}
            aria-label="Delete block"
          >
            <Trash2 size={14} />
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PromptBlock;