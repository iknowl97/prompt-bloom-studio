
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Wand2 } from 'lucide-react';
import StepIndicator from '../components/features/prompt-builder/StepIndicator';
import DesignerMode from '../components/features/prompt-builder/DesignerMode';
import WizardMode from '../components/features/prompt-builder/WizardMode';
import SidebarSuggestions from '../components/features/prompt-builder/SidebarSuggestions';

// Main component
const CustomPromptBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mode, setMode] = useState<'designer' | 'wizard'>('designer');
  
  const steps = [
    { number: 1, title: 'Create' },
    { number: 2, title: 'Test' },
    { number: 3, title: 'Refine' },
    { number: 4, title: 'Save' },
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-6">Custom Prompt Builder</h1>
          
          {/* Steps indicator */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
            
            {steps.map((step) => (
              <StepIndicator
                key={step.number}
                number={step.number}
                title={step.title}
                isActive={currentStep === step.number}
                isCompleted={currentStep > step.number}
              />
            ))}
          </div>
          
          {/* Mode selector */}
          <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
            <div className="flex">
              <button
                onClick={() => setMode('designer')}
                className={`flex-1 py-3 px-4 flex justify-center items-center gap-2 rounded-md ${
                  mode === 'designer' ? 'bg-primary-50 text-primary-600 border border-primary-200' : ''
                }`}
              >
                <LayoutGrid size={20} />
                <span>Designer Mode</span>
              </button>
              <button
                onClick={() => setMode('wizard')}
                className={`flex-1 py-3 px-4 flex justify-center items-center gap-2 rounded-md ${
                  mode === 'wizard' ? 'bg-primary-50 text-primary-600 border border-primary-200' : ''
                }`}
              >
                <Wand2 size={20} />
                <span>Wizard Mode</span>
              </button>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {mode === 'designer' ? <DesignerMode /> : <WizardMode />}
            </div>
            
            <div>
              <SidebarSuggestions />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomPromptBuilder;
