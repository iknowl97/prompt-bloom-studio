export const PROMPT_STEPS = [
  {
    title: 'Objective Setting',
    description: 'Define the core purpose of your prompt',
    fields: ['primaryGoal', 'secondaryConsiderations'],
    validation: (values) => !!values.primaryGoal
  },
  {
    title: 'Tone & Style',
    description: 'Establish communication guidelines',
    fields: ['tone', 'formalityLevel', 'creativeDirection'],
    validation: (values) => !!values.tone && !!values.formalityLevel
  },
  {
    title: 'Validation',
    description: 'Set quality assurance parameters',
    fields: ['successMetrics', 'boundaryConditions'],
    validation: (values) => !!values.successMetrics
  }
];

export const usePromptBuilder = () => {
  const [promptData, setPromptData] = React.useState({});
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleStepComplete = (stepData) => {
    setPromptData(prev => ({
      ...prev,
      ...stepData
    }));
    setCurrentStep(prev => prev + 1);
  };

  return {
    promptData,
    currentStep,
    handleStepComplete,
    isFinalStep: currentStep === PROMPT_STEPS.length - 1
  };
};