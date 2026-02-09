import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Trophy, Lock, Star, Flame, Target, Puzzle } from 'lucide-react';
import { ACHIEVEMENTS, XP_LEVELS, STUDENT_PROFILE } from '../../data/mockData';

const Achievements = () => {
  const unlockedAchievements = ACHIEVEMENTS.filter(a => a.unlocked);
  const lockedAchievements = ACHIEVEMENTS.filter(a => !a.unlocked);
  
  // Calculate current level progress
  const currentLevelData = XP_LEVELS.find(l => 
    STUDENT_PROFILE.xp >= l.minXp && STUDENT_PROFILE.xp < l.maxXp
  ) || XP_LEVELS[XP_LEVELS.length - 1];
  
  const progressToNextLevel = ((STUDENT_PROFILE.xp - currentLevelData.minXp) / (currentLevelData.maxXp - currentLevelData.minXp)) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          Mis Logros
        </h1>
        <p className="text-muted-foreground mt-1">
          Colecciona medallas y desbloquea recompensas
        </p>
      </div>

      {/* Level Progress Card */}
      <Card className="bg-gradient-to-br from-primary to-primary-light text-primary-foreground overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-primary-foreground/80 text-sm">Tu nivel actual</p>
              <h2 className="font-heading text-4xl font-bold">Nivel {STUDENT_PROFILE.level}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-10 h-10 text-xp fill-xp" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-primary-foreground/80">Progreso al siguiente nivel</span>
              <span className="font-bold">{STUDENT_PROFILE.xp} / {STUDENT_PROFILE.xpToNextLevel} XP</span>
            </div>
            <Progress value={progressToNextLevel} className="h-3 bg-primary-foreground/20" />
            <p className="text-xs text-primary-foreground/60">
              Te faltan {STUDENT_PROFILE.xpToNextLevel - STUDENT_PROFILE.xp} XP para el nivel {STUDENT_PROFILE.level + 1}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-xp mx-auto mb-2" />
            <p className="font-heading text-2xl font-bold text-foreground">
              {unlockedAchievements.length}
            </p>
            <p className="text-xs text-muted-foreground">Logros obtenidos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="font-heading text-2xl font-bold text-foreground">
              {STUDENT_PROFILE.xp.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">XP total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="w-8 h-8 text-streak mx-auto mb-2" />
            <p className="font-heading text-2xl font-bold text-foreground">
              {STUDENT_PROFILE.streak}
            </p>
            <p className="text-xs text-muted-foreground">Racha actual</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Puzzle className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="font-heading text-2xl font-bold text-foreground">
              {STUDENT_PROFILE.completedLessons}
            </p>
            <p className="text-xs text-muted-foreground">Lecciones completadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Unlocked Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-xp" />
            Logros desbloqueados
            <Badge variant="secondary">{unlockedAchievements.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedAchievements.map((achievement) => (
              <div 
                key={achievement.id}
                className="p-4 rounded-xl bg-gradient-to-br from-xp/10 to-streak/10 border border-xp/20 animate-fade-in"
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-xp/20 text-2xl badge-shine">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-foreground">
                      {achievement.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                    <Badge className="mt-2 bg-success/10 text-success border-0 text-xs">
                      ✓ Desbloqueado
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Locked Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <Lock className="w-5 h-5 text-muted-foreground" />
            Por desbloquear
            <Badge variant="outline">{lockedAchievements.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedAchievements.map((achievement) => (
              <div 
                key={achievement.id}
                className="p-4 rounded-xl bg-muted/50 border border-border opacity-70"
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted text-2xl grayscale">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-foreground">
                      {achievement.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      <Lock className="w-3 h-3 mr-1" />
                      Bloqueado
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Level Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            Guía de niveles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {XP_LEVELS.map((level) => {
              const isCurrentLevel = level.level === STUDENT_PROFILE.level;
              const isPastLevel = level.level < STUDENT_PROFILE.level;
              
              return (
                <div 
                  key={level.level}
                  className={`p-3 rounded-xl text-center border ${
                    isCurrentLevel 
                      ? 'bg-accent/10 border-accent' 
                      : isPastLevel 
                        ? 'bg-success/5 border-success/30'
                        : 'bg-muted/30 border-border'
                  }`}
                >
                  <div className={`font-heading text-lg font-bold ${
                    isCurrentLevel ? 'text-accent' : isPastLevel ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    Nivel {level.level}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {level.minXp.toLocaleString()} - {level.maxXp.toLocaleString()} XP
                  </div>
                  {isCurrentLevel && (
                    <Badge className="mt-2 bg-accent text-accent-foreground text-xs">
                      Actual
                    </Badge>
                  )}
                  {isPastLevel && (
                    <Badge className="mt-2 bg-success/10 text-success border-0 text-xs">
                      ✓
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Achievements;
