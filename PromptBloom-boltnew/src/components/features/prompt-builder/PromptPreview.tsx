import { useState } from 'react';
import { Copy, CheckCircle2, Sparkles } from 'lucide-react';
import { PromptBlock } from '../../../types';
import { promptToString } from '../../../lib/utils';
import Button from '../../ui/Button';

interface PromptPreviewProps {
  blocks: PromptBlock[];
  onTestPrompt: () => void;
}

const PromptPreview = ({ blocks, onTestPrompt }: PromptPreviewProps) => {
  const [copied, setCopied] = useState(false);
  
  const promptString = promptToString(blocks);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(promptString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm">
      <div className="border-b px-4 py-3 flex justify-between items-center">
        <h3 className="font-medium">Prompt Preview</h3>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={copied ? 'accent' : 'ghost'}
            leftIcon={copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
            onClick={copyToClipboard}
            className="border border-gray-200"
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<Sparkles size={16} />}
            onClick={onTestPrompt}
          >
            Test Prompt
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        {blocks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Your prompt will appear here.</p>
            <p className="text-sm mt-1">Add blocks using the toolbar above.</p>
          </div>
        ) : (
          <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-md border border-gray-200">
            {promptString}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptPreview;