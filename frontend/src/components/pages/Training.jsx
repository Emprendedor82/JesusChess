import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Clock, Lock, Play, CheckCircle, ChevronRight } from 'lucide-react';
import { LESSONS } from '../../data/mockData';

const Training = () => {
  // Group lessons by module
  const groupedLessons = LESSONS.reduce((acc, lesson) => {
    if (!acc[lesson.module]) {
      acc[lesson.module] = [];
    }
    acc[lesson.module].push(lesson);
    return acc;
  }, {});

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Entrenamiento
          </h1>
          <p className="text-muted-foreground mt-1">
            Aprende ajedrez paso a paso con lecciones interactivas
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20">
          <CheckCircle className="w-5 h-5 text-accent" />
          <span className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">28</span> de 34 lecciones completadas
          </span>
        </div>
      </div>

      {/* Lessons by Module */}
      {Object.entries(groupedLessons).map(([moduleName, lessons]) => {
        const completedInModule = lessons.filter(l => l.progress === 100).length;
        const moduleProgress = (completedInModule / lessons.length) * 100;

        return (
          <Card key={moduleName}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-heading text-lg">{moduleName}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {completedInModule} de {lessons.length} lecciones completadas
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-heading font-bold text-foreground">
                    {Math.round(moduleProgress)}%
                  </span>
                </div>
              </div>
              <Progress value={moduleProgress} className="h-2 mt-2" />
            </CardHeader>
            <CardContent className="space-y-3">
              {lessons.map((lesson, idx) => (
                <div 
                  key={lesson.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    lesson.locked 
                      ? 'bg-muted/30 border-border opacity-60 cursor-not-allowed'
                      : lesson.progress === 100
                        ? 'bg-success/5 border-success/20'
                        : 'bg-card hover:bg-secondary/50 border-border hover:border-accent/30 cursor-pointer'
                  }`}
                >
                  {/* Lesson number/icon */}
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl text-xl ${
                    lesson.locked 
                      ? 'bg-muted' 
                      : lesson.progress === 100 
                        ? 'bg-success/10' 
                        : 'bg-accent/10'
                  }`}>
                    {lesson.locked ? (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    ) : lesson.progress === 100 ? (
                      <CheckCircle className="w-6 h-6 text-success" />
                    ) : (
                      <span>{lesson.icon}</span>
                    )}
                  </div>

                  {/* Lesson info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-foreground truncate">
                        {lesson.title}
                      </h4>
                      {lesson.progress > 0 && lesson.progress < 100 && (
                        <Badge variant="secondary" className="text-xs">
                          En progreso
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                      {lesson.progress > 0 && lesson.progress < 100 && (
                        <span>{lesson.progress}% completado</span>
                      )}
                    </div>
                    {lesson.progress > 0 && lesson.progress < 100 && (
                      <Progress value={lesson.progress} className="h-1 mt-2 max-w-xs" />
                    )}
                  </div>

                  {/* Action button */}
                  <div>
                    {!lesson.locked && (
                      <Button 
                        variant={lesson.progress === 100 ? "ghost" : "default"}
                        size="sm"
                        className={lesson.progress === 100 ? "" : "btn-accent"}
                      >
                        {lesson.progress === 0 ? (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            Iniciar
                          </>
                        ) : lesson.progress === 100 ? (
                          <>
                            Repasar
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </>
                        ) : (
                          <>
                            Continuar
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}

      {/* Locked content notice */}
      <div className="flex items-center justify-center p-6 rounded-xl border-2 border-dashed border-border">
        <div className="text-center">
          <Lock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-heading font-bold text-foreground">Más lecciones próximamente</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Completa las lecciones anteriores para desbloquear contenido avanzado
          </p>
        </div>
      </div>
    </div>
  );
};

export default Training;
