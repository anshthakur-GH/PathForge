import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Bookmark, User, Menu, X, Bot } from 'lucide-react';

interface NavbarProps {
  onOpenChatbot?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenChatbot }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-10 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="flex items-center">
              <Compass className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">PathForge</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/home"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-primary-500"
            >
              <Home size={18} className="mr-1" />
              Home
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-colors"
            >
              <Compass size={18} className="mr-1" />
              Dashboard
            </Link>
            <Link
              to="/bookmarks"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-colors"
            >
              <Bookmark size={18} className="mr-1" />
              Bookmarks
            </Link>
          </div>

          <div className="hidden md:flex md:items-center">
            <div className="flex items-center space-x-4">
              <button
                className="inline-flex items-center p-1 border border-transparent rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                onClick={onOpenChatbot}
                aria-label="Open Chatbot"
              >
                <Bot size={20} className="text-gray-600" />
              </button>
              <button className="inline-flex items-center p-1 border border-transparent rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                <User size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-in-right">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/home"
              className="block pl-3 pr-4 py-2 border-l-4 border-primary-500 text-base font-medium text-primary-700 bg-primary-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home size={18} className="mr-2" />
                Home
              </div>
            </Link>
            <Link
              to="/dashboard"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Compass size={18} className="mr-2" />
                Dashboard
              </div>
            </Link>
            <Link
              to="/bookmarks"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Bookmark size={18} className="mr-2" />
                Bookmarks
              </div>
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <User size={20} className="text-primary-600" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Ansh Sharma</div>
                <div className="text-sm font-medium text-gray-500">ansh@example.com</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;