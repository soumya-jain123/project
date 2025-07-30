import React from 'react';
import { FileText, Calendar, Users, Download, TrendingUp, Clock } from 'lucide-react';

interface QuickStatsProps {
  darkMode: boolean;
}

const QuickStats: React.FC<QuickStatsProps> = ({ darkMode }) => {
  const stats = [
    {
      title: 'Active Circulars',
      value: '24',
      change: '+3 this week',
      icon: FileText,
      color: 'blue',
      trend: 'up'
    },
    {
      title: 'Upcoming Events',
      value: '8',
      change: 'Next 30 days',
      icon: Calendar,
      color: 'green',
      trend: 'up'
    },
    {
      title: 'Faculty Members',
      value: '156',
      change: '+2 this month',
      icon: Users,
      color: 'purple',
      trend: 'up'
    },
    {
      title: 'Document Downloads',
      value: '1.2K',
      change: 'This month',
      icon: Download,
      color: 'orange',
      trend: 'up'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': 
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          icon: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-200 dark:border-blue-800'
        };
      case 'green': 
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          icon: 'text-green-600 dark:text-green-400',
          border: 'border-green-200 dark:border-green-800'
        };
      case 'purple': 
        return {
          bg: 'bg-purple-50 dark:bg-purple-900/20',
          icon: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-200 dark:border-purple-800'
        };
      case 'orange': 
        return {
          bg: 'bg-orange-50 dark:bg-orange-900/20',
          icon: 'text-orange-600 dark:text-orange-400',
          border: 'border-orange-200 dark:border-orange-800'
        };
      default: 
        return {
          bg: 'bg-gray-50 dark:bg-gray-900/20',
          icon: 'text-gray-600 dark:text-gray-400',
          border: 'border-gray-200 dark:border-gray-800'
        };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat) => {
        const colors = getColorClasses(stat.color);
        return (
          <div
            key={stat.title}
            className={`group p-6 rounded-2xl border transition-all duration-300 hover:shadow-soft-lg hover:scale-105 cursor-pointer animate-fade-in ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 shadow-soft' 
                : 'bg-white border-gray-200 hover:bg-gray-50 shadow-soft'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg ${colors.bg} ${colors.border}`}>
                <stat.icon size={24} className={colors.icon} />
              </div>
              {stat.trend === 'up' && (
                <div className="flex items-center text-green-600 dark:text-green-400 animate-pulse">
                  <TrendingUp size={16} />
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <h3 className={`text-3xl font-bold transition-colors duration-300 ${
                darkMode ? 'text-white group-hover:text-red-400' : 'text-gray-900 group-hover:text-red-600'
              }`}>
                {stat.value}
              </h3>
              <p className={`text-base font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {stat.title}
              </p>
              <p className={`text-sm flex items-center ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <Clock size={12} className="mr-1" />
                {stat.change}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;