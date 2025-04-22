
import React, { createContext, useContext, useState, useEffect } from "react";

// Define types for our data structures
export type PromptSettings = {
  temperature: number;
  modelType: string;
};

export type SavedPrompt = {
  id: string;
  title: string;
  content: string;
  settings: PromptSettings;
  createdAt: string;
  folderId?: string;
  tags?: string[];
};

export type PromptFolder = {
  id: string;
  name: string;
  createdAt: string;
  parentId?: string;
};

type PromptContextType = {
  savedPrompts: SavedPrompt[];
  folders: PromptFolder[];
  savePrompt: (prompt: Omit<SavedPrompt, "id" | "createdAt">) => void;
  createFolder: (name: string, parentId?: string) => void;
  deletePrompt: (id: string) => void;
  deleteFolder: (id: string) => void;
  updatePrompt: (id: string, data: Partial<SavedPrompt>) => void;
  updateFolder: (id: string, name: string) => void;
  movePrompt: (promptId: string, folderId?: string) => void;
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

  const savePrompt = (prompt: Omit<SavedPrompt, "id" | "createdAt">) => {
    const newPrompt: SavedPrompt = {
      ...prompt,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setSavedPrompts((prev) => [...prev, newPrompt]);
  };

  const createFolder = (name: string, parentId?: string) => {
    const newFolder: PromptFolder = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
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

  const updateFolder = (id: string, name: string) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name } : f))
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
