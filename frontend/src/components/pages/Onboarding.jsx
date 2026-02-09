import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { School, User, ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';

const Onboarding = () => {
  const { selectSchool, selectPrivate, loginAs, schools } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);

  const handleNext = () => {
    if (step === 1 && selectedType === 'school') {
      setStep(2);
    } else if (step === 1 && selectedType === 'private') {
      selectPrivate();
      loginAs('student');
      navigate('/dashboard');
    } else if (step === 2 && selectedSchoolId) {
      selectSchool(selectedSchoolId);
      loginAs('student');
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedSchoolId(null);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent text-accent-foreground text-2xl font-bold">
              ♜
            </div>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">
            ¡Bienvenido a Jugadas Estratégicas!
          </h1>
          <p className="text-primary-foreground/80">
            Vamos a configurar tu experiencia de aprendizaje
          </p>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-accent' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-accent text-accent-foreground' : 'bg-muted'}`}>
                {step > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className="text-sm font-medium hidden sm:inline">Tipo de alumno</span>
            </div>
            <div className={`w-16 h-0.5 ${step > 1 ? 'bg-accent' : 'bg-muted'}`}></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-accent' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-accent text-accent-foreground' : 'bg-muted'}`}>
                2
              </div>
              <span className="text-sm font-medium hidden sm:inline">Seleccionar colegio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground text-center mb-2">
                ¿Cómo llegas a nosotros?
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Cuéntanos si vienes a través de tu colegio o eres alumno particular
              </p>

              <div className="space-y-4">
                <Card 
                  className={`cursor-pointer transition-all duration-200 ${selectedType === 'school' ? 'ring-2 ring-accent border-accent' : 'hover:border-accent/50'}`}
                  onClick={() => setSelectedType('school')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10">
                        <School className="w-7 h-7 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-lg font-bold text-foreground">
                          Soy alumno de un colegio
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Mi colegio tiene convenio con Jugadas Estratégicas
                        </p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedType === 'school' ? 'border-accent bg-accent' : 'border-muted-foreground'}`}>
                        {selectedType === 'school' && <Check className="w-4 h-4 text-accent-foreground" />}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all duration-200 ${selectedType === 'private' ? 'ring-2 ring-accent border-accent' : 'hover:border-accent/50'}`}
                  onClick={() => setSelectedType('private')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-success/10">
                        <User className="w-7 h-7 text-success" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-lg font-bold text-foreground">
                          Soy alumno particular
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Tomo clases directamente con la academia
                        </p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedType === 'private' ? 'border-accent bg-accent' : 'border-muted-foreground'}`}>
                        {selectedType === 'private' && <Check className="w-4 h-4 text-accent-foreground" />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground text-center mb-2">
                Selecciona tu colegio
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Elige el colegio donde estudias
              </p>

              <div className="space-y-3">
                {schools.map((school) => (
                  <Card 
                    key={school.id}
                    className={`cursor-pointer transition-all duration-200 ${selectedSchoolId === school.id ? 'ring-2 ring-accent border-accent' : 'hover:border-accent/50'}`}
                    onClick={() => setSelectedSchoolId(school.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={school.logo} 
                          alt={school.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-heading font-bold text-foreground">
                            {school.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {school.students} alumnos inscritos
                          </p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedSchoolId === school.id ? 'border-accent bg-accent' : 'border-muted-foreground'}`}>
                          {selectedSchoolId === school.id && <Check className="w-4 h-4 text-accent-foreground" />}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button variant="ghost" onClick={handleBack} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Volver
            </Button>
            <Button 
              onClick={handleNext}
              disabled={(step === 1 && !selectedType) || (step === 2 && !selectedSchoolId)}
              className="gap-2 btn-accent"
            >
              {step === 1 && selectedType === 'private' ? 'Comenzar' : step === 2 ? 'Comenzar' : 'Siguiente'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
