
import React, { createContext, useContext, useState, useEffect } from "react";

export type User = {
  email: string;
  name: string;
  avatar?: string;
  preferences?: {
    theme?: string;
    defaultModelType?: string;
    defaultTemperature?: number;
  };
};

type UserContextType = {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (userData: Partial<User>) => void;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Try to load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (email: string, name: string) => {
    const newUser = { 
      email, 
      name,
      preferences: {
        theme: 'light',
        defaultModelType: 'deepseek/deepseek-chat-v3-0324:free',
        defaultTemperature: 0.7,
      } 
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateProfile = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const updatePreferences = (preferences: Partial<User['preferences']>) => {
    if (!user) return;
    
    const updatedPreferences = { ...user.preferences, ...preferences };
    const updatedUser = { ...user, preferences: updatedPreferences };
    
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      updateProfile,
      updatePreferences
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
