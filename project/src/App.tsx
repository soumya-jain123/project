import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import EventsCirculars from './pages/EventsCirculars';
import MessagesHOI from './pages/MessagesHOI';
import Directory from './pages/Directory';
import Reports from './pages/Reports';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import AdminLoginModal from './components/AdminLoginModal';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleLoginClose = () => {
    setLoginModalOpen(false);
  };

  const handleAdminLoginClick = () => {
    setAdminLoginOpen(true);
  };

  const handleAdminLoginClose = () => {
    setAdminLoginOpen(false);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setAdminLoginOpen(false);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  return (
    <Router>
      <div className={`min-h-screen transition-all duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          onLoginClick={handleLoginClick}
          onAdminLoginClick={handleAdminLoginClick}
          isAdminLoggedIn={isAdminLoggedIn}
          onAdminLogout={handleAdminLogout}
        />
        
        <div className="flex min-h-screen gap-[10px]">
          <Sidebar 
            darkMode={darkMode} 
            isOpen={sidebarOpen} 
            onToggle={toggleSidebar}
          />
          
          <main className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Home darkMode={darkMode} />} />
              <Route path="/events-circulars" element={<EventsCirculars darkMode={darkMode} />} />
              <Route path="/messages-hoi" element={<MessagesHOI darkMode={darkMode} />} />
              <Route path="/directory" element={<Directory darkMode={darkMode} />} />
              <Route path="/reports" element={<Reports darkMode={darkMode} />} />
              <Route 
                path="/admin" 
                element={
                  isAdminLoggedIn ? 
                    <AdminDashboard darkMode={darkMode} /> : 
                    <Home darkMode={darkMode} />
                } 
              />
            </Routes>
            
            <div className="mt-auto">
              <Footer darkMode={darkMode} />
            </div>
          </main>
        </div>

        {/* Modals */}
        <LoginModal 
          isOpen={loginModalOpen} 
          onClose={handleLoginClose} 
          darkMode={darkMode}
        />
        
        <AdminLoginModal
          isOpen={adminLoginOpen}
          onClose={handleAdminLoginClose}
          onLoginSuccess={handleAdminLoginSuccess}
          darkMode={darkMode}
        />
      </div>
    </Router>
  );
}

export default App;