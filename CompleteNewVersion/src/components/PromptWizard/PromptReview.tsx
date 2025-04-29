import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { theme } from '../../styles/theme';

interface PromptReviewProps {
  data: {
    purpose: string;
    topic: string;
    context: string;
    keywords: string[];
    constraints?: string;
    tone: string;
    formality: number;
    creativity: number;
    detail: number;
  };
  onEdit: (stepId: string) => void;
}

export const PromptReview: React.FC<PromptReviewProps> = ({ data, onEdit }) => {
  const formatValue = (value: number) => {
    if (value <= 33) return 'Low';
    if (value <= 66) return 'Medium';
    return 'High';
  };

  const sections = [
    {
      id: 'purpose',
      title: 'Purpose',
      content: data.purpose,
      icon: '🎯',
    },
    {
      id: 'details',
      title: 'Details',
      content: (
        <div>
          <p className="font-medium">Topic:</p>
          <p className="mb-2">{data.topic}</p>
          <p className="font-medium">Context:</p>
          <p className="mb-2">{data.context}</p>
          {data.constraints && (
            <>
              <p className="font-medium">Constraints:</p>
              <p>{data.constraints}</p>
            </>
          )}
        </div>
      ),
      icon: '📝',
    },
    {
      id: 'keywords',
      title: 'Keywords',
      content: (
        <div className="flex flex-wrap gap-2">
          {data.keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-full text-sm"
              style={{
                backgroundColor: theme.colors.primaryLight,
                color: theme.colors.text,
              }}
            >
              {keyword}
            </span>
          ))}
        </div>
      ),
      icon: '🏷️',
    },
    {
      id: 'style',
      title: 'Style & Tone',
      content: (
        <div className="space-y-2">
          <p>
            <span className="font-medium">Tone:</span> {data.tone}
          </p>
          <p>
            <span className="font-medium">Formality:</span>{' '}
            {formatValue(data.formality)}
          </p>
          <p>
            <span className="font-medium">Creativity:</span>{' '}
            {formatValue(data.creativity)}
          </p>
          <p>
            <span className="font-medium">Detail Level:</span>{' '}
            {formatValue(data.detail)}
          </p>
        </div>
      ),
      icon: '✨',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  <div>
                    <h3 className="font-medium mb-2" style={{ color: theme.colors.text }}>
                      {section.title}
                    </h3>
                    <div className="text-gray-600">{section.content}</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(section.id)}
                  className="text-primary hover:text-primary-dark"
                >
                  Edit
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="p-4 rounded-lg" style={{ backgroundColor: theme.colors.accentLight }}>
        <h4 className="font-medium mb-2" style={{ color: theme.colors.text }}>
          Generated Prompt Preview
        </h4>
        <p className="text-gray-700">
          Create {data.purpose} content about {data.topic}. {data.context}{' '}
          {data.constraints && `Consider these constraints: ${data.constraints}.`} Use a{' '}
          {data.tone} tone with {formatValue(data.formality).toLowerCase()} formality,{' '}
          {formatValue(data.creativity).toLowerCase()} creativity, and{' '}
          {formatValue(data.detail).toLowerCase()} detail level.
          {data.keywords.length > 0 &&
            ` Include these key concepts: ${data.keywords.join(', ')}.`}
        </p>
      </div>
    </div>
  );
};
