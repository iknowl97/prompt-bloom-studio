import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Book, BookOpen, Award, Search } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ModuleCard from '../components/features/learning/ModuleCard';
import ProgressDashboard from '../components/features/learning/ProgressDashboard';
import { LearningModule, UserProgress, Badge } from '../types';

// Mock data for learning modules
const mockModules: LearningModule[] = [
  {
    id: '1',
    title: 'Prompt Engineering Fundamentals',
    description: 'Learn the core concepts and principles of creating effective prompts for AI systems.',
    content: [
      { id: '1-1', type: 'text', content: 'Introduction to prompt engineering and why it matters', order: 0 },
      { id: '1-2', type: 'video', content: 'https://example.com/videos/intro-prompt-engineering', order: 1 },
      { id: '1-3', type: 'text', content: 'The anatomy of an effective prompt: structure and elements', order: 2 },
    ],
    exercises: [
      {
        id: '1-ex-1',
        title: 'Basic Prompt Creation',
        description: 'Create your first structured prompt',
        promptTemplate: 'Design a prompt for [task]',
        solution: 'I need you to help me with [task]. Please provide a step-by-step approach...',
        hints: ['Think about the goal', 'Consider what information the AI needs']
      }
    ],
    quiz: {
      id: '1-quiz',
      title: 'Fundamentals Quiz',
      questions: [
        {
          id: '1-q-1',
          question: 'What is the main purpose of prompt engineering?',
          options: [
            'To create code that works with AI',
            'To design effective instructions for AI systems',
            'To build machine learning models',
            'To optimize server performance'
          ],
          correctOptionIndex: 1,
          explanation: 'Prompt engineering focuses on designing effective instructions that guide AI systems to produce desired outputs.'
        }
      ],
      passingScore: 70
    },
    nextModules: ['2', '3'],
    difficulty: 'beginner',
    estimatedTime: 45
  },
  {
    id: '2',
    title: 'Context and Specificity',
    description: 'Master the art of providing the right context and specificity in your prompts.',
    content: [
      { id: '2-1', type: 'text', content: 'Why context matters in prompt design', order: 0 },
      { id: '2-2', type: 'image', content: 'https://example.com/images/context-diagram', order: 1 },
      { id: '2-3', type: 'code', content: 'Example of context-rich prompt vs. vague prompt', order: 2 },
    ],
    exercises: [
      {
        id: '2-ex-1',
        title: 'Context Enhancement',
        description: 'Improve a vague prompt with proper context',
        promptTemplate: 'Make this prompt better: "Write about climate"',
        solution: 'Analyze the current state of climate change, focusing on three major environmental impacts observed in the past decade. Include scientific data and explain potential solutions.',
        hints: ['What specific aspects need clarification?', 'What background information would help?']
      }
    ],
    quiz: {
      id: '2-quiz',
      title: 'Context Quiz',
      questions: [
        {
          id: '2-q-1',
          question: 'Why is specificity important in prompts?',
          options: [
            'It makes prompts longer',
            'It reduces AI processing time',
            'It helps guide the AI to the exact output you want',
            'It\'s a technical requirement of large language models'
          ],
          correctOptionIndex: 2,
          explanation: 'Specificity helps guide the AI to produce exactly the type of output you\'re looking for, reducing ambiguity.'
        }
      ],
      passingScore: 70
    },
    nextModules: ['4'],
    difficulty: 'beginner',
    estimatedTime: 60
  },
  {
    id: '3',
    title: 'Advanced Prompting Techniques',
    description: 'Learn sophisticated techniques like chain-of-thought prompting, few-shot learning, and more.',
    content: [
      { id: '3-1', type: 'text', content: 'Introduction to advanced prompt engineering techniques', order: 0 },
      { id: '3-2', type: 'video', content: 'https://example.com/videos/advanced-techniques', order: 1 },
      { id: '3-3', type: 'code', content: 'Examples of chain-of-thought prompting', order: 2 },
    ],
    exercises: [
      {
        id: '3-ex-1',
        title: 'Chain-of-Thought Implementation',
        description: 'Create a prompt using chain-of-thought technique',
        promptTemplate: 'Design a prompt for solving [complex problem]',
        solution: 'I need to solve [complex problem]. Let\'s break this down step by step...',
        hints: ['Guide the AI through the reasoning process', 'Include intermediate steps']
      }
    ],
    quiz: {
      id: '3-quiz',
      title: 'Advanced Techniques Quiz',
      questions: [
        {
          id: '3-q-1',
          question: 'What is few-shot prompting?',
          options: [
            'Using very short prompts',
            'Providing examples in the prompt to guide the model',
            'Limiting the AI\'s response length',
            'Making multiple quick requests'
          ],
          correctOptionIndex: 1,
          explanation: 'Few-shot prompting involves providing the AI with a few examples of the desired input-output pairs to help it understand the pattern you want it to follow.'
        }
      ],
      passingScore: 80
    },
    nextModules: ['4', '5'],
    difficulty: 'intermediate',
    estimatedTime: 90
  },
  {
    id: '4',
    title: 'Prompt Optimization & Testing',
    description: 'Systematic approaches to testing, iterating, and optimizing your prompts for better results.',
    content: [
      { id: '4-1', type: 'text', content: 'The prompt optimization cycle', order: 0 },
      { id: '4-2', type: 'image', content: 'https://example.com/images/optimization-cycle', order: 1 },
      { id: '4-3', type: 'text', content: 'Methodical testing approaches for prompts', order: 2 },
    ],
    exercises: [
      {
        id: '4-ex-1',
        title: 'Prompt A/B Testing',
        description: 'Design an A/B test for prompt variations',
        promptTemplate: 'Create two variations of a prompt for [task] and explain how you would test them',
        solution: 'Variation A: [prompt]. Variation B: [prompt]. I would test these by...',
        hints: ['Consider different structures', 'Think about what metrics would indicate success']
      }
    ],
    quiz: {
      id: '4-quiz',
      title: 'Optimization Quiz',
      questions: [
        {
          id: '4-q-1',
          question: 'Why is systematic testing important for prompt engineering?',
          options: [
            'It\'s required by AI providers',
            'It helps identify which variations of prompts produce better results',
            'It makes the process slower but more accurate',
            'It\'s only necessary for complex applications'
          ],
          correctOptionIndex: 1,
          explanation: 'Systematic testing allows you to compare different prompt variations and identify which ones produce the most effective results for your specific use case.'
        }
      ],
      passingScore: 80
    },
    nextModules: ['5'],
    difficulty: 'intermediate',
    estimatedTime: 75
  },
  {
    id: '5',
    title: 'Industry-Specific Prompt Design',
    description: 'Specialized prompt engineering techniques for different domains like healthcare, finance, education, and creative arts.',
    content: [
      { id: '5-1', type: 'text', content: 'Domain-specific considerations in prompt engineering', order: 0 },
      { id: '5-2', type: 'text', content: 'Case studies: Healthcare, Finance, Education, Creative', order: 1 },
      { id: '5-3', type: 'code', content: 'Examples of domain-optimized prompts', order: 2 },
    ],
    exercises: [
      {
        id: '5-ex-1',
        title: 'Domain Adaptation',
        description: 'Adapt a general prompt for a specific industry',
        promptTemplate: 'Adapt this general prompt: "[general prompt]" for the [industry] sector',
        solution: 'For [industry], I would modify the prompt to: "[modified prompt]" because...',
        hints: ['Consider industry terminology', 'Think about specific constraints or regulations']
      }
    ],
    quiz: {
      id: '5-quiz',
      title: 'Industry Specialization Quiz',
      questions: [
        {
          id: '5-q-1',
          question: 'Why do different industries require specialized prompt engineering approaches?',
          options: [
            'They use different AI models',
            'Each industry has unique terminology, constraints, and objectives',
            'Industry regulations require it',
            'It\'s just a marketing distinction'
          ],
          correctOptionIndex: 1,
          explanation: 'Different industries have unique terminology, requirements, ethical considerations, and objectives that need to be reflected in prompt design for optimal results.'
        }
      ],
      passingScore: 80
    },
    nextModules: [],
    difficulty: 'expert',
    estimatedTime: 120
  },
  {
    id: '6',
    title: 'Ethical Considerations in Prompt Design',
    description: 'Understanding bias, safety concerns, and ethical guidelines for responsible prompt engineering.',
    content: [
      { id: '6-1', type: 'text', content: 'Ethics and responsibility in AI interactions', order: 0 },
      { id: '6-2', type: 'video', content: 'https://example.com/videos/ai-ethics', order: 1 },
      { id: '6-3', type: 'text', content: 'Identifying and mitigating bias in prompts', order: 2 },
    ],
    exercises: [
      {
        id: '6-ex-1',
        title: 'Bias Identification',
        description: 'Identify and correct bias in prompts',
        promptTemplate: 'Analyze this prompt for potential bias: "[biased prompt]" and suggest improvements',
        solution: 'This prompt contains bias in [specific ways]. A better version would be: "[improved prompt]"',
        hints: ['Look for assumptions', 'Consider diverse perspectives']
      }
    ],
    quiz: {
      id: '6-quiz',
      title: 'Ethics Quiz',
      questions: [
        {
          id: '6-q-1',
          question: 'Why is it important to consider ethics in prompt engineering?',
          options: [
            'It\'s a regulatory requirement',
            'It only matters for government applications',
            'Prompts can inadvertently reinforce biases or lead to harmful outputs',
            'It\'s only relevant for certain topics'
          ],
          correctOptionIndex: 2,
          explanation: 'Poorly designed prompts can inadvertently reinforce societal biases, produce misleading information, or lead to harmful outputs, which makes ethical consideration essential.'
        }
      ],
      passingScore: 80
    },
    nextModules: [],
    difficulty: 'expert',
    estimatedTime: 90
  }
];

// Mock user progress
const mockUserProgress: UserProgress = {
  userId: 'user-123',
  completedModules: ['1', '2'],
  completedExercises: ['1-ex-1', '2-ex-1'],
  quizScores: {
    '1-quiz': 90,
    '2-quiz': 85
  },
  badges: [
    {
      id: 'badge-1',
      name: 'Prompt Pioneer',
      description: 'Completed the fundamentals module',
      imageUrl: 'https://example.com/badges/pioneer.png',
      unlockedAt: '2025-01-15T12:00:00Z'
    },
    {
      id: 'badge-2',
      name: 'Context Master',
      description: 'Achieved 85%+ in the Context module quiz',
      imageUrl: 'https://example.com/badges/context.png',
      unlockedAt: '2025-01-22T15:30:00Z'
    }
  ],
  currentStreak: 7,
  longestStreak: 14
};

// Progress by module (in a real app, this would be calculated from user data)
const moduleProgress: Record<string, number> = {
  '1': 100, // Completed
  '2': 100, // Completed
  '3': 45,  // In progress
  '4': 15,  // Just started
  '5': 0,   // Not started
  '6': 0    // Not started
};

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  
  const filteredModules = mockModules.filter(module => {
    const matchesSearch = 
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = selectedDifficulty ? module.difficulty === selectedDifficulty : true;
    
    return matchesSearch && matchesDifficulty;
  });
  
  const handleStartModule = (moduleId: string) => {
    console.log('Starting module:', moduleId);
    alert(`Starting module: ${moduleId}`);
  };
  
  const handleContinueModule = (moduleId: string) => {
    console.log('Continuing module:', moduleId);
    alert(`Continuing module: ${moduleId}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-6">Learning Center</h1>
        
        {/* Progress Dashboard */}
        <ProgressDashboard 
          userProgress={mockUserProgress}
          modules={mockModules}
        />
        
        {/* Search and Filters */}
        <div className="mt-8 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <Input
              placeholder="Search learning modules..."
              leftIcon={<Search size={18} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-48">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
              value={selectedDifficulty || ''}
              onChange={(e) => setSelectedDifficulty(e.target.value || null)}
            >
              <option value="">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
        
        {/* Featured Path */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Sparkles className="text-primary-500 mr-2" size={20} />
            <h2 className="text-xl font-semibold">Recommended Learning Path</h2>
          </div>
          
          <div className="bg-gradient-to-r from-primary-50 to-white p-6 rounded-lg border border-primary-100">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                <h3 className="text-lg font-medium mb-2">Prompt Engineering Mastery</h3>
                <p className="text-text-secondary mb-4">
                  This curated path takes you from the fundamentals to advanced techniques in prompt engineering, with practical exercises and real-world applications.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700">6 Modules</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-success-100 text-success-700">12 Exercises</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">4 Badges</span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<BookOpen size={16} />}
                >
                  Continue Learning
                </Button>
              </div>
              
              <div className="md:w-1/3">
                <div className="flex justify-end">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md">
                    <div className="relative">
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                      <Book className="h-8 w-8 text-primary-500" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <div className="text-sm font-medium">Overall Progress</div>
                  <div className="text-2xl font-bold text-primary-500">43%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.length > 0 ? (
          filteredModules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              progress={moduleProgress[module.id] || 0}
              onStart={handleStartModule}
              onContinue={handleContinueModule}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-500 mb-4">No learning modules found matching your criteria</p>
            <Button
              variant="primary"
              onClick={() => {
                setSearchQuery('');
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

export default Learn;