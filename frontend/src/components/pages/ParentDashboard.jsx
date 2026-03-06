import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  BookOpen, 
  Puzzle, 
  Clock, 
  Star,
  MessageSquare,
  ClipboardList,
  Target,
  Brain,
  Focus,
  Timer,
  Heart,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { PARENT_VIEW_DATA } from '../../data/mockData';

const ParentDashboard = ({ section }) => {
  const { currentUser } = useApp();
  
  const data = PARENT_VIEW_DATA;

  const showAll = !section;
  const showProgress = showAll || section === 'progress';
  const showFeedback = showAll || section === 'feedback';
  const showTasks = showAll || section === 'tasks';

  const evaluationCriteria = [
    { key: 'tactica', label: 'Táctica', icon: Target },
    { key: 'estrategia', label: 'Estrategia', icon: Brain },
    { key: 'atencion', label: 'Atención', icon: Focus },
    { key: 'tiempoGestion', label: 'Gestión del tiempo', icon: Timer },
    { key: 'actitud', label: 'Actitud', icon: Heart },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/10 text-success border-0">Completada</Badge>;
      case 'in-progress':
        return <Badge className="bg-accent/10 text-accent border-0">En progreso</Badge>;
      default:
        return <Badge className="bg-warning/10 text-warning border-0">Pendiente</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Panel del Apoderado
          </h1>
          <p className="text-muted-foreground mt-1">
            Revisa el progreso de tu hijo/a en la academia
          </p>
        </div>
        
        {/* Child Info */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
          <Avatar className="w-14 h-14 border-2 border-accent/20">
            <AvatarImage src={data.child.avatar} alt={data.child.name} />
            <AvatarFallback>{data.child.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-heading font-bold text-foreground">{data.child.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{data.child.school}</span>
              <span>•</span>
              <Badge variant="outline">Nivel {data.child.level}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress Stats */}
      {showProgress && (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Progreso semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">Lecciones</span>
              </div>
              <p className="font-heading text-2xl font-bold text-foreground">
                {data.weeklyProgress.lessonsCompleted}
              </p>
              <p className="text-xs text-muted-foreground">completadas</p>
            </div>

            <div className="p-4 rounded-xl bg-success/5 border border-success/10">
              <div className="flex items-center gap-2 mb-2">
                <Puzzle className="w-5 h-5 text-success" />
                <span className="text-sm text-muted-foreground">Puzzles</span>
              </div>
              <p className="font-heading text-2xl font-bold text-foreground">
                {data.weeklyProgress.puzzlesSolved}
              </p>
              <p className="text-xs text-muted-foreground">resueltos</p>
            </div>

            <div className="p-4 rounded-xl bg-warning/5 border border-warning/10">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-warning" />
                <span className="text-sm text-muted-foreground">Tiempo</span>
              </div>
              <p className="font-heading text-2xl font-bold text-foreground">
                {data.weeklyProgress.timeSpent}
              </p>
              <p className="text-xs text-muted-foreground">practicando</p>
            </div>

            <div className="p-4 rounded-xl bg-xp/5 border border-xp/10">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-xp" />
                <span className="text-sm text-muted-foreground">XP</span>
              </div>
              <p className="font-heading text-2xl font-bold text-foreground">
                {data.weeklyProgress.xpEarned}
              </p>
              <p className="text-xs text-muted-foreground">ganados</p>
            </div>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Latest Feedback from Teacher */}
      {showFeedback && (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Último feedback del profesor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Teacher comment */}
          <div className="p-4 rounded-xl bg-secondary/50 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {new Date(data.lastFeedback.date).toLocaleDateString('es-CL', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm font-medium">{data.lastFeedback.teacher}</span>
            </div>
            <p className="text-foreground">"{data.lastFeedback.comment}"</p>
          </div>

          {/* Evaluation */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">Evaluación</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {evaluationCriteria.map((criteria) => {
                const value = data.lastFeedback.evaluation[criteria.key];
                return (
                  <div key={criteria.key} className="p-4 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <criteria.icon className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-foreground">{criteria.label}</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= value 
                              ? 'text-xp fill-xp' 
                              : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{value}/5</p>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Assigned Tasks */}
      {showTasks && (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-warning" />
            Tareas asignadas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.assignedTasks.map((task) => (
            <div 
              key={task.id}
              className={`p-4 rounded-xl border transition-all ${
                task.status === 'completed' 
                  ? 'bg-success/5 border-success/20' 
                  : 'bg-card border-border'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-heading font-bold text-foreground">{task.title}</h4>
                    {getStatusBadge(task.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Asignada por: {task.assignedBy}</span>
                    <span>•</span>
                    <span>Vence: {new Date(task.dueDate).toLocaleDateString('es-CL')}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{task.progress}/{task.total}</p>
                  <Progress 
                    value={(task.progress / task.total) * 100} 
                    className="h-2 w-20 mt-1" 
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      )}

      {/* Read-only notice */}
      <div className="text-center py-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-muted-foreground text-sm">
          <span className="w-2 h-2 rounded-full bg-muted-foreground/50"></span>
          Vista de solo lectura - Contacta al profesor para más información
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
