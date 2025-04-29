import { ArrowRight, Clock, Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { LearningModule } from '../../../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../../ui/Card';
import Button from '../../ui/Button';
import { formatTime } from '../../../lib/utils';

interface ModuleCardProps {
  module: LearningModule;
  progress?: number;
  onStart: (moduleId: string) => void;
  onContinue?: (moduleId: string) => void;
}

const ModuleCard = ({ module, progress = 0, onStart, onContinue }: ModuleCardProps) => {
  const isStarted = progress > 0;
  const isCompleted = progress === 100;

  const difficultyColors = {
    beginner: 'bg-success-100 text-success-700',
    intermediate: 'bg-warning-100 text-warning-700',
    expert: 'bg-error-100 text-error-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card variant="hover" className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>{module.title}</CardTitle>
          <CardDescription>{module.description}</CardDescription>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[module.difficulty]}`}>
              {module.difficulty}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center">
              <Clock size={12} className="mr-1" />
              {formatTime(module.estimatedTime)}
            </span>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <div className="flex items-center mb-2">
            <div className="text-sm font-medium">Progress</div>
            <div className="ml-auto text-sm text-gray-500">{progress}%</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${isCompleted ? 'bg-success-500' : 'bg-primary-500'}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">What you'll learn:</div>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              {module.content.slice(0, 3).map((content) => (
                <li key={content.id} className="truncate">
                  {content.type === 'text' && content.content.substring(0, 50)}
                  {content.type === 'video' && 'Video lesson'}
                  {content.type === 'code' && 'Code example'}
                  {content.type === 'image' && 'Visual explanation'}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-4">
          {isCompleted ? (
            <div className="w-full flex items-center justify-center text-success-500 gap-2">
              <Award size={20} />
              <span className="font-medium">Completed</span>
            </div>
          ) : isStarted ? (
            <Button
              variant="primary"
              className="w-full"
              rightIcon={<ArrowRight size={16} />}
              onClick={() => onContinue?.(module.id)}
            >
              Continue Learning
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              rightIcon={<BookOpen size={16} />}
              onClick={() => onStart(module.id)}
            >
              Start Learning
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ModuleCard;