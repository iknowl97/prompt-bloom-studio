
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePrompts, SavedPrompt } from "@/contexts/PromptContext";
import { useToast } from "@/hooks/use-toast";

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
  const [tags, setTags] = React.useState("");
  const { savePrompt, folders } = usePrompts();
  const [selectedFolder, setSelectedFolder] = React.useState<string | undefined>(undefined);
  const { toast } = useToast();

  const handleSave = () => {
    savePrompt({
      title,
      content: prompt,
      settings,
      folderId: selectedFolder,
      tags: tags.split(",").map(tag => tag.trim()).filter(Boolean),
    });
    toast({
      title: "Prompt saved",
      description: "Your prompt has been saved to your gallery.",
    });
    onOpenChange(false);
    setTitle(`Prompt ${new Date().toLocaleString()}`);
    setTags("");
    setSelectedFolder(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            <Input
              id="tags"
              placeholder="AI, writing, creative, etc."
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="col-span-3"
            />
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
