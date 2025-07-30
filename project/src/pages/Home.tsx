import React from 'react';
import NoticesSection from '../components/NoticesSection';
import EventCalendar from '../components/EventCalendar';
import QuickStats from '../components/QuickStats';
import RecentActivity from '../components/RecentActivity';

interface HomeProps {
  darkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ darkMode }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      {/* Welcome Section */}
      <div className={`rounded-2xl p-8 lg:p-12 mb-8 relative overflow-hidden shadow-soft-lg ${
        darkMode 
          ? 'bg-gradient-to-r from-red-900 to-red-800' 
          : 'bg-gradient-to-r from-red-600 to-red-700'
      }`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Welcome to KDMIP Portal
          </h1>
          <p className="text-red-100 text-lg lg:text-xl mb-6 font-medium">
            Keshava Deva Malaviya Institute of Petroleum Exploration - ONGC
          </p>
          <p className="text-red-200 text-base max-w-3xl leading-relaxed">
            Your gateway to institutional resources, research updates, and administrative services. 
            Stay connected with the latest developments in petroleum exploration and education.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full transform translate-x-12 translate-y-12"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full transform translate-x-8 -translate-y-8"></div>
      </div>

      {/* Quick Stats */}
      <QuickStats darkMode={darkMode} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
        {/* Left Column - Notices */}
        <div className="xl:col-span-2">
          <NoticesSection darkMode={darkMode} />
        </div>
        
        {/* Right Column - Events */}
        <div className="xl:col-span-1">
          <EventCalendar darkMode={darkMode} />
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity darkMode={darkMode} />
    </div>
  );
};

export default Home;