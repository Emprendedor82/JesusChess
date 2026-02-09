import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Target, Clock, Zap, Trophy, Star } from 'lucide-react';
import { DAILY_CHALLENGES, WEEKLY_CHALLENGES } from '../../data/mockData';

const Challenges = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Mis Retos
          </h1>
          <p className="text-muted-foreground mt-1">
            Completa desafíos diarios y semanales para ganar XP extra
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-xp/10 border border-xp/20">
          <Zap className="w-5 h-5 text-xp" />
          <span className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">+850 XP</span> disponibles hoy
          </span>
        </div>
      </div>

      {/* Daily Challenges */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Desafíos del día
            </CardTitle>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Se reinician en 8h</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {DAILY_CHALLENGES.map((challenge) => (
            <div 
              key={challenge.id}
              className={`p-5 rounded-xl border-2 transition-all ${
                challenge.completed 
                  ? 'bg-success/5 border-success/30' 
                  : 'bg-card border-border hover:border-accent/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex items-center justify-center w-14 h-14 rounded-xl text-3xl ${
                  challenge.completed ? 'bg-success/10' : 'bg-accent/10'
                }`}>
                  {challenge.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {challenge.title}
                    </h3>
                    {challenge.completed && (
                      <Badge className="bg-success/10 text-success border-0">
                        ✓ Completado
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{challenge.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <Badge variant="outline">{challenge.difficulty}</Badge>
                    <span className="text-sm text-muted-foreground">Tipo: {challenge.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xp font-bold text-lg mb-2">
                    <Star className="w-5 h-5 fill-xp" />
                    +{challenge.xpReward} XP
                  </div>
                  {!challenge.completed && (
                    <Button className="btn-accent">
                      Comenzar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Challenges */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-xp" />
              Retos semanales
            </CardTitle>
            <Badge variant="secondary">Semana 11 de 2024</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {WEEKLY_CHALLENGES.map((challenge) => {
            const progressPercent = (challenge.progress / challenge.total) * 100;
            const isCompleted = challenge.progress >= challenge.total;
            
            return (
              <div 
                key={challenge.id}
                className={`p-5 rounded-xl border-2 ${
                  isCompleted 
                    ? 'bg-xp/5 border-xp/30' 
                    : 'bg-gradient-to-r from-xp/5 to-streak/5 border-xp/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {challenge.title}
                    </h3>
                    <p className="text-muted-foreground">{challenge.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xp font-bold text-xl">
                      <Trophy className="w-5 h-5" />
                      +{challenge.xpReward} XP
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Termina en {challenge.deadline}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="font-bold text-foreground">
                      {challenge.progress} / {challenge.total}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={progressPercent} 
                      className="h-3 bg-muted"
                    />
                    {isCompleted && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-xp">¡COMPLETADO!</span>
                      </div>
                    )}
                  </div>
                </div>

                {!isCompleted && (
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" className="border-xp/30 text-xp hover:bg-xp/10">
                      Continuar reto
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Extra Challenges Teaser */}
      <Card className="border-dashed border-2">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mx-auto mb-4">
            <Trophy className="w-8 h-8 text-accent" />
          </div>
          <h3 className="font-heading text-xl font-bold text-foreground mb-2">
            ¿Buscas más desafíos?
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Completa los retos actuales para desbloquear desafíos especiales y torneos mensuales.
          </p>
          <Button variant="outline" className="mt-4">
            Ver torneos disponibles
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenges;
