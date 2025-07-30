import React from 'react';
import { FileText, Calendar, Users, Download, Clock, ArrowRight, Bell } from 'lucide-react';

interface RecentActivityProps {
  darkMode: boolean;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ darkMode }) => {
  const activities = [
    {
      id: '1',
      type: 'document',
      title: 'Safety Drill Exercise Guidelines',
      description: 'New safety circular published for all departments',
      time: '2 hours ago',
      icon: FileText,
      color: 'blue',
      urgent: true
    },
    {
      id: '2',
      type: 'event',
      title: 'Monthly Faculty Meeting',
      description: 'Scheduled for January 25, 2025 at 2:00 PM',
      time: '4 hours ago',
      icon: Calendar,
      color: 'green',
      urgent: false
    },
    {
      id: '3',
      type: 'user',
      title: 'New Faculty Registration',
      description: 'Dr. Priya Sharma joined Geology Department',
      time: '1 day ago',
      icon: Users,
      color: 'purple',
      urgent: false
    },
    {
      id: '4',
      type: 'download',
      title: 'Research Grant Application Form',
      description: 'Downloaded 45 times in the last 24 hours',
      time: '1 day ago',
      icon: Download,
      color: 'orange',
      urgent: false
    },
    {
      id: '5',
      type: 'document',
      title: 'Library Timings Update',
      description: 'Updated operating hours effective from January 20',
      time: '2 days ago',
      icon: FileText,
      color: 'blue',
      urgent: false
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'green': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'purple': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      case 'orange': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className={`rounded-xl border ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className={`text-xl font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Recent Activity
          </h2>
          <button className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
            darkMode 
              ? 'text-red-400 hover:text-red-300' 
              : 'text-red-600 hover:text-red-700'
          }`}>
            <span>View All</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`group flex items-start space-x-4 p-4 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer ${
                darkMode 
                  ? 'bg-gray-900 hover:bg-gray-750' 
                  : 'bg-gray-50 hover:bg-white'
              }`}
            >
              <div className={`relative w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                getColorClasses(activity.color)
              }`}>
                <activity.icon size={18} />
                {activity.urgent && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <Bell size={8} className="text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-sm font-medium group-hover:text-red-600 transition-colors duration-200 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {activity.title}
                    {activity.urgent && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        Urgent
                      </span>
                    )}
                  </h3>
                  <div className={`flex items-center text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <Clock size={12} className="mr-1" />
                    {activity.time}
                  </div>
                </div>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {activity.description}
                </p>
              </div>

              <ArrowRight 
                size={16} 
                className={`text-gray-400 group-hover:text-red-600 transition-all duration-200 group-hover:translate-x-1 ${
                  darkMode ? 'group-hover:text-red-400' : ''
                }`}
              />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-6 text-center">
          <button className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
            darkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          }`}>
            <span>Load More Activities</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;