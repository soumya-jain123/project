import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';

interface EventCalendarProps {
  darkMode: boolean;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'meeting' | 'training' | 'seminar' | 'workshop' | 'conference';
  attendees?: number;
  description: string;
}

const EventCalendar: React.FC<EventCalendarProps> = ({ darkMode }) => {
  const [selectedView, setSelectedView] = useState<'upcoming' | 'this-week' | 'this-month'>('upcoming');

  const events: Event[] = [
    {
      id: '1',
      title: 'Monthly Faculty Meeting',
      date: '2025-01-25',
      time: '14:00',
      location: 'Main Conference Hall',
      type: 'meeting',
      attendees: 45,
      description: 'Monthly review meeting for all faculty members'
    },
    {
      id: '2',
      title: 'Safety Training Workshop',
      date: '2025-01-28',
      time: '10:00',
      location: 'Training Center',
      type: 'training',
      attendees: 30,
      description: 'Mandatory safety training for all staff members'
    },
    {
      id: '3',
      title: 'Research Seminar: Advanced Petroleum Exploration',
      date: '2025-02-02',
      time: '15:30',
      location: 'Seminar Hall A',
      type: 'seminar',
      attendees: 60,
      description: 'Latest developments in petroleum exploration techniques'
    },
    {
      id: '4',
      title: 'Data Analysis Workshop',
      date: '2025-02-05',
      time: '09:00',
      location: 'Computer Lab',
      type: 'workshop',
      attendees: 25,
      description: 'Hands-on workshop on geological data analysis'
    },
    {
      id: '5',
      title: 'Annual Research Conference',
      date: '2025-02-15',
      time: '09:00',
      location: 'Main Auditorium',
      type: 'conference',
      attendees: 200,
      description: 'Annual conference showcasing research achievements'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'training': return 'bg-green-100 text-green-800 border-green-200';
      case 'seminar': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'workshop': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'conference': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const isUpcoming = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    return eventDate >= today;
  };

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    
    switch (selectedView) {
      case 'upcoming':
        return isUpcoming(event.date);
      case 'this-week':
        const weekFromNow = new Date();
        weekFromNow.setDate(today.getDate() + 7);
        return eventDate >= today && eventDate <= weekFromNow;
      case 'this-month':
        const monthFromNow = new Date();
        monthFromNow.setMonth(today.getMonth() + 1);
        return eventDate >= today && eventDate <= monthFromNow;
      default:
        return true;
    }
  });

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
            Events & Activities
          </h2>
          
          <div className="flex rounded-md overflow-hidden">
            {(['upcoming', 'this-week', 'this-month'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-3 py-2 text-xs font-medium transition-colors duration-200 ${
                  selectedView === view
                    ? darkMode
                      ? 'bg-red-600 text-white'
                      : 'bg-red-600 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {view === 'upcoming' ? 'Upcoming' : 
                 view === 'this-week' ? 'This Week' : 'This Month'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        {filteredEvents.length === 0 ? (
          <div className={`text-center py-8 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <Calendar size={24} className="mx-auto mb-2" />
            <p>No events found for the selected period.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className={`group p-4 rounded-lg border hover:shadow-md transition-all duration-200 cursor-pointer ${
                  darkMode
                    ? 'bg-gray-900 border-gray-600 hover:bg-gray-800'
                    : 'bg-gray-50 border-gray-200 hover:bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                        getEventTypeColor(event.type)
                      }`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                      <div className={`text-xs font-medium ${
                        darkMode ? 'text-red-400' : 'text-red-600'
                      }`}>
                        {formatDate(event.date)}
                      </div>
                    </div>
                    
                    <h3 className={`text-sm font-medium mb-2 group-hover:text-red-600 transition-colors duration-200 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {event.title}
                    </h3>
                    
                    <div className="space-y-1 mb-3">
                      <div className={`flex items-center gap-1 text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <Clock size={12} />
                        {formatTime(event.time)}
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <MapPin size={12} />
                        {event.location}
                      </div>
                      {event.attendees && (
                        <div className={`flex items-center gap-1 text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Users size={12} />
                          {event.attendees} attendees
                        </div>
                      )}
                    </div>
                    
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {event.description}
                    </p>
                  </div>

                  <ChevronRight 
                    size={16} 
                    className={`text-gray-400 group-hover:text-red-600 transition-colors duration-200 ${
                      darkMode ? 'group-hover:text-red-400' : ''
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;