import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';

interface MobileNavigationProps {
  darkMode: boolean;
  isMobileMenuOpen: boolean;
  onMenuClose: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  darkMode,
  isMobileMenuOpen,
  onMenuClose,
  searchTerm,
  setSearchTerm,
  onSearch
}) => {
  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Events & Circulars', href: '/events-circulars' },
    { name: 'Messages from HOI', href: '/messages-hoi' },
    { name: 'Faculty/Staff Directory', href: '/directory' },
    { name: 'Reports & Manuals', href: '/reports' }
  ];

  if (!isMobileMenuOpen) return null;

  return (
    <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 animate-slide-in">
      {/* Mobile Search */}
      <div className="px-4 pt-4">
        <form onSubmit={onSearch} className="relative flex mb-4 xl:hidden">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search portal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-l-xl border-r-0 border text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-r-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center shadow-lg"
          >
            <ArrowRight size={16} />
          </button>
        </form>
      </div>

      {/* Mobile Navigation Links */}
      <div className="px-4 pb-4 space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={onMenuClose}
            className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
              darkMode
                ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;