import React from 'react';
import { Outlet } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import BottomNav from './BottomNav';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LogOut } from 'lucide-react';

const MobileHeader = () => {
  const { currentUser, userRole, logout } = useApp();

  const getRoleLabel = () => {
    switch (userRole) {
      case 'student': return 'Alumno';
      case 'coach': return 'Coach';
      default: return '';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-primary text-primary-foreground shadow-md">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-accent-foreground text-lg font-bold">
            ♜
          </div>
          <div className="hidden sm:block">
            <h1 className="font-heading text-sm font-bold leading-tight">
              Jugadas Estratégicas
            </h1>
          </div>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3">
          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20">
            {getRoleLabel()}
          </span>
          <Avatar className="w-8 h-8 border border-primary-foreground/20">
            <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
            <AvatarFallback className="bg-accent text-accent-foreground text-xs">
              {currentUser?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            onClick={logout}
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

const MobileLayout = () => {
  const { userRole } = useApp();

  if (!userRole) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MobileHeader />
      <main className="flex-1 pb-20 overflow-x-hidden">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default MobileLayout;
