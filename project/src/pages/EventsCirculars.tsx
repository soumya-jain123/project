import React, { useState } from 'react';
import { Search, Filter, Calendar, Download, Eye, Bell, Clock, MapPin, Users, Tag, ArrowRight } from 'lucide-react';

interface EventsCircularsProps {
  darkMode: boolean;
}

interface Item {
  id: string;
  title: string;
  type: 'circular' | 'event' | 'notice' | 'announcement';
  category: string;
  date: string;
  description: string;
  status: 'urgent' | 'new' | 'updated' | 'normal';
  hasAttachment: boolean;
  attachmentSize?: string;
  location?: string;
  attendees?: number;
  tags: string[];
}

const EventsCirculars: React.FC<EventsCircularsProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'circulars' | 'events' | 'notices'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const items: Item[] = [
    {
      id: '1',
      title: 'Safety Drill Exercise - Mandatory Participation',
      type: 'circular',
      category: 'Safety',
      date: '2025-01-15',
      description: 'All staff members are required to participate in the quarterly safety drill exercise scheduled for next week. This is a mandatory exercise as per ONGC safety protocols.',
      status: 'urgent',
      hasAttachment: true,
      attachmentSize: '2.4 MB',
      tags: ['Safety', 'Mandatory', 'Drill']
    },
    {
      id: '2',
      title: 'Annual Research Conference 2025',
      type: 'event',
      category: 'Research',
      date: '2025-02-15',
      description: 'Join us for the Annual Research Conference showcasing latest developments in petroleum exploration and geological research.',
      status: 'new',
      hasAttachment: true,
      attachmentSize: '1.8 MB',
      location: 'Main Auditorium',
      attendees: 200,
      tags: ['Research', 'Conference', 'Annual']
    },
    {
      id: '3',
      title: 'Library Timings Update',
      type: 'notice',
      category: 'General',
      date: '2025-01-13',
      description: 'Updated library operating hours effective from January 20, 2025. New timings: Monday-Friday 8:00 AM to 8:00 PM, Saturday 9:00 AM to 5:00 PM.',
      status: 'updated',
      hasAttachment: false,
      tags: ['Library', 'Timings', 'Update']
    },
    {
      id: '4',
      title: 'Monthly Faculty Meeting',
      type: 'event',
      category: 'Academic',
      date: '2025-01-25',
      description: 'Monthly faculty meeting to discuss academic progress, upcoming events, and administrative matters.',
      status: 'normal',
      hasAttachment: true,
      attachmentSize: '0.8 MB',
      location: 'Conference Hall A',
      attendees: 45,
      tags: ['Faculty', 'Meeting', 'Monthly']
    },
    {
      id: '5',
      title: 'New Research Grant Applications Open',
      type: 'announcement',
      category: 'Research',
      date: '2025-01-14',
      description: 'Applications for the 2025 research grant program are now open for faculty members. Deadline for submission is March 15, 2025.',
      status: 'new',
      hasAttachment: true,
      attachmentSize: '3.2 MB',
      tags: ['Research', 'Grant', 'Application']
    }
  ];

  const categories = ['all', 'Safety', 'Research', 'General', 'Academic', 'Training'];
  const statuses = ['all', 'urgent', 'new', 'updated', 'normal'];

  const filteredItems = items.filter(item => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'circulars' && item.type === 'circular') ||
                      (activeTab === 'events' && item.type === 'event') ||
                      (activeTab === 'notices' && (item.type === 'notice' || item.type === 'announcement'));
    
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesTab && matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
      case 'updated': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event': return <Calendar size={16} />;
      case 'circular': return <Bell size={16} />;
      default: return <Bell size={16} />;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality is already handled by the filter effect
    console.log('Searching for:', searchTerm);
  };

  const tabs = [
    { id: 'all', name: 'All Items', count: items.length },
    { id: 'circulars', name: 'Circulars', count: items.filter(i => i.type === 'circular').length },
    { id: 'events', name: 'Events', count: items.filter(i => i.type === 'event').length },
    { id: 'notices', name: 'Notices', count: items.filter(i => i.type === 'notice' || i.type === 'announcement').length }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Events & Circulars
        </h1>
        <p className={`${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Stay updated with the latest announcements, events, and important notices
        </p>
      </div>

      {/* Tabs */}
      <div className={`border-b mb-6 ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600'
                  : darkMode
                  ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events, circulars, and notices..."
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
        
        <div className="flex gap-3">
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
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              darkMode
                ? 'bg-gray-800 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {filteredItems.length === 0 ? (
          <div className={`text-center py-12 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <Filter size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No items found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group p-6 rounded-xl border transition-all duration-200 hover:shadow-lg cursor-pointer ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        item.type === 'event' 
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                            getStatusColor(item.status)
                          }`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            darkMode 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {item.category}
                          </span>
                        </div>
                        <div className={`flex items-center text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Clock size={12} className="mr-1" />
                          {new Date(item.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-semibold mb-3 group-hover:text-red-600 transition-colors duration-200 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>
                  
                  <p className={`text-sm mb-4 line-clamp-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>

                  {/* Event Details */}
                  {item.type === 'event' && (
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      {item.location && (
                        <div className={`flex items-center gap-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <MapPin size={14} />
                          {item.location}
                        </div>
                      )}
                      {item.attendees && (
                        <div className={`flex items-center gap-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Users size={14} />
                          {item.attendees} attendees
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <Tag size={10} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {item.hasAttachment && (
                    <div className="text-center">
                      <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
                        <Download size={16} />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                      {item.attachmentSize && (
                        <p className={`text-xs mt-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {item.attachmentSize}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    darkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}>
                    <Eye size={16} />
                    <span className="hidden sm:inline">View Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsCirculars;