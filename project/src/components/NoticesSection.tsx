import React, { useState } from 'react';
import { Search, Download, Calendar, AlertCircle, Info, Clock, Filter, ArrowRight } from 'lucide-react';

interface NoticesSectionProps {
  darkMode: boolean;
}

interface Notice {
  id: string;
  title: string;
  type: 'circular' | 'notice' | 'announcement';
  status: 'urgent' | 'new' | 'updated' | 'normal';
  date: string;
  category: string;
  description: string;
  hasAttachment: boolean;
  attachmentType?: 'pdf' | 'doc' | 'excel';
}

export default function NoticesSection({ darkMode }: NoticesSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const notices: Notice[] = [
    {
      id: '1',
      title: 'Safety Drill Exercise - Mandatory Participation',
      type: 'circular',
      status: 'urgent',
      date: '2025-01-15',
      category: 'Safety',
      description: 'All staff members are required to participate in the quarterly safety drill exercise scheduled for next week.',
      hasAttachment: true,
      attachmentType: 'pdf'
    },
    {
      id: '2',
      title: 'New Research Grant Applications Open',
      type: 'announcement',
      status: 'new',
      date: '2025-01-14',
      category: 'Research',
      description: 'Applications for the 2025 research grant program are now open for faculty members.',
      hasAttachment: true,
      attachmentType: 'pdf'
    },
    {
      id: '3',
      title: 'Library Timings Update',
      type: 'notice',
      status: 'updated',
      date: '2025-01-13',
      category: 'General',
      description: 'Updated library operating hours effective from January 20, 2025.',
      hasAttachment: false
    },
    {
      id: '4',
      title: 'Monthly Faculty Meeting - January 2025',
      type: 'notice',
      status: 'normal',
      date: '2025-01-12',
      category: 'Academic',
      description: 'Monthly faculty meeting scheduled for January 25, 2025, at 2:00 PM in the main conference hall.',
      hasAttachment: true,
      attachmentType: 'doc'
    },
    {
      id: '5',
      title: 'Annual Training Program Schedule',
      type: 'circular',
      status: 'new',
      date: '2025-01-11',
      category: 'Training',
      description: 'Annual training program for technical staff - schedule and enrollment details.',
      hasAttachment: true,
      attachmentType: 'excel'
    }
  ];

  const categories = ['all', 'Safety', 'Research', 'General', 'Academic', 'Training'];
  const statuses = ['all', 'urgent', 'new', 'updated', 'normal'];

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || notice.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'updated': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent': return <AlertCircle size={12} />;
      case 'new': return <Info size={12} />;
      case 'updated': return <Clock size={12} />;
      default: return null;
    }
  };

  const getAttachmentIcon = (type?: string) => {
    const iconColor = darkMode ? 'text-red-400' : 'text-red-600';
    return <Download size={16} className={iconColor} />;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality is already handled by the filter effect
    // This function can be extended for more complex search operations
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className={`rounded-lg border ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className={`text-xl font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Latest Circulars & Notices
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar with Submit Button */}
            <form onSubmit={handleSearch} className="relative flex">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search notices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-l-md border-r-0 border text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
              >
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`pl-10 pr-8 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
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
      </div>

      <div className="p-6">
        {filteredNotices.length === 0 ? (
          <div className={`text-center py-8 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <Info size={24} className="mx-auto mb-2" />
            <p>No notices found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className={`p-4 rounded-lg border hover:shadow-md transition-shadow duration-200 ${
                  darkMode
                    ? 'bg-gray-900 border-gray-600 hover:bg-gray-800'
                    : 'bg-gray-50 border-gray-200 hover:bg-white'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                        getStatusColor(notice.status)
                      }`}>
                        {getStatusIcon(notice.status)}
                        {notice.status.charAt(0).toUpperCase() + notice.status.slice(1)}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {notice.category}
                      </span>
                    </div>
                    
                    <h3 className={`text-lg font-medium mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {notice.title}
                    </h3>
                    
                    <p className={`text-sm mb-3 ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {notice.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs">
                      <div className={`flex items-center gap-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <Calendar size={12} />
                        {new Date(notice.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <span className={`uppercase font-medium ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {notice.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {notice.hasAttachment && (
                      <button
                        className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          darkMode
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        {getAttachmentIcon(notice.attachmentType)}
                        Download
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}