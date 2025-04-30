
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
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-md transition-all duration-300 ${
          isActive 
            ? 'bg-[#A7C7E7] text-[#2D3748] scale-110' 
            : isCompleted 
              ? 'bg-[#C8E6C9] text-[#2D3748]' 
              : 'bg-[#FFE5E5] text-[#2D3748] opacity-70'
        }`}
      >
        {isCompleted ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <span className="text-lg font-bold">{number}</span>
        )}
      </div>
      <span 
        className={`text-sm ${
          isActive 
            ? 'text-[#2D3748] font-medium' 
            : 'text-[#2D3748]/70'
        } transition-all duration-300`}
      >
        {title}
      </span>
    </div>
  );
};

export default StepIndicator;
