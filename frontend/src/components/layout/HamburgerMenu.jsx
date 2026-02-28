import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, Target, Trophy, GraduationCap, User, Bell } from 'lucide-react';
import { notificationStore } from '../../data/notificationStore';

const MENU_ITEMS = [
  { to: '/inicio', icon: Home, label: 'Inicio' },
  { to: '/entrenamiento', icon: Target, label: 'Entrenamiento' },
  { to: '/retos', icon: Trophy, label: 'Retos' },
  { to: '/curso', icon: GraduationCap, label: 'Curso' },
  { to: '/perfil', icon: User, label: 'Perfil' },
];

const isPathActive = (path, pathname) => {
  if (path === '/curso') return pathname.startsWith('/curso');
  if (path === '/entrenamiento') return pathname.startsWith('/entrenamiento');
  return pathname === path;
};

const HamburgerMenu = ({ variant = 'dark' }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const unreadCount = notificationStore.getUnreadCount();

  const handleNav = (path) => {
    setOpen(false);
    navigate(path);
  };

  const isDark = variant === 'dark';

  return (
    <div className="flex items-center gap-1.5">
      {/* Bell icon */}
      <button
        onClick={() => navigate('/notificaciones')}
        className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
          isDark
            ? 'bg-primary-foreground/10 hover:bg-primary-foreground/20'
            : 'bg-muted hover:bg-muted/80'
        }`}
        data-testid="notifications-bell-btn"
        aria-label="Notificaciones"
      >
        <Bell className={`w-5 h-5 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full bg-destructive text-destructive-foreground" data-testid="notification-badge">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
          isDark
            ? 'bg-primary-foreground/10 hover:bg-primary-foreground/20'
            : 'bg-muted hover:bg-muted/80'
        }`}
        data-testid="hamburger-menu-btn"
        aria-label="Abrir menú"
      >
        {open ? (
          <X className={`w-5 h-5 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`} />
        ) : (
          <Menu className={`w-5 h-5 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`} />
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 animate-fade-in"
            onClick={() => setOpen(false)}
            data-testid="menu-overlay"
          />
          <div
            className="fixed left-0 right-0 z-50 mx-auto max-w-[480px] px-3"
            style={{ top: isDark ? '110px' : '60px' }}
            data-testid="hamburger-menu-dropdown"
          >
            <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden animate-fade-in">
              {MENU_ITEMS.map((item, idx) => {
                const active = isPathActive(item.to, location.pathname);
                return (
                  <button
                    key={item.to}
                    onClick={() => handleNav(item.to)}
                    className={`flex items-center gap-4 w-full px-5 py-3.5 transition-colors text-left
                      ${active ? 'bg-accent/10 text-accent' : 'text-foreground hover:bg-muted/50'}
                      ${idx < MENU_ITEMS.length - 1 ? 'border-b border-border/50' : ''}
                    `}
                    data-testid={`menu-item-${item.label.toLowerCase()}`}
                  >
                    <item.icon className={`w-5 h-5 ${active ? 'text-accent' : 'text-muted-foreground'}`} />
                    <span className={`text-sm ${active ? 'font-semibold' : 'font-medium'}`}>
                      {item.label}
                    </span>
                    {active && <div className="ml-auto w-2 h-2 rounded-full bg-accent" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HamburgerMenu;
