import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, MapPin, User, Users, Settings, Shield, Calendar, FileText, ChevronRight, ArrowRight } from 'lucide-react';

interface DirectoryProps {
  darkMode: boolean;
}

interface Person {
  id: string;
  name: string;
  designation: string;
  department: string;
  category: 'faculty' | 'admin-staff' | 'tech-staff';
  email: string;
  phone: string;
  office: string;
  specialization?: string;
  experience?: string;
  image?: string;
}

const Directory: React.FC<DirectoryProps> = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const people: Person[] = [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      designation: 'Head of Institute',
      department: 'Administration',
      category: 'faculty',
      email: 'rajesh.kumar@kdmip.ongc.in',
      phone: '+91-135-XXX-1001',
      office: 'Room 101, Admin Block',
      specialization: 'Petroleum Geology',
      experience: '25 years'
    },
    {
      id: '2',
      name: 'Dr. Priya Sharma',
      designation: 'Professor',
      department: 'Geology',
      category: 'faculty',
      email: 'priya.sharma@kdmip.ongc.in',
      phone: '+91-135-XXX-1002',
      office: 'Room 201, Academic Block',
      specialization: 'Structural Geology',
      experience: '18 years'
    },
    {
      id: '3',
      name: 'Mr. Amit Singh',
      designation: 'Administrative Officer',
      department: 'Administration',
      category: 'admin-staff',
      email: 'amit.singh@kdmip.ongc.in',
      phone: '+91-135-XXX-1003',
      office: 'Room 102, Admin Block',
      experience: '12 years'
    },
    {
      id: '4',
      name: 'Dr. Sunita Verma',
      designation: 'Associate Professor',
      department: 'Geophysics',
      category: 'faculty',
      email: 'sunita.verma@kdmip.ongc.in',
      phone: '+91-135-XXX-1004',
      office: 'Room 301, Research Block',
      specialization: 'Seismic Interpretation',
      experience: '15 years'
    },
    {
      id: '5',
      name: 'Mr. Ravi Patel',
      designation: 'Technical Assistant',
      department: 'Laboratory',
      category: 'tech-staff',
      email: 'ravi.patel@kdmip.ongc.in',
      phone: '+91-135-XXX-1005',
      office: 'Lab 1, Technical Block',
      experience: '8 years'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Staff', icon: Users },
    { value: 'faculty', label: 'Faculty Members', icon: User },
    { value: 'admin-staff', label: 'Administrative Staff', icon: Settings },
    { value: 'tech-staff', label: 'Technical Staff', icon: Shield }
  ];

  const departments = ['all', 'Administration', 'Geology', 'Geophysics', 'Laboratory', 'Research'];

  const filteredPeople = people.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || person.category === selectedCategory;
    const matchesDepartment = selectedDepartment === 'all' || person.department === selectedDepartment;
    
    return matchesSearch && matchesCategory && matchesDepartment;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'faculty': return <User size={16} className="text-blue-600 dark:text-blue-400" />;
      case 'admin-staff': return <Settings size={16} className="text-green-600 dark:text-green-400" />;
      case 'tech-staff': return <Shield size={16} className="text-purple-600 dark:text-purple-400" />;
      default: return <Users size={16} className="text-gray-600 dark:text-gray-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'faculty': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400';
      case 'admin-staff': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400';
      case 'tech-staff': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400';
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
          Faculty & Staff Directory
        </h1>
        <p className={`${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Connect with our faculty members, administrative staff, and technical personnel
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              selectedCategory === category.value
                ? 'bg-red-600 text-white border-red-600 shadow-lg'
                : darkMode
                ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <category.icon size={16} />
            <span>{category.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              selectedCategory === category.value
                ? 'bg-white/20 text-white'
                : darkMode
                ? 'bg-gray-700 text-gray-400'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {people.filter(p => category.value === 'all' || p.category === category.value).length}
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
                placeholder="Search by name, designation, or department..."
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
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
            darkMode
              ? 'bg-gray-800 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>
              {dept === 'all' ? 'All Departments' : dept}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPeople.length === 0 ? (
          <div className={`col-span-full text-center py-12 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No staff members found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          filteredPeople.map((person) => (
            <div
              key={person.id}
              className={`group p-6 rounded-xl border transition-all duration-200 hover:shadow-lg cursor-pointer ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              {/* Profile Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
                }`}>
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-semibold group-hover:text-red-600 transition-colors duration-200 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {person.name}
                  </h3>
                  <p className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {person.designation}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                      getCategoryColor(person.category)
                    }`}>
                      {getCategoryIcon(person.category)}
                      <span className="ml-1">
                        {person.category === 'admin-staff' ? 'Admin' : 
                         person.category === 'tech-staff' ? 'Technical' : 'Faculty'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{person.department}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail size={14} className="text-gray-400" />
                    <span className="truncate">{person.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone size={14} className="text-gray-400" />
                    <span>{person.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{person.office}</span>
                  </div>
                </div>

                {/* Additional Info */}
                {(person.specialization || person.experience) && (
                  <div className={`pt-3 border-t ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    {person.specialization && (
                      <div className={`text-xs mb-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <span className="font-medium">Specialization:</span> {person.specialization}
                      </div>
                    )}
                    {person.experience && (
                      <div className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <span className="font-medium">Experience:</span> {person.experience}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Contact Actions */}
              <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="flex-1 flex items-center justify-center space-x-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm">
                  <Mail size={14} />
                  <span>Email</span>
                </button>
                <button className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg border transition-colors duration-200 text-sm ${
                  darkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  <Phone size={14} />
                  <span>Call</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Directory;