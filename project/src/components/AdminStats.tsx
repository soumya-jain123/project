import React from 'react';
import { FileText, Users, Calendar, Download, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface AdminStatsProps {
  darkMode: boolean;
}

const AdminStats: React.FC<AdminStatsProps> = ({ darkMode }) => {
  const stats = [
    {
      title: 'Total Documents',
      value: '1,247',
      change: '+12%',
      changeType: 'increase' as const,
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: '89',
      change: '+5%',
      changeType: 'increase' as const,
      icon: Users,
      color: 'green'
    },
    {
      title: 'Upcoming Events',
      value: '23',
      change: '+8%',
      changeType: 'increase' as const,
      icon: Calendar,
      color: 'purple'
    },
    {
      title: 'Downloads Today',
      value: '156',
      change: '-3%',
      changeType: 'decrease' as const,
      icon: Download,
      color: 'orange'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      action: 'Document uploaded',
      item: 'Safety Drill Exercise Guidelines',
      user: 'Admin',
      time: '2 minutes ago',
      status: 'completed',
      icon: FileText
    },
    {
      id: '2',
      action: 'Event created',
      item: 'Monthly Faculty Meeting',
      user: 'Dr. Sharma',
      time: '15 minutes ago',
      status: 'completed',
      icon: Calendar
    },
    {
      id: '3',
      action: 'Notice published',
      item: 'Library Timings Update',
      user: 'Admin',
      time: '1 hour ago',
      status: 'pending',
      icon: AlertCircle
    },
    {
      id: '4',
      action: 'User registered',
      item: 'New faculty member',
      user: 'System',
      time: '2 hours ago',
      status: 'completed',
      icon: Users
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'green': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'purple': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'orange': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-500" size={16} />;
      case 'pending': return <Clock className="text-yellow-500" size={16} />;
      case 'error': return <AlertCircle className="text-red-500" size={16} />;
      default: return <Clock className="text-gray-500" size={16} />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                getColorClasses(stat.color)
              }`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                stat.changeType === 'increase' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                <TrendingUp 
                  size={16} 
                  className={`mr-1 ${
                    stat.changeType === 'decrease' ? 'rotate-180' : ''
                  }`} 
                />
                {stat.change}
              </div>
            </div>
            <div>
              <h3 className={`text-2xl font-bold mb-1 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.value}
              </h3>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {stat.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className={`rounded-xl border ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className={`text-lg font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Recent Activity
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-gray-900 hover:bg-gray-750' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <activity.icon size={16} className="text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className={`text-sm font-medium ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {activity.action}
                    </p>
                    {getStatusIcon(activity.status)}
                  </div>
                  <p className={`text-sm truncate ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {activity.item}
                  </p>
                  <p className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    by {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`rounded-xl border ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className={`text-lg font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Quick Actions
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl">
              <FileText size={20} />
              <span className="font-medium">Upload Document</span>
            </button>
            <button className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              <Calendar size={20} />
              <span className="font-medium">Create Event</span>
            </button>
            <button className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              <Users size={20} />
              <span className="font-medium">Manage Users</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;