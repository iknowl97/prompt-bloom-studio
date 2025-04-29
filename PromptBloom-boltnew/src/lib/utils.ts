import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class values using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Format date to locale string
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format time in minutes to readable format
 */
export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Delay execution (useful for animations)
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Convert a prompt object to a string
 */
export function promptToString(blocks: any[]): string {
  return blocks
    .sort((a, b) => a.position - b.position)
    .map(block => {
      if (block.type === 'variable') {
        return `{${block.content}}`;
      }
      if (block.type === 'condition') {
        return `[IF ${block.settings?.condition}: ${block.content}]`;
      }
      if (block.type === 'loop') {
        return `[FOR EACH ${block.settings?.loopVariable}: ${block.content}]`;
      }
      if (block.type === 'comment') {
        return `// ${block.content}`;
      }
      return block.content;
    })
    .join(' ');
}