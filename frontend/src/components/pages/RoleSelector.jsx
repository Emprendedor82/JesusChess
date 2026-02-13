import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { GraduationCap, User, Users, Building2, ChevronRight, Sparkles, Play } from 'lucide-react';
import { COURSE_INFO } from '../../data/courseData';

const RoleSelector = () => {
  const { loginAs, studentType, selectSchool, selectPrivate, schools, selectedSchool } = useApp();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    loginAs(role);
    switch (role) {
      case 'student':
        navigate('/dashboard');
        break;
      case 'teacher':
        navigate('/teacher');
        break;
      case 'parent':
        navigate('/parent');
        break;
      case 'school':
        navigate('/school');
        break;
      default:
        navigate('/');
    }
  };

  const roles = [
    {
      id: 'student',
      title: 'Alumno',
      description: 'Aprende ajedrez con lecciones interactivas y desafíos',
      icon: GraduationCap,
      color: 'bg-accent',
      iconColor: 'text-accent'
    },
    {
      id: 'teacher',
      title: 'Profesor',
      description: 'Gestiona tus alumnos y asigna tareas personalizadas',
      icon: User,
      color: 'bg-success',
      iconColor: 'text-success'
    },
    {
      id: 'parent',
      title: 'Apoderado',
      description: 'Revisa el progreso y feedback de tu hijo/a',
      icon: Users,
      color: 'bg-warning',
      iconColor: 'text-warning'
    },
    {
      id: 'school',
      title: 'Colegio',
      description: 'Vista institucional del programa de ajedrez',
      icon: Building2,
      color: 'bg-primary',
      iconColor: 'text-primary'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-primary text-primary-foreground py-16 px-4 overflow-hidden">
        {/* Background chess pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl">♜</div>
          <div className="absolute top-20 right-20 text-5xl">♞</div>
          <div className="absolute bottom-10 left-1/3 text-4xl">♝</div>
          <div className="absolute bottom-20 right-10 text-6xl">♛</div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-accent text-accent-foreground text-3xl font-bold">
              ♜
            </div>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Jugadas Estratégicas
          </h1>
          <p className="text-xl text-primary-foreground/80 mb-2">
            Academia de Ajedrez
          </p>
          <div className="flex items-center justify-center gap-2 text-accent">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Entrena tu mente, domina tu vida</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Course Banner */}
          <Card 
            className="mb-8 cursor-pointer border-2 border-accent/40 bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 hover:border-accent/60 transition-all group"
            onClick={() => {
              loginAs('student');
              navigate('/curso');
            }}
          >
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent/20">
                  <GraduationCap className="w-8 h-8 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-accent text-accent-foreground text-xs">Curso Premium</Badge>
                    <Badge variant="outline" className="text-xs">12 módulos</Badge>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                    {COURSE_INFO.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {COURSE_INFO.promise}
                  </p>
                </div>
                <Button className="btn-accent">
                  <Play className="w-4 h-4 mr-2" />
                  Ver curso
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
              ¿Cómo deseas ingresar?
            </h2>
            <p className="text-muted-foreground">
              Selecciona tu rol para acceder a la plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <Card 
                key={role.id}
                className="cursor-pointer card-hover border-2 border-transparent hover:border-accent/30 group"
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${role.color}/10`}>
                      <role.icon className={`w-7 h-7 ${role.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                        {role.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {role.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Demo notice */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span>Demo interactiva - Sin autenticación real</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>♜</span>
            <span>© 2024 Jugadas Estratégicas</span>
          </div>
          <a 
            href="https://jugadasestrategicas.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-accent hover:underline"
          >
            Visitar sitio oficial →
          </a>
        </div>
      </footer>
    </div>
  );
};

export default RoleSelector;
