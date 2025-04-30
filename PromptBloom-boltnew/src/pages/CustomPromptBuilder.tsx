
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Wand2, Sparkles } from 'lucide-react';
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
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A7C7E7]/10 text-[#2D3748] text-sm font-medium mb-3">
              <Sparkles size={16} className="text-[#A7C7E7]" />
              <span>AI-Powered Prompt Engineering</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4">Custom Prompt Builder</h1>
            <p className="text-[#2D3748]/70 max-w-2xl mx-auto">
              Create powerful, effective prompts for any AI model using our intuitive interface. 
              Mix and match components or let our wizard guide you step-by-step.
            </p>
          </div>
          
          {/* Steps indicator */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-[#FAFAFA] -z-10"></div>
            
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
          <motion.div 
            className="bg-white p-4 rounded-xl shadow-sm border border-[#A7C7E7]/30 mb-8"
            whileHover={{ boxShadow: '0 8px 30px rgba(167, 199, 231, 0.2)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex">
              <button
                onClick={() => setMode('designer')}
                className={`flex-1 py-3.5 px-4 flex justify-center items-center gap-2 rounded-lg transition-all ${
                  mode === 'designer' 
                    ? 'bg-[#A7C7E7]/10 text-[#2D3748] border border-[#A7C7E7]/30' 
                    : 'hover:bg-[#FAFAFA] text-[#2D3748]/70'
                }`}
              >
                <LayoutGrid size={18} />
                <span>Designer Mode</span>
              </button>
              <button
                onClick={() => setMode('wizard')}
                className={`flex-1 py-3.5 px-4 flex justify-center items-center gap-2 rounded-lg transition-all ${
                  mode === 'wizard' 
                    ? 'bg-[#FFE5E5]/10 text-[#2D3748] border border-[#FFE5E5]/30' 
                    : 'hover:bg-[#FAFAFA] text-[#2D3748]/70'
                }`}
              >
                <Wand2 size={18} />
                <span>Wizard Mode</span>
              </button>
            </div>
          </motion.div>
          
          {/* Main content area */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {mode === 'designer' ? <DesignerMode /> : <WizardMode />}
              </motion.div>
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
