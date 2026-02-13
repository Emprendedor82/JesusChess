import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  ChevronLeft, 
  Play, 
  Clock, 
  CheckCircle, 
  Lock,
  Star,
  BookOpen,
  Trophy
} from 'lucide-react';
import { COURSE_INFO, COURSE_MODULES, courseStorage } from '../../data/courseData';

const CourseLanding = () => {
  const navigate = useNavigate();
  const { userRole, loginAs } = useApp();
  const isPurchased = courseStorage.isPurchased();

  // If already purchased and logged in as student, redirect to course content
  React.useEffect(() => {
    if (isPurchased && userRole === 'student') {
      navigate('/curso/contenido');
    }
  }, [isPurchased, userRole, navigate]);

  const handlePurchase = () => {
    // Mock purchase - set as purchased and login as student
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
              <Clock className="w-4 h-4" />
              ~60 min total
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
                className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{module.title}</p>
                </div>
                <span className="text-xs text-muted-foreground">{module.durationText}</span>
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
              onClick={handlePurchase}
            >
              Comprar acceso ahora
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Pago único · Acceso de por vida · Garantía de satisfacción
            </p>
          </CardContent>
        </Card>

        {/* Demo notice */}
        <div className="text-center">
          <Badge variant="outline" className="text-muted-foreground">
            Demo: El botón simula la compra sin cobro real
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default CourseLanding;
