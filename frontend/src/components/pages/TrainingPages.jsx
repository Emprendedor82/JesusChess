import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams, Routes, Route, Outlet } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  BookOpen, 
  Target, 
  ClipboardList, 
  ChevronRight, 
  ChevronLeft,
  Lock,
  CheckCircle,
  Star,
  Play
} from 'lucide-react';
import ChessBoard, { PRACTICE_EXERCISES } from '../chess/ChessBoard';

// Learning levels data
const LEARNING_LEVELS = [
  {
    id: 1,
    title: 'Conoce las piezas',
    description: 'Aprende qué piezas hay en el ajedrez',
    icon: '♟️',
    xpReward: 100,
    lessons: [
      { id: 1, title: 'El Rey y la Reina', description: 'Las piezas más importantes', icon: '♔♕', duration: '5 min' },
      { id: 2, title: 'Torre y Alfil', description: 'Piezas de largo alcance', icon: '♖♗', duration: '5 min' },
      { id: 3, title: 'El Caballo', description: 'La única pieza que puede saltar', icon: '♘', duration: '5 min' },
      { id: 4, title: 'El Peón', description: 'La pieza más numerosa del tablero', icon: '♙', duration: '5 min' },
    ],
    unlocked: true,
    completed: true
  },
  {
    id: 2,
    title: 'Cómo se mueven',
    description: 'Aprende el movimiento de cada pieza',
    icon: '♞',
    xpReward: 150,
    lessons: [
      { id: 1, title: 'Movimiento de Torre y Alfil', description: 'Líneas rectas y diagonales', icon: '♖♗', duration: '8 min' },
      { id: 2, title: 'El salto del Caballo', description: 'La pieza que salta', icon: '♘', duration: '8 min' },
    ],
    unlocked: true,
    completed: false
  },
  {
    id: 3,
    title: 'Reglas básicas',
    description: 'Capturas y jaque',
    icon: '⚔️',
    xpReward: 200,
    lessons: [
      { id: 1, title: 'Cómo capturar', description: 'Elimina piezas del oponente', icon: '💥', duration: '10 min' },
      { id: 2, title: 'Jaque al Rey', description: 'Atacando al Rey', icon: '👑', duration: '10 min' },
    ],
    unlocked: false,
    completed: false
  },
  {
    id: 4,
    title: 'Mini desafíos',
    description: 'Pon a prueba lo aprendido',
    icon: '🏆',
    xpReward: 300,
    lessons: [
      { id: 1, title: 'Mate en 1 - Torre', description: 'Tu primer jaque mate', icon: '♖', duration: '5 min' },
      { id: 2, title: 'Mate en 1 - Reina', description: 'Mate con la Reina', icon: '♕', duration: '5 min' },
    ],
    unlocked: false,
    completed: false
  }
];

// Main Training Hub
const TrainingHub = () => {
  const navigate = useNavigate();
  const { userRole } = useApp();

  const sections = [
    {
      id: 'aprende',
      title: 'Aprende',
      description: 'Lecciones paso a paso',
      icon: BookOpen,
      color: 'accent',
      path: '/entrenamiento/aprende'
    },
    {
      id: 'practica',
      title: 'Practica',
      description: 'Tablero digital interactivo',
      icon: Target,
      color: 'success',
      path: '/entrenamiento/practica',
      studentOnly: true
    },
    {
      id: 'tareas',
      title: 'Tareas',
      description: 'Asignadas por tu coach',
      icon: ClipboardList,
      color: 'warning',
      path: '/entrenamiento/tareas'
    }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-5 animate-fade-in max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Entrenamiento
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {userRole === 'student' ? 'Aprende y practica ajedrez' : 'Revisa el progreso de tus alumnos'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
        {sections.map((section) => {
          // Hide practice section for coaches
          if (section.studentOnly && userRole !== 'student') {
            return null;
          }

          return (
            <Card 
              key={section.id}
              className="cursor-pointer card-hover"
              onClick={() => navigate(section.path)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-${section.color}/10`}>
                    <section.icon className={`w-7 h-7 text-${section.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {section.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// Learning Levels Page
const LearnPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/entrenamiento')}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground">
            Aprende Ajedrez
          </h1>
          <p className="text-sm text-muted-foreground">
            4 niveles de aprendizaje
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {LEARNING_LEVELS.map((level, idx) => (
          <Card 
            key={level.id}
            className={`${level.unlocked ? 'cursor-pointer card-hover' : 'opacity-60'}`}
            onClick={() => level.unlocked && navigate(`/entrenamiento/aprende/${level.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={`
                  flex items-center justify-center w-14 h-14 rounded-xl text-2xl
                  ${level.completed ? 'bg-success/10' : level.unlocked ? 'bg-accent/10' : 'bg-muted'}
                `}>
                  {level.completed ? (
                    <CheckCircle className="w-7 h-7 text-success" />
                  ) : level.unlocked ? (
                    level.icon
                  ) : (
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-foreground">
                      Nivel {level.id}: {level.title}
                    </h3>
                    {level.completed && (
                      <Badge className="bg-success/10 text-success border-0 text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {level.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {level.lessons.length} lecciones
                    </span>
                    <Badge variant="outline" className="text-xp border-xp/30 text-xs">
                      +{level.xpReward} XP
                    </Badge>
                  </div>
                </div>
                {level.unlocked && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Level Detail Page
const LevelDetailPage = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const level = LEARNING_LEVELS.find(l => l.id === parseInt(levelId));

  if (!level) {
    return <div className="p-4">Nivel no encontrado</div>;
  }

  return (
    <div className="p-4 space-y-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/entrenamiento/aprende')}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground">
            {level.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {level.description}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {level.lessons.map((lesson, idx) => (
          <Card 
            key={lesson.id}
            className="cursor-pointer card-hover"
            onClick={() => navigate(`/entrenamiento/practica?level=${level.id}&exercise=${idx + 1}`)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-xl">
                  {lesson.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-bold text-foreground">
                    {lesson.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {lesson.description}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {lesson.duration}
                  </span>
                </div>
                <Button size="sm" className="btn-accent">
                  <Play className="w-4 h-4 mr-1" />
                  Iniciar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Practice Page with Chess Board
const PracticePage = () => {
  const navigate = useNavigate();
  const { userRole } = useApp();
  const [searchParams] = useSearchParams();
  const initLevel = parseInt(searchParams.get('level')) || 1;
  const initExercise = parseInt(searchParams.get('exercise')) || 1;
  const [selectedLevel, setSelectedLevel] = useState(initLevel);
  const [selectedExercise, setSelectedExercise] = useState(initExercise - 1);

  // Only students can access the practice board
  if (userRole !== 'student') {
    return (
      <div className="p-4 space-y-5 animate-fade-in">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/entrenamiento')}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-heading text-xl font-bold text-foreground">
            Practica
          </h1>
        </div>
        <Card className="p-8 text-center">
          <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading text-lg font-bold text-foreground mb-2">
            Acceso restringido
          </h3>
          <p className="text-muted-foreground">
            El tablero interactivo está disponible solo para alumnos.
          </p>
        </Card>
      </div>
    );
  }

  const levelKey = `level${selectedLevel}`;
  const exercises = PRACTICE_EXERCISES[levelKey] || [];
  const currentExercise = exercises[selectedExercise];

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/entrenamiento')}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-heading text-xl font-bold text-foreground">
            Practica
          </h1>
          <p className="text-sm text-muted-foreground">
            Tablero digital interactivo
          </p>
        </div>
      </div>

      {/* Level selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[1, 2, 3, 4].map((level) => (
          <Button
            key={level}
            variant={selectedLevel === level ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSelectedLevel(level);
              setSelectedExercise(0);
            }}
            className={selectedLevel === level ? "btn-accent" : ""}
          >
            Nivel {level}
          </Button>
        ))}
      </div>

      {/* Exercise selector */}
      {exercises.length > 0 && (
        <div className="flex gap-2">
          {exercises.map((_, idx) => (
            <Button
              key={idx}
              variant={selectedExercise === idx ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedExercise(idx)}
              className={selectedExercise === idx ? "bg-primary" : ""}
            >
              Ejercicio {idx + 1}
            </Button>
          ))}
        </div>
      )}

      {/* Chess Board */}
      {currentExercise ? (
        <Card className="p-4">
          <ChessBoard 
            exercise={currentExercise}
            level={selectedLevel}
            onComplete={() => {
              // Move to next exercise or show completion
              if (selectedExercise < exercises.length - 1) {
                setTimeout(() => setSelectedExercise(prev => prev + 1), 1500);
              }
            }}
          />
        </Card>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            No hay ejercicios disponibles para este nivel aún.
          </p>
        </Card>
      )}
    </div>
  );
};

// Tasks Page
const TasksPage = () => {
  const navigate = useNavigate();
  const { userRole } = useApp();

  const tasks = [
    { id: 1, title: 'Completar Nivel 2', description: 'Termina todas las lecciones del nivel 2', status: 'pending', dueDate: '15 Mar' },
    { id: 2, title: '5 ejercicios de Torre', description: 'Practica el movimiento de la Torre', status: 'in-progress', progress: 3, total: 5, dueDate: '18 Mar' },
    { id: 3, title: 'Resolver 3 mates en 1', description: 'Mini desafíos de mate', status: 'completed', dueDate: '10 Mar' },
  ];

  return (
    <div className="p-4 space-y-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/entrenamiento')}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground">
            Tareas
          </h1>
          <p className="text-sm text-muted-foreground">
            {userRole === 'student' ? 'Asignadas por tu coach' : 'Tareas de tus alumnos'}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <Card key={task.id} className={`${task.status === 'completed' ? 'bg-success/5 border-success/20' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-lg
                  ${task.status === 'completed' ? 'bg-success/10' : task.status === 'in-progress' ? 'bg-accent/10' : 'bg-warning/10'}
                `}>
                  {task.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <ClipboardList className={`w-5 h-5 ${task.status === 'in-progress' ? 'text-accent' : 'text-warning'}`} />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-bold text-foreground text-sm">
                    {task.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {task.description}
                  </p>
                  {task.progress !== undefined && (
                    <div className="mt-2">
                      <Progress value={(task.progress / task.total) * 100} className="h-1.5" />
                      <span className="text-xs text-muted-foreground">{task.progress}/{task.total}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <Badge variant={task.status === 'completed' ? 'secondary' : 'outline'} className="text-xs">
                    {task.status === 'completed' ? '✓ Completada' : task.status === 'in-progress' ? 'En progreso' : 'Pendiente'}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{task.dueDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Export all components
export { 
  TrainingHub, 
  LearnPage, 
  LevelDetailPage, 
  PracticePage, 
  TasksPage,
  LEARNING_LEVELS 
};
