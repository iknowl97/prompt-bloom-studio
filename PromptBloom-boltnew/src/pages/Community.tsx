
import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Heart, MessageSquare, Share2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface CommunityPrompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  author: string;
  authorAvatar?: string;
  likes: number;
  comments: number;
  tags: string[];
  createdAt: string;
}

const samplePrompts: CommunityPrompt[] = [
  {
    id: '1',
    title: 'Creative Story Generator',
    description: 'A prompt that generates engaging short stories',
    prompt: 'Write a short story about [TOPIC] that includes a surprising twist at the end.',
    author: 'StoryMaster',
    likes: 152,
    comments: 24,
    tags: ['creative', 'writing', 'stories'],
    createdAt: '2025-03-15',
  },
  {
    id: '2',
    title: 'Professional Email Template',
    description: 'Create professional emails for any situation',
    prompt: 'Draft a professional email to [RECIPIENT] regarding [TOPIC]. The tone should be [TONE] and include [SPECIFIC_DETAILS].',
    author: 'BusinessWriter',
    authorAvatar: 'https://i.pravatar.cc/150?img=2',
    likes: 87,
    comments: 12,
    tags: ['business', 'email', 'professional'],
    createdAt: '2025-04-02',
  },
  {
    id: '3',
    title: 'Code Explainer for Beginners',
    description: 'Breaks down complex code into simple explanations',
    prompt: 'Explain this [LANGUAGE] code: [CODE_SNIPPET]. Explain it as if teaching a beginner, highlighting key concepts and functions.',
    author: 'CodeTeacher',
    likes: 214,
    comments: 31,
    tags: ['programming', 'education', 'beginners'],
    createdAt: '2025-03-28',
  },
];

const Community = () => {
  const [activeTab, setActiveTab] = useState<'trending' | 'recent' | 'following'>('trending');

  const tabs = [
    { key: 'trending', label: 'Trending' },
    { key: 'recent', label: 'Recent' },
    { key: 'following', label: 'Following' },
  ] as const;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Community Prompts</h1>
            <Button variant="primary">Share Your Prompt</Button>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-4 border-b border-gray-200 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-1 font-medium text-sm relative ${
                  activeTab === tab.key
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                    initial={false}
                  />
                )}
              </button>
            ))}
          </div>
          
          {/* Community Prompts */}
          <div className="space-y-6">
            {samplePrompts.map((promptItem) => (
              <Card key={promptItem.id} className="overflow-hidden">
                <div className="p-6">
                  {/* Author info */}
                  <div className="flex items-center mb-4">
                    {promptItem.authorAvatar ? (
                      <img 
                        src={promptItem.authorAvatar} 
                        alt={promptItem.author} 
                        className="w-10 h-10 rounded-full mr-3" 
                      />
                    ) : (
                      <UserCircle className="w-10 h-10 text-gray-400 mr-3" />
                    )}
                    <div>
                      <p className="font-medium">{promptItem.author}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(promptItem.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Prompt content */}
                  <h3 className="text-xl font-bold mb-2">{promptItem.title}</h3>
                  <p className="text-gray-600 mb-4">{promptItem.description}</p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                    <p className="font-mono text-sm">{promptItem.prompt}</p>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {promptItem.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-6 pt-2 border-t border-gray-100">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-600">
                      <Heart size={18} />
                      <span>{promptItem.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-600">
                      <MessageSquare size={18} />
                      <span>{promptItem.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-600">
                      <Share2 size={18} />
                      <span>Share</span>
                    </button>
                    <div className="ml-auto">
                      <Button variant="outline" size="sm">Use Prompt</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Community;
