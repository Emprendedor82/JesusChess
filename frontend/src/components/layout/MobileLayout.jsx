import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useApp } from '../../context/AppContext';

const MobileLayout = () => {
  const { userRole } = useApp();

  // Only show bottom nav for students
  const showBottomNav = userRole === 'student';

  return (
    <div className="min-h-screen bg-muted/30 lg:bg-muted/50">
      {/* Centered app container */}
      <div className="max-w-[480px] mx-auto bg-background min-h-screen relative shadow-none lg:shadow-2xl lg:my-0">
        {/* Main content container */}
        <main className={`${showBottomNav ? 'pb-20' : ''}`}>
          <Outlet />
        </main>
        
        {/* Bottom Navigation - only for students */}
        {showBottomNav && (
          <div className="fixed bottom-0 left-0 right-0 z-50 lg:absolute">
            <div className="max-w-[480px] mx-auto">
              <BottomNav />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileLayout;
