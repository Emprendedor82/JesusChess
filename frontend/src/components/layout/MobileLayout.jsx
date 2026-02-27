import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useApp } from '../../context/AppContext';

const MobileLayout = () => {
  const { userRole } = useApp();

  // Only show bottom nav for students
  const showBottomNav = userRole === 'student';

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop wrapper - shows phone-like frame on large screens */}
      <div className="lg:desktop-wrapper">
        <div className="lg:desktop-app-frame lg:relative">
          {/* Main content container */}
          <main className={`app-container mx-auto ${showBottomNav ? 'content-with-nav' : ''}`}>
            <Outlet />
          </main>
          
          {/* Bottom Navigation - only for students */}
          {showBottomNav && (
            <div className="bottom-nav-container lg:absolute lg:bottom-0 lg:left-0 lg:right-0">
              <BottomNav />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
