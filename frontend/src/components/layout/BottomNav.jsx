import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Target, Trophy, GraduationCap, User } from 'lucide-react';

// Feature flags - cambiar a true para reactivar en fase 2
const SHOW_ENTRENAMIENTO = false;
const SHOW_RETOS = false;

const BottomNav = () => {
  const location = useLocation();

  const allTabs = [
    { to: '/inicio', icon: Home, label: 'Inicio', visible: true },
    { to: '/entrenamiento', icon: Target, label: 'Entrena', visible: SHOW_ENTRENAMIENTO },
    { to: '/retos', icon: Trophy, label: 'Retos', visible: SHOW_RETOS },
    { to: '/curso', icon: GraduationCap, label: 'Curso', visible: true },
    { to: '/perfil', icon: User, label: 'Perfil', visible: true },
  ];

  const tabs = allTabs.filter(t => t.visible);

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
    <nav className="bg-card border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const active = isActive(tab.to);
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors relative ${
                active 
                  ? 'text-accent' 
                  : 'text-muted-foreground'
              }`}
            >
              <tab.icon className={`w-5 h-5 md:w-6 md:h-6 ${active ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
              <span className={`text-[10px] md:text-xs mt-1 ${active ? 'font-semibold' : 'font-normal'}`}>
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
