
// API endpoints
export const API_ENDPOINTS = {
  GENERATE_PROMPT: '/api/generate',
  SAVE_PROMPT: '/api/prompts',
  GET_PROMPTS: '/api/prompts',
};

// Routes
export const ROUTES = {
  HOME: '/',
  GALLERY: '/gallery',
  ADMIN: '/admin',
  PROFILE: '/profile',
  PROMPT_BUILDER: '/prompt-builder',
  CUSTOM_PROMPT_BUILDER: '/custom-prompt-builder',
  LEARN: '/learn',
  TEMPLATES: '/templates',
};

// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// Model types
export const MODEL_TYPES = [
  { value: 'deepseek/deepseek-chat-v3-0324:free', label: 'DeepSeek Chat v3' },
  { value: 'anthropic/claude-3-opus:beta', label: 'Claude 3 Opus' },
  { value: 'anthropic/claude-3-sonnet:beta', label: 'Claude 3 Sonnet' },
  { value: 'mistral/mistral-medium', label: 'Mistral Medium' },
  { value: 'google/gemini-pro', label: 'Gemini Pro' },
];

// Default settings
export const DEFAULT_SETTINGS = {
  temperature: 0.7,
  modelType: 'deepseek/deepseek-chat-v3-0324:free',
};
