import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { LogOut, Settings, User, Menu } from 'lucide-react';

const Header = () => {
  const { currentUser, userRole, logout, sidebarOpen, setSidebarOpen, selectedSchool, schools } = useApp();
  
  const schoolData = selectedSchool ? schools.find(s => s.id === selectedSchool) : null;

  const getRoleLabel = () => {
    switch (userRole) {
      case 'student': return 'Alumno';
      case 'teacher': return 'Profesor';
      case 'parent': return 'Apoderado';
      case 'school': return 'Colegio';
      default: return '';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left side - Menu toggle + Logo */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
              <span className="text-xl font-bold">♜</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading text-lg font-bold text-foreground leading-tight">
                Jugadas Estratégicas
              </h1>
              <p className="text-xs text-muted-foreground">Academia de Ajedrez</p>
            </div>
          </div>
        </div>

        {/* Center - School logo (if applicable) */}
        {schoolData && userRole === 'student' && (
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-lg">
            <img 
              src={schoolData.logo} 
              alt={schoolData.name}
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="text-sm font-medium text-muted-foreground">{schoolData.name}</span>
          </div>
        )}

        {/* Right side - User info + Dropdown */}
        <div className="flex items-center gap-4">
          {/* Role badge */}
          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
            {getRoleLabel()}
          </span>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 border-2 border-accent/20">
                  <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center gap-3 p-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                  <AvatarFallback>{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{currentUser?.name}</p>
                  <p className="text-xs text-muted-foreground">{getRoleLabel()}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Mi Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
