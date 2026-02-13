import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Flame, 
  Star, 
  ChevronRight,
  Zap,
  BookOpen,
  Trophy,
  GraduationCap,
  Play
} from 'lucide-react';
import { courseStorage, COURSE_INFO } from '../../data/courseData';

const StudentHomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useApp();
  
  if (!currentUser) return null;

  const xpProgress = (currentUser.xp / currentUser.xpToNextLevel) * 100;
  const coursePurchased = courseStorage.isPurchased();
  const courseProgress = courseStorage.getCompletedCount();

  return (
    <div className="min-h-screen bg-background safe-area-top">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-primary-foreground/20">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback className="bg-accent text-accent-foreground">
                {currentUser.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-primary-foreground/70">¡Hola!</p>
              <h1 className="font-heading text-lg font-bold">
                {currentUser.name?.split(' ')[0]}
              </h1>
            </div>
          </div>
          
          {/* Streak */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-primary-foreground/10">
            <Flame className="w-5 h-5 text-streak" />
            <span className="font-bold text-streak">{currentUser.streak}</span>
          </div>
        </div>

        {/* Level Progress */}
        <Card className="bg-primary-foreground/10 border-0">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-xp" />
                <span className="text-sm font-medium">Nivel {currentUser.level}</span>
              </div>
              <span className="text-sm">{currentUser.xp}/{currentUser.xpToNextLevel} XP</span>
            </div>
            <Progress value={xpProgress} className="h-2 bg-primary-foreground/20" />
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        
        {/* Course Card - Featured */}
        <Card 
          className="cursor-pointer border-2 border-accent/30 bg-gradient-to-r from-accent/5 to-primary/5 active:scale-[0.98] transition-transform"
          onClick={() => navigate(coursePurchased ? '/curso/contenido' : '/curso')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10">
                <GraduationCap className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-accent text-accent-foreground text-[10px]">CURSO</Badge>
                  {coursePurchased && (
                    <span className="text-xs text-muted-foreground">{courseProgress}/12</span>
                  )}
                </div>
                <h3 className="font-heading font-bold text-foreground text-sm leading-tight">
                  {coursePurchased ? 'Continuar curso' : COURSE_INFO.title}
                </h3>
              </div>
              <ChevronRight className="w-5 h-5 text-accent" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => navigate('/entrenamiento')}
          >
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-2xl bg-success/10 mb-2">
                <Zap className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm">Entrenar</h3>
              <p className="text-xs text-muted-foreground mt-1">+50 XP</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => navigate('/retos')}
          >
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-2xl bg-warning/10 mb-2">
                <Trophy className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm">Retos</h3>
              <p className="text-xs text-muted-foreground mt-1">2 activos</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Goal */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-bold text-foreground">Meta del día</h3>
              <Badge variant="outline" className="text-xs">Hoy</Badge>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10">
                  <BookOpen className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Completar 1 lección</p>
                  <Progress value={0} className="h-1.5 mt-1" />
                </div>
                <span className="text-xs text-muted-foreground">0/1</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/10">
                  <Zap className="w-4 h-4 text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Ganar 50 XP</p>
                  <Progress value={(currentUser.xp % 50) * 2} className="h-1.5 mt-1" />
                </div>
                <span className="text-xs text-muted-foreground">{currentUser.xp % 50}/50</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-heading font-bold text-foreground mb-3">Actividad reciente</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-xp/10">
                  <Star className="w-4 h-4 text-xp" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Subiste a Nivel {currentUser.level}</p>
                  <p className="text-xs text-muted-foreground">Hace 2 días</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-streak/10">
                  <Flame className="w-4 h-4 text-streak" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Racha de {currentUser.streak} días</p>
                  <p className="text-xs text-muted-foreground">¡Sigue así!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default StudentHomePage;
