import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/roles');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo/Icon */}
        <div className="w-20 h-20 mb-8 rounded-2xl bg-primary/10 flex items-center justify-center">
          <svg 
            viewBox="0 0 24 24" 
            className="w-10 h-10 text-primary"
            fill="currentColor"
          >
            <path d="M19 22H5v-2h14v2M17.16 8.26A4.678 4.678 0 0 0 12.5 4c-1.95 0-3.54 1.28-4.14 3.03-.63-.17-1.28-.28-1.86-.28-2.49 0-4.5 2.01-4.5 4.5S4.01 15.75 6.5 15.75c.65 0 1.26-.14 1.82-.38l.62 1.83c-.74.35-1.57.55-2.44.55C2.91 17.75 0 14.84 0 11.25S2.91 4.75 6.5 4.75c.74 0 1.46.13 2.13.36C9.7 2.5 11.93 1 14.5 1c3.58 0 6.5 2.92 6.5 6.5 0 .26-.02.51-.05.76h.05c2.21 0 4 1.79 4 4s-1.79 4-4 4h-3v-2h3c1.1 0 2-.9 2-2s-.9-2-2-2h-2.13l.14-1.06c.04-.31.06-.63.06-.94 0-2.49-2.01-4.5-4.5-4.5-1.74 0-3.25 1-4 2.44l-.82 1.56-1.55-.84z"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-3">
          Bienvenido a
        </h1>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary text-center mb-4">
          Jugadas Estratégicas
        </h2>

        {/* Subtitle */}
        <p className="text-muted-foreground text-center text-sm md:text-base max-w-xs mb-12">
          Plataforma de desarrollo a través del ajedrez
        </p>

        {/* Enter Button */}
        <Button 
          size="lg"
          className="btn-accent w-full max-w-xs h-14 text-lg font-bold rounded-xl"
          onClick={handleEnter}
        >
          Ingresar
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Footer */}
      <div className="py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 Jugadas Estratégicas
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
