import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Slider } from '../ui/slider';
import { theme } from '../../styles/theme';

interface StyleSelectorProps {
  onSelect: (style: StyleOptions) => void;
}

export interface StyleOptions {
  tone: string;
  formality: number;
  creativity: number;
  detail: number;
}

interface ToneOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

const toneOptions: ToneOption[] = [
  {
    id: 'professional',
    label: 'Professional',
    description: 'Clear, authoritative, and business-appropriate',
    icon: '👔',
  },
  {
    id: 'casual',
    label: 'Casual',
    description: 'Friendly, relaxed, and conversational',
    icon: '😊',
  },
  {
    id: 'academic',
    label: 'Academic',
    description: 'Scholarly, analytical, and research-oriented',
    icon: '📚',
  },
  {
    id: 'creative',
    label: 'Creative',
    description: 'Imaginative, expressive, and artistic',
    icon: '🎨',
  },
];

export const StyleSelector: React.FC<StyleSelectorProps> = ({ onSelect }) => {
  const [selectedStyle, setSelectedStyle] = useState<StyleOptions>({
    tone: '',
    formality: 50,
    creativity: 50,
    detail: 50,
  });

  const handleToneSelect = (toneId: string) => {
    setSelectedStyle((prev) => ({
      ...prev,
      tone: toneId,
    }));
    onSelect({ ...selectedStyle, tone: toneId });
  };

  const handleSliderChange = (name: keyof StyleOptions, value: number) => {
    setSelectedStyle((prev) => ({
      ...prev,
      [name]: value,
    }));
    onSelect({ ...selectedStyle, [name]: value });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4" style={{ color: theme.colors.text }}>
          Select Tone
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toneOptions.map((tone) => (
            <motion.div
              key={tone.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all ${
                  selectedStyle.tone === tone.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleToneSelect(tone.id)}
                style={{
                  backgroundColor: selectedStyle.tone === tone.id
                    ? theme.colors.primaryLight
                    : theme.colors.background,
                }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{tone.icon}</span>
                  <div>
                    <h4 className="font-medium" style={{ color: theme.colors.text }}>
                      {tone.label}
                    </h4>
                    <p className="text-sm text-gray-600">{tone.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
            Formality Level
          </label>
          <Slider
            value={[selectedStyle.formality]}
            onValueChange={(value) => handleSliderChange('formality', value[0])}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Casual</span>
            <span>Formal</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
            Creativity Level
          </label>
          <Slider
            value={[selectedStyle.creativity]}
            onValueChange={(value) => handleSliderChange('creativity', value[0])}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Conservative</span>
            <span>Imaginative</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
            Detail Level
          </label>
          <Slider
            value={[selectedStyle.detail]}
            onValueChange={(value) => handleSliderChange('detail', value[0])}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Concise</span>
            <span>Detailed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
