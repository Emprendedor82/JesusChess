import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../ui/card';
import { GraduationCap, Users, Sparkles } from 'lucide-react';

const SimpleRoleSelector = () => {
  const { loginAs } = useApp();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    loginAs(role);
    if (role === 'student') {
      navigate('/inicio');
    } else {
      navigate('/coach');
    }
  };

  const roles = [
    {
      id: 'student',
      title: 'Alumno',
      description: 'Aprende ajedrez con lecciones interactivas, practica en el tablero y completa retos',
      icon: GraduationCap,
      color: 'bg-accent',
      iconColor: 'text-accent'
    },
    {
      id: 'coach',
      title: 'Coach',
      description: 'Gestiona alumnos, asigna tareas y revisa el progreso',
      icon: Users,
      color: 'bg-success',
      iconColor: 'text-success'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-primary text-primary-foreground py-12 px-4 overflow-hidden">
        {/* Background chess pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-4xl">♜</div>
          <div className="absolute top-8 right-8 text-3xl">♞</div>
          <div className="absolute bottom-4 left-1/4 text-3xl">♝</div>
          <div className="absolute bottom-8 right-4 text-4xl">♛</div>
        </div>
        
        <div className="relative max-w-md mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent text-accent-foreground text-3xl font-bold shadow-lg">
              ♜
            </div>
          </div>
          <h1 className="font-heading text-3xl font-bold mb-2">
            Jugadas Estratégicas
          </h1>
          <p className="text-primary-foreground/80 mb-1">
            Academia de Ajedrez
          </p>
          <div className="flex items-center justify-center gap-2 text-accent text-sm">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">Entrena tu mente, domina tu vida</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="flex-1 py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">
              ¿Cómo deseas ingresar?
            </h2>
            <p className="text-sm text-muted-foreground">
              Selecciona tu rol para comenzar
            </p>
          </div>

          <div className="space-y-4">
            {roles.map((role) => (
              <Card 
                key={role.id}
                className="cursor-pointer card-hover border-2 border-transparent hover:border-accent/30 active:scale-[0.98] transition-all"
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${role.color}/10`}>
                      <role.icon className={`w-7 h-7 ${role.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-bold text-foreground">
                        {role.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Demo notice */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span>Demo interactiva</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-4 px-4">
        <div className="max-w-md mx-auto flex items-center justify-center gap-2 text-muted-foreground text-xs">
          <span>♜</span>
          <span>© 2024 Jugadas Estratégicas</span>
        </div>
      </footer>
    </div>
  );
};

export default SimpleRoleSelector;
