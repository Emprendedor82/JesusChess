import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { 
  ChevronLeft, 
  ChevronRight,
  Play, 
  CheckCircle, 
  Lock,
  BookOpen,
  ShoppingCart,
  Sparkles,
} from 'lucide-react';
import { COURSE_INFO, COURSE_MODULES, courseStorage } from '../../data/courseData';

const CourseContent = () => {
  const navigate = useNavigate();
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  const [showPaywall, setShowPaywall] = useState(false);

  const isPurchased = courseStorage.isPurchased();
  const completedCount = courseStorage.getCompletedCount();
  const progressPercent = (completedCount / COURSE_MODULES.length) * 100;

  const getModuleStatus = (moduleId) => {
    // Lesson 1 is always free
    if (moduleId === 1) {
      const progress = courseStorage.getModuleProgress(moduleId);
      if (progress.completed) return 'completed';
      return 'available';
    }
    // Lessons 2+ require purchase
    if (!isPurchased) return 'locked';
    const progress = courseStorage.getModuleProgress(moduleId);
    if (progress.completed) return 'completed';
    if (courseStorage.isModuleUnlocked(moduleId)) return 'available';
    return 'locked';
  };

  const handleModuleClick = (module) => {
    const status = getModuleStatus(module.id);
    if (status === 'locked') {
      setShowPaywall(true);
      return;
    }
    navigate(`/curso/modulo/${module.id}`);
  };

  return (
    <div className="min-h-screen bg-background safe-area-top">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-5 md:py-6 px-4">
        <div className="app-container mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/inicio')}
            className="text-primary-foreground/80 hover:text-primary-foreground mb-3"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Volver al inicio
          </Button>
          
          <h1 className="font-heading text-xl md:text-2xl font-bold mb-2">
            {COURSE_INFO.title}
          </h1>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-primary-foreground/80">Tu progreso</span>
              <span className="font-bold">{completedCount} / {COURSE_MODULES.length} módulos</span>
            </div>
            <Progress value={progressPercent} className="h-2 bg-primary-foreground/20" />
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="app-container mx-auto px-4 py-5 md:py-6">
        <h2 className="font-heading text-base md:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-accent" />
          Módulos del curso
        </h2>
        
        <div className="space-y-2 md:space-y-3">
          {COURSE_MODULES.map((module) => {
            const status = getModuleStatus(module.id);
            
            return (
              <Card 
                key={module.id}
                className={`transition-all ${
                  status === 'locked' 
                    ? 'opacity-60 cursor-pointer' 
                    : 'cursor-pointer hover:border-accent/50'
                } ${status === 'completed' ? 'border-success/30 bg-success/5' : ''}`}
                onClick={() => handleModuleClick(module)}
                data-testid={`module-card-${module.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Status Icon */}
                    <div className={`
                      flex items-center justify-center w-12 h-12 rounded-xl
                      ${status === 'completed' ? 'bg-success/10' : ''}
                      ${status === 'available' ? 'bg-accent/10' : ''}
                      ${status === 'locked' ? 'bg-muted' : ''}
                    `}>
                      {status === 'completed' && (
                        <CheckCircle className="w-6 h-6 text-success" />
                      )}
                      {status === 'available' && (
                        <Play className="w-6 h-6 text-accent" />
                      )}
                      {status === 'locked' && (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    
                    {/* Module Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-muted-foreground">
                          {module.id}.
                        </span>
                        {status === 'completed' && (
                          <Badge className="bg-success/10 text-success border-0 text-xs">
                            Completado
                          </Badge>
                        )}
                        {module.id === 1 && !isPurchased && status !== 'completed' && (
                          <Badge className="bg-accent/10 text-accent border-0 text-xs">
                            Gratis
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-heading font-bold text-foreground leading-tight">
                        {module.title}
                      </h3>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex items-center">
                      {status !== 'locked' ? (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <Lock className="w-4 h-4 text-muted-foreground/50" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Completion message */}
        {completedCount === COURSE_MODULES.length && (
          <Card className="mt-6 bg-gradient-to-r from-xp/10 to-success/10 border-xp/30">
            <CardContent className="p-6 text-center">
              <span className="text-4xl mb-3 block">🏆</span>
              <h3 className="font-heading text-xl font-bold text-foreground">
                ¡Felicitaciones!
              </h3>
              <p className="text-muted-foreground mt-2">
                Has completado todo el curso. Ahora tienes las herramientas para seguir mejorando.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Paywall Modal */}
      <Dialog open={showPaywall} onOpenChange={setShowPaywall}>
        <DialogContent className="sm:max-w-sm" data-testid="paywall-modal">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-heading text-lg">
              <Sparkles className="w-5 h-5 text-accent" />
              Desbloquea el curso completo
            </DialogTitle>
            <DialogDescription className="text-sm">
              Accede a todas las lecciones de Ataque y Remate
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div className="text-center py-3 px-4 rounded-xl bg-accent/5 border border-accent/15">
              <p className="font-heading text-2xl font-bold text-foreground">$10.000 CLP</p>
              <p className="text-xs text-muted-foreground mt-1">Pago único · Acceso de por vida</p>
            </div>

            <Button
              className="w-full h-12 text-base font-bold rounded-xl shadow-lg"
              onClick={() => window.open('https://www.flow.cl/uri/mdxXyDwK9', '_blank')}
              data-testid="paywall-buy-btn"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Comprar ahora
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setShowPaywall(false);
                navigate('/curso/modulo/1');
              }}
              data-testid="paywall-free-btn"
            >
              Ver lección gratuita
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseContent;
