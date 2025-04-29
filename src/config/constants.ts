
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
    MINT: '#E2FDF5',
    LAVENDER: '#EDE2FD',
    CYAN: '#D3F8FD',
    LIME: '#EBFDD3',
    CORAL: '#FDDED3',
    SKY: '#D3F1FD',
    ROSE: '#FDD3E4',
  },
  SEMANTIC: {
    SUCCESS: '#10B981',
    SUCCESS_LIGHT: '#D1FAE5',
    WARNING: '#F59E0B',
    WARNING_LIGHT: '#FEF3C7',
    ERROR: '#EF4444',
    ERROR_LIGHT: '#FEE2E2',
    INFO: '#3B82F6',
    INFO_LIGHT: '#DBEAFE',
  }
};

// Common tag suggestions by category
export const TAG_SUGGESTIONS = {
  TOPIC: [
    'ai', 'writing', 'coding', 'marketing', 'business', 
    'education', 'science', 'art', 'design', 'technology',
    'data', 'finance', 'health', 'entertainment', 'productivity',
    'creativity', 'storytelling', 'research', 'analysis', 'communication'
  ],
  FORMAT: [
    'question', 'instruction', 'story', 'conversation', 'description',
    'summary', 'list', 'recipe', 'essay', 'poem', 'script',
    'email', 'report', 'presentation', 'outline', 'guide',
    'tutorial', 'analysis', 'review', 'comparison', 'interview'
  ],
  TONE: [
    'formal', 'casual', 'friendly', 'professional', 'technical',
    'humorous', 'serious', 'inspirational', 'educational',
    'authoritative', 'empathetic', 'conversational', 'persuasive',
    'enthusiastic', 'neutral', 'poetic', 'motivational', 'direct'
  ],
  PURPOSE: [
    'explain', 'generate', 'summarize', 'analyze', 'compare',
    'teach', 'describe', 'brainstorm', 'solve', 'translate',
    'optimize', 'guide', 'convince', 'entertain', 'inform',
    'instruct', 'explore', 'evaluate', 'simplify', 'inspire'
  ]
};

// Model capabilities
export const MODEL_CAPABILITIES = {
  "deepseek/deepseek-chat-v3-0324:free": {
    name: "DeepSeek Chat v3",
    strengths: ["Code generation", "Logical reasoning", "Fast responses"],
    ideal_for: ["Quick tasks", "Programming help", "Technical content"],
    icon: "Brain"
  },
  "anthropic/claude-3-opus:free": {
    name: "Claude 3 Opus",
    strengths: ["Complex reasoning", "Nuance understanding", "Detailed responses"],
    ideal_for: ["Research", "Complex tasks", "In-depth analysis"],
    icon: "Rocket"
  },
  "openai/gpt-4o:free": {
    name: "GPT-4o",
    strengths: ["General knowledge", "Creative writing", "Multi-modal"],
    ideal_for: ["Creative tasks", "Interactive conversations", "Images"],
    icon: "Zap"
  }
};

// Generation Guidelines
export const PROMPT_GUIDELINES = {
  BEST_PRACTICES: [
    "Be specific and clear about your desired output",
    "Include format instructions if needed",
    "Specify the tone and style you want",
    "Break complex prompts into steps",
    "Provide examples for better results"
  ],
  COMMON_PATTERNS: {
    STEP_BY_STEP: "Think through this problem step by step:",
    SPECIFIC_FORMAT: "Format your response as a [format]",
    EXPERT_ROLE: "You are an expert in [field], please [task]",
    COMPARISON: "Compare and contrast [A] and [B] in terms of [aspects]",
    CREATIVE: "Generate a creative [content type] about [topic]"
  }
};
