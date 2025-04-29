import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { theme } from '../../styles/theme';

interface DetailsFormProps {
  onSubmit: (details: DetailsData) => void;
  mode: 'simple' | 'advanced';
}

interface DetailsData {
  topic: string;
  context: string;
  keywords: string[];
  constraints: string;
}

export const DetailsForm: React.FC<DetailsFormProps> = ({ onSubmit, mode }) => {
  const [formData, setFormData] = useState<DetailsData>({
    topic: '',
    context: '',
    keywords: [],
    constraints: '',
  });

  const [currentKeyword, setCurrentKeyword] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddKeyword = () => {
    if (currentKeyword.trim()) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, currentKeyword.trim()],
      }));
      setCurrentKeyword('');
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
          What's your topic?
        </label>
        <Input
          name="topic"
          value={formData.topic}
          onChange={handleInputChange}
          placeholder={mode === 'simple' ? 'e.g., Introduction to AI' : 'Enter your specific topic'}
          className="w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
          Provide some context
        </label>
        <Textarea
          name="context"
          value={formData.context}
          onChange={handleInputChange}
          placeholder={
            mode === 'simple'
              ? 'Tell us what you want to achieve...'
              : 'Describe your requirements in detail...'
          }
          className="w-full min-h-[100px]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
          Keywords
        </label>
        <div className="flex gap-2 mb-2">
          <Input
            value={currentKeyword}
            onChange={(e) => setCurrentKeyword(e.target.value)}
            placeholder="Add keywords"
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAddKeyword}
            variant="outline"
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-sm flex items-center gap-2"
              style={{
                backgroundColor: theme.colors.primaryLight,
                color: theme.colors.text,
              }}
            >
              {keyword}
              <button
                type="button"
                onClick={() => handleRemoveKeyword(index)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {mode === 'advanced' && (
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
            Additional Constraints
          </label>
          <Textarea
            name="constraints"
            value={formData.constraints}
            onChange={handleInputChange}
            placeholder="Any specific requirements or limitations..."
            className="w-full"
          />
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        style={{
          backgroundColor: theme.colors.primary,
          color: theme.colors.text,
        }}
      >
        Continue
      </Button>
    </motion.form>
  );
};
