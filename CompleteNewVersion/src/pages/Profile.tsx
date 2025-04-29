import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  Star,
  History,
  Award,
  Edit,
  Save,
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  joinedDate: string;
  stats: {
    promptsCreated: number;
    templatesShared: number;
    modulesCompleted: number;
  };
  achievements: {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    earned: boolean;
  }[];
}

const mockProfile: UserProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  role: "Prompt Engineer",
  joinedDate: "January 2024",
  stats: {
    promptsCreated: 42,
    templatesShared: 12,
    modulesCompleted: 8,
  },
  achievements: [
    {
      id: "first-prompt",
      name: "First Prompt",
      description: "Created your first prompt",
      icon: Star,
      earned: true,
    },
    {
      id: "template-master",
      name: "Template Master",
      description: "Created 10 templates",
      icon: Award,
      earned: true,
    },
    {
      id: "learner",
      name: "Dedicated Learner",
      description: "Completed all basic tutorials",
      icon: History,
      earned: false,
    },
  ],
};

const Profile = () => {
  const { user, isAuthenticated, updateProfile, updatePreferences } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockProfile);

  // Check if user is logged in
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      toast({
        title: "Access denied",
        description: "Please log in to access your profile",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, navigate, toast]);

  const handleSave = () => {
    setIsEditing(false);
    // Save profile changes
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-full">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-text-primary">
                        {profile.name}
                      </h1>
                      <p className="text-text-secondary">{profile.role}</p>
                      <p className="text-sm text-text-secondary">
                        Member since {profile.joinedDate}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="default-model">Default AI Model</Label>
                    <select 
                      id="default-model"
                      value={user?.preferences?.defaultModelType || "deepseek/deepseek-chat-v3-0324:free"}
                      onChange={(e) => updatePreferences({ 
                        defaultModelType: e.target.value,
                        defaultTemperature: user?.preferences?.defaultTemperature || 0.7,
                        theme: user?.preferences?.theme || "light"
                      })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="deepseek/deepseek-chat-v3-0324:free">DeepSeek Chat v3</option>
                      <option value="anthropic/claude-3-opus:free">Claude 3 Opus</option>
                      <option value="openai/gpt-4o:free">GPT-4o</option>
                    </select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="temperature">Default Temperature</Label>
                    <div className="flex items-center space-x-4">
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.1"
                        value={user?.preferences?.defaultTemperature || 0.7}
                        onChange={(e) => updatePreferences({ 
                          defaultModelType: user?.preferences?.defaultModelType || "deepseek/deepseek-chat-v3-0324:free",
                          defaultTemperature: parseFloat(e.target.value),
                          theme: user?.preferences?.theme || "light"
                        })}
                        className="w-full"
                      />
                      <span>{user?.preferences?.defaultTemperature || 0.7}</span>
                    </div>
                    <p className="text-sm text-gray-500">Controls randomness: lower is more deterministic, higher is more creative</p>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="theme">Theme</Label>
                    <select 
                      id="theme"
                      value={user?.preferences?.theme || "light"}
                      onChange={(e) => updatePreferences({ 
                        defaultModelType: user?.preferences?.defaultModelType || "deepseek/deepseek-chat-v3-0324:free",
                        defaultTemperature: user?.preferences?.defaultTemperature || 0.7,
                        theme: e.target.value
                      })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                  
                  <Button onClick={() => updatePreferences({ 
                    defaultModelType: user?.preferences?.defaultModelType || "deepseek/deepseek-chat-v3-0324:free",
                    defaultTemperature: user?.preferences?.defaultTemperature || 0.7,
                    theme: user?.preferences?.theme || "light"
                  })}>
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input 
                      id="current-password" 
                      type="password" 
                      placeholder="Enter your current password"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      placeholder="Enter your new password"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="Confirm your new password"
                    />
                  </div>
                  
                  <Button>
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
