
export const API_KEYS = {
  OPENROUTER_API_KEY: "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"
};

export const API_CONFIG = {
  MODEL: "deepseek/deepseek-chat-v3-0324:free"
};

// Color palette for the UI
export const COLORS = {
  PRIMARY: {
    50: '#f5f3ff',
    100: '#ede9fe', 
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },
  PASTEL: {
    BLUE: '#D3E4FD',
    GREEN: '#F2FCE2',
    YELLOW: '#FEF7CD',
    ORANGE: '#FEC6A1',
    PURPLE: '#E5DEFF',
    PINK: '#FFDEE2',
    PEACH: '#FDE1D3',
  }
};

// Common tag suggestions by category
export const TAG_SUGGESTIONS = {
  TOPIC: [
    'ai', 'writing', 'coding', 'marketing', 'business', 
    'education', 'science', 'art', 'design', 'technology'
  ],
  FORMAT: [
    'question', 'instruction', 'story', 'conversation', 'description',
    'summary', 'list', 'recipe', 'essay', 'poem', 'script'
  ],
  TONE: [
    'formal', 'casual', 'friendly', 'professional', 'technical',
    'humorous', 'serious', 'inspirational', 'educational'
  ],
  PURPOSE: [
    'explain', 'generate', 'summarize', 'analyze', 'compare',
    'teach', 'describe', 'brainstorm', 'solve', 'translate'
  ]
};
