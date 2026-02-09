import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';
import { Home, BookOpen, Target } from 'lucide-react';

const BottomNav = () => {
  const { userRole } = useApp();
  const location = useLocation();

  // Only show for student and coach roles
  if (!userRole || !['student', 'coach'].includes(userRole)) {
    return null;
  }

  const navItems = [
    { 
      to: userRole === 'student' ? '/inicio' : '/coach', 
      icon: Home, 
      label: 'Inicio' 
    },
    { 
      to: '/entrenamiento', 
      icon: BookOpen, 
      label: 'Entrenamiento' 
    },
    { 
      to: '/retos', 
      icon: Target, 
      label: 'Retos' 
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || 
            (item.to === '/entrenamiento' && location.pathname.startsWith('/entrenamiento')) ||
            (item.to === '/retos' && location.pathname.startsWith('/retos'));
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full px-2 transition-all duration-200",
                isActive 
                  ? "text-accent" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
                isActive ? "bg-accent/10 scale-110" : ""
              )}>
                <item.icon className={cn("w-6 h-6", isActive && "stroke-[2.5px]")} />
              </div>
              <span className={cn(
                "text-xs font-medium mt-0.5 transition-all",
                isActive && "font-bold"
              )}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
