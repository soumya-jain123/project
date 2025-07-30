import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, FileText, Calendar, MessageSquare, Users, Settings, Shield } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  isAdminLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, isAdminLoggedIn }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    {
      name: 'Home',
      href: '/',
      dropdown: [
        { name: 'Dashboard', href: '/', icon: FileText },
        { name: 'Quick Links', href: '#quick-links', icon: Settings },
        ...(isAdminLoggedIn ? [{ name: 'Admin Panel', href: '/admin', icon: Shield }] : [])
      ]
    },
    {
      name: 'Events & Circulars',
      href: '/events-circulars',
      dropdown: [
        { name: 'Latest Circulars', href: '/events-circulars#circulars', icon: FileText },
        { name: 'Upcoming Events', href: '/events-circulars#events', icon: Calendar },
        { name: 'Training Programs', href: '/events-circulars#training', icon: Users },
        { name: 'Safety Notices', href: '/events-circulars#safety', icon: Shield }
      ]
    },
    {
      name: 'Messages from HOI',
      href: '/messages-hoi',
      dropdown: [
        { name: 'Recent Messages', href: '/messages-hoi#recent', icon: MessageSquare },
        { name: 'Annual Reports', href: '/messages-hoi#reports', icon: FileText },
        { name: 'Policy Updates', href: '/messages-hoi#policies', icon: Settings }
      ]
    },
    {
      name: 'Faculty/Staff Directory',
      href: '/directory',
      dropdown: [
        { name: 'Faculty Members', href: '/directory#faculty', icon: Users },
        { name: 'Administrative Staff', href: '/directory#admin-staff', icon: Users },
        { name: 'Technical Staff', href: '/directory#tech-staff', icon: Settings },
        { name: 'Contact Directory', href: '/directory#contacts', icon: FileText }
      ]
    },
    {
      name: 'Reports & Manuals',
      href: '/reports',
      dropdown: [
        { name: 'Technical Reports', href: '/reports#technical', icon: FileText },
        { name: 'Safety Manuals', href: '/reports#safety', icon: Shield },
        { name: 'Training Materials', href: '/reports#training', icon: Users },
        { name: 'Research Publications', href: '/reports#research', icon: Calendar }
      ]
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const isActivePage = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
   <nav className="flex flex-wrap items-center justify-center space-x-2" ref={dropdownRef}>
      {navigationItems.map((item) => (
        <div key={item.name} className="relative">
          <button
            onClick={() => handleDropdownToggle(item.name)}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap group ${
              isActivePage(item.href)
                ? 'bg-red-600 text-white shadow-lg'
                : darkMode
                ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <span className="relative">
              {item.name}
            </span>
            <ChevronDown 
              size={16} 
              className={`ml-1 transition-all duration-300 ${
                activeDropdown === item.name ? 'rotate-180' : ''
              }`} 
            />
          </button>

          {/* Dropdown Menu */}
          {activeDropdown === item.name && (
            <div className={`absolute top-full left-0 mt-2 w-64 rounded-xl shadow-xl border backdrop-blur-xl z-50 animate-fade-in ${
              darkMode 
                ? 'bg-gray-800/95 border-gray-700' 
                : 'bg-white/95 border-gray-200'
            }`}>
              <div className="p-2">
                <div className={`text-xs font-semibold uppercase tracking-wider mb-2 px-3 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {item.name}
                </div>
                {item.dropdown.map((dropdownItem) => (
                  <Link
                    key={dropdownItem.name}
                    to={dropdownItem.href}
                    onClick={() => setActiveDropdown(null)}
                    className={`flex items-center px-3 py-2 text-sm transition-all duration-300 rounded-lg group ${
                      darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded flex items-center justify-center mr-2 transition-all duration-300 ${
                      darkMode 
                        ? 'group-hover:bg-red-600/20' 
                        : 'group-hover:bg-red-50'
                    }`}>
                      <dropdownItem.icon 
                        size={14} 
                        className={`transition-colors duration-300 ${
                          darkMode 
                            ? 'text-gray-400 group-hover:text-red-400' 
                            : 'text-gray-500 group-hover:text-red-600'
                        }`} 
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{dropdownItem.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navbar;