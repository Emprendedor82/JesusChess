import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  ChevronRight, 
  LogOut, 
  Star, 
  Trophy,
  BookOpen,
  Target,
  Settings,
  Bell,
  HelpCircle
} from 'lucide-react';
import { courseStorage } from '../../data/courseData';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useApp();

  if (!currentUser) return null;

  const coursePurchased = courseStorage.isPurchased();
  const courseProgress = courseStorage.getCompletedCount();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: Trophy, label: 'Mis logros', badge: '3', onClick: () => {} },
    { icon: BookOpen, label: 'Historial de lecciones', onClick: () => {} },
    { icon: Bell, label: 'Notificaciones', onClick: () => {} },
    { icon: Settings, label: 'Configuración', onClick: () => {} },
    { icon: HelpCircle, label: 'Ayuda', onClick: () => {} },
  ];

  return (
    <div className="min-h-screen bg-background safe-area-top">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 pt-4 pb-8">
        <div className="app-container mx-auto">
          <h1 className="text-base md:text-lg font-bold text-center mb-5">Mi Perfil</h1>
          
          {/* Profile Card */}
          <div className="flex flex-col items-center">
            <Avatar className="w-16 h-16 md:w-20 md:h-20 border-4 border-primary-foreground/20 mb-3">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback className="text-xl md:text-2xl bg-accent text-accent-foreground">
                {currentUser.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h2 className="font-heading text-lg md:text-xl font-bold">{currentUser.name}</h2>
            <Badge className="mt-2 bg-accent text-accent-foreground text-xs">
              Nivel {currentUser.level}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-4">
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-xp/10 mb-2">
                  <Star className="w-5 h-5 text-xp" />
                </div>
                <p className="font-heading text-lg font-bold text-foreground">{currentUser.xp}</p>
                <p className="text-xs text-muted-foreground">XP Total</p>
              </div>
              <div>
                <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-streak/10 mb-2">
                  <Target className="w-5 h-5 text-streak" />
                </div>
                <p className="font-heading text-lg font-bold text-foreground">{currentUser.streak}</p>
                <p className="text-xs text-muted-foreground">Días racha</p>
              </div>
              <div>
                <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-success/10 mb-2">
                  <BookOpen className="w-5 h-5 text-success" />
                </div>
                <p className="font-heading text-lg font-bold text-foreground">{currentUser.completedLessons}</p>
                <p className="text-xs text-muted-foreground">Lecciones</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      {coursePurchased && (
        <div className="px-4 mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-foreground">Progreso del Curso</span>
                <span className="text-sm text-muted-foreground">{courseProgress}/12</span>
              </div>
              <Progress value={(courseProgress / 12) * 100} className="h-2" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Menu Items */}
      <div className="px-4 mt-4 space-y-2">
        {menuItems.map((item, idx) => (
          <Card 
            key={idx} 
            className="cursor-pointer active:scale-[0.98] transition-transform"
            onClick={item.onClick}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary">
                  <item.icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="flex-1 font-medium text-foreground">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="mr-2">{item.badge}</Badge>
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Logout */}
      <div className="px-4 mt-6 mb-8">
        <Button 
          variant="outline" 
          className="w-full h-12 text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
