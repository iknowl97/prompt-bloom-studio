
import React from 'react';

interface StepIndicatorProps {
  number: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

const StepIndicator = ({ number, title, isActive, isCompleted }: StepIndicatorProps) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
          ${isActive ? 'bg-primary-500 text-white' : 
          isCompleted ? 'bg-green-500 text-white' : 
          'bg-gray-200 text-gray-500'}`}
      >
        {isCompleted ? '✓' : number}
      </div>
      <span className={`text-xs ${isActive ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
        {title}
      </span>
    </div>
  );
};

export default StepIndicator;
