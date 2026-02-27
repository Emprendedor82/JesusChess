import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ChevronRight, Sparkles } from 'lucide-react';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/roles');
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
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-accent text-accent-foreground text-4xl md:text-5xl font-bold mb-8 shadow-lg">
          ♜
        </div>

        {/* Title */}
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-2">
          Jugadas Estratégicas
        </h1>
        
        {/* Tagline */}
        <p className="text-primary-foreground/80 text-center text-base md:text-lg mb-2">
          Academia de Ajedrez
        </p>

        {/* Subtitle with sparkles */}
        <div className="flex items-center justify-center gap-2 text-accent mb-12">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Plataforma de desarrollo a través del ajedrez</span>
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Enter Button */}
        <Button 
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground w-full max-w-xs h-14 text-lg font-bold rounded-xl shadow-lg"
          onClick={handleEnter}
        >
          Ingresar
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>

        {/* Slogan */}
        <p className="text-primary-foreground/60 text-center text-xs mt-8">
          Entrena tu mente, domina tu vida
        </p>
      </div>

      {/* Footer */}
      <div className="py-4 text-center relative z-10">
        <p className="text-xs text-primary-foreground/50">
          © 2026 Jugadas Estratégicas
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
