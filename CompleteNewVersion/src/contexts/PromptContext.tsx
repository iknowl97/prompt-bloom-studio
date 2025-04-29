
import React, { createContext, useContext, useState, useEffect } from "react";

// Define types for our data structures
export type PromptSettings = {
  temperature: number;
  modelType: string;
};

export type TagColor = {
  name: string;
  bgColor: string;
  textColor: string;
};

export type Tag = {
  id: string;
  name: string;
  color: TagColor;
};

export type SavedPrompt = {
  id: string;
  title: string;
  content: string;
  settings: PromptSettings;
  createdAt: string;
  folderId?: string;
  tags?: Tag[];
};

export type PromptFolder = {
  id: string;
  name: string;
  createdAt: string;
  color?: string;
  parentId?: string;
};

// Predefined tag colors for better UI
export const TAG_COLORS: TagColor[] = [
  { name: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800' },
  { name: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-800' },
  { name: 'amber', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
  { name: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
  { name: 'lime', bgColor: 'bg-lime-100', textColor: 'text-lime-800' },
  { name: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' },
  { name: 'emerald', bgColor: 'bg-emerald-100', textColor: 'text-emerald-800' },
  { name: 'teal', bgColor: 'bg-teal-100', textColor: 'text-teal-800' },
  { name: 'cyan', bgColor: 'bg-cyan-100', textColor: 'text-cyan-800' },
  { name: 'sky', bgColor: 'bg-sky-100', textColor: 'text-sky-800' },
  { name: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
  { name: 'indigo', bgColor: 'bg-indigo-100', textColor: 'text-indigo-800' },
  { name: 'violet', bgColor: 'bg-violet-100', textColor: 'text-violet-800' },
  { name: 'purple', bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
  { name: 'fuchsia', bgColor: 'bg-fuchsia-100', textColor: 'text-fuchsia-800' },
  { name: 'pink', bgColor: 'bg-pink-100', textColor: 'text-pink-800' },
  { name: 'rose', bgColor: 'bg-rose-100', textColor: 'text-rose-800' },
];

// Common keywords mapped to suggested colors
const KEYWORD_COLOR_MAP: Record<string, string> = {
  creative: 'purple',
  art: 'fuchsia',
  design: 'pink',
  writing: 'blue',
  story: 'indigo',
  code: 'cyan',
  programming: 'sky',
  business: 'emerald',
  finance: 'green',
  education: 'teal',
  health: 'lime',
  marketing: 'amber',
  sales: 'orange',
  science: 'violet',
  math: 'indigo',
  technology: 'sky',
  analytics: 'blue',
  data: 'cyan',
  research: 'teal',
  ai: 'violet',
  image: 'fuchsia',
  generate: 'purple',
  text: 'blue',
  chat: 'green',
  assistant: 'emerald',
};

type PromptContextType = {
  savedPrompts: SavedPrompt[];
  folders: PromptFolder[];
  savePrompt: (prompt: Omit<SavedPrompt, "id" | "createdAt">) => void;
  createFolder: (name: string, color?: string, parentId?: string) => void;
  deletePrompt: (id: string) => void;
  deleteFolder: (id: string) => void;
  updatePrompt: (id: string, data: Partial<SavedPrompt>) => void;
  updateFolder: (id: string, data: Partial<PromptFolder>) => void;
  movePrompt: (promptId: string, folderId?: string) => void;
  suggestTagsFromContent: (content: string) => Tag[];
  createTag: (name: string, colorName?: string) => Tag;
  addTagToPrompt: (promptId: string, tag: Tag) => void;
  removeTagFromPrompt: (promptId: string, tagId: string) => void;
  suggestColorForTag: (tagName: string) => TagColor;
};

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => {
    const stored = localStorage.getItem("aiknowledge_prompts");
    return stored ? JSON.parse(stored) : [];
  });
  
  const [folders, setFolders] = useState<PromptFolder[]>(() => {
    const stored = localStorage.getItem("aiknowledge_folders");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem("aiknowledge_prompts", JSON.stringify(savedPrompts));
  }, [savedPrompts]);

  useEffect(() => {
    localStorage.setItem("aiknowledge_folders", JSON.stringify(folders));
  }, [folders]);

  // Helper to extract potential tags from content
  const extractKeywordsFromContent = (content: string): string[] => {
    // Remove common words and focus on potentially meaningful terms
    const commonWords = new Set(['the', 'and', 'or', 'but', 'for', 'with', 'without', 'to', 'from']);
    const words = content.toLowerCase().split(/\W+/).filter(word => 
      word.length > 3 && !commonWords.has(word)
    );
    
    // Return unique words as potential tags
    return [...new Set(words)];
  };

  // Suggest a color based on tag name
  const suggestColorForTag = (tagName: string): TagColor => {
    const lowerTagName = tagName.toLowerCase();
    
    // Check if we have a direct mapping
    for (const [keyword, color] of Object.entries(KEYWORD_COLOR_MAP)) {
      if (lowerTagName.includes(keyword)) {
        const foundColor = TAG_COLORS.find(c => c.name === color);
        if (foundColor) return foundColor;
      }
    }
    
    // If no direct mapping, use the tag name to deterministically pick a color
    const charCodeSum = tagName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorIndex = charCodeSum % TAG_COLORS.length;
    return TAG_COLORS[colorIndex];
  };

  // Create a new tag with suggested color
  const createTag = (name: string, colorName?: string): Tag => {
    let color: TagColor;
    
    if (colorName) {
      color = TAG_COLORS.find(c => c.name === colorName) || TAG_COLORS[0];
    } else {
      color = suggestColorForTag(name);
    }
    
    return {
      id: crypto.randomUUID(),
      name,
      color
    };
  };

  // Suggest tags from content
  const suggestTagsFromContent = (content: string): Tag[] => {
    const keywords = extractKeywordsFromContent(content);
    const topKeywords = keywords.slice(0, 5); // Limit to top 5 keywords
    
    return topKeywords.map(keyword => createTag(keyword));
  };

  // Add tag to prompt
  const addTagToPrompt = (promptId: string, tag: Tag) => {
    setSavedPrompts(prev => 
      prev.map(prompt => {
        if (prompt.id === promptId) {
          const existingTags = prompt.tags || [];
          // Don't add duplicate tags
          if (!existingTags.some(t => t.name.toLowerCase() === tag.name.toLowerCase())) {
            return {
              ...prompt,
              tags: [...existingTags, tag]
            };
          }
        }
        return prompt;
      })
    );
  };

  // Remove tag from prompt
  const removeTagFromPrompt = (promptId: string, tagId: string) => {
    setSavedPrompts(prev => 
      prev.map(prompt => {
        if (prompt.id === promptId && prompt.tags) {
          return {
            ...prompt,
            tags: prompt.tags.filter(tag => tag.id !== tagId)
          };
        }
        return prompt;
      })
    );
  };

  const savePrompt = (prompt: Omit<SavedPrompt, "id" | "createdAt">) => {
    const newPrompt: SavedPrompt = {
      ...prompt,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setSavedPrompts((prev) => [...prev, newPrompt]);
  };

  const createFolder = (name: string, color?: string, parentId?: string) => {
    const newFolder: PromptFolder = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
      color,
      parentId,
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  const deletePrompt = (id: string) => {
    setSavedPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  const deleteFolder = (id: string) => {
    // Delete folder and all prompts in it
    setFolders((prev) => prev.filter((f) => f.id !== id && f.parentId !== id));
    setSavedPrompts((prev) => prev.filter((p) => p.folderId !== id));
  };

  const updatePrompt = (id: string, data: Partial<SavedPrompt>) => {
    setSavedPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const updateFolder = (id: string, data: Partial<PromptFolder>) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...data } : f))
    );
  };

  const movePrompt = (promptId: string, folderId?: string) => {
    setSavedPrompts((prev) =>
      prev.map((p) => (p.id === promptId ? { ...p, folderId } : p))
    );
  };

  return (
    <PromptContext.Provider
      value={{
        savedPrompts,
        folders,
        savePrompt,
        createFolder,
        deletePrompt,
        deleteFolder,
        updatePrompt,
        updateFolder,
        movePrompt,
        suggestTagsFromContent,
        createTag,
        addTagToPrompt,
        removeTagFromPrompt,
        suggestColorForTag,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompts = () => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error("usePrompts must be used within a PromptProvider");
  }
  return context;
};
