
import { Github, Twitter, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} PromptBloom. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-500 hover:text-prompt-600 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-prompt-600 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <div className="flex items-center text-gray-500 text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500" />
              <span>by Lovable</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
