import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  Flame, 
  Star, 
  Target, 
  BookOpen, 
  ClipboardList, 
  ChevronRight,
  Trophy,
  Zap,
  Clock,
  Play,
  GraduationCap
} from 'lucide-react';
import { DAILY_CHALLENGES, LESSONS, STUDENT_TASKS, WEEKLY_CHALLENGES } from '../../data/mockData';
import { courseStorage, COURSE_INFO } from '../../data/courseData';

const StudentDashboard = () => {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  
  if (!currentUser) return null;

  const xpProgress = (currentUser.xp / currentUser.xpToNextLevel) * 100;
  const coursePurchased = courseStorage.isPurchased();
  const courseProgress = courseStorage.getCompletedCount();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            ¡Hola, {currentUser.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Sigue entrenando para convertirte en un maestro del ajedrez
          </p>
        </div>
        
        {/* Streak Badge */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-streak/10 to-xp/10 border border-streak/20">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-streak/20 streak-flame">
            <Flame className="w-6 h-6 text-streak" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Racha actual</p>
            <p className="font-heading text-2xl font-bold text-streak">{currentUser.streak} días</p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Level Card */}
        <Card className="bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-5 h-5" />
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0">
                Nivel {currentUser.level}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary-foreground/80">XP</span>
                <span className="font-bold">{currentUser.xp}/{currentUser.xpToNextLevel}</span>
              </div>
              <Progress value={xpProgress} className="h-2 bg-primary-foreground/20" />
            </div>
          </CardContent>
        </Card>

        {/* Lessons Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-5 h-5 text-accent" />
              <span className="text-xs text-muted-foreground">Lecciones</span>
            </div>
            <p className="font-heading text-2xl font-bold text-foreground">
              {currentUser.completedLessons}/{currentUser.totalLessons}
            </p>
            <Progress 
              value={(currentUser.completedLessons / currentUser.totalLessons) * 100} 
              className="h-2 mt-2" 
            />
          </CardContent>
        </Card>

        {/* Tasks Pending */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <ClipboardList className="w-5 h-5 text-warning" />
              <span className="text-xs text-muted-foreground">Tareas</span>
            </div>
            <p className="font-heading text-2xl font-bold text-foreground">
              {STUDENT_TASKS.filter(t => t.status !== 'completed').length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">pendientes</p>
          </CardContent>
        </Card>

        {/* Medals */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-5 h-5 text-xp" />
              <span className="text-xs text-muted-foreground">Medallas</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              {currentUser.medals.map((medal, idx) => (
                <span 
                  key={idx} 
                  className={`text-2xl ${
                    medal === 'gold' ? 'text-xp' : 
                    medal === 'silver' ? 'text-level-silver' : 
                    'text-level-bronze'
                  }`}
                >
                  🏅
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-auto py-6 btn-gradient flex flex-col items-center gap-2 text-center">
          <Zap className="w-8 h-8" />
          <span className="font-heading text-lg font-bold">Entrenamiento del día</span>
          <span className="text-sm opacity-80">+50 XP disponibles</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2 text-center border-2 hover:border-accent hover:bg-accent/5">
          <Target className="w-8 h-8 text-accent" />
          <span className="font-heading text-lg font-bold">Mis Retos</span>
          <span className="text-sm text-muted-foreground">2 retos activos</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2 text-center border-2 hover:border-warning hover:bg-warning/5">
          <ClipboardList className="w-8 h-8 text-warning" />
          <span className="font-heading text-lg font-bold">Mis Tareas</span>
          <span className="text-sm text-muted-foreground">2 tareas pendientes</span>
        </Button>
      </div>

      {/* Daily Challenges */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Desafíos del día
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-accent">
              Ver todos <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {DAILY_CHALLENGES.map((challenge) => (
            <div 
              key={challenge.id}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                challenge.completed 
                  ? 'bg-success/5 border-success/20' 
                  : 'bg-card hover:bg-secondary/50 border-border hover:border-accent/30'
              }`}
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl text-2xl ${
                challenge.completed ? 'bg-success/10' : 'bg-accent/10'
              }`}>
                {challenge.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-foreground">{challenge.title}</h4>
                  {challenge.completed && (
                    <Badge variant="success" className="bg-success/10 text-success border-0">
                      ✓ Completado
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-1">
                  {challenge.difficulty}
                </Badge>
                <p className="text-sm font-bold text-xp">+{challenge.xpReward} XP</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Lessons Progress */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Continúa aprendiendo
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-accent">
              Ver todas <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LESSONS.slice(0, 3).map((lesson) => (
              <Card 
                key={lesson.id} 
                className={`card-hover cursor-pointer ${lesson.locked ? 'opacity-60' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-xl">
                      {lesson.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-sm text-foreground">{lesson.title}</h4>
                      <p className="text-xs text-muted-foreground">{lesson.module}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {lesson.duration}
                      </span>
                      <span className="font-medium">{lesson.progress}%</span>
                    </div>
                    <Progress value={lesson.progress} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Challenges */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-xp" />
            Retos semanales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {WEEKLY_CHALLENGES.map((challenge) => (
            <div key={challenge.id} className="p-4 rounded-xl bg-gradient-to-r from-xp/5 to-streak/5 border border-xp/10">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-heading font-bold text-foreground">{challenge.title}</h4>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </div>
                <Badge variant="outline" className="text-xp border-xp/30">
                  +{challenge.xpReward} XP
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className="font-medium">{challenge.progress}/{challenge.total}</span>
                </div>
                <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">
                  Termina en {challenge.deadline}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
