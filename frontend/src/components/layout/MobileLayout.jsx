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
      {/* Main content with bottom padding for nav */}
      <main className={`${showBottomNav ? 'pb-20' : ''}`}>
        <Outlet />
      </main>
      
      {/* Bottom Navigation - only for students */}
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default MobileLayout;
