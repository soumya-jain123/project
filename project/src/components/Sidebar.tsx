import React from 'react';
import { Mail, Shield, MessageSquare, ExternalLink, Calendar, FileText, Users, Settings } from 'lucide-react';

interface SidebarProps {
  darkMode: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode, isOpen }) => {
  const quickLinks = [
    { name: 'WebICE', icon: ExternalLink, href: '#', external: true },
    { name: 'ONGC Mail', icon: Mail, href: '#', external: true },
    { name: 'Safety Drill Notices', icon: Shield, href: '#' },
    { name: 'Feedback to HOI', icon: MessageSquare, href: '#' },
    { name: 'Academic Calendar', icon: Calendar, href: '#' },
    { name: 'Library Resources', icon: FileText, href: '#' },
    { name: 'Staff Directory', icon: Users, href: '#' },
    { name: 'Settings', icon: Settings, href: '#' },
  ];

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 transform transition-all duration-300 ease-in-out z-40 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 lg:static lg:inset-0 ${
      darkMode 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200'
    } border-r shadow-soft overflow-y-auto scrollbar-thin`}>
      <div className="p-6">
        <h3 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Quick Links
        </h3>
        <nav className="space-y-2">
          {quickLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white hover:shadow-soft'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-soft'
              }`}
              {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <link.icon className="mr-3 h-5 w-5 transition-colors duration-300 group-hover:text-red-600" />
              {link.name}
              {link.external && (
                <ExternalLink className="ml-auto h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;