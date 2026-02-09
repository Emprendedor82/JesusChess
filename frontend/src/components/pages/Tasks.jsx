import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  ClipboardList, 
  Clock, 
  User, 
  CheckCircle, 
  Play, 
  AlertCircle,
  Calendar
} from 'lucide-react';
import { STUDENT_TASKS } from '../../data/mockData';

const Tasks = () => {
  const pendingTasks = STUDENT_TASKS.filter(t => t.status !== 'completed');
  const completedTasks = STUDENT_TASKS.filter(t => t.status === 'completed');

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          badge: <Badge className="bg-success/10 text-success border-0">Completada</Badge>,
          icon: <CheckCircle className="w-5 h-5 text-success" />,
          bgClass: 'bg-success/5 border-success/20'
        };
      case 'in-progress':
        return {
          badge: <Badge className="bg-accent/10 text-accent border-0">En progreso</Badge>,
          icon: <Play className="w-5 h-5 text-accent" />,
          bgClass: 'bg-accent/5 border-accent/20'
        };
      default:
        return {
          badge: <Badge className="bg-warning/10 text-warning border-0">Pendiente</Badge>,
          icon: <AlertCircle className="w-5 h-5 text-warning" />,
          bgClass: 'bg-warning/5 border-warning/20'
        };
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Mis Tareas
          </h1>
          <p className="text-muted-foreground mt-1">
            Tareas asignadas por tu profesor
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-warning/10 border border-warning/20">
            <AlertCircle className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium">{pendingTasks.length} pendientes</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
            <CheckCircle className="w-4 h-4 text-success" />
            <span className="text-sm font-medium">{completedTasks.length} completadas</span>
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-warning" />
              Tareas pendientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingTasks.map((task) => {
              const statusConfig = getStatusConfig(task.status);
              const overdue = isOverdue(task.dueDate) && task.status !== 'completed';
              
              return (
                <div 
                  key={task.id}
                  className={`p-5 rounded-xl border-2 transition-all ${statusConfig.bgClass}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-card">
                      {statusConfig.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-heading font-bold text-foreground">
                          {task.title}
                        </h3>
                        {statusConfig.badge}
                        {overdue && (
                          <Badge variant="destructive" className="bg-destructive/10 text-destructive border-0">
                            Vencida
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {task.assignedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Vence: {new Date(task.dueDate).toLocaleDateString('es-CL')}
                        </span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progreso</span>
                          <span className="font-medium">{task.progress}/{task.total}</span>
                        </div>
                        <Progress 
                          value={(task.progress / task.total) * 100} 
                          className="h-2" 
                        />
                      </div>
                    </div>
                    <div>
                      <Button className="btn-accent">
                        {task.status === 'in-progress' ? 'Continuar' : 'Comenzar'}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              Tareas completadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {completedTasks.map((task) => (
              <div 
                key={task.id}
                className="p-4 rounded-xl border bg-success/5 border-success/20"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-foreground">
                        {task.title}
                      </h4>
                      <Badge className="bg-success/10 text-success border-0">
                        ✓ Completada
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Asignada por {task.assignedBy} • Completada el {new Date(task.dueDate).toLocaleDateString('es-CL')}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Ver detalles
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Empty state if no tasks */}
      {STUDENT_TASKS.length === 0 && (
        <Card className="border-dashed border-2">
          <CardContent className="p-12 text-center">
            <ClipboardList className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">
              No tienes tareas asignadas
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Tu profesor te asignará tareas pronto. Mientras tanto, continúa con tu entrenamiento diario.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Tasks;
