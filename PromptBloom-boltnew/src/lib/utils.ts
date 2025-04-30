
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PromptBlock } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prompt blocks to a single string
export function promptToString(blocks: PromptBlock[]): string {
  return blocks.map(block => block.content).join('\n\n');
}

// Generate a unique ID for new blocks
export function generateBlockId(): string {
  return Math.random().toString(36).substring(2, 11);
}

// Check if a string contains placeholders marked with [PLACEHOLDER]
export function containsPlaceholders(str: string): boolean {
  return /\[([A-Z0-9_]+)\]/g.test(str);
}

// Extract placeholders from a string
export function extractPlaceholders(str: string): string[] {
  const matches = str.match(/\[([A-Z0-9_]+)\]/g) || [];
  return matches.map(match => match.slice(1, -1));
}

// Replace placeholders in a string with values
export function replacePlaceholders(str: string, values: Record<string, string>): string {
  let result = str;
  Object.entries(values).forEach(([key, value]) => {
    const regex = new RegExp(`\\[${key}\\]`, 'g');
    result = result.replace(regex, value);
  });
  return result;
}
