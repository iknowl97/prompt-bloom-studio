
export interface PromptBlock {
  id: string;
  content: string;
  type: 'instruction' | 'context' | 'example' | 'output' | 'constraints';
  order: number;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  blocks: PromptBlock[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'expert';
  category: string;
  author: string;
  createdAt: Date;
  likes: number;
}

export interface PromptSettings {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  model: string;
}

export interface PromptResponse {
  content: string;
  tokenCount: number;
  elapsed: number;
  model: string;
}

export interface SavedPrompt {
  id: string;
  title: string;
  content: string;
  blocks: PromptBlock[];
  settings: PromptSettings;
  responses: PromptResponse[];
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  folderId?: string;
}

export interface Folder {
  id: string;
  name: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  prompts: SavedPrompt[];
  folders: Folder[];
}
