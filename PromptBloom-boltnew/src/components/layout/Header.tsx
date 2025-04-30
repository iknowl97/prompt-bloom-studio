
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X, User, BookOpen, Bookmark, Home } from 'lucide-react';
import Button from '../ui/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Prompt Builder', path: '/prompt-builder', icon: <Sparkles size={18} /> },
    { name: 'Custom Builder', path: '/custom-prompt-builder', icon: <Sparkles size={18} /> },
    { name: 'Templates', path: '/templates', icon: <Bookmark size={18} /> },
    { name: 'Learn', path: '/learn', icon: <BookOpen size={18} /> },
    { name: 'Community', path: '/community', icon: <User size={18} /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary-500" />
            <span className="font-heading font-bold text-xl">PromptHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group relative py-2"
              >
                <span className={`flex items-center gap-1.5 text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-primary-600'
                    : 'text-text-secondary hover:text-text-primary'
                }`}>
                  {item.icon}
                  {item.name}
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-px left-0 right-0 h-[2px] bg-primary-500"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              leftIcon={<User size={18} />}
            >
              Profile
            </Button>
            <Button variant="primary" size="sm">
              Create Prompt
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white border-t border-gray-100 shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center gap-2 p-2 rounded-md ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-text-secondary hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100 flex flex-col space-y-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  leftIcon={<User size={18} />}
                  className="justify-start"
                >
                  Profile
                </Button>
                <Button variant="primary" size="sm">
                  Create Prompt
                </Button>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
