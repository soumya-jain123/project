import React, { useState } from 'react';
import { Search, Filter, Download, Eye, FileText, Calendar, User, Tag, Clock, ArrowRight } from 'lucide-react';

interface ReportsProps {
  darkMode: boolean;
}

interface Report {
  id: string;
  title: string;
  type: 'technical' | 'safety' | 'training' | 'research';
  category: string;
  author: string;
  date: string;
  description: string;
  fileSize: string;
  downloadCount: number;
  tags: string[];
  status: 'published' | 'draft' | 'archived';
}

const Reports: React.FC<ReportsProps> = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const reports: Report[] = [
    {
      id: '1',
      title: 'Annual Safety Assessment Report 2024',
      type: 'safety',
      category: 'Safety Compliance',
      author: 'Dr. Rajesh Kumar',
      date: '2024-12-15',
      description: 'Comprehensive safety assessment covering all operational areas, incident analysis, and recommendations for 2025.',
      fileSize: '4.2 MB',
      downloadCount: 156,
      tags: ['Safety', 'Annual', 'Compliance', 'Assessment'],
      status: 'published'
    },
    {
      id: '2',
      title: 'Petroleum Exploration Techniques Manual',
      type: 'technical',
      category: 'Technical Documentation',
      author: 'Dr. Priya Sharma',
      date: '2024-11-20',
      description: 'Updated manual covering latest petroleum exploration techniques, methodologies, and best practices.',
      fileSize: '8.7 MB',
      downloadCount: 234,
      tags: ['Technical', 'Manual', 'Exploration', 'Petroleum'],
      status: 'published'
    },
    {
      id: '3',
      title: 'Faculty Training Program Guidelines',
      type: 'training',
      category: 'Training Materials',
      author: 'Mr. Amit Singh',
      date: '2024-10-30',
      description: 'Comprehensive guidelines for faculty training programs including curriculum, assessment criteria, and certification requirements.',
      fileSize: '2.1 MB',
      downloadCount: 89,
      tags: ['Training', 'Faculty', 'Guidelines', 'Curriculum'],
      status: 'published'
    },
    {
      id: '4',
      title: 'Seismic Data Analysis Research Paper',
      type: 'research',
      category: 'Research Publications',
      author: 'Dr. Sunita Verma',
      date: '2024-09-15',
      description: 'Advanced research on seismic data analysis techniques for improved petroleum reservoir characterization.',
      fileSize: '6.3 MB',
      downloadCount: 178,
      tags: ['Research', 'Seismic', 'Data Analysis', 'Reservoir'],
      status: 'published'
    },
    {
      id: '5',
      title: 'Laboratory Equipment Maintenance Manual',
      type: 'technical',
      category: 'Technical Documentation',
      author: 'Mr. Ravi Patel',
      date: '2024-08-25',
      description: 'Detailed maintenance procedures and schedules for all laboratory equipment and instruments.',
      fileSize: '3.5 MB',
      downloadCount: 67,
      tags: ['Technical', 'Laboratory', 'Maintenance', 'Equipment'],
      status: 'published'
    }
  ];

  const types = [
    { value: 'all', label: 'All Reports', icon: FileText },
    { value: 'technical', label: 'Technical Reports', icon: FileText },
    { value: 'safety', label: 'Safety Manuals', icon: FileText },
    { value: 'training', label: 'Training Materials', icon: FileText },
    { value: 'research', label: 'Research Publications', icon: FileText }
  ];

  const categories = ['all', 'Safety Compliance', 'Technical Documentation', 'Training Materials', 'Research Publications'];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'downloads':
        return b.downloadCount - a.downloadCount;
      default:
        return 0;
    }
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'technical': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400';
      case 'safety': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400';
      case 'training': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400';
      case 'research': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Reports & Manuals
        </h1>
        <p className={`${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Access technical reports, safety manuals, training materials, and research publications
        </p>
      </div>

      {/* Type Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {types.map((type) => (
          <button
            key={type.value}
            onClick={() => setSelectedType(type.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              selectedType === type.value
                ? 'bg-red-600 text-white border-red-600 shadow-lg'
                : darkMode
                ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <type.icon size={16} />
            <span>{type.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              selectedType === type.value
                ? 'bg-white/20 text-white'
                : darkMode
                ? 'bg-gray-700 text-gray-400'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {reports.filter(r => type.value === 'all' || r.type === type.value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search reports, manuals, and publications..."
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              darkMode
                ? 'bg-gray-800 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="downloads">Sort by Downloads</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {sortedReports.length === 0 ? (
          <div className={`text-center py-12 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No reports found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          sortedReports.map((report) => (
            <div
              key={report.id}
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
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <FileText className="text-red-600" size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                            getTypeColor(report.type)
                          }`}>
                            {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {report.category}
                          </span>
                        </div>
                        <div className={`flex items-center text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Calendar size={12} className="mr-1" />
                          {new Date(report.date).toLocaleDateString('en-US', { 
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
                    {report.title}
                  </h3>
                  
                  <p className={`text-sm mb-4 line-clamp-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {report.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <div className={`flex items-center gap-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <User size={14} />
                      {report.author}
                    </div>
                    <div className={`flex items-center gap-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Download size={14} />
                      {report.downloadCount} downloads
                    </div>
                    <div className={`flex items-center gap-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <FileText size={14} />
                      {report.fileSize}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {report.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
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
                  <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                  
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    darkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}>
                    <Eye size={16} />
                    <span>Preview</span>
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
          ))
        )}
      </div>
    </div>
  );
};

export default Reports;