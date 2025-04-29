
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { USER_ROLES } from "@/config/constants";
import { User, Edit, Trash, Shield } from "lucide-react";

const mockUsers = [
  { id: "1", name: "Admin User", email: "admin@example.com", role: USER_ROLES.ADMIN, isActive: true },
  { id: "2", name: "John Doe", email: "john@example.com", role: USER_ROLES.USER, isActive: true },
  { id: "3", name: "Jane Smith", email: "jane@example.com", role: USER_ROLES.USER, isActive: true },
  { id: "4", name: "Sam Wilson", email: "sam@example.com", role: USER_ROLES.USER, isActive: false },
];

const Admin = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState<any | null>(null);

  // Check if user is admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      toast({
        title: "Access denied",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      return;
    }

    // This is a mock check - in a real app, you'd verify the role from the context
    const isAdmin = true; // Simulated admin check
    if (!isAdmin) {
      navigate("/");
      toast({
        title: "Permission denied",
        description: "You don't have permission to access the admin panel",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, navigate, toast]);

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    ));
    
    toast({
      title: "User status updated",
      description: `User status has been updated successfully.`,
    });
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    ));
    
    toast({
      title: "User role updated",
      description: `User role has been changed to ${newRole}.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      setUsers(users.filter(u => u.id !== userId));
      
      toast({
        title: "User deleted",
        description: "User has been deleted successfully.",
      });
    }
  };

  const handleEditUser = (user: any) => {
    setEditUser(user);
  };

  const handleSaveUser = () => {
    if (!editUser) return;
    
    setUsers(users.map(u => 
      u.id === editUser.id ? editUser : u
    ));
    
    setEditUser(null);
    
    toast({
      title: "User updated",
      description: "User information has been updated successfully.",
    });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) || 
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>
        
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    User Management
                  </div>
                  <div className="relative w-64">
                    <Input
                      placeholder="Search users..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-8"
                    />
                    <div className="absolute left-2 top-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </svg>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editUser ? (
                  <div className="space-y-4 p-4 border rounded-md">
                    <h3 className="font-medium">Edit User</h3>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input 
                            id="name" 
                            value={editUser.name} 
                            onChange={(e) => setEditUser({...editUser, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            value={editUser.email} 
                            onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="role">Role</Label>
                          <select 
                            id="role"
                            value={editUser.role}
                            onChange={(e) => setEditUser({...editUser, role: e.target.value})}
                            className="w-full p-2 border rounded-md"
                          >
                            <option value={USER_ROLES.USER}>User</option>
                            <option value={USER_ROLES.ADMIN}>Admin</option>
                          </select>
                        </div>
                        <div className="flex items-center space-x-2 mt-8">
                          <Switch 
                            checked={editUser.isActive} 
                            onCheckedChange={(checked) => setEditUser({...editUser, isActive: checked})}
                            id="active-status"
                          />
                          <Label htmlFor="active-status">Active</Label>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveUser}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setEditUser(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map(user => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="text-gray-600 text-sm font-medium">{user.name[0]}</span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={user.role === USER_ROLES.ADMIN ? "bg-purple-500" : "bg-blue-500"}>
                                {user.role}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Switch 
                                  checked={user.isActive} 
                                  onCheckedChange={() => handleToggleStatus(user.id)} 
                                />
                                <span className={`ml-2 text-sm ${user.isActive ? "text-green-600" : "text-red-600"}`}>
                                  {user.isActive ? "Active" : "Inactive"}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => handleEditUser(user)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => handleRoleChange(user.id, user.role === USER_ROLES.ADMIN ? USER_ROLES.USER : USER_ROLES.ADMIN)}
                                >
                                  <Shield className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Global Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="api-key">OpenRouter API Key</Label>
                    <Input 
                      id="api-key" 
                      value="sk-or-v1-45bbda2c****************************************" 
                      type="password"
                      disabled
                    />
                    <p className="text-sm text-gray-500">To change API keys, update the environment variables in your deployment.</p>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="default-model">Default AI Model</Label>
                    <select 
                      id="default-model"
                      className="w-full p-2 border rounded-md"
                      defaultValue="deepseek/deepseek-chat-v3-0324:free"
                    >
                      <option value="deepseek/deepseek-chat-v3-0324:free">DeepSeek Chat v3</option>
                      <option value="anthropic/claude-3-opus:free">Claude 3 Opus</option>
                      <option value="openai/gpt-4o:free">GPT-4o</option>
                    </select>
                  </div>
                  
                  <Button>Save Settings</Button>
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

export default Admin;
