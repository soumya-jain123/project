import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Globe } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'ONGC Official Website', href: 'https://www.ongcindia.com', external: true },
    { name: 'WebICE Portal', href: '#', external: true },
    { name: 'ONGC Mail', href: '#', external: true },
    { name: 'Safety Guidelines', href: '#' },
    { name: 'Research Publications', href: '#' },
    { name: 'Alumni Network', href: '#' },
  ];

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: 'KDMIP Campus, Dehradun, Uttarakhand' },
    { icon: Phone, label: 'Phone', value: '+91-135-XXX-XXXX' },
    { icon: Mail, label: 'Email', value: 'info@kdmip.ongc.in' },
    { icon: Globe, label: 'Website', value: 'www.kdmip.ongc.in' },
  ];

  return (
    <footer className={`border-t mt-16 ${
      darkMode 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Institute Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  KDMIP Institute
                </h3>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Keshava Deva Malaviya Institute of Petroleum Exploration
                </p>
              </div>
            </div>
            <p className={`text-sm mb-4 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              A premier institute of ONGC dedicated to excellence in petroleum exploration, 
              research, and education. Advancing knowledge and innovation in the energy sector 
              since our establishment.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs">ONGC</span>
              </div>
              <span className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Oil and Natural Gas Corporation
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`text-sm flex items-center group hover:text-red-600 transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                    {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {link.name}
                    {link.external && (
                      <ExternalLink className="ml-1 h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Contact Info
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start space-x-2">
                  <item.icon className={`h-4 w-4 mt-0.5 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <div>
                    <p className={`text-xs font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {item.label}
                    </p>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {item.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <p>© {currentYear} KDMIP Institute, ONGC. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className={`hover:text-red-600 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className={`hover:text-red-600 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Terms of Service
              </a>
              <a
                href="#"
                className={`hover:text-red-600 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;