import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Target, 
  Star, 
  Lock,
  CheckCircle,
  ChevronRight,
  Trophy,
  Zap
} from 'lucide-react';

const CHALLENGES = [
  {
    id: 1,
    title: 'Captura la Torre',
    description: 'Usa tu Alfil para capturar la Torre',
    difficulty: 'Fácil',
    xpReward: 50,
    type: 'capture',
    completed: true,
    unlocked: true
  },
  {
    id: 2,
    title: 'Jaque con Caballo',
    description: 'Da jaque al Rey con tu Caballo',
    difficulty: 'Fácil',
    xpReward: 50,
    type: 'check',
    completed: false,
    unlocked: true
  },
  {
    id: 3,
    title: 'Mate en 1 (Torre)',
    description: 'Encuentra el mate en una jugada',
    difficulty: 'Medio',
    xpReward: 100,
    type: 'mate',
    completed: false,
    unlocked: true
  },
  {
    id: 4,
    title: 'Mate en 1 (Reina)',
    description: 'Usa la Reina para dar mate',
    difficulty: 'Medio',
    xpReward: 100,
    type: 'mate',
    completed: false,
    unlocked: true
  },
  {
    id: 5,
    title: 'Doble ataque',
    description: 'Ataca dos piezas a la vez',
    difficulty: 'Avanzado',
    xpReward: 150,
    type: 'tactics',
    completed: false,
    unlocked: false
  },
  {
    id: 6,
    title: 'Mate en 2',
    description: 'Calcula el mate en dos jugadas',
    difficulty: 'Avanzado',
    xpReward: 200,
    type: 'mate',
    completed: false,
    unlocked: false
  },
];

const ChallengesPage = () => {
  const navigate = useNavigate();
  const { userRole } = useApp();

  // Stats
  const completedCount = CHALLENGES.filter(c => c.completed).length;
  const totalXpEarned = CHALLENGES.filter(c => c.completed).reduce((sum, c) => sum + c.xpReward, 0);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-success/10 text-success border-success/20';
      case 'Medio': return 'bg-warning/10 text-warning border-warning/20';
      case 'Avanzado': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleChallengeClick = (challenge) => {
    if (!challenge.unlocked) return;
    
    // For students, go to practice with this challenge
    if (userRole === 'student') {
      navigate('/entrenamiento/practica');
    }
  };

  return (
    <div className="p-4 space-y-5 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Retos
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {userRole === 'student' ? 'Completa retos y gana XP' : 'Progreso de retos de tus alumnos'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-success/5 border-success/20">
          <CardContent className="p-4 text-center">
            <Trophy className="w-6 h-6 text-success mx-auto mb-1" />
            <p className="font-heading text-xl font-bold text-foreground">{completedCount}/{CHALLENGES.length}</p>
            <p className="text-xs text-muted-foreground">Completados</p>
          </CardContent>
        </Card>
        <Card className="bg-xp/5 border-xp/20">
          <CardContent className="p-4 text-center">
            <Star className="w-6 h-6 text-xp mx-auto mb-1" />
            <p className="font-heading text-xl font-bold text-foreground">{totalXpEarned}</p>
            <p className="text-xs text-muted-foreground">XP ganados</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progreso general</span>
            <span className="text-sm text-muted-foreground">{Math.round((completedCount / CHALLENGES.length) * 100)}%</span>
          </div>
          <Progress value={(completedCount / CHALLENGES.length) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Challenges List */}
      <div className="space-y-3">
        <h2 className="font-heading font-bold text-foreground">Todos los retos</h2>
        
        {CHALLENGES.map((challenge) => (
          <Card 
            key={challenge.id}
            className={`
              ${challenge.unlocked ? 'cursor-pointer card-hover' : 'opacity-60'}
              ${challenge.completed ? 'bg-success/5 border-success/20' : ''}
            `}
            onClick={() => handleChallengeClick(challenge)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-xl
                  ${challenge.completed ? 'bg-success/10' : challenge.unlocked ? 'bg-accent/10' : 'bg-muted'}
                `}>
                  {challenge.completed ? (
                    <CheckCircle className="w-6 h-6 text-success" />
                  ) : challenge.unlocked ? (
                    <Target className="w-6 h-6 text-accent" />
                  ) : (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-heading font-bold text-foreground text-sm">
                      {challenge.title}
                    </h4>
                    <Badge variant="outline" className={`text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {challenge.description}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xp border-xp/30 text-xs">
                    +{challenge.xpReward} XP
                  </Badge>
                  {challenge.unlocked && !challenge.completed && (
                    <ChevronRight className="w-5 h-5 text-muted-foreground mt-1 ml-auto" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Locked notice */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
        <Lock className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          Completa retos para desbloquear más desafíos
        </p>
      </div>
    </div>
  );
};

export default ChallengesPage;
