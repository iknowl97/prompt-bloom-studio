import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Award, Book, BookOpen, Clock, Calendar, Edit, BarChart, Bookmark } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../types';

// Mock user data
const mockUser = {
  id: 'user-123',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?img=33',
  createdAt: '2025-01-01T00:00:00Z',
  level: 'intermediate' as const,
  stats: {
    promptsCreated: 24,
    promptsShared: 8,
    templatesUsed: 15,
    modulesCompleted: 7,
    daysActive: 45,
  }
};

// Mock badges
const mockBadges: Badge[] = [
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
  },
  {
    id: 'badge-3',
    name: 'Consistent Creator',
    description: 'Created prompts for 7 consecutive days',
    imageUrl: 'https://example.com/badges/consistent.png',
    unlockedAt: '2025-02-05T09:10:00Z'
  },
  {
    id: 'badge-4',
    name: 'Community Contributor',
    description: 'Shared 5 prompts with the community',
    imageUrl: 'https://example.com/badges/community.png',
    unlockedAt: '2025-02-12T14:25:00Z'
  }
];

// Mock recent activities
const mockActivities = [
  {
    id: 'activity-1',
    type: 'prompt_created',
    title: 'Created a new prompt',
    promptName: 'Technical Documentation Generator',
    date: '2025-03-01T10:23:00Z'
  },
  {
    id: 'activity-2',
    type: 'module_completed',
    title: 'Completed learning module',
    moduleName: 'Advanced Prompting Techniques',
    date: '2025-02-28T15:45:00Z'
  },
  {
    id: 'activity-3',
    type: 'template_used',
    title: 'Used template',
    templateName: 'Creative Story Generator',
    date: '2025-02-27T09:12:00Z'
  },
  {
    id: 'activity-4',
    type: 'badge_earned',
    title: 'Earned badge',
    badgeName: 'Community Contributor',
    date: '2025-02-12T14:25:00Z'
  },
  {
    id: 'activity-5',
    type: 'prompt_shared',
    title: 'Shared a prompt',
    promptName: 'Product Description Generator',
    date: '2025-02-10T11:30:00Z'
  }
];

// Mock saved prompts
const mockSavedPrompts = [
  {
    id: 'prompt-1',
    name: 'Technical Documentation Generator',
    description: 'Creates comprehensive technical documentation for software projects',
    date: '2025-03-01T10:23:00Z',
    tags: ['technical', 'documentation']
  },
  {
    id: 'prompt-2',
    name: 'Product Description Generator',
    description: 'Creates compelling product descriptions for e-commerce',
    date: '2025-02-10T11:30:00Z',
    tags: ['marketing', 'e-commerce']
  },
  {
    id: 'prompt-3',
    name: 'Creative Blog Post Outline',
    description: 'Generates structured outlines for blog posts on various topics',
    date: '2025-01-25T08:45:00Z',
    tags: ['content', 'blog']
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const timeSince = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  
  return Math.floor(seconds) + " seconds ago";
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'prompt_created':
      return <Edit size={16} className="text-primary-500" />;
    case 'module_completed':
      return <BookOpen size={16} className="text-accent-500" />;
    case 'template_used':
      return <Bookmark size={16} className="text-secondary-500" />;
    case 'badge_earned':
      return <Award size={16} className="text-amber-500" />;
    case 'prompt_shared':
      return <User size={16} className="text-info-500" />;
    default:
      return <Clock size={16} className="text-gray-500" />;
  }
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('prompts');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:w-1/3 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Profile Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={mockUser.avatarUrl}
                      alt={mockUser.name}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                    />
                    <div className="absolute bottom-0 right-0 bg-primary-500 text-white text-xs rounded-full px-2 py-1 shadow-sm">
                      {mockUser.level}
                    </div>
                  </div>
                  
                  <h1 className="mt-4 text-2xl font-bold">{mockUser.name}</h1>
                  <p className="text-text-secondary">{mockUser.email}</p>
                  
                  <div className="mt-2 text-sm text-gray-500 flex items-center">
                    <Calendar size={14} className="mr-1" />
                    Member since {formatDate(mockUser.createdAt)}
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit Profile
                    </Button>
                    <Button variant="primary" size="sm">
                      Upgrade Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BarChart size={18} className="mr-2 text-primary-500" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Prompts Created</div>
                    <div className="text-2xl font-bold">{mockUser.stats.promptsCreated}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Prompts Shared</div>
                    <div className="text-2xl font-bold">{mockUser.stats.promptsShared}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Templates Used</div>
                    <div className="text-2xl font-bold">{mockUser.stats.templatesUsed}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Modules Completed</div>
                    <div className="text-2xl font-bold">{mockUser.stats.modulesCompleted}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {/* Badges Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Award size={18} className="mr-2 text-amber-500" />
                  Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {mockBadges.map(badge => (
                    <div key={badge.id} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <Award className="h-6 w-6 text-primary-500" />
                      </div>
                      <div className="mt-2 text-center">
                        <div className="text-sm font-medium">{badge.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{formatDate(badge.unlockedAt)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Right Column - Content */}
        <div className="lg:w-2/3 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="flex border-b">
                <button
                  className={`px-4 py-3 text-sm font-medium flex items-center ${
                    activeTab === 'prompts'
                      ? 'text-primary-600 border-b-2 border-primary-500'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  onClick={() => setActiveTab('prompts')}
                >
                  <Edit size={18} className="mr-2" />
                  My Prompts
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium flex items-center ${
                    activeTab === 'activity'
                      ? 'text-primary-600 border-b-2 border-primary-500'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  onClick={() => setActiveTab('activity')}
                >
                  <Clock size={18} className="mr-2" />
                  Recent Activity
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium flex items-center ${
                    activeTab === 'learning'
                      ? 'text-primary-600 border-b-2 border-primary-500'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  onClick={() => setActiveTab('learning')}
                >
                  <Book size={18} className="mr-2" />
                  Learning Progress
                </button>
              </div>
              
              <div className="p-6">
                {activeTab === 'prompts' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Your Saved Prompts</h3>
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<Edit size={16} />}
                      >
                        New Prompt
                      </Button>
                    </div>
                    
                    {mockSavedPrompts.map(prompt => (
                      <div
                        key={prompt.id}
                        className="mb-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{prompt.name}</h4>
                            <p className="text-sm text-text-secondary mt-1">
                              {prompt.description}
                            </p>
                            <div className="flex gap-2 mt-2">
                              {prompt.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(prompt.date)}
                          </div>
                        </div>
                        <div className="flex justify-end mt-3">
                          <Button variant="ghost" size="sm" className="mr-2">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Use
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'activity' && (
                  <div>
                    <h3 className="font-medium mb-4">Recent Activity</h3>
                    
                    <div className="space-y-4">
                      {mockActivities.map(activity => (
                        <div
                          key={activity.id}
                          className="flex items-start p-3 border-b last:border-b-0"
                        >
                          <div className="flex-shrink-0 mt-1 mr-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                              {getActivityIcon(activity.type)}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="font-medium">{activity.title}</div>
                            <div className="text-sm text-text-secondary">
                              {activity.type === 'prompt_created' && activity.promptName}
                              {activity.type === 'module_completed' && activity.moduleName}
                              {activity.type === 'template_used' && activity.templateName}
                              {activity.type === 'badge_earned' && activity.badgeName}
                              {activity.type === 'prompt_shared' && activity.promptName}
                            </div>
                          </div>
                          <div className="flex-shrink-0 text-xs text-gray-500">
                            {timeSince(activity.date)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'learning' && (
                  <div>
                    <h3 className="font-medium mb-4">Learning Progress</h3>
                    
                    <div className="flex items-center mb-6">
                      <div className="relative w-24 h-24">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e6e6e6"
                            strokeWidth="3"
                            strokeDasharray="100, 100"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#3B8BDB"
                            strokeWidth="3"
                            strokeDasharray="42, 100"
                          />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                          <div className="text-2xl font-semibold">42%</div>
                        </div>
                      </div>
                      <div className="ml-6">
                        <div className="text-lg font-medium">Prompt Engineering Mastery</div>
                        <div className="text-sm text-text-secondary">7 of 12 modules completed</div>
                        <Button
                          variant="primary"
                          size="sm"
                          className="mt-2"
                          leftIcon={<BookOpen size={16} />}
                        >
                          Continue Learning
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">Advanced Prompting Techniques</div>
                          <div className="text-sm text-success-500 font-medium">Completed</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div className="bg-success-500 h-2 rounded-full w-full"></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <div>Module 3 of 6</div>
                          <div>Completed on Feb 28, 2025</div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">Prompt Optimization & Testing</div>
                          <div className="text-sm text-primary-500 font-medium">In Progress</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div className="bg-primary-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <div>Module 4 of 6</div>
                          <div>60% complete</div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">Industry-Specific Prompt Design</div>
                          <div className="text-sm text-gray-500 font-medium">Not Started</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div className="bg-gray-400 h-2 rounded-full w-0"></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <div>Module 5 of 6</div>
                          <div>0% complete</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;