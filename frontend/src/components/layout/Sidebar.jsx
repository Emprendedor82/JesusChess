import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';
import { 
  Home, 
  BookOpen, 
  Trophy, 
  Target, 
  ClipboardList,
  Users,
  BarChart3,
  MessageSquare,
  GraduationCap,
  Building2,
  X
} from 'lucide-react';
import { Button } from '../ui/button';

const Sidebar = () => {
  const { userRole, sidebarOpen, setSidebarOpen } = useApp();
  const location = useLocation();

  // Navigation items based on role
  const getNavItems = () => {
    switch (userRole) {
      case 'student':
        return [
          { to: '/dashboard', icon: Home, label: 'Inicio' },
          { to: '/entrenamiento', icon: BookOpen, label: 'Entrenamiento' },
          { to: '/retos', icon: Target, label: 'Mis Retos' },
          { to: '/entrenamiento/tareas', icon: ClipboardList, label: 'Mis Tareas' },
          { to: '/achievements', icon: Trophy, label: 'Logros' },
        ];
      case 'teacher':
        return [
          { to: '/teacher', icon: Home, label: 'Panel' },
          { to: '/teacher/students', icon: Users, label: 'Alumnos' },
          { to: '/teacher/tasks', icon: ClipboardList, label: 'Tareas' },
        ];
      case 'parent':
        return [
          { to: '/parent', icon: Home, label: 'Resumen' },
          { to: '/parent/progress', icon: BarChart3, label: 'Progreso' },
          { to: '/parent/feedback', icon: MessageSquare, label: 'Feedback' },
          { to: '/parent/tasks', icon: ClipboardList, label: 'Tareas' },
        ];
      case 'school':
        return [
          { to: '/school', icon: Building2, label: 'Dashboard' },
          { to: '/school/students', icon: GraduationCap, label: 'Alumnos' },
          { to: '/school/analytics', icon: BarChart3, label: 'Estadísticas' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-0 md:top-16 left-0 z-50 md:z-0 h-screen md:h-[calc(100vh-4rem)] w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 border-b border-border md:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xl">♜</span>
            <span className="font-heading font-bold">Menú</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive || location.pathname === item.to
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom section - XP display for students */}
        {userRole === 'student' && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-xp/10 to-streak/10">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-xp/20">
                <span className="text-lg">⭐</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Experiencia total</p>
                <p className="font-heading font-bold text-foreground">2,450 XP</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
