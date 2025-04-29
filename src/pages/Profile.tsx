
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

const Profile = () => {
  const { user, isAuthenticated, updateProfile, updatePreferences } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "");
  const [defaultModel, setDefaultModel] = useState(user?.preferences?.defaultModelType || "deepseek/deepseek-chat-v3-0324:free");
  const [defaultTemperature, setDefaultTemperature] = useState(user?.preferences?.defaultTemperature || 0.7);
  const [theme, setTheme] = useState(user?.preferences?.theme || "light");

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

  const handleUpdateProfile = () => {
    updateProfile({ name, avatar: avatarUrl });
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleUpdatePreferences = () => {
    updatePreferences({ 
      defaultModelType: defaultModel,
      defaultTemperature: defaultTemperature,
      theme: theme
    });
    toast({
      title: "Preferences updated",
      description: "Your preferences have been updated successfully.",
    });
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
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="text-xl bg-gradient-to-br from-purple-500 to-indigo-700 text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Your display name"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        value={user.email} 
                        disabled 
                        placeholder="Your email address"
                      />
                      <p className="text-sm text-gray-500">Email address cannot be changed</p>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="avatar-url">Avatar URL</Label>
                      <Input 
                        id="avatar-url" 
                        value={avatarUrl} 
                        onChange={(e) => setAvatarUrl(e.target.value)} 
                        placeholder="https://example.com/avatar.jpg"
                      />
                      <p className="text-sm text-gray-500">Optional: Link to your avatar image</p>
                    </div>
                    
                    <Button onClick={handleUpdateProfile}>
                      Save Profile
                    </Button>
                  </div>
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
                      value={defaultModel}
                      onChange={(e) => setDefaultModel(e.target.value)}
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
                        value={defaultTemperature}
                        onChange={(e) => setDefaultTemperature(parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <span>{defaultTemperature}</span>
                    </div>
                    <p className="text-sm text-gray-500">Controls randomness: lower is more deterministic, higher is more creative</p>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="theme">Theme</Label>
                    <select 
                      id="theme"
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                  
                  <Button onClick={handleUpdatePreferences}>
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
