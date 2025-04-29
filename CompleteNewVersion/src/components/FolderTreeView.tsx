
import React, { useState } from "react";
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen, 
  FolderPlus,
  Pencil,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { usePrompts, PromptFolder } from "@/contexts/PromptContext";
import { useToast } from "@/hooks/use-toast";
import { COLORS } from "@/config/constants";

interface FolderTreeViewProps {
  selectedFolderId?: string;
  onSelectFolder: (folderId?: string) => void;
}

export function FolderTreeView({ selectedFolderId, onSelectFolder }: FolderTreeViewProps) {
  const { folders, createFolder, deleteFolder, updateFolder } = usePrompts();
  const { toast } = useToast();
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const [newFolderName, setNewFolderName] = useState("");
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingFolderName, setEditingFolderName] = useState("");
  const [isCreatingRootFolder, setIsCreatingRootFolder] = useState(false);
  const [isCreatingSubFolder, setIsCreatingSubFolder] = useState<string | null>(null);

  // Get root level folders
  const rootFolders = folders.filter(f => !f.parentId);

  const toggleExpanded = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const handleCreateFolder = (parentId?: string) => {
    if (parentId) {
      setIsCreatingSubFolder(parentId);
    } else {
      setIsCreatingRootFolder(true);
    }
    setNewFolderName("");
  };

  const handleSaveNewFolder = (parentId?: string) => {
    if (!newFolderName.trim()) {
      toast({
        title: "Folder name required",
        description: "Please enter a name for your folder",
        variant: "destructive"
      });
      return;
    }
    
    // Generate a random pastel color
    const pastelColors = Object.values(COLORS.PASTEL);
    const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    
    createFolder(newFolderName.trim(), randomColor, parentId);
    setNewFolderName("");
    setIsCreatingRootFolder(false);
    setIsCreatingSubFolder(null);
    
    // Expand the parent folder
    if (parentId) {
      setExpandedFolders(prev => ({
        ...prev,
        [parentId]: true
      }));
    }
    
    toast({
      title: "Folder created",
      description: `"${newFolderName.trim()}" has been created successfully`
    });
  };

  const handleEditFolder = (folder: PromptFolder) => {
    setEditingFolderId(folder.id);
    setEditingFolderName(folder.name);
  };

  const handleSaveEdit = () => {
    if (!editingFolderId || !editingFolderName.trim()) {
      toast({
        title: "Folder name required",
        description: "Please enter a name for your folder",
        variant: "destructive"
      });
      return;
    }
    
    updateFolder(editingFolderId, { name: editingFolderName.trim() });
    setEditingFolderId(null);
    setEditingFolderName("");
    
    toast({
      title: "Folder updated",
      description: "Folder name has been updated successfully"
    });
  };

  const handleDeleteFolder = (folder: PromptFolder) => {
    deleteFolder(folder.id);
    
    // If the deleted folder was selected, reset selection
    if (selectedFolderId === folder.id) {
      onSelectFolder(undefined);
    }
    
    toast({
      title: "Folder deleted",
      description: `"${folder.name}" and all its contents have been deleted`
    });
  };

  const renderFolder = (folder: PromptFolder) => {
    // Get child folders
    const childFolders = folders.filter(f => f.parentId === folder.id);
    const isExpanded = expandedFolders[folder.id];
    const isSelected = selectedFolderId === folder.id;

    return (
      <div key={folder.id} className="select-none">
        <div className="flex items-center py-1">
          {childFolders.length > 0 ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleExpanded(folder.id)}
              className="h-5 w-5 p-0 mr-1"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          ) : (
            <div className="w-5 mr-1"></div>
          )}
          
          {editingFolderId === folder.id ? (
            <div className="flex items-center flex-1 mr-2">
              <Input
                value={editingFolderName}
                onChange={(e) => setEditingFolderName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit();
                  if (e.key === 'Escape') {
                    setEditingFolderId(null);
                    setEditingFolderName("");
                  }
                }}
                autoFocus
                className="h-7 py-1 text-sm mr-2"
              />
              <Button 
                size="sm" 
                variant="ghost"
                onClick={handleSaveEdit}
                className="h-7 px-2 py-0"
              >
                Save
              </Button>
            </div>
          ) : (
            <>
              <button
                className={`flex items-center flex-1 px-2 py-1 rounded-md text-sm ${
                  isSelected
                    ? "bg-prompt-100 text-prompt-800"
                    : "hover:bg-prompt-50"
                }`}
                onClick={() => onSelectFolder(folder.id)}
              >
                {isExpanded ? (
                  <FolderOpen className="h-4 w-4 mr-2" style={{ color: folder.color }} />
                ) : (
                  <Folder className="h-4 w-4 mr-2" style={{ color: folder.color }} />
                )}
                <span className="truncate">{folder.name}</span>
              </button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Pencil className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleCreateFolder(folder.id)}>
                    <FolderPlus className="h-4 w-4 mr-2" />
                    Add Subfolder
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleEditFolder(folder)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDeleteFolder(folder)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
        
        {isCreatingSubFolder === folder.id && (
          <div className="flex items-center ml-6 mt-1 mb-1">
            <Input
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="New folder name..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveNewFolder(folder.id);
                if (e.key === 'Escape') setIsCreatingSubFolder(null);
              }}
              autoFocus
              className="h-7 py-1 text-sm mr-2"
            />
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => handleSaveNewFolder(folder.id)}
              className="h-7 px-2 py-0"
            >
              Save
            </Button>
          </div>
        )}
        
        {isExpanded && childFolders.length > 0 && (
          <div className="pl-6">
            {childFolders.map(renderFolder)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-2 bg-white rounded-md border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-sm">Folders</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleCreateFolder()}
          className="h-7 px-2"
        >
          <FolderPlus className="h-4 w-4 mr-1" />
          New
        </Button>
      </div>
      
      <div className="space-y-1">
        <button
          className={`flex items-center w-full px-2 py-1 rounded-md text-sm ${
            !selectedFolderId ? "bg-prompt-100 text-prompt-800" : "hover:bg-prompt-50"
          }`}
          onClick={() => onSelectFolder(undefined)}
        >
          All Prompts
        </button>
        
        {isCreatingRootFolder && (
          <div className="flex items-center mt-1">
            <Input
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="New folder name..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveNewFolder();
                if (e.key === 'Escape') setIsCreatingRootFolder(false);
              }}
              autoFocus
              className="h-7 py-1 text-sm mr-2"
            />
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => handleSaveNewFolder()}
              className="h-7 px-2 py-0"
            >
              Save
            </Button>
          </div>
        )}
        
        {rootFolders.map(renderFolder)}
      </div>
    </div>
  );
}
