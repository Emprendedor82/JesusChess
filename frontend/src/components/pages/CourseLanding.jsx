import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  ChevronLeft, 
  CheckCircle, 
  Star,
  BookOpen,
  Trophy,
  Play,
  Lock,
  Eye
} from 'lucide-react';
import { COURSE_INFO, COURSE_MODULES, courseStorage } from '../../data/courseData';

const CourseLanding = () => {
  const navigate = useNavigate();
  const { userRole, loginAs } = useApp();
  const isPurchased = courseStorage.isPurchased();
  const [showPreview, setShowPreview] = useState(false);

  // Get Module 1 data
  const module1 = COURSE_MODULES[0];

  // If already purchased and logged in as student, redirect to course content
  React.useEffect(() => {
    if (isPurchased && userRole === 'student') {
      navigate('/curso/contenido');
    }
  }, [isPurchased, userRole, navigate]);

  const handleActivateCourse = () => {
    // Activate course access after payment
    courseStorage.setPurchased();
    loginAs('student');
    navigate('/curso/contenido');
  };

  const handleBack = () => {
    if (userRole) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="text-primary-foreground/80 hover:text-primary-foreground mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Volver
          </Button>
          
          <Badge className="bg-accent text-accent-foreground mb-3">
            Curso Completo
          </Badge>
          
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-3">
            {COURSE_INFO.title}
          </h1>
          
          <p className="text-primary-foreground/80 text-lg">
            {COURSE_INFO.subtitle}
          </p>
          
          <div className="flex items-center gap-4 mt-4 text-sm text-primary-foreground/70">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              12 módulos
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              Acceso de por vida
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        
        {/* FREE PREVIEW - Module 1 */}
        <Card className="border-2 border-success/50 bg-success/5 overflow-hidden">
          <CardContent className="p-0">
            {!showPreview ? (
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-success text-success-foreground">GRATIS</Badge>
                  <span className="text-sm text-muted-foreground">Prueba antes de comprar</span>
                </div>
                
                <h2 className="font-heading text-xl font-bold text-foreground mb-2">
                  Mira el Módulo 1 por dentro
                </h2>
                
                <p className="text-muted-foreground mb-4">
                  Descubre cómo es el curso con una lección completa. 
                  Aprende los fundamentos del ataque en ajedrez sin compromiso.
                </p>
                
                <div className="bg-card rounded-lg p-4 mb-4 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Módulo 1</p>
                  <p className="font-heading font-bold text-foreground">{module1.title}</p>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full bg-success hover:bg-success/90 text-success-foreground text-lg py-6"
                  onClick={() => setShowPreview(true)}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Ver Módulo 1 Gratis
                </Button>
              </div>
            ) : (
              <div>
                {/* Video Preview */}
                <div className="aspect-video bg-black">
                  <iframe
                    src={module1.youtubeEmbedUrl}
                    title={module1.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                
                {/* Preview Info */}
                <div className="p-6 bg-gradient-to-b from-success/10 to-transparent">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-success text-success-foreground">VISTA PREVIA</Badge>
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-3">
                    {module1.title}
                  </h3>
                  
                  {/* CTA after preview */}
                  <Card className="border-accent/50 bg-accent/5">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 flex-shrink-0">
                          <Lock className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground mb-1">
                            ¿Te gustó? Hay 11 módulos más esperándote
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">
                            Activa tu acceso completo y domina el arte del ataque en ajedrez.
                          </p>
                          <Button 
                            className="btn-accent"
                            onClick={handleActivateCourse}
                          >
                            Desbloquear curso completo · {COURSE_INFO.priceFormatted}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full mt-3 text-muted-foreground"
                    onClick={() => setShowPreview(false)}
                  >
                    Cerrar vista previa
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Promise */}
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="p-6">
            <p className="text-lg font-medium text-foreground text-center">
              "{COURSE_INFO.promise}"
            </p>
          </CardContent>
        </Card>

        {/* Course Index */}
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Contenido del curso
          </h2>
          
          <div className="space-y-2">
            {COURSE_MODULES.map((module, idx) => (
              <div 
                key={module.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  idx === 0 
                    ? 'bg-success/5 border-success/30' 
                    : 'bg-card border-border'
                }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                  idx === 0 
                    ? 'bg-success/20 text-success' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {idx === 0 ? <Eye className="w-4 h-4" /> : idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{module.title}</p>
                </div>
                {idx === 0 && (
                  <Badge variant="outline" className="text-success border-success/30 text-xs">
                    Gratis
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            Lo que te vas a llevar
          </h2>
          
          <ul className="space-y-3">
            {COURSE_INFO.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Transformation */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-6">
            <h2 className="font-heading text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-xp" />
              La transformación que vivirás
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {COURSE_INFO.transformation}
            </p>
          </CardContent>
        </Card>

        {/* Purchase CTA */}
        <Card className="border-2 border-accent">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Acceso completo al curso</p>
            <p className="font-heading text-3xl font-bold text-foreground mb-4">
              {COURSE_INFO.priceFormatted}
            </p>
            <Button 
              size="lg" 
              className="w-full btn-accent text-lg py-6"
              onClick={handleActivateCourse}
            >
              Comprar acceso ahora
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Pago único · Acceso de por vida
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseLanding;
