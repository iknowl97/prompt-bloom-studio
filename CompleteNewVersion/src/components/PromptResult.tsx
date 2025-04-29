import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CheckCheck, Star, StarOff, MessageSquare, Save, Download, Brain, Zap, Settings2, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SavePromptDialog } from "@/components/SavePromptDialog";
import { AuthModal } from "@/components/AuthModal";
import { useUser } from "@/hooks/use-user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { FileJson, FileText, FileCode } from "lucide-react";

interface PromptResultProps {
  prompt: string;
  settings: {
    temperature: number;
    modelType: string;
  };
}

export function PromptResult({ prompt, settings }: PromptResultProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { isAuthenticated } = useUser();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard.",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      toast({
        title: "Added to favorites",
        description: "This prompt has been saved to your favorites.",
      });
    }
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
    
    setSaveDialogOpen(true);
  };

  const downloadPrompt = (format: "json" | "md" | "xml") => {
    let content = "";
    let mimeType = "";
    let fileExtension = "";
    const title = `Prompt ${new Date().toLocaleString()}`;
    
    if (format === "json") {
      content = JSON.stringify({
        title,
        content: prompt,
        settings,
        createdAt: new Date().toISOString(),
      }, null, 2);
      mimeType = "application/json";
      fileExtension = "json";
    } else if (format === "md") {
      content = `# ${title}\n\n${prompt}\n\n## Settings\n\n- Model: ${settings.modelType}\n- Temperature: ${settings.temperature}\n\n## Created\n\n${new Date().toLocaleString()}`;
      mimeType = "text/markdown";
      fileExtension = "md";
    } else if (format === "xml") {
      content = `<prompt>\n  <title>${title}</title>\n  <content>${prompt}</content>\n  <settings>\n    <model>${settings.modelType}</model>\n    <temperature>${settings.temperature}</temperature>\n  </settings>\n  <createdAt>${new Date().toISOString()}</createdAt>\n</prompt>`;
      mimeType = "application/xml";
      fileExtension = "xml";
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prompt_${Date.now()}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Prompt downloaded",
      description: `Downloaded in ${format.toUpperCase()} format.`,
    });
  };

  // Map model names to their respective icons
  const getModelIcon = () => {
    switch (settings.modelType) {
      case "gpt-4.5-preview":
      case "anthropic/claude-3-opus:free":
        return <img src="https://aeiljuispo.cloudimg.io/v7/https://cdn-uploads.huggingface.co/production/uploads/6317aebb83d8d2fd903192d9/STU-lwrfXUVDQXZf3c45l.jpeg" alt="Claude Icon" className="h-5 w-5 mr-2" />;
      case "gpt-4o":
      case "openai/gpt-4o:free":
        return <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png" alt="GPT-4o Icon" className="h-5 w-5 mr-2" />;
      case "gemini-pro":
      case "google/gemini-2.5-pro-exp-03-25:free":
        return <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_advanced_9b19b6f5ef3bd3c6f2ab5318c5db21bc.svg" alt="Gemini Icon" className="h-5 w-5 mr-2" />;
      case "llama3-70b":
      case "meta/llama-3-70b-instruct:free":
        return <img src="https://scontent.fsof10-1.fna.fbcdn.net/v/t39.30808-6/431213095_402960668997258_8578409586953646722_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=j5CmlFvpEu0AX-qHztz&_nc_oc=AQkT-LZq0zUvLdHNHktMGcPP-7LtB9Rjm4DQvRk7SyF2B7Pj1qIE7LYzsrZ0RXzeMwU&_nc_ht=scontent.fsof10-1.fna&oh=00_AfDMH7Cgs6FO7oedU3A8npP42EUwP3oIkdqvCZnJFJqUHQ&oe=66303F1C" alt="Llama Icon" className="h-5 w-5 mr-2" />;
      default:
        return <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png" alt="GPT-4o Mini Icon" className="h-5 w-5 mr-2" />;
    }
  };

  return (
    <Card className="w-full shadow-lg border-gray-200 bg-white">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <MessageSquare className="h-5 w-5 text-gray-600 mt-1 flex-shrink-0" />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">Generated Prompt</h3>
              <p className="text-sm text-gray-500">
                Model: {settings.modelType} • Temperature: {settings.temperature}
              </p>
            </div>
          </div>
          
          <div className="bg-white backdrop-blur-sm rounded-md p-4 border border-gray-200">
            <p className="text-gray-800 whitespace-pre-wrap">{prompt}</p>
          </div>

          <div className="p-4 bg-prompt-50 rounded-md mt-1 border border-prompt-100">
            <div className="flex items-start gap-3">
              {prompt.length > 200 ? (
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200 flex-1">
                  <div className="flex items-center">
                    {getModelIcon()}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Advanced Processing</h4>
                      <p className="text-sm text-gray-600">Recommended: <span className="font-medium">Claude 3 Opus</span></p>
                    </div>
                  </div>
                </div>
              ) : prompt.includes("creative") || prompt.includes("imagine") ? (
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200 flex-1">
                  <div className="flex items-center">
                    {getModelIcon()}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Creative Tasks</h4>
                      <p className="text-sm text-gray-600">Recommended: <span className="font-medium">GPT-4o</span></p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200 flex-1">
                  <div className="flex items-center">
                    {getModelIcon()}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Fast Processing</h4>
                      <p className="text-sm text-gray-600">Recommended: <span className="font-medium">GPT-4o Mini</span></p>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200">
                <Settings2 className="h-5 w-5 text-gray-700" />
                <div>
                  <p className="text-sm text-gray-600">Temperature: <span className="font-medium">{settings.temperature}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-100 bg-prompt-50/50 py-3 px-6">
        <div className="flex justify-between w-full">
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={handleFavorite}
            >
              {isFavorited ? (
                <><Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" /> Favorited</>
              ) : (
                <><StarOff className="mr-1 h-4 w-4" /> Add to Favorites</>
              )}
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={handleSave}
            >
              <Save className="mr-1 h-4 w-4" /> Save
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 border-gray-200"
                >
                  <Download className="mr-1 h-4 w-4" /> Download
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem onClick={() => downloadPrompt("json")} className="text-gray-700 hover:text-gray-900">
                  <FileJson className="mr-2 h-4 w-4" /> JSON Format
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadPrompt("md")} className="text-gray-700 hover:text-gray-900">
                  <FileText className="mr-2 h-4 w-4" /> Markdown Format
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadPrompt("xml")} className="text-gray-700 hover:text-gray-900">
                  <FileCode className="mr-2 h-4 w-4" /> XML Format
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              size="sm"
              className="bg-gradient-to-r from-prompt-900 to-prompt-700 text-white hover:from-prompt-800 hover:to-prompt-600 border-0"
              onClick={handleCopy}
            >
              {isCopied ? (
                <><CheckCheck className="mr-1 h-4 w-4" /> Copied</>
              ) : (
                <><Copy className="mr-1 h-4 w-4" /> Copy Prompt</>
              )}
            </Button>
          </div>
        </div>
      </CardFooter>

      <SavePromptDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        prompt={prompt}
        settings={settings}
      />
      
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onSuccess={() => {
          setSaveDialogOpen(true);
          setAuthModalOpen(false);
        }}
      />
    </Card>
  );
}
