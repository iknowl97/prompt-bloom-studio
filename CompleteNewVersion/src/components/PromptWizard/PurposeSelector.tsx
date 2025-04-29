import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { theme } from '../../styles/theme';

interface PurposeSelectorProps {
  onSelect: (purpose: string) => void;
}

interface PurposeOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  examples: string[];
}

const purposeOptions: PurposeOption[] = [
  {
    id: 'writing',
    title: 'Writing Assistant',
    description: 'Create blog posts, articles, or creative writing',
    icon: '✍️',
    examples: ['Blog post about AI', 'Creative story', 'Product description'],
  },
  {
    id: 'analysis',
    title: 'Analysis & Insights',
    description: 'Analyze data or extract insights from text',
    icon: '📊',
    examples: ['Market research', 'Data interpretation', 'Text analysis'],
  },
  {
    id: 'creative',
    title: 'Creative Projects',
    description: 'Generate ideas, art descriptions, or creative concepts',
    icon: '🎨',
    examples: ['Art prompt', 'Story ideas', 'Design concepts'],
  },
  {
    id: 'coding',
    title: 'Code Assistant',
    description: 'Get help with coding and programming tasks',
    icon: '💻',
    examples: ['Code review', 'Bug fixing', 'Code explanation'],
  },
];

export const PurposeSelector: React.FC<PurposeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {purposeOptions.map((option) => (
        <motion.div
          key={option.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelect(option.id)}
            style={{
              borderColor: theme.colors.primary,
              backgroundColor: theme.colors.background,
            }}
          >
            <div className="flex items-start space-x-4">
              <span className="text-3xl">{option.icon}</span>
              <div>
                <h3 className="font-semibold text-lg mb-1" style={{ color: theme.colors.text }}>
                  {option.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{option.description}</p>
                <div className="flex flex-wrap gap-2">
                  {option.examples.map((example) => (
                    <span
                      key={example}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: theme.colors.secondaryLight,
                        color: theme.colors.text,
                      }}
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
