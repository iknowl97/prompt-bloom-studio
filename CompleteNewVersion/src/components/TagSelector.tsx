
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus, Tag as TagIcon } from "lucide-react";
import { usePrompts, Tag } from "@/contexts/PromptContext";
import { TagDisplay } from "@/components/TagDisplay";

interface TagSelectorProps {
  selectedTags: Tag[];
  onTagAdd: (tag: Tag) => void;
  onTagRemove: (tagId: string) => void;
  promptContent?: string;
}

export function TagSelector({ 
  selectedTags, 
  onTagAdd, 
  onTagRemove,
  promptContent
}: TagSelectorProps) {
  const { createTag, suggestTagsFromContent } = usePrompts();
  const [tagInput, setTagInput] = useState("");
  const [suggestedTags, setSuggestedTags] = useState<Tag[]>([]);

  // Generate tag suggestions when prompt content changes
  useEffect(() => {
    if (promptContent) {
      const suggestions = suggestTagsFromContent(promptContent);
      
      // Filter out tags that are already selected
      const filteredSuggestions = suggestions.filter(
        suggestedTag => !selectedTags.some(
          selectedTag => selectedTag.name.toLowerCase() === suggestedTag.name.toLowerCase()
        )
      );
      
      setSuggestedTags(filteredSuggestions);
    }
  }, [promptContent, selectedTags, suggestTagsFromContent]);

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    const newTag = createTag(tagInput.trim());
    onTagAdd(newTag);
    setTagInput("");
  };

  const handleAddSuggestedTag = (tag: Tag) => {
    onTagAdd(tag);
    setSuggestedTags(prev => prev.filter(t => t.id !== tag.id));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 min-h-[28px]">
        {selectedTags.map(tag => (
          <TagDisplay 
            key={tag.id} 
            tag={tag} 
            onRemove={onTagRemove} 
            showHash={true}
          />
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
            className="pl-9"
          />
        </div>
        <Button 
          type="button" 
          onClick={handleAddTag}
          size="sm"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {suggestedTags.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs text-gray-500">Suggested tags:</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestedTags.map(tag => (
              <button 
                key={tag.id}
                type="button" 
                onClick={() => handleAddSuggestedTag(tag)}
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${tag.color.bgColor} ${tag.color.textColor} hover:opacity-90 transition-opacity`}
              >
                <Plus className="h-3 w-3 mr-1" />
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
