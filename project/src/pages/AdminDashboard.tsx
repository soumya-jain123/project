import React, { useState } from 'react';
import { Upload, FileText, Users, Calendar, Settings, BarChart3, Download, Trash2, Edit, Plus, Search, Filter } from 'lucide-react';
import DocumentUpload from '../components/DocumentUpload';
import AdminStats from '../components/AdminStats';

interface AdminDashboardProps {
  darkMode: boolean;
}

interface Document {
  id: string;
  title: string;
  type: 'circular' | 'notice' | 'event' | 'report';
  category: string;
  uploadDate: string;
  size: string;
  status: 'published' | 'draft' | 'archived';
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'documents', name: 'Document Management', icon: FileText },
    { id: 'upload', name: 'Upload Content', icon: Upload },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'events', name: 'Event Management', icon: Calendar },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const documents: Document[] = [
    {
      id: '1',
      title: 'Safety Drill Exercise - Mandatory Participation',
      type: 'circular',
      category: 'Safety',
      uploadDate: '2025-01-15',
      size: '2.4 MB',
      status: 'published'
    },
    {
      id: '2',
      title: 'New Research Grant Applications',
      type: 'notice',
      category: 'Research',
      uploadDate: '2025-01-14',
      size: '1.8 MB',
      status: 'published'
    },
    {
      id: '3',
      title: 'Library Timings Update',
      type: 'notice',
      category: 'General',
      uploadDate: '2025-01-13',
      size: '0.5 MB',
      status: 'draft'
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminStats darkMode={darkMode} />;
      
      case 'upload':
        return <DocumentUpload darkMode={darkMode} />;
      
      case 'documents':
        return (
          <div className="space-y-6">
            {/* Document Management Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className={`text-xl font-semibold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Document Management
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Categories</option>
                  <option value="Safety">Safety</option>
                  <option value="Research">Research</option>
                  <option value="General">General</option>
                  <option value="Academic">Academic</option>
                </select>
                
                <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200">
                  <Plus size={16} />
                  <span>Add Document</span>
                </button>
              </div>
            </div>

            {/* Documents Table */}
            <div className={`rounded-lg border overflow-hidden ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Document
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Category
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Status
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Upload Date
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${
                    darkMode ? 'divide-gray-700' : 'divide-gray-200'
                  }`}>
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200`}>
                        <td className="px-6 py-4">
                          <div>
                            <div className={`text-sm font-medium ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {doc.title}
                            </div>
                            <div className={`text-sm ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {doc.size} • {doc.type}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {doc.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                            getStatusColor(doc.status)
                          }`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className={`px-6 py-4 text-sm ${
                          darkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 ${
                              darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                            }`}>
                              <Edit size={16} />
                            </button>
                            <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 ${
                              darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                            }`}>
                              <Download size={16} />
                            </button>
                            <button className={`p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200 text-red-500 hover:text-red-700`}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className={`text-center py-12 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <p>This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Admin Dashboard
        </h1>
        <p className={`mt-2 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Manage content, users, and system settings
        </p>
      </div>

      {/* Tab Navigation */}
      <div className={`border-b mb-8 ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600'
                  : darkMode
                  ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;