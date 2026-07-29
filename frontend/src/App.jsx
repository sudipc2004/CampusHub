import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MobileBottomNav from './components/MobileBottomNav';
import Dashboard from './views/Dashboard';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQuery = (q) => {
    setSearchQuery(q);
    setActiveTab('dashboard');
  };

  return (
    <div className="app-container">
      {/* Side Navigation Bar */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content Area */}
      <div className="main-content">
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          onSearchQuery={handleSearchQuery} 
        />
        
        {/* Main Dashboard View */}
        <Dashboard searchQuery={searchQuery} />
      </div>

      {/* Mobile Bottom Navigation Bar (< 768px Viewports) */}
      <MobileBottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
    </div>
  );
}
