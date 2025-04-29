import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Bookmark, Home, Settings, HelpCircle } from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar = ({ collapsed = false }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Prompt Builder', path: '/prompt-builder', icon: <Sparkles size={20} /> },
    { name: 'Templates', path: '/templates', icon: <Bookmark size={20} /> },
    { name: 'Learn', path: '/learn', icon: <BookOpen size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    { name: 'Help', path: '/help', icon: <HelpCircle size={20} /> },
  ];

  return (
    <aside
      className={`bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center">
        <Sparkles className="h-8 w-8 text-primary-500 flex-shrink-0" />
        {!collapsed && (
          <span className="ml-2 font-heading font-bold text-lg">Prompt Bloom</span>
        )}
      </div>

      <nav className="mt-6 px-2">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center ${
                    collapsed ? 'justify-center' : 'justify-start'
                  } px-3 py-3 rounded-md transition-colors relative ${
                    isActive
                      ? 'text-primary-600'
                      : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActiveIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-r-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;