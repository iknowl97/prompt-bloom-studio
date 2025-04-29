
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePrompts, SavedPrompt, Tag } from "@/contexts/PromptContext";
import { useToast } from "@/hooks/use-toast";
import { X, Plus } from "lucide-react";

interface SavePromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: string;
  settings: {
    temperature: number;
    modelType: string;
  };
}

export function SavePromptDialog({ open, onOpenChange, prompt, settings }: SavePromptDialogProps) {
  const [title, setTitle] = React.useState(`Prompt ${new Date().toLocaleString()}`);
  const [tagInput, setTagInput] = React.useState("");
  const { savePrompt, folders, suggestTagsFromContent, createTag } = usePrompts();
  const [selectedFolder, setSelectedFolder] = React.useState<string | undefined>(undefined);
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);
  const [suggestedTags, setSuggestedTags] = React.useState<Tag[]>([]);
  const { toast } = useToast();

  // Generate tag suggestions when dialog opens
  React.useEffect(() => {
    if (open && prompt) {
      const suggestions = suggestTagsFromContent(prompt);
      setSuggestedTags(suggestions);
    }
  }, [open, prompt, suggestTagsFromContent]);

  const handleSave = () => {
    savePrompt({
      title,
      content: prompt,
      settings,
      folderId: selectedFolder,
      tags: selectedTags,
    });
    toast({
      title: "Prompt saved",
      description: "Your prompt has been saved to your gallery.",
    });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle(`Prompt ${new Date().toLocaleString()}`);
    setTagInput("");
    setSelectedTags([]);
    setSelectedFolder(undefined);
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    const newTag = createTag(tagInput.trim());
    setSelectedTags(prev => [...prev, newTag]);
    setTagInput("");
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(prev => prev.filter(tag => tag.id !== tagId));
  };

  const handleAddSuggestedTag = (tag: Tag) => {
    // Don't add if already selected
    if (selectedTags.some(t => t.name.toLowerCase() === tag.name.toLowerCase())) return;
    
    setSelectedTags(prev => [...prev, tag]);
    // Remove from suggestions
    setSuggestedTags(prev => prev.filter(t => t.id !== tag.id));
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetForm();
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Prompt</DialogTitle>
          <DialogDescription>
            Save this prompt to your personal gallery for future use.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Tags
            </Label>
            <div className="col-span-3 space-y-2">
              <div className="flex flex-wrap gap-2">
                {selectedTags.map(tag => (
                  <span 
                    key={tag.id} 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tag.color.bgColor} ${tag.color.textColor}`}
                  >
                    {tag.name}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTag(tag.id)}
                      className="ml-1 inline-flex items-center justify-center rounded-full focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleAddTag}
                  size="sm"
                  variant="outline"
                  className="flex-shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {suggestedTags.length > 0 && (
                <>
                  <div className="text-xs text-gray-500 mt-2">Suggested tags:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedTags.map(tag => (
                      <button 
                        key={tag.id}
                        type="button" 
                        onClick={() => handleAddSuggestedTag(tag)}
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${tag.color.bgColor} ${tag.color.textColor} hover:opacity-90`}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="folder" className="text-right">
              Folder
            </Label>
            <select
              id="folder"
              value={selectedFolder || ""}
              onChange={(e) => setSelectedFolder(e.target.value || undefined)}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">No folder (root)</option>
              {folders.filter(f => !f.parentId).map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
              {folders.filter(f => f.parentId).map((folder) => {
                const parent = folders.find(f => f.id === folder.parentId);
                return (
                  <option key={folder.id} value={folder.id}>
                    {parent ? `${parent.name} / ${folder.name}` : folder.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save to Gallery
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
