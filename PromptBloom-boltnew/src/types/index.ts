// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  level: 'beginner' | 'intermediate' | 'expert';
}

// Prompt types
export type BlockType = 'text' | 'variable' | 'condition' | 'loop' | 'comment';

export interface PromptBlock {
  id: string;
  type: BlockType;
  content: string;
  position: number;
  settings?: Record<string, any>;
}

export interface Prompt {
  id: string;
  name: string;
  description: string;
  blocks: PromptBlock[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  isPublic: boolean;
}

// Template types
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  blocks: PromptBlock[];
  examples: Example[];
  tags: string[];
  rating: number;
  usageCount: number;
}

export interface Example {
  id: string;
  title: string;
  promptText: string;
  response: string;
}

// Learning types
export interface LearningModule {
  id: string;
  title: string;
  description: string;
  content: LearningContent[];
  exercises: Exercise[];
  quiz: Quiz;
  nextModules: string[];
  difficulty: 'beginner' | 'intermediate' | 'expert';
  estimatedTime: number; // in minutes
}

export interface LearningContent {
  id: string;
  type: 'text' | 'video' | 'code' | 'image';
  content: string;
  order: number;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  promptTemplate: string;
  solution: string;
  hints: string[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

// Progress tracking
export interface UserProgress {
  userId: string;
  completedModules: string[];
  completedExercises: string[];
  quizScores: Record<string, number>;
  badges: Badge[];
  currentStreak: number;
  longestStreak: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  unlockedAt: string;
}

// App state
export interface AppState {
  user: User | null;
  userProgress: UserProgress | null;
  currentPrompt: Prompt | null;
}