
import { Github, Twitter, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-white/10 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-[#8E9196] text-sm">
              © {new Date().getFullYear()} AiKnowledge. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Link to="/" className="text-[#8E9196] hover:text-white transition-colors">Home</Link>
            <Link to="/gallery" className="text-[#8E9196] hover:text-white transition-colors">Gallery</Link>
            <a href="#" className="text-[#8E9196] hover:text-white transition-colors">Guide</a>
            <a href="#" className="text-[#8E9196] hover:text-white transition-colors">About</a>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-[#8E9196] hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-[#8E9196] hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <div className="flex items-center text-[#8E9196] text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-white/80" />
              <span>by AiKnowledge</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
