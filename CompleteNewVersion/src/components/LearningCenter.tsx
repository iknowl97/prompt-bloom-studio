import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function LearningCenter() {
  return (
    <Card className="p-6 bg-[#FAFAFA] border-[#FFE5E5] mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-[#2D3748]">AI Learning Center</h2>
      
      <Accordion type="single" collapsible>
        <AccordionItem value="basics">
          <AccordionTrigger className="text-[#2D3748] hover:text-[#A7C7E7]">
            AI Basics
          </AccordionTrigger>
          <AccordionContent className="text-[#2D3748]/80">
            <div className="space-y-4">
              <p>Learn fundamental concepts through interactive examples:</p>
              <div className="p-4 rounded-lg bg-[#FFE5E5]/30">
                <h4 className="font-medium mb-2 text-[#A7C7E7]">Example Interaction</h4>
                <p>"Explain machine learning like I'm 10" → "ML is like teaching a robot to recognize patterns!"</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tutorials">
          <AccordionTrigger className="text-[#2D3748] hover:text-[#A7C7E7]">
            Interactive Tutorials
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-[#FFE5E5]/20 border-[#A7C7E7]">
                <h3 className="font-medium mb-2">Prompt Structure 101</h3>
                <p className="text-sm">Learn to craft effective prompts</p>
              </Card>
              <Card className="p-4 bg-[#FFE5E5]/20 border-[#A7C7E7]">
                <h3 className="font-medium mb-2">Advanced Techniques</h3>
                <p className="text-sm">Master temperature controls</p>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}