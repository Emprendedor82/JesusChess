import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import DrawerMenu from './HamburgerMenu';
import { useApp } from '../../context/AppContext';

const MobileLayout = () => {
  const { userRole } = useApp();

  const showBottomNav = userRole === 'student';

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar / Drawer */}
      <DrawerMenu />

      {/* Main content: offset by sidebar width on desktop */}
      <div className="lg:pl-64">
        <main className={`min-h-screen ${showBottomNav ? 'pb-20 lg:pb-0' : ''}`}>
          <Outlet />
        </main>
        
        {/* Bottom nav: mobile only */}
        {showBottomNav && (
          <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
            <BottomNav />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileLayout;
