
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MessageSquare, ThumbsUp, Award, Users, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Input from '../components/ui/Input';

const mockPrompts = [
  {
    id: '1',
    title: 'Creative Story Generator',
    author: 'Sarah J.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    description: 'Generates creative short stories based on a few input parameters',
    likes: 235,
    comments: 42,
    tags: ['creative', 'writing', 'storytelling'],
    difficulty: 'beginner'
  },
  {
    id: '2',
    title: 'Code Refactoring Assistant',
    author: 'Michael T.',
    avatar: 'https://i.pravatar.cc/150?img=2',
    description: 'Helps analyze and refactor code with best practices',
    likes: 187,
    comments: 31,
    tags: ['coding', 'development', 'refactoring'],
    difficulty: 'intermediate'
  },
  {
    id: '3',
    title: 'Data Analysis Report Generator',
    author: 'Emily R.',
    avatar: 'https://i.pravatar.cc/150?img=3',
    description: 'Creates comprehensive data analysis reports from raw data',
    likes: 154,
    comments: 27,
    tags: ['data', 'analysis', 'reporting'],
    difficulty: 'advanced'
  },
  {
    id: '4',
    title: 'Email Draft Assistant',
    author: 'David K.',
    avatar: 'https://i.pravatar.cc/150?img=4',
    description: 'Helps draft professional emails for various situations',
    likes: 201,
    comments: 36,
    tags: ['communication', 'writing', 'email'],
    difficulty: 'beginner'
  },
];

const difficultyColors = {
  beginner: 'text-green-600 bg-green-50 border-green-200',
  intermediate: 'text-blue-600 bg-blue-50 border-blue-200',
  advanced: 'text-purple-600 bg-purple-50 border-purple-200'
};

const Community = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Community Prompts</h1>
            <p className="text-text-secondary">
              Discover and share prompts created by the community
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="primary">
              Share Your Prompt
            </Button>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search prompts..."
                leftIcon={<Search size={18} />}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="border border-gray-200"
                leftIcon={<Filter size={18} />}
              >
                Filters
              </Button>
              <div className="relative">
                <Button
                  variant="ghost"
                  className="border border-gray-200"
                  rightIcon={<ChevronDown size={18} />}
                >
                  {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'popular'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => setActiveTab('popular')}
          >
            Popular
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'recent'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => setActiveTab('recent')}
          >
            Recent
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'trending'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => setActiveTab('trending')}
          >
            Trending
          </button>
        </div>
        
        {/* Prompts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPrompts.map((prompt) => (
            <Card key={prompt.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <img
                      src={prompt.avatar}
                      alt={prompt.author}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="font-medium text-sm">{prompt.author}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border ${
                    difficultyColors[prompt.difficulty as keyof typeof difficultyColors]
                  }`}>
                    {prompt.difficulty.charAt(0).toUpperCase() + prompt.difficulty.slice(1)}
                  </span>
                </div>
                <CardTitle className="text-lg font-semibold">{prompt.title}</CardTitle>
                <p className="text-sm text-text-secondary mt-1">{prompt.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-text-secondary rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-text-secondary">
                  <div className="flex items-center">
                    <ThumbsUp size={16} className="mr-1" />
                    <span>{prompt.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare size={16} className="mr-1" />
                    <span>{prompt.comments}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary-500">
                    View Prompt
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Community highlights */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Community Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-primary-50 border-primary-100">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-8 w-8 text-primary-500 mr-3" />
                  <h3 className="text-lg font-semibold">Top Contributors</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <img
                      src="https://i.pravatar.cc/150?img=5"
                      alt="User"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">Alex Johnson</p>
                      <p className="text-sm text-text-secondary">42 prompts shared</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://i.pravatar.cc/150?img=6"
                      alt="User"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">Maria Garcia</p>
                      <p className="text-sm text-text-secondary">38 prompts shared</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://i.pravatar.cc/150?img=7"
                      alt="User"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">James Smith</p>
                      <p className="text-sm text-text-secondary">31 prompts shared</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary-50 border-secondary-100">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-8 w-8 text-secondary-500 mr-3" />
                  <h3 className="text-lg font-semibold">Active Discussions</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Best prompts for creative writing?</p>
                    <p className="text-sm text-text-secondary">24 replies • 3 hours ago</p>
                  </div>
                  <div>
                    <p className="font-medium">How to optimize prompts for code generation</p>
                    <p className="text-sm text-text-secondary">18 replies • 12 hours ago</p>
                  </div>
                  <div>
                    <p className="font-medium">Sharing my prompt creation workflow</p>
                    <p className="text-sm text-text-secondary">37 replies • 1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-accent-50 border-accent-100">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-accent-500 mr-3" />
                  <h3 className="text-lg font-semibold">Community Events</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Prompt Engineering Workshop</p>
                    <p className="text-sm text-text-secondary">June 15, 2023 • Online</p>
                  </div>
                  <div>
                    <p className="font-medium">AI Prompt Hackathon</p>
                    <p className="text-sm text-text-secondary">July 8-10, 2023 • Virtual</p>
                  </div>
                  <div>
                    <p className="font-medium">Monthly Community Showcase</p>
                    <p className="text-sm text-text-secondary">Last Thursday of each month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Community;
