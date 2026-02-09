import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  Flame, 
  Star, 
  ChevronRight,
  Trophy,
  Zap,
  BookOpen,
  Target
} from 'lucide-react';

const StudentHome = () => {
  const { currentUser } = useApp();
  const navigate = useNavigate();

  // Mock data
  const studentData = {
    name: currentUser?.name || 'Estudiante',
    level: 2,
    maxLevel: 4,
    xp: 450,
    xpToNext: 600,
    streak: 5,
    completedLessons: 4,
    totalLessons: 8,
    nextLesson: 'Cómo se mueven las piezas',
    pendingTasks: 2,
    weeklyChallenge: {
      name: 'Completa 3 ejercicios',
      progress: 1,
      total: 3
    }
  };

  const xpProgress = (studentData.xp / studentData.xpToNext) * 100;
  const levelProgress = (studentData.level / studentData.maxLevel) * 100;

  return (
    <div className="p-4 space-y-5 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            ¡Hola, {studentData.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Continúa tu entrenamiento de ajedrez
          </p>
        </div>
        
        {/* Streak Badge */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-streak/10 border border-streak/20">
          <Flame className="w-5 h-5 text-streak streak-flame" />
          <span className="font-heading font-bold text-streak">{studentData.streak}</span>
        </div>
      </div>

      {/* Level & XP Card */}
      <Card className="bg-gradient-to-br from-primary to-primary-light text-primary-foreground overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-xp" />
              <span className="font-heading text-lg font-bold">Nivel {studentData.level}</span>
            </div>
            <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">
              {studentData.level} de {studentData.maxLevel}
            </Badge>
          </div>
          <div className="space-y-2">
            <Progress value={xpProgress} className="h-3 bg-primary-foreground/20" />
            <div className="flex justify-between text-xs text-primary-foreground/80">
              <span>{studentData.xp} XP</span>
              <span>{studentData.xpToNext} XP para nivel {studentData.level + 1}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Continue Learning CTA */}
      <Card 
        className="cursor-pointer card-hover border-2 border-accent/30 bg-accent/5"
        onClick={() => navigate('/entrenamiento/aprende')}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent/20">
              <Zap className="w-7 h-7 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-foreground">
                Continuar entrenamiento
              </h3>
              <p className="text-sm text-muted-foreground">
                {studentData.nextLesson}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Progress 
                  value={(studentData.completedLessons / studentData.totalLessons) * 100} 
                  className="h-1.5 flex-1" 
                />
                <span className="text-xs text-muted-foreground">
                  {studentData.completedLessons}/{studentData.totalLessons}
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-accent" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card 
          className="cursor-pointer card-hover"
          onClick={() => navigate('/entrenamiento/practica')}
        >
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-success/10 mb-2">
              <span className="text-2xl">♟️</span>
            </div>
            <h4 className="font-heading font-bold text-sm text-foreground">Practicar</h4>
            <p className="text-xs text-muted-foreground">Tablero digital</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer card-hover"
          onClick={() => navigate('/retos')}
        >
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-xp/10 mb-2">
              <Target className="w-6 h-6 text-xp" />
            </div>
            <h4 className="font-heading font-bold text-sm text-foreground">Retos</h4>
            <p className="text-xs text-muted-foreground">6 disponibles</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Challenge */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-xp" />
              <h3 className="font-heading font-bold text-foreground">Reto semanal</h3>
            </div>
            <Badge variant="outline" className="text-xp border-xp/30">
              +100 XP
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {studentData.weeklyChallenge.name}
          </p>
          <div className="space-y-2">
            <Progress 
              value={(studentData.weeklyChallenge.progress / studentData.weeklyChallenge.total) * 100} 
              className="h-2" 
            />
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-medium">
                {studentData.weeklyChallenge.progress}/{studentData.weeklyChallenge.total}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Tasks */}
      {studentData.pendingTasks > 0 && (
        <Card 
          className="cursor-pointer border-warning/30 bg-warning/5"
          onClick={() => navigate('/entrenamiento/tareas')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-warning/20">
                <BookOpen className="w-5 h-5 text-warning" />
              </div>
              <div className="flex-1">
                <h4 className="font-heading font-bold text-sm text-foreground">
                  Tareas pendientes
                </h4>
                <p className="text-xs text-muted-foreground">
                  Tienes {studentData.pendingTasks} tareas por completar
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-warning" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentHome;
