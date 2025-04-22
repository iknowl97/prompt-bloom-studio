import React, { useState } from "react";
import { usePrompts, SavedPrompt, PromptFolder } from "@/contexts/PromptContext";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Save, BookmarkPlus, FolderPlus, Download, 
  MoreVertical, Trash, Edit, FileJson, FileText, FileCode,
  GalleryHorizontal, GalleryVertical, Bookmark, Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PromptGallery() {
  const { savedPrompts, folders, createFolder, deletePrompt, deleteFolder, updateFolder } = usePrompts();
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [parentFolderId, setParentFolderId] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentFolder, setCurrentFolder] = useState<string | undefined>(undefined);
  const [promptInfoOpen, setPromptInfoOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<SavedPrompt | null>(null);
  const { toast } = useToast();

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName, currentFolder);
      setNewFolderName("");
      setFolderDialogOpen(false);
      toast({
        title: "Folder created",
        description: `Folder "${newFolderName}" has been created.`,
      });
    }
  };

  const handleDeletePrompt = (id: string) => {
    deletePrompt(id);
    toast({
      title: "Prompt deleted",
      description: "The prompt has been removed from your gallery.",
    });
  };

  const handleDeleteFolder = (id: string) => {
    deleteFolder(id);
    toast({
      title: "Folder deleted",
      description: "The folder and its contents have been removed.",
    });
  };

  const navigateToFolder = (folderId?: string) => {
    setCurrentFolder(folderId);
  };

  const getCurrentFolderName = () => {
    if (!currentFolder) return "All Prompts";
    const folder = folders.find(f => f.id === currentFolder);
    return folder ? folder.name : "Unknown Folder";
  };

  const breadcrumbs = () => {
    const items = [];
    items.push({ id: undefined, name: "Root" });
    
    let current = currentFolder;
    while (current) {
      const folder = folders.find(f => f.id === current);
      if (folder) {
        items.unshift({ id: folder.id, name: folder.name });
        current = folder.parentId;
      } else {
        break;
      }
    }
    
    return items;
  };

  const downloadPrompt = (prompt: SavedPrompt, format: "json" | "md" | "xml") => {
    let content = "";
    let mimeType = "";
    let fileExtension = "";
    
    if (format === "json") {
      content = JSON.stringify(prompt, null, 2);
      mimeType = "application/json";
      fileExtension = "json";
    } else if (format === "md") {
      content = `# ${prompt.title}\n\n${prompt.content}\n\n## Settings\n\n- Model: ${prompt.settings.modelType}\n- Temperature: ${prompt.settings.temperature}\n\n## Tags\n\n${prompt.tags?.join(", ") || "No tags"}\n\n## Created\n\n${new Date(prompt.createdAt).toLocaleString()}`;
      mimeType = "text/markdown";
      fileExtension = "md";
    } else if (format === "xml") {
      content = `<prompt>\n  <title>${prompt.title}</title>\n  <content>${prompt.content}</content>\n  <settings>\n    <model>${prompt.settings.modelType}</model>\n    <temperature>${prompt.settings.temperature}</temperature>\n  </settings>\n  <tags>${prompt.tags?.join(", ") || ""}</tags>\n  <createdAt>${prompt.createdAt}</createdAt>\n</prompt>`;
      mimeType = "application/xml";
      fileExtension = "xml";
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${prompt.title.replace(/\s+/g, "_").toLowerCase()}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Prompt downloaded",
      description: `Downloaded in ${format.toUpperCase()} format.`,
    });
  };

  const showPromptInfo = (prompt: SavedPrompt) => {
    setSelectedPrompt(prompt);
    setPromptInfoOpen(true);
  };

  const currentFolders = folders.filter(f => f.parentId === currentFolder);
  const currentPrompts = savedPrompts.filter(p => p.folderId === currentFolder);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-prompt-900">Your Prompt Gallery</h2>
          <div className="flex space-x-1">
            {breadcrumbs().map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-gray-400"> / </span>}
                <button 
                  onClick={() => navigateToFolder(item.id)} 
                  className="text-gray-600 hover:text-prompt-600"
                >
                  {item.name}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setViewMode("grid")} 
            className={viewMode === "grid" ? "bg-prompt-100" : ""}
          >
            <GalleryHorizontal className="h-4 w-4 mr-2" />
            Grid
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setViewMode("list")} 
            className={viewMode === "list" ? "bg-prompt-100" : ""}
          >
            <GalleryVertical className="h-4 w-4 mr-2" />
            List
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setFolderDialogOpen(true)}
          >
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      {currentFolders.length === 0 && currentPrompts.length === 0 ? (
        <div className="text-center py-12">
          <Bookmark className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No prompts or folders yet</h3>
          <p className="text-gray-500 mb-4">
            Save your generated prompts to build your personal library
          </p>
          <Button onClick={() => setFolderDialogOpen(true)}>
            <FolderPlus className="mr-2 h-4 w-4" />
            Create a Folder
          </Button>
        </div>
      ) : (
        <>
          {currentFolders.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Folders</h3>
              <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "grid-cols-1 gap-2"}`}>
                {currentFolders.map((folder) => (
                  <Card key={folder.id} className={viewMode === "list" ? "flex items-center" : ""}>
                    {viewMode === "list" ? (
                      <div className="flex justify-between items-center w-full p-4">
                        <div className="flex items-center">
                          <Button 
                            variant="ghost" 
                            className="mr-2" 
                            onClick={() => navigateToFolder(folder.id)}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            {folder.name}
                          </Button>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDeleteFolder(folder.id)}>
                              <Trash className="h-4 w-4 mr-2" />
                              Delete Folder
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ) : (
                      <>
                        <CardHeader>
                          <CardTitle>{folder.name}</CardTitle>
                          <CardDescription>
                            Created {new Date(folder.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="justify-between">
                          <Button 
                            variant="outline" 
                            onClick={() => navigateToFolder(folder.id)}
                          >
                            Open
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleDeleteFolder(folder.id)}>
                                <Trash className="h-4 w-4 mr-2" />
                                Delete Folder
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardFooter>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentPrompts.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Prompts</h3>
              <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "grid-cols-1 gap-2"}`}>
                {currentPrompts.map((prompt) => (
                  <Card key={prompt.id} className={viewMode === "list" ? "flex items-center" : ""}>
                    {viewMode === "list" ? (
                      <div className="flex justify-between items-center w-full p-4">
                        <div className="flex items-center">
                          <div className="mr-2">
                            <h4 className="font-medium">{prompt.title}</h4>
                            <p className="text-sm text-gray-500 truncate max-w-[300px]">
                              {prompt.content.substring(0, 60)}...
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => showPromptInfo(prompt)}
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => downloadPrompt(prompt, "json")}>
                                <FileJson className="h-4 w-4 mr-2" />
                                Download as JSON
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => downloadPrompt(prompt, "md")}>
                                <FileText className="h-4 w-4 mr-2" />
                                Download as Markdown
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => downloadPrompt(prompt, "xml")}>
                                <FileCode className="h-4 w-4 mr-2" />
                                Download as XML
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeletePrompt(prompt.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <CardHeader>
                          <CardTitle>{prompt.title}</CardTitle>
                          <CardDescription>
                            Model: {prompt.settings.modelType} • Temp: {prompt.settings.temperature}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 line-clamp-3">{prompt.content}</p>
                          {prompt.tags && prompt.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {prompt.tags.map((tag, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="justify-between">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => showPromptInfo(prompt)}
                          >
                            <Info className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => downloadPrompt(prompt, "json")}>
                                <FileJson className="h-4 w-4 mr-2" />
                                Download as JSON
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => downloadPrompt(prompt, "md")}>
                                <FileText className="h-4 w-4 mr-2" />
                                Download as Markdown
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => downloadPrompt(prompt, "xml")}>
                                <FileCode className="h-4 w-4 mr-2" />
                                Download as XML
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardFooter>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* New Folder Dialog */}
      <Dialog open={folderDialogOpen} onOpenChange={setFolderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="folderName" className="text-right">
                Folder Name
              </label>
              <Input
                id="folderName"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleCreateFolder}>
              Create Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Prompt Info Dialog */}
      {selectedPrompt && (
        <Dialog open={promptInfoOpen} onOpenChange={setPromptInfoOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>{selectedPrompt.title}</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="preview">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="mt-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-md p-4 border border-prompt-100">
                  <p className="text-gray-800 whitespace-pre-wrap">{selectedPrompt.content}</p>
                </div>
              </TabsContent>
              <TabsContent value="details" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium">Model Settings</h4>
                    <p className="text-sm text-gray-500">
                      Model: {selectedPrompt.settings.modelType} • Temperature: {selectedPrompt.settings.temperature}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Created</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(selectedPrompt.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {selectedPrompt.tags && selectedPrompt.tags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium">Tags</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedPrompt.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-medium">AI Model Recommendation</h4>
                    <div className="p-3 bg-prompt-50 rounded-md mt-1 text-sm">
                      {selectedPrompt.content.length > 500 ? (
                        <p>
                          For complex, detailed prompts like this, consider using <strong>GPT-4</strong> or <strong>Claude 3 Opus</strong> for optimal results.
                        </p>
                      ) : selectedPrompt.content.includes("creative") || selectedPrompt.content.includes("imagine") ? (
                        <p>
                          For creative tasks, <strong>Midjourney</strong> or <strong>DALL-E 3</strong> would produce excellent visual results from this prompt.
                        </p>
                      ) : selectedPrompt.content.includes("analyze") || selectedPrompt.content.includes("data") ? (
                        <p>
                          For analytical tasks, <strong>Claude 3 Opus</strong> or <strong>GPT-4</strong> with <strong>retrieval capabilities</strong> would provide the most accurate results.
                        </p>
                      ) : (
                        <p>
                          This prompt would work well with <strong>GPT-4</strong> or <strong>Claude 3 Sonnet</strong> for a balance of quality and cost-efficiency.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleDeletePrompt(selectedPrompt.id)}
                className="flex-shrink-0"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <div className="flex space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => downloadPrompt(selectedPrompt, "json")}>
                      <FileJson className="h-4 w-4 mr-2" />
                      Download as JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadPrompt(selectedPrompt, "md")}>
                      <FileText className="h-4 w-4 mr-2" />
                      Download as Markdown
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadPrompt(selectedPrompt, "xml")}>
                      <FileCode className="h-4 w-4 mr-2" />
                      Download as XML
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
