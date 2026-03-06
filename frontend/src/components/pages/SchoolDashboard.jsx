import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Users, 
  TrendingUp, 
  Star, 
  BookOpen,
  BarChart3,
  Trophy,
  Calendar,
  Search,
  UserRound
} from 'lucide-react';
import { SCHOOL_DASHBOARD, TEACHER_STUDENTS } from '../../data/mockData';

const normalizeText = (text) =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const SchoolDashboard = ({ section }) => {
  const { currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  
  const data = SCHOOL_DASHBOARD;

  const showAll = !section;
  const showStudents = showAll || section === 'students';
  const showAnalytics = showAll || section === 'analytics';

  // Debounce 300ms
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Filter students by school + search term
  const schoolName = normalizeText(currentUser?.name || '');
  const schoolStudents = TEACHER_STUDENTS.filter(s =>
    normalizeText(s.school).includes(schoolName) || schoolName.includes(normalizeText(s.school))
  );

  const filteredStudents = debouncedTerm.length > 0
    ? schoolStudents.filter(s => normalizeText(s.name).includes(normalizeText(debouncedTerm)))
    : [];

  const getWeekMaxStudents = () => {
    return Math.max(...data.weeklyActivity.map(d => d.students));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with School Info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl bg-primary text-primary-foreground">
        <div className="flex items-center gap-4">
          <img 
            src={currentUser?.logo} 
            alt={currentUser?.name}
            className="w-16 h-16 rounded-xl object-cover border-2 border-primary-foreground/20"
          />
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold">
              {currentUser?.name}
            </h1>
            <p className="text-primary-foreground/80 mt-1">
              Panel institucional - Jugadas Estratégicas
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-foreground/10">
          <Calendar className="w-5 h-5" />
          <span className="text-sm">Marzo 2024</span>
        </div>
      </div>

      {/* Search Bar */}
      {showStudents && (
      <div ref={searchRef} className="relative" data-testid="school-search-container">
        <Card>
          <CardContent className="p-4 space-y-1.5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar alumno por nombre o apellido..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                className="pl-12 h-12 text-base"
                data-testid="school-search-input"
              />
            </div>
            <p className="text-xs text-muted-foreground pl-1">
              Escribe el nombre del alumno que deseas consultar
            </p>
          </CardContent>
        </Card>

        {/* Search Results Dropdown */}
        {showResults && debouncedTerm.length > 0 && (
          <div className="absolute left-0 right-0 z-30 mt-1" data-testid="school-search-results">
            <Card className="shadow-xl border-border">
              <CardContent className="p-2">
                {filteredStudents.length === 0 ? (
                  <div className="flex flex-col items-center py-6 text-muted-foreground" data-testid="no-results">
                    <UserRound className="w-8 h-8 mb-2 opacity-40" />
                    <p className="text-sm">No se encontraron alumnos con ese nombre</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredStudents.map((student) => (
                      <button
                        key={student.id}
                        onClick={() => {
                          setShowResults(false);
                          setSearchTerm('');
                        }}
                        className="flex items-center gap-3 w-full p-3 rounded-xl text-left transition-colors hover:bg-muted/60"
                        data-testid={`search-result-${student.id}`}
                      >
                        <Avatar className="w-10 h-10 border border-border">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{student.name}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <Badge variant="outline" className="text-[10px] h-4 py-0">Nivel {student.level}</Badge>
                            <span className="text-xs text-muted-foreground">{student.progress}%</span>
                          </div>
                        </div>
                        <div className="w-16">
                          <Progress value={student.progress} className="h-1.5" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      )}

      {/* Full Students List - shown in students section */}
      {section === 'students' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="school-students-grid">
          {(debouncedTerm.length > 0 ? filteredStudents : schoolStudents).map((student) => (
            <Card key={student.id} className="card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border-2 border-accent/20">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-foreground truncate">{student.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">Nivel {student.level}</Badge>
                      <span className="text-xs text-muted-foreground">{student.progress}%</span>
                    </div>
                    <Progress value={student.progress} className="h-1.5 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Stats Grid */}
      {showAnalytics && (
      <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold text-foreground">
              {data.stats.totalStudents}
            </p>
            <p className="text-xs text-muted-foreground">Total alumnos</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold text-foreground">
              {data.stats.activeThisWeek}
            </p>
            <p className="text-xs text-muted-foreground">Activos esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold text-foreground">
              {data.stats.avgProgress}%
            </p>
            <p className="text-xs text-muted-foreground">Progreso promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-xp mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold text-foreground">
              {data.stats.avgLevel.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">Nivel promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-streak mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold text-foreground">
              {(data.stats.totalXpEarned / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-muted-foreground">XP total ganado</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold text-foreground">
              {data.stats.lessonsCompleted}
            </p>
            <p className="text-xs text-muted-foreground">Lecciones completadas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-accent" />
              Uso semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-48">
              {data.weeklyActivity.map((day, idx) => {
                const height = (day.students / getWeekMaxStudents()) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-accent/20 rounded-t-lg relative overflow-hidden"
                      style={{ height: '100%' }}
                    >
                      <div 
                        className="absolute bottom-0 w-full bg-accent rounded-t-lg transition-all duration-500"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                    <span className="text-xs font-medium">{day.students}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Alumnos activos por día
            </p>
          </CardContent>
        </Card>

        {/* Top Students */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-xp" />
              Top estudiantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.topStudents.map((student, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50"
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                  idx === 0 ? 'bg-xp text-xp-foreground' :
                  idx === 1 ? 'bg-level-silver text-foreground' :
                  idx === 2 ? 'bg-level-bronze text-foreground' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-heading font-bold text-foreground text-sm">{student.name}</p>
                  <p className="text-xs text-muted-foreground">Nivel {student.level}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xp">{student.xp.toLocaleString()} XP</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Progress Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Distribución por niveles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.progressByLevel.map((level, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-secondary/50 text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                  idx === 0 ? 'bg-muted' :
                  idx === 1 ? 'bg-accent/20' :
                  idx === 2 ? 'bg-xp/20' :
                  'bg-primary/20'
                }`}>
                  <span className="text-2xl font-heading font-bold">{level.count}</span>
                </div>
                <p className="text-sm font-medium text-foreground">{level.level}</p>
                <p className="text-xs text-muted-foreground">alumnos</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </>
      )}

      {/* Institutional Summary */}
      {showAll && (
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
              <img src="https://customer-assets.emergentagent.com/job_7ca1bb71-1f8d-46a0-b6a5-6e8d935e0094/artifacts/p8gcxj6r_image.png" alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                Resumen institucional
              </h3>
              <p className="text-muted-foreground">
                El programa de ajedrez en {currentUser?.name} muestra un excelente desarrollo. 
                Con {data.stats.activeThisWeek} de {data.stats.totalStudents} alumnos activos 
                esta semana ({Math.round((data.stats.activeThisWeek / data.stats.totalStudents) * 100)}% de participación), 
                el progreso promedio del {data.stats.avgProgress}% demuestra un compromiso sólido 
                con el aprendizaje del ajedrez.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      )}
    </div>
  );
};

export default SchoolDashboard;
