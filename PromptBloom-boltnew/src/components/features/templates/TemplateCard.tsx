import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Bookmark, BookmarkCheck, Users, Copy } from 'lucide-react';
import { Template } from '../../../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../../ui/Card';
import Button from '../../ui/Button';
import { truncateText } from '../../../lib/utils';

interface TemplateCardProps {
  template: Template;
  onUse: (template: Template) => void;
  onSave: (template: Template) => void;
  isSaved?: boolean;
}

const TemplateCard = ({ template, onUse, onSave, isSaved = false }: TemplateCardProps) => {
  const [saved, setSaved] = useState(isSaved);

  const difficultyColors = {
    beginner: 'bg-success-100 text-success-700',
    intermediate: 'bg-warning-100 text-warning-700',
    expert: 'bg-error-100 text-error-700',
  };

  const handleSave = () => {
    setSaved(!saved);
    onSave(template);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{truncateText(template.description, 100)}</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="p-1.5"
              onClick={handleSave}
              aria-label={saved ? 'Unsave template' : 'Save template'}
            >
              {saved ? (
                <BookmarkCheck className="h-5 w-5 text-primary-500" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[template.difficulty]}`}>
              {template.difficulty}
            </span>
            {template.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
              >
                {tag}
              </span>
            ))}
            {template.tags.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                +{template.tags.length - 3} more
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="mt-2 text-xs text-gray-500">
            Example prompt:
          </div>
          <div className="mt-1 font-mono text-xs bg-gray-50 p-2 rounded border border-gray-200 max-h-24 overflow-hidden">
            {truncateText(template.examples[0]?.promptText || 'No example available', 150)}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-amber-400 mr-1" />
              <span>{template.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{template.usageCount}</span>
            </div>
          </div>
          <Button
            size="sm"
            variant="primary"
            leftIcon={<Copy size={15} />}
            onClick={() => onUse(template)}
          >
            Use Template
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TemplateCard;