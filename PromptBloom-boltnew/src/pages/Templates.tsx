import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import TemplateCard from '../components/features/templates/TemplateCard';
import { Template } from '../types';

// Mock data for templates
const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Creative Story Generator',
    description: 'Generate creative and engaging short stories based on a few key inputs like setting, character, and theme.',
    category: 'Creative Writing',
    difficulty: 'beginner',
    blocks: [
      { id: '1-1', type: 'text', content: 'Write a short story about', position: 0 },
      { id: '1-2', type: 'variable', content: 'character', position: 1 },
      { id: '1-3', type: 'text', content: 'in a', position: 2 },
      { id: '1-4', type: 'variable', content: 'setting', position: 3 },
      { id: '1-5', type: 'text', content: 'with the theme of', position: 4 },
      { id: '1-6', type: 'variable', content: 'theme', position: 5 },
    ],
    examples: [
      {
        id: '1-ex-1',
        title: 'Mystery in Paris',
        promptText: 'Write a short story about a detective in a Parisian cafe with the theme of betrayal',
        response: 'The rain pattered against the windows of Café Lumière as Detective Moreau sipped his espresso...'
      }
    ],
    tags: ['creative', 'story', 'writing', 'fiction'],
    rating: 4.8,
    usageCount: 3572
  },
  {
    id: '2',
    name: 'Technical Documentation',
    description: 'Create clear and comprehensive technical documentation for your code, API, or product features.',
    category: 'Technical Writing',
    difficulty: 'intermediate',
    blocks: [
      { id: '2-1', type: 'text', content: 'Write technical documentation for', position: 0 },
      { id: '2-2', type: 'variable', content: 'feature_name', position: 1 },
      { id: '2-3', type: 'text', content: 'Include sections for overview, setup instructions, API reference, and examples.', position: 2 },
    ],
    examples: [
      {
        id: '2-ex-1',
        title: 'Authentication API Docs',
        promptText: 'Write technical documentation for user authentication API. Include sections for overview, setup instructions, API reference, and examples.',
        response: '# User Authentication API\n\n## Overview\nThe Authentication API provides secure user authentication...'
      }
    ],
    tags: ['technical', 'documentation', 'api', 'reference'],
    rating: 4.6,
    usageCount: 2891
  },
  {
    id: '3',
    name: 'Data Analysis Report',
    description: 'Generate comprehensive data analysis reports with insights, visualizations, and recommendations.',
    category: 'Data & Analytics',
    difficulty: 'expert',
    blocks: [
      { id: '3-1', type: 'text', content: 'Create a data analysis report for', position: 0 },
      { id: '3-2', type: 'variable', content: 'dataset_name', position: 1 },
      { id: '3-3', type: 'text', content: 'with a focus on', position: 2 },
      { id: '3-4', type: 'variable', content: 'analysis_focus', position: 3 },
      { id: '3-5', type: 'text', content: 'Include data summary, key findings, visualizations, and actionable recommendations.', position: 4 },
    ],
    examples: [
      {
        id: '3-ex-1',
        title: 'E-commerce Sales Analysis',
        promptText: 'Create a data analysis report for Q3 e-commerce sales data with a focus on customer behavior patterns. Include data summary, key findings, visualizations, and actionable recommendations.',
        response: '# Q3 E-commerce Sales Analysis: Customer Behavior Patterns\n\n## Executive Summary\nThis analysis explores customer behavior...'
      }
    ],
    tags: ['data', 'analysis', 'report', 'analytics'],
    rating: 4.9,
    usageCount: 1845
  },
  {
    id: '4',
    name: 'Product Description',
    description: 'Create compelling and informative product descriptions for e-commerce or marketing materials.',
    category: 'Marketing',
    difficulty: 'beginner',
    blocks: [
      { id: '4-1', type: 'text', content: 'Write a product description for', position: 0 },
      { id: '4-2', type: 'variable', content: 'product_name', position: 1 },
      { id: '4-3', type: 'text', content: 'which is a', position: 2 },
      { id: '4-4', type: 'variable', content: 'product_category', position: 3 },
      { id: '4-5', type: 'text', content: 'Highlight its key features, benefits, and why customers should buy it.', position: 4 },
    ],
    examples: [
      {
        id: '4-ex-1',
        title: 'Wireless Headphones Description',
        promptText: 'Write a product description for SoundWave X7 which is a wireless headphone. Highlight its key features, benefits, and why customers should buy it.',
        response: '# SoundWave X7 Wireless Headphones\n\nExperience audio like never before with the SoundWave X7...'
      }
    ],
    tags: ['marketing', 'product', 'description', 'e-commerce'],
    rating: 4.5,
    usageCount: 4215
  },
  {
    id: '5',
    name: 'Code Refactoring Guide',
    description: 'Get step-by-step guidance on how to refactor code for better performance, readability, and maintainability.',
    category: 'Programming',
    difficulty: 'expert',
    blocks: [
      { id: '5-1', type: 'text', content: 'Provide a step-by-step guide to refactor the following', position: 0 },
      { id: '5-2', type: 'variable', content: 'language', position: 1 },
      { id: '5-3', type: 'text', content: 'code to improve', position: 2 },
      { id: '5-4', type: 'variable', content: 'improvement_goal', position: 3 },
      { id: '5-5', type: 'text', content: 'Code to refactor:', position: 4 },
      { id: '5-6', type: 'variable', content: 'code_snippet', position: 5 },
    ],
    examples: [
      {
        id: '5-ex-1',
        title: 'JavaScript Function Refactoring',
        promptText: 'Provide a step-by-step guide to refactor the following JavaScript code to improve performance and readability. Code to refactor: function processUsers(users) { var results = []; for(var i=0; i<users.length; i++) { if(users[i].active === true) { results.push({name: users[i].name, email: users[i].email}); } } return results; }',
        response: '# JavaScript Function Refactoring Guide\n\n## Original Code Analysis\nThe current function has several issues...'
      }
    ],
    tags: ['programming', 'refactoring', 'code quality', 'best practices'],
    rating: 4.7,
    usageCount: 2103
  },
  {
    id: '6',
    name: 'Learning Content Generator',
    description: 'Create structured learning content on any topic with explanations, examples, and practice exercises.',
    category: 'Education',
    difficulty: 'intermediate',
    blocks: [
      { id: '6-1', type: 'text', content: 'Create a complete learning module about', position: 0 },
      { id: '6-2', type: 'variable', content: 'topic', position: 1 },
      { id: '6-3', type: 'text', content: 'for', position: 2 },
      { id: '6-4', type: 'variable', content: 'audience_level', position: 3 },
      { id: '6-5', type: 'text', content: 'Include: 1) Introduction and key concepts, 2) Detailed explanations with examples, 3) Common mistakes to avoid, 4) Practice exercises with solutions, and 5) Further resources for learning.', position: 4 },
    ],
    examples: [
      {
        id: '6-ex-1',
        title: 'Python Functions Tutorial',
        promptText: 'Create a complete learning module about Python functions for beginners. Include: 1) Introduction and key concepts, 2) Detailed explanations with examples, 3) Common mistakes to avoid, 4) Practice exercises with solutions, and 5) Further resources for learning.',
        response: '# Python Functions: A Complete Guide for Beginners\n\n## 1. Introduction to Functions\nFunctions are reusable blocks of code...'
      }
    ],
    tags: ['education', 'learning', 'tutorial', 'training'],
    rating: 4.8,
    usageCount: 3056
  }
];

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [savedTemplates, setSavedTemplates] = useState<string[]>([]);
  
  const categories = [...new Set(mockTemplates.map(template => template.category))];
  const difficulties = ['beginner', 'intermediate', 'expert'];
  
  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory ? template.category === selectedCategory : true;
    const matchesDifficulty = selectedDifficulty ? template.difficulty === selectedDifficulty : true;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  
  const handleUseTemplate = (template: Template) => {
    // In a real app, this would copy the template to the prompt builder
    console.log('Using template:', template);
    alert(`Template "${template.name}" would be loaded into the Prompt Builder`);
  };
  
  const handleSaveTemplate = (template: Template) => {
    if (savedTemplates.includes(template.id)) {
      setSavedTemplates(savedTemplates.filter(id => id !== template.id));
    } else {
      setSavedTemplates([...savedTemplates, template.id]);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-6">Template Library</h1>
        
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                placeholder="Search templates..."
                leftIcon={<Search size={18} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-row gap-2">
              <div className="w-48">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="w-48">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                  value={selectedDifficulty || ''}
                  onChange={(e) => setSelectedDifficulty(e.target.value || null)}
                >
                  <option value="">All Difficulties</option>
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <Button
                variant="ghost"
                className="border border-gray-300"
                leftIcon={<Filter size={18} />}
              >
                More Filters
              </Button>
              
              <Button
                variant="ghost"
                className="border border-gray-300"
                leftIcon={<ArrowUpDown size={18} />}
              >
                Sort
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template, index) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUse={handleUseTemplate}
              onSave={handleSaveTemplate}
              isSaved={savedTemplates.includes(template.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-500 mb-4">No templates found matching your criteria</p>
            <Button
              variant="primary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setSelectedDifficulty(null);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;