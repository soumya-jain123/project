import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Sun,
  Moon,
  Search,
  Bell,
  LogIn,
  Shield,
  LogOut,
  ArrowRight,
} from 'lucide-react';
import Navbar from './Navbar';
import MobileNavigation from './MobileNavigation';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onLoginClick: () => void;
  onAdminLoginClick: () => void;
  isAdminLoggedIn: boolean;
  onAdminLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  toggleDarkMode,
  onLoginClick,
  onAdminLoginClick,
  isAdminLoggedIn,
  onAdminLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Global search for:', searchTerm);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md ${
        darkMode
          ? 'bg-gray-900/95 border-gray-800'
          : 'bg-white/95 border-gray-200'
      }`}
    >
      {/* Top Section - Logo and Institute Info */}
      <div
        className={`border-b ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        } pb-2 relative`}
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-28 flex items-center justify-between">
            {/* Left Logo */}
            <Link to="/" className="flex-shrink-0 z-10">
              <img
                src="https://tse2.mm.bing.net/th/id/OIP.wylsTKEVVzH4KiOugumQyAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="ONGC Logo"
                className="w-14 h-14 lg:w-16 lg:h-16 object-contain rounded-lg shadow-lg"
              />
            </Link>

            {/* Centered Institute Info */}
            <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
              <h1
                className={`text-lg lg:text-xl xl:text-2xl font-bold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                KESHAVA DEVA MALAVIYA INSTITUTE OF
              </h1>
              <h2
                className={`text-base lg:text-lg xl:text-xl font-bold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                PETROLEUM EXPLORATION
              </h2>
              <p
                className={`text-xs lg:text-sm font-medium italic ${
                  darkMode ? 'text-red-400' : 'text-red-600'
                }`}
              >
                Five Decades of R&D Excellence
              </p>
              <p
                className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Oil and Natural Gas Corporation Limited
              </p>
            </div>

            {/* Right ONGC Logo */}
            <div className="hidden lg:flex items-center space-x-4 z-10">
              <div
                className={`w-20 h-20 xl:w-24 xl:h-24 rounded-xl flex items-center justify-center shadow-lg ${
                  darkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="w-16 h-16 xl:w-20 xl:h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg xl:text-xl">
                    ONGC
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Navigation and Actions */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1">
            <Navbar darkMode={darkMode} isAdminLoggedIn={isAdminLoggedIn} />
          </div>

          {/* Actions Section */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Global Search */}
            <form
              onSubmit={handleGlobalSearch}
              className="hidden md:flex relative"
            >
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search portal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2.5 rounded-l-lg border-r-0 border text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-48 lg:w-56 transition-all duration-300 ${
                    darkMode
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-red-600 text-white rounded-r-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
              >
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Mobile Search Button */}
            <button
              className={`md:hidden p-2.5 rounded-lg transition-all duration-300 ${
                darkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-lg transition-all duration-300 ${
                darkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <button
              className={`p-2.5 rounded-lg transition-all duration-300 relative ${
                darkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Login/Admin Section */}
            {isAdminLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2.5 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Shield size={16} />
                  <span className="hidden lg:inline">Admin Panel</span>
                  <span className="lg:hidden">Admin</span>
                </Link>
                <button
                  onClick={onAdminLogout}
                  className={`p-2.5 rounded-lg transition-all duration-300 ${
                    darkMode
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onLoginClick}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <LogIn size={16} />
                  <span className="hidden lg:inline">Login</span>
                </button>
                <button
                  onClick={onAdminLoginClick}
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2.5 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Shield size={16} />
                  <span className="hidden lg:inline">Admin</span>
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-lg transition-all duration-300 ${
                darkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation
          darkMode={darkMode}
          isMobileMenuOpen={isMobileMenuOpen}
          onMenuClose={() => setIsMobileMenuOpen(false)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleGlobalSearch}
        />
      </div>
    </header>
  );
};

export default Header;
