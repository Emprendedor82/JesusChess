import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { ChevronRight, Sparkles, GraduationCap, User, Users, Building2, ShieldCheck, AlertCircle } from 'lucide-react';

const ROLES = [
  { id: 'student', label: 'Alumno', desc: 'Aprende ajedrez con lecciones y desafios', icon: GraduationCap, color: 'text-accent' },
  { id: 'teacher', label: 'Profesor', desc: 'Gestiona alumnos y asigna tareas', icon: User, color: 'text-success' },
  { id: 'parent', label: 'Apoderado', desc: 'Revisa el progreso de tu hijo/a', icon: Users, color: 'text-warning' },
  { id: 'school', label: 'Colegio', desc: 'Vista institucional del programa', icon: Building2, color: 'text-primary' },
  { id: 'admin', label: 'Administrador', desc: 'Gestion global del sistema', icon: ShieldCheck, color: 'text-destructive' },
];

const ROLE_ROUTES = {
  student: '/inicio',
  teacher: '/teacher',
  parent: '/parent',
  school: '/school',
  admin: '/admin',
};

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const { loginAs } = useApp();
  const [selectedRole, setSelectedRole] = useState('student');
  const [error, setError] = useState('');

  const handleEnter = () => {
    if (!selectedRole) {
      setError('Selecciona un perfil para ingresar');
      return;
    }
    setError('');
    loginAs(selectedRole);
    navigate(ROLE_ROUTES[selectedRole]);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col relative overflow-hidden">
      {/* Background chess pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl text-primary-foreground">♜</div>
        <div className="absolute top-32 right-8 text-5xl text-primary-foreground">♞</div>
        <div className="absolute bottom-40 left-8 text-4xl text-primary-foreground">♝</div>
        <div className="absolute bottom-20 right-16 text-6xl text-primary-foreground">♛</div>
        <div className="absolute top-1/2 left-1/4 text-3xl text-primary-foreground">♟</div>
        <div className="absolute top-1/3 right-1/3 text-4xl text-primary-foreground">♚</div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative z-10">
        {/* Logo */}
        <img
          src="https://customer-assets.emergentagent.com/job_7ca1bb71-1f8d-46a0-b6a5-6e8d935e0094/artifacts/p8gcxj6r_image.png"
          alt="Jugadas Estratégicas - Academia de Ajedrez"
          className="w-48 md:w-56 h-auto mb-4 rounded-2xl"
          draggable="false"
          data-testid="app-logo-welcome"
        />
        <div className="flex items-center gap-2 text-accent mb-6">
          <Sparkles className="w-3 h-3" />
          <span className="text-xs font-medium">Plataforma de desarrollo a traves del ajedrez</span>
          <Sparkles className="w-3 h-3" />
        </div>

        {/* Role Selector Card */}
        <div className="w-full max-w-sm bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-4 border border-primary-foreground/10">
          <p className="text-primary-foreground text-sm font-semibold mb-1 text-center">
            Selecciona el perfil para la demo
          </p>
          <p className="text-primary-foreground/50 text-[11px] text-center mb-4">
            Esto es solo para navegacion. No es autenticacion real.
          </p>

          <div className="space-y-2">
            {ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => { setSelectedRole(role.id); setError(''); }}
                className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl transition-all text-left ${
                  selectedRole === role.id
                    ? 'bg-accent/20 border-2 border-accent'
                    : 'bg-primary-foreground/5 border-2 border-transparent hover:bg-primary-foreground/10'
                }`}
                data-testid={`role-option-${role.id}`}
              >
                {/* Radio circle */}
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedRole === role.id
                    ? 'border-accent bg-accent'
                    : 'border-primary-foreground/40'
                }`}>
                  {selectedRole === role.id && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                {/* Icon */}
                <role.icon className={`w-4 h-4 flex-shrink-0 ${
                  selectedRole === role.id ? 'text-accent' : 'text-primary-foreground/60'
                }`} />
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${
                    selectedRole === role.id ? 'text-accent' : 'text-primary-foreground'
                  }`}>
                    {role.label}
                  </p>
                  <p className="text-[10px] text-primary-foreground/50 truncate">{role.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-destructive/20 text-destructive text-xs" data-testid="role-error">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Enter button */}
          <Button
            size="lg"
            className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-bold rounded-xl shadow-lg"
            onClick={handleEnter}
            data-testid="demo-enter-btn"
          >
            Ingresar
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="py-3 text-center relative z-10">
        <p className="text-[10px] text-primary-foreground/40">
          © 2026 Jugadas Estrategicas
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
