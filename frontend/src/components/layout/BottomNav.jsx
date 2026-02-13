import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Target, Trophy, GraduationCap, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const tabs = [
    { to: '/inicio', icon: Home, label: 'Inicio' },
    { to: '/entrenamiento', icon: Target, label: 'Entrena' },
    { to: '/retos', icon: Trophy, label: 'Retos' },
    { to: '/curso', icon: GraduationCap, label: 'Curso' },
    { to: '/perfil', icon: User, label: 'Perfil' },
  ];

  const isActive = (path) => {
    if (path === '/curso') {
      return location.pathname.startsWith('/curso');
    }
    if (path === '/entrenamiento') {
      return location.pathname.startsWith('/entrenamiento');
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const active = isActive(tab.to);
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors ${
                active 
                  ? 'text-accent' 
                  : 'text-muted-foreground'
              }`}
            >
              <tab.icon className={`w-6 h-6 ${active ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
              <span className={`text-[10px] mt-1 ${active ? 'font-semibold' : 'font-normal'}`}>
                {tab.label}
              </span>
              {active && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-accent" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
