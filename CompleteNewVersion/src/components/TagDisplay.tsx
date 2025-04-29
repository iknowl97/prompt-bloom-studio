
import React from "react";
import { Tag } from "@/contexts/PromptContext";
import { X, Hash } from "lucide-react";

interface TagDisplayProps {
  tag: Tag;
  onRemove?: (id: string) => void;
  onClick?: (tag: Tag) => void;
  className?: string;
  showHash?: boolean;
}

export function TagDisplay({ 
  tag, 
  onRemove, 
  onClick, 
  className = "",
  showHash = false
}: TagDisplayProps) {
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-200 ${tag.color.bgColor} ${tag.color.textColor} ${onClick ? 'cursor-pointer hover:opacity-90' : ''} ${className}`}
      onClick={onClick ? () => onClick(tag) : undefined}
    >
      {showHash && <Hash className="h-3 w-3 mr-1" />}
      {tag.name}
      {onRemove && (
        <button 
          type="button" 
          onClick={(e) => {
            e.stopPropagation();
            onRemove(tag.id);
          }}
          className="ml-1 inline-flex items-center justify-center rounded-full hover:bg-opacity-20 hover:bg-black focus:outline-none"
          aria-label={`Remove ${tag.name} tag`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}
