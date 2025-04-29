/** @jsxImportSource react */
import * as React from 'react';

interface Step {
  title: string;
  description: string;
  component: React.ReactElement;
}

const createStep = (step: Step): Step => step;

export const promptSteps: Step[] = [
  createStep({
    title: 'Define Your Goal',
    description: 'What would you like to achieve with AI?',
    component: (
      <div className="space-y-4">
        <p className="text-[#2D3748]/80">
          Start by describing your objective in simple terms.
          <span className="block mt-2 text-[#A7C7E7]">
            Example: "I want to create engaging social media posts"
          </span>
        </p>
      </div>
    )
  }),
  createStep({
    title: 'Refine Parameters',
    description: 'Adjust settings for optimal results',
    component: (
      <div className="space-y-4">
        <p className="text-[#2D3748]/80">
          Customize temperature and creativity levels.
          <span className="block mt-2 text-[#A7C7E7]">
            Recommended: Medium creativity for balanced results
          </span>
        </p>
      </div>
    )
  }),
  createStep({
    title: 'Review & Generate',
    description: 'Finalize your prompt settings',
    component: (
      <div className="space-y-4">
        <p className="text-[#2D3748]/80">
          Verify your choices and generate the final prompt.
          <span className="block mt-2 text-[#A7C7E7]">
            You can always refine later
          </span>
        </p>
      </div>
    )
  })
];