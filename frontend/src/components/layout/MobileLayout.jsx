import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import DrawerMenu from './HamburgerMenu';
import { useApp } from '../../context/AppContext';

const MobileLayout = () => {
  const { userRole } = useApp();

  const showBottomNav = userRole === 'student';
  const isWideLayout = userRole === 'admin';

  return (
    <div className="min-h-screen bg-muted/30 lg:bg-muted/50">
      <div className={`mx-auto bg-background min-h-screen relative shadow-none lg:shadow-2xl lg:my-0 ${
        isWideLayout ? 'max-w-5xl' : 'max-w-[480px]'
      }`}>
        {/* Global Drawer Menu - available on ALL pages */}
        <DrawerMenu />

        <main className={`${showBottomNav ? 'pb-20' : ''} ${isWideLayout ? 'p-4 md:p-6' : ''}`}>
          <Outlet />
        </main>
        
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
