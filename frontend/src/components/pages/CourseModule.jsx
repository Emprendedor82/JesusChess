import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { 
  ChevronLeft, 
  ChevronRight,
  CheckCircle, 
  Lock,
  MessageSquare,
  Send,
  Circle,
  Info
} from 'lucide-react';
import { COURSE_MODULES, courseStorage } from '../../data/courseData';

const CourseModule = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const id = parseInt(moduleId);
  
  const module = COURSE_MODULES.find(m => m.id === id);
  const [progress, setProgress] = useState(courseStorage.getModuleProgress(id));
  const [comments, setComments] = useState(courseStorage.getComments(id));
  const [commentText, setCommentText] = useState('');

  // Check access
  useEffect(() => {
    if (!courseStorage.isPurchased()) {
      navigate('/curso');
      return;
    }
    if (!courseStorage.isModuleUnlocked(id)) {
      navigate('/curso/contenido');
      return;
    }
  }, [id, navigate]);

  if (!module) {
    return <div className="p-4">Módulo no encontrado</div>;
  }

  const handleMarkWatched = () => {
    courseStorage.markWatched(id);
    setProgress(courseStorage.getModuleProgress(id));
    checkCompletion();
  };

  const handleSubmitComment = () => {
    if (commentText.length < 50) return;
    
    courseStorage.addComment(id, commentText);
    setComments(courseStorage.getComments(id));
    setProgress(courseStorage.getModuleProgress(id));
    setCommentText('');
    checkCompletion();
  };

  const checkCompletion = () => {
    const currentProgress = courseStorage.getModuleProgress(id);
    if (currentProgress.watched && currentProgress.commented && !currentProgress.completed) {
      courseStorage.markCompleted(id);
      setProgress(courseStorage.getModuleProgress(id));
    }
  };

  const nextModule = COURSE_MODULES.find(m => m.id === id + 1);
  const canGoNext = progress.completed && nextModule;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-4 px-4">
        <div className="max-w-3xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/curso/contenido')}
            className="text-primary-foreground/80 hover:text-primary-foreground"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Volver al curso
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Module Title */}
        <div>
          <span className="text-sm text-muted-foreground">Lección {module.id} de 12</span>
          <h1 className="font-heading text-xl font-bold text-foreground mt-1">
            {module.title}
          </h1>
        </div>

        {/* Video Section */}
        <Card>
          <CardContent className="p-0">
            {/* YouTube Embed */}
            <div className="aspect-video bg-black rounded-t-lg overflow-hidden">
              <iframe
                src={module.youtubeEmbedUrl}
                title={module.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* Video Controls */}
            <div className="p-4 border-t">
              {progress.watched ? (
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Video completado</span>
                </div>
              ) : (
                <Button onClick={handleMarkWatched} className="btn-accent">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Marcar como visto
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-accent" />
              <h2 className="font-heading font-bold text-foreground">
                Comentario obligatorio
              </h2>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Para completar este módulo, deja un comentario de al menos 50 caracteres sobre lo aprendido.
            </p>

            {/* Comment Form */}
            {!progress.commented ? (
              <div className="space-y-3">
                <Textarea
                  placeholder="¿Qué aprendiste en este módulo? ¿Qué te pareció más útil?"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                />
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${commentText.length >= 50 ? 'text-success' : 'text-muted-foreground'}`}>
                    {commentText.length}/50 caracteres mínimo
                  </span>
                  <Button 
                    onClick={handleSubmitComment}
                    disabled={commentText.length < 50}
                    className="btn-accent"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar comentario
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-success">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Comentario enviado</span>
              </div>
            )}

            {/* Previous Comments */}
            {comments.length > 0 && (
              <div className="space-y-3 pt-4 border-t">
                <h3 className="text-sm font-medium text-foreground">Tus comentarios:</h3>
                {comments.map((comment) => (
                  <div key={comment.id} className="p-3 rounded-lg bg-secondary/50 text-sm">
                    <p className="text-foreground">{comment.text}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(comment.date).toLocaleDateString('es-CL', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completion Status */}
        <Card className={progress.completed ? 'border-success/30 bg-success/5' : ''}>
          <CardContent className="p-4">
            <h3 className="font-heading font-bold text-foreground mb-3">
              Estado del módulo
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {progress.watched ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                )}
                <span className={progress.watched ? 'text-foreground' : 'text-muted-foreground'}>
                  Ver el video completo
                </span>
              </div>
              <div className="flex items-center gap-2">
                {progress.commented ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                )}
                <span className={progress.commented ? 'text-foreground' : 'text-muted-foreground'}>
                  Dejar un comentario (mín. 50 caracteres)
                </span>
              </div>
            </div>
            
            {progress.completed && (
              <div className="mt-4 p-3 rounded-lg bg-success/10 text-success text-center">
                <CheckCircle className="w-6 h-6 mx-auto mb-1" />
                <p className="font-medium">¡Módulo completado!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {module.id > 1 && (
            <Button 
              variant="outline" 
              onClick={() => navigate(`/curso/modulo/${module.id - 1}`)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Módulo anterior
            </Button>
          )}
          <div className="flex-1" />
          {nextModule && (
            <Button 
              onClick={() => navigate(`/curso/modulo/${module.id + 1}`)}
              disabled={!canGoNext}
              className={canGoNext ? 'btn-accent' : ''}
            >
              {canGoNext ? (
                <>
                  Siguiente módulo
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Completa este módulo primero
                </>
              )}
            </Button>
          )}
          {!nextModule && progress.completed && (
            <Button onClick={() => navigate('/curso/contenido')} className="btn-accent">
              <CheckCircle className="w-4 h-4 mr-2" />
              Ver resumen del curso
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseModule;
