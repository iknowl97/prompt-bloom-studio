import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

type Step = {
  title: string
  description: string
  component: React.ReactNode
}

export function Wizard({
  steps,
  currentStep,
  onStepChange,
  onComplete,
}: {
  steps: Step[]
  currentStep: number
  onStepChange: (step: number) => void
  onComplete: () => void
}) {
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <Card className="p-4 md:p-6 space-y-4 md:space-y-6 bg-background border-accent">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-foreground">
        <span className="font-medium">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-muted-foreground text-sm md:text-base">{steps[currentStep].title}</span>
      </div>

      <div className="space-y-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          {steps[currentStep].title}
        </h3>
        <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
        {steps[currentStep].component}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => onStepChange(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="text-[#2D3748] border-[#A7C7E7] hover:bg-[#A7C7E7]/20"
        >
          Previous
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button
            onClick={() => onStepChange(currentStep + 1)}
            className="bg-[#C8E6C9] text-[#2D3748] hover:bg-[#C8E6C9]/90"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={onComplete}
            className="bg-[#C8E6C9] text-[#2D3748] hover:bg-[#C8E6C9]/90"
          >
            Complete
          </Button>
        )}
      </div>
    </Card>
  )
}