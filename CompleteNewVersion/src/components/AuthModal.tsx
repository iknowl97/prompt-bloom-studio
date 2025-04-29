
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AuthModal({ open, onOpenChange, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        // Simulating login - in a real app, connect to your backend
        console.log("Logging in with:", email, password);
        localStorage.setItem("user", JSON.stringify({ email, name: "User" }));
      } else {
        // Simulating signup - in a real app, connect to your backend
        console.log("Signing up with:", email, password, name);
        localStorage.setItem("user", JSON.stringify({ email, name }));
      }
      
      toast({
        title: isLogin ? "Login successful" : "Account created",
        description: isLogin 
          ? "Welcome back to AiKnowledge!" 
          : "Your account has been created successfully.",
      });
      
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Auth error:", error);
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isLogin 
              ? "Sign in to save prompts to your gallery" 
              : "Join AiKnowledge to save and manage your AI prompts"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleAuth} className="space-y-4 py-2">
          {!isLogin && (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                className="border-gray-300"
              />
            </div>
          )}
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-gray-300"
            />
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-gray-300"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-prompt-600 to-prompt-500 hover:from-prompt-700 hover:to-prompt-600"
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </Button>
          
          <div className="text-center text-sm">
            <span className="text-gray-500">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button 
              type="button" 
              onClick={toggleAuthMode}
              className="text-prompt-600 hover:text-prompt-700 font-medium"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
