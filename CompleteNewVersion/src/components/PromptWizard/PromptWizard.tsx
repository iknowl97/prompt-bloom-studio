import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { theme } from '../../styles/theme';
import { PurposeSelector } from './PurposeSelector';
import { DetailsForm } from './DetailsForm';
import { StyleSelector } from './StyleSelector';
import { PromptReview } from './PromptReview';
import type { StyleOptions } from './StyleSelector';

interface WizardStep {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
}

interface PromptWizardProps {
  onComplete: (data: any) => void;
  mode: 'simple' | 'advanced';
}

export const PromptWizard: React.FC<PromptWizardProps> = ({ onComplete, mode }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<{
    purpose: string;
    topic: string;
    context: string;
    keywords: string[];
    constraints?: string;
    tone: string;
    formality: number;
    creativity: number;
    detail: number;
  }>({ 
    purpose: '',
    topic: '',
    context: '',
    keywords: [],
    tone: '',
    formality: 50,
    creativity: 50,
    detail: 50
  });

  const handleEdit = (stepId: string) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    setCurrentStepIndex(stepIndex);
  };

  const steps: WizardStep[] = [
    {
      id: 'purpose',
      title: 'What do you want to create?',
      description: 'Choose the type of content you want to generate',
      component: <PurposeSelector onSelect={(purpose) => updateFormData('purpose', purpose)} />,
    },
    {
      id: 'details',
      title: 'Tell us more',
      description: 'Provide specific details about your request',
      component: <DetailsForm mode={mode} onSubmit={(details) => updateFormData('details', details)} />,
    },
    {
      id: 'style',
      title: 'Style and tone',
      description: 'How should your content sound?',
      component: <StyleSelector onSelect={(style) => updateFormData('style', style)} />,
    },
    {
      id: 'review',
      title: 'Review and customize',
      description: 'Fine-tune your prompt before generating',
      component: <PromptReview data={formData} onEdit={handleEdit} />,
    },
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {steps[currentStepIndex].title}
        </h2>
        <p className="text-gray-600">{steps[currentStepIndex].description}</p>
      </div>

      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {steps[currentStepIndex].component}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStepIndex === 0}
        >
          Previous
        </Button>
        <Button
          onClick={nextStep}
        >
          {currentStepIndex === steps.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>

      <div className="mt-4">
        <div className="flex gap-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`h-2 flex-1 rounded-full ${
                index <= currentStepIndex
                  ? 'bg-primary'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};


