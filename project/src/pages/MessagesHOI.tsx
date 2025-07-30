import React, { useState } from 'react';
import { Search, Calendar, Download, Eye, MessageSquare, User, Clock, ArrowRight } from 'lucide-react';

interface MessagesHOIProps {
  darkMode: boolean;
}

interface Message {
  id: string;
  title: string;
  date: string;
  category: 'policy' | 'announcement' | 'report' | 'address';
  excerpt: string;
  content: string;
  hasAttachment: boolean;
  attachmentSize?: string;
  readTime: string;
  priority: 'high' | 'medium' | 'low';
}

const MessagesHOI: React.FC<MessagesHOIProps> = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const messages: Message[] = [
    {
      id: '1',
      title: 'Annual Vision 2025: Advancing Petroleum Exploration Excellence',
      date: '2025-01-10',
      category: 'address',
      excerpt: 'As we embark on a new year, I want to share our strategic vision for advancing petroleum exploration technologies and maintaining our position as a leading research institute.',
      content: 'Dear Faculty and Staff,\n\nAs we embark on a new year, I want to share our strategic vision for advancing petroleum exploration technologies and maintaining our position as a leading research institute...',
      hasAttachment: true,
      attachmentSize: '2.1 MB',
      readTime: '5 min read',
      priority: 'high'
    },
    {
      id: '2',
      title: 'New Safety Protocols Implementation',
      date: '2025-01-05',
      category: 'policy',
      excerpt: 'Following recent industry guidelines, we are implementing enhanced safety protocols across all departments to ensure the highest standards of workplace safety.',
      content: 'Dear Team,\n\nFollowing recent industry guidelines, we are implementing enhanced safety protocols across all departments...',
      hasAttachment: true,
      attachmentSize: '1.8 MB',
      readTime: '3 min read',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Research Excellence Awards 2024 - Results',
      date: '2024-12-20',
      category: 'announcement',
      excerpt: 'I am pleased to announce the recipients of our annual Research Excellence Awards, recognizing outstanding contributions to petroleum exploration research.',
      content: 'Dear Colleagues,\n\nI am pleased to announce the recipients of our annual Research Excellence Awards...',
      hasAttachment: false,
      readTime: '4 min read',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Quarterly Performance Report - Q4 2024',
      date: '2024-12-15',
      category: 'report',
      excerpt: 'Our institute has achieved significant milestones in Q4 2024, with notable progress in research publications, industry collaborations, and student achievements.',
      content: 'Dear Faculty and Staff,\n\nOur institute has achieved significant milestones in Q4 2024...',
      hasAttachment: true,
      attachmentSize: '3.5 MB',
      readTime: '8 min read',
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Digital Transformation Initiative Launch',
      date: '2024-12-01',
      category: 'announcement',
      excerpt: 'We are launching a comprehensive digital transformation initiative to modernize our research infrastructure and enhance collaborative capabilities.',
      content: 'Dear Team,\n\nWe are launching a comprehensive digital transformation initiative...',
      hasAttachment: true,
      attachmentSize: '2.7 MB',
      readTime: '6 min read',
      priority: 'medium'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Messages' },
    { value: 'address', label: 'Addresses' },
    { value: 'policy', label: 'Policy Updates' },
    { value: 'announcement', label: 'Announcements' },
    { value: 'report', label: 'Reports' }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || message.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'address': return <MessageSquare size={16} />;
      case 'policy': return <User size={16} />;
      case 'announcement': return <MessageSquare size={16} />;
      case 'report': return <Calendar size={16} />;
      default: return <MessageSquare size={16} />;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  if (selectedMessage) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => setSelectedMessage(null)}
          className={`flex items-center space-x-2 mb-6 text-sm font-medium transition-colors duration-200 ${
            darkMode 
              ? 'text-red-400 hover:text-red-300' 
              : 'text-red-600 hover:text-red-700'
          }`}
        >
          <ArrowRight size={16} className="rotate-180" />
          <span>Back to Messages</span>
        </button>

        {/* Message Content */}
        <article className={`rounded-xl border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                  getPriorityColor(selectedMessage.priority)
                }`}>
                  {selectedMessage.priority.charAt(0).toUpperCase() + selectedMessage.priority.slice(1)} Priority
                </span>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  {selectedMessage.category.charAt(0).toUpperCase() + selectedMessage.category.slice(1)}
                </span>
              </div>
              
              <h1 className={`text-3xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {selectedMessage.title}
              </h1>
              
              <div className="flex items-center gap-6 text-sm">
                <div className={`flex items-center gap-2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <Calendar size={16} />
                  {new Date(selectedMessage.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className={`flex items-center gap-2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <Clock size={16} />
                  {selectedMessage.readTime}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={`prose max-w-none ${
              darkMode ? 'prose-invert' : ''
            }`}>
              <p className={`text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {selectedMessage.content}
              </p>
            </div>

            {/* Attachment */}
            {selectedMessage.hasAttachment && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className={`flex items-center justify-between p-4 rounded-lg border ${
                  darkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <Download className="text-red-600 dark:text-red-400" size={20} />
                    </div>
                    <div>
                      <p className={`font-medium ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Message Attachment
                      </p>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        PDF Document • {selectedMessage.attachmentSize}
                      </p>
                    </div>
                  </div>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200">
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Messages from Head of Institute
        </h1>
        <p className={`${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Important communications, policy updates, and institutional announcements
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-l-lg border-r-0 border focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-3 bg-red-600 text-white rounded-r-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
            >
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
            darkMode
              ? 'bg-gray-800 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Messages List */}
      <div className="space-y-6">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            onClick={() => setSelectedMessage(message)}
            className={`group p-6 rounded-xl border transition-all duration-200 hover:shadow-lg cursor-pointer ${
              darkMode
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    {getCategoryIcon(message.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                        getPriorityColor(message.priority)
                      }`}>
                        {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {message.category.charAt(0).toUpperCase() + message.category.slice(1)}
                      </span>
                    </div>
                    <div className={`flex items-center text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Calendar size={12} className="mr-1" />
                      {new Date(message.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className={`text-xl font-semibold mb-3 group-hover:text-red-600 transition-colors duration-200 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {message.title}
                </h3>
                
                <p className={`text-sm mb-4 line-clamp-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {message.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm">
                  <div className={`flex items-center gap-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <Clock size={12} />
                    {message.readTime}
                  </div>
                  {message.hasAttachment && (
                    <div className={`flex items-center gap-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Download size={12} />
                      Attachment ({message.attachmentSize})
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  darkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}>
                  <Eye size={16} />
                  <span>Read Message</span>
                </button>
                
                <ArrowRight 
                  size={16} 
                  className={`text-gray-400 group-hover:text-red-600 transition-all duration-200 group-hover:translate-x-1 ${
                    darkMode ? 'group-hover:text-red-400' : ''
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesHOI;