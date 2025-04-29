
import React from "react";
import { Tag } from "@/contexts/PromptContext";
import { X } from "lucide-react";

interface TagDisplayProps {
  tag: Tag;
  onRemove?: (id: string) => void;
  onClick?: (tag: Tag) => void;
  className?: string;
}

export function TagDisplay({ tag, onRemove, onClick, className = "" }: TagDisplayProps) {
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tag.color.bgColor} ${tag.color.textColor} ${onClick ? 'cursor-pointer hover:opacity-90' : ''} ${className}`}
      onClick={onClick ? () => onClick(tag) : undefined}
    >
      {tag.name}
      {onRemove && (
        <button 
          type="button" 
          onClick={(e) => {
            e.stopPropagation();
            onRemove(tag.id);
          }}
          className="ml-1 inline-flex items-center justify-center rounded-full focus:outline-none"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}
