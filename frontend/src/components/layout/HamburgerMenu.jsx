import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  X,
  Home,
  Target,
  Trophy,
  GraduationCap,
  User,
  Bell,
  Building2,
  Users,
  ShieldCheck,
  BarChart3,
  ClipboardList,
  MessageSquare,
  LogOut,
} from 'lucide-react';
import { notificationStore } from '../../data/notificationStore';

const ROLE_MENUS = {
  student: [
    { to: '/inicio', icon: Home, label: 'Inicio' },
    { to: '/entrenamiento', icon: Target, label: 'Entrenamiento' },
    { to: '/retos', icon: Trophy, label: 'Retos' },
    { to: '/curso', icon: GraduationCap, label: 'Curso' },
    { to: '/perfil', icon: User, label: 'Perfil' },
    { to: '/notificaciones', icon: Bell, label: 'Notificaciones', badge: true },
  ],
  teacher: [
    { to: '/teacher', icon: Home, label: 'Panel' },
    { to: '/teacher/students', icon: Users, label: 'Alumnos' },
    { to: '/teacher/tasks', icon: ClipboardList, label: 'Tareas' },
  ],
  parent: [
    { to: '/parent', icon: Home, label: 'Resumen' },
    { to: '/parent/progress', icon: BarChart3, label: 'Progreso' },
    { to: '/parent/feedback', icon: MessageSquare, label: 'Feedback' },
    { to: '/parent/tasks', icon: ClipboardList, label: 'Tareas' },
  ],
  school: [
    { to: '/school', icon: Building2, label: 'Dashboard' },
    { to: '/school/students', icon: GraduationCap, label: 'Alumnos' },
    { to: '/school/analytics', icon: BarChart3, label: 'Estadísticas' },
  ],
  admin: [
    { to: '/admin', icon: ShieldCheck, label: 'Dashboard Admin' },
  ],
};

const isPathActive = (path, pathname) => {
  if (path === '/') return pathname === '/';
  return pathname.startsWith(path);
};

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, currentUser, logout } = useApp();
  const unreadCount = notificationStore.getUnreadCount();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const menuItems = ROLE_MENUS[userRole] || [];

  const handleNav = (path) => {
    setOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate('/');
  };

  if (!userRole) return null;

  return (
    <>
      {/* Mobile-only floating hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-3 left-3 z-[60] flex items-center justify-center w-10 h-10 rounded-full bg-card/90 backdrop-blur-md shadow-lg border border-border/50 transition-all hover:bg-card hover:shadow-xl active:scale-95 lg:hidden"
        data-testid="drawer-menu-btn"
        aria-label="Abrir menu"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-[70] lg:hidden"
          onClick={() => setOpen(false)}
          data-testid="drawer-overlay"
        />
      )}

      {/* Sidebar: persistent on desktop, drawer on mobile */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-[70] w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ease-out
          lg:translate-x-0 lg:z-30 lg:shadow-none
          ${open ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}
        data-testid="drawer-panel"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img
              src="https://customer-assets.emergentagent.com/job_7ca1bb71-1f8d-46a0-b6a5-6e8d935e0094/artifacts/p8gcxj6r_image.png"
              alt="Jugadas Estratégicas"
              className="w-9 h-9 rounded-xl object-cover"
              data-testid="app-logo-drawer"
            />
            <div>
              <p className="text-sm font-bold text-foreground leading-tight">Jugadas</p>
              <p className="text-[10px] text-muted-foreground">Estrategicas</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors lg:hidden"
            data-testid="drawer-close-btn"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <p className="text-sm font-semibold text-foreground truncate">
            {currentUser?.name || 'Usuario'}
          </p>
          <p className="text-[11px] text-muted-foreground capitalize">{userRole}</p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-2 overflow-y-auto" data-testid="drawer-nav">
          {menuItems.map((item) => {
            const active = isPathActive(item.to, location.pathname);
            const showBadge = item.badge && unreadCount > 0;

            return (
              <button
                key={item.to}
                onClick={() => handleNav(item.to)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 transition-colors text-left ${
                  active
                    ? 'bg-accent/10 text-accent border-r-2 border-accent'
                    : 'text-foreground hover:bg-muted/50'
                }`}
                data-testid={`drawer-item-${item.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-accent' : 'text-muted-foreground'}`} />
                <span className={`text-sm flex-1 ${active ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
                {showBadge && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-bold rounded-full bg-destructive text-destructive-foreground">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
                {active && !showBadge && (
                  <div className="w-2 h-2 rounded-full bg-accent" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            data-testid="drawer-logout-btn"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Salir</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DrawerMenu;
