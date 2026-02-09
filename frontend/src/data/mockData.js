// Mock Data for Jugadas Estratégicas Chess Academy App

// Schools in Santiago, Chile
export const SCHOOLS = [
  {
    id: 'verbo-divino',
    name: 'Colegio Verbo Divino',
    logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=100&h=100&fit=crop',
    students: 45,
    avgProgress: 72
  },
  {
    id: 'san-ignacio',
    name: 'Colegio San Ignacio El Bosque',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop',
    students: 38,
    avgProgress: 68
  },
  {
    id: 'grange',
    name: 'The Grange School',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop',
    students: 52,
    avgProgress: 75
  },
  {
    id: 'santiago-college',
    name: 'Santiago College',
    logo: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=100&h=100&fit=crop',
    students: 41,
    avgProgress: 70
  },
  {
    id: 'los-andes',
    name: 'Colegio Los Andes',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop',
    students: 35,
    avgProgress: 65
  }
];

// Student profile mock
export const STUDENT_PROFILE = {
  id: 'student-1',
  name: 'Sofía Martínez',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
  level: 7,
  xp: 2450,
  xpToNextLevel: 3000,
  streak: 12,
  totalLessons: 34,
  completedLessons: 28,
  medals: ['bronze', 'silver', 'gold'],
  school: 'verbo-divino'
};

// Daily challenges / puzzles
export const DAILY_CHALLENGES = [
  {
    id: 'puzzle-1',
    title: 'Mate en 1',
    description: 'Encuentra el mate en una jugada',
    difficulty: 'Fácil',
    xpReward: 50,
    type: 'tactical',
    completed: true,
    icon: '♕'
  },
  {
    id: 'puzzle-2',
    title: 'Táctica de clavada',
    description: 'Aprovecha la clavada para ganar material',
    difficulty: 'Medio',
    xpReward: 100,
    type: 'tactical',
    completed: false,
    icon: '♗'
  },
  {
    id: 'puzzle-3',
    title: 'Mate en 2',
    description: 'Calcula el mate en dos jugadas',
    difficulty: 'Medio',
    xpReward: 150,
    type: 'tactical',
    completed: false,
    icon: '♖'
  }
];

// Weekly challenges
export const WEEKLY_CHALLENGES = [
  {
    id: 'challenge-1',
    title: 'Maestro del ataque doble',
    description: 'Completa 5 puzzles de ataques dobles',
    progress: 3,
    total: 5,
    xpReward: 300,
    deadline: '3 días'
  },
  {
    id: 'challenge-2',
    title: 'Defensor experto',
    description: 'Resuelve 10 puzzles defensivos',
    progress: 7,
    total: 10,
    xpReward: 500,
    deadline: '5 días'
  }
];

// Lessons / Training modules
export const LESSONS = [
  {
    id: 'lesson-1',
    title: 'Movimiento del Rey',
    module: 'Fundamentos',
    progress: 100,
    duration: '10 min',
    icon: '♔',
    locked: false
  },
  {
    id: 'lesson-2',
    title: 'La Dama poderosa',
    module: 'Fundamentos',
    progress: 100,
    duration: '12 min',
    icon: '♕',
    locked: false
  },
  {
    id: 'lesson-3',
    title: 'Torres y columnas abiertas',
    module: 'Fundamentos',
    progress: 60,
    duration: '15 min',
    icon: '♖',
    locked: false
  },
  {
    id: 'lesson-4',
    title: 'El poder del Alfil',
    module: 'Piezas menores',
    progress: 30,
    duration: '12 min',
    icon: '♗',
    locked: false
  },
  {
    id: 'lesson-5',
    title: 'Caballo saltarín',
    module: 'Piezas menores',
    progress: 0,
    duration: '14 min',
    icon: '♘',
    locked: false
  },
  {
    id: 'lesson-6',
    title: 'Estructura de peones',
    module: 'Estrategia',
    progress: 0,
    duration: '20 min',
    icon: '♙',
    locked: true
  }
];

// Tasks assigned by teacher
export const STUDENT_TASKS = [
  {
    id: 'task-1',
    title: '10 puzzles de clavada',
    description: 'Practica la táctica de clavada con estos ejercicios',
    assignedBy: 'Prof. García',
    dueDate: '2024-03-15',
    progress: 7,
    total: 10,
    status: 'in-progress'
  },
  {
    id: 'task-2',
    title: 'Video de apertura española',
    description: 'Mira el video explicativo y responde las preguntas',
    assignedBy: 'Prof. García',
    dueDate: '2024-03-18',
    progress: 0,
    total: 1,
    status: 'pending'
  },
  {
    id: 'task-3',
    title: 'Mini desafío de finales',
    description: 'Practica finales de rey y peón',
    assignedBy: 'Prof. García',
    dueDate: '2024-03-12',
    progress: 5,
    total: 5,
    status: 'completed'
  }
];

// Teacher's student list
export const TEACHER_STUDENTS = [
  {
    id: 'st-1',
    name: 'Sofía Martínez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    level: 7,
    lastActive: 'Hace 2 horas',
    school: 'Colegio Verbo Divino',
    progress: 85,
    evaluation: {
      tactica: 4,
      estrategia: 3,
      atencion: 5,
      tiempoGestion: 4,
      actitud: 5
    },
    feedback: 'Excelente progreso en táctica. Trabajar más en planificación a largo plazo.'
  },
  {
    id: 'st-2',
    name: 'Matías González',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Matias',
    level: 5,
    lastActive: 'Hace 1 día',
    school: 'Colegio Verbo Divino',
    progress: 62,
    evaluation: {
      tactica: 3,
      estrategia: 4,
      atencion: 3,
      tiempoGestion: 2,
      actitud: 4
    },
    feedback: 'Buen pensamiento estratégico. Necesita mejorar la gestión del tiempo.'
  },
  {
    id: 'st-3',
    name: 'Valentina Rojas',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina',
    level: 9,
    lastActive: 'Hace 30 minutos',
    school: 'The Grange School',
    progress: 92,
    evaluation: {
      tactica: 5,
      estrategia: 5,
      atencion: 4,
      tiempoGestion: 5,
      actitud: 5
    },
    feedback: 'Estudiante excepcional. Lista para competencias avanzadas.'
  },
  {
    id: 'st-4',
    name: 'Diego Fernández',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diego',
    level: 4,
    lastActive: 'Hace 3 días',
    school: 'Santiago College',
    progress: 45,
    evaluation: {
      tactica: 2,
      estrategia: 3,
      atencion: 2,
      tiempoGestion: 3,
      actitud: 4
    },
    feedback: 'Muestra interés pero necesita practicar más regularmente.'
  },
  {
    id: 'st-5',
    name: 'Isidora Vargas',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isidora',
    level: 6,
    lastActive: 'Hace 5 horas',
    school: 'Colegio San Ignacio El Bosque',
    progress: 71,
    evaluation: {
      tactica: 4,
      estrategia: 3,
      atencion: 4,
      tiempoGestion: 3,
      actitud: 5
    },
    feedback: 'Gran actitud y dedicación. Progresando constantemente.'
  }
];

// Predefined tasks for teachers to assign
export const TASK_TEMPLATES = [
  {
    id: 'template-1',
    title: '10 puzzles de clavada',
    description: 'Ejercicios para dominar la táctica de clavada',
    category: 'Táctica',
    difficulty: 'Intermedio'
  },
  {
    id: 'template-2',
    title: 'Video de apertura española',
    description: 'Lección en video sobre la apertura Ruy López',
    category: 'Aperturas',
    difficulty: 'Intermedio'
  },
  {
    id: 'template-3',
    title: 'Mini desafío de finales',
    description: '5 ejercicios de finales básicos',
    category: 'Finales',
    difficulty: 'Básico'
  },
  {
    id: 'template-4',
    title: '5 puzzles de ataque doble',
    description: 'Practica la táctica de doble ataque',
    category: 'Táctica',
    difficulty: 'Básico'
  },
  {
    id: 'template-5',
    title: 'Mate en 2 - Serie avanzada',
    description: '8 ejercicios de mate en 2 jugadas',
    category: 'Táctica',
    difficulty: 'Avanzado'
  },
  {
    id: 'template-6',
    title: 'Defensa Siciliana - Introducción',
    description: 'Video y ejercicios de la apertura siciliana',
    category: 'Aperturas',
    difficulty: 'Intermedio'
  }
];

// Parent view data
export const PARENT_VIEW_DATA = {
  child: {
    name: 'Sofía Martínez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    level: 7,
    school: 'Colegio Verbo Divino'
  },
  weeklyProgress: {
    lessonsCompleted: 4,
    puzzlesSolved: 23,
    timeSpent: '3h 45min',
    xpEarned: 650
  },
  lastFeedback: {
    date: '2024-03-10',
    teacher: 'Prof. García',
    comment: 'Sofía ha mostrado un excelente progreso esta semana. Su capacidad táctica ha mejorado notablemente. Recomiendo que siga practicando finales de partida.',
    evaluation: {
      tactica: 4,
      estrategia: 3,
      atencion: 5,
      tiempoGestion: 4,
      actitud: 5
    }
  },
  assignedTasks: STUDENT_TASKS
};

// School dashboard data
export const SCHOOL_DASHBOARD = {
  stats: {
    totalStudents: 45,
    activeThisWeek: 38,
    avgProgress: 72,
    avgLevel: 5.4,
    totalXpEarned: 125000,
    lessonsCompleted: 892
  },
  weeklyActivity: [
    { day: 'Lun', students: 32 },
    { day: 'Mar', students: 28 },
    { day: 'Mié', students: 35 },
    { day: 'Jue', students: 30 },
    { day: 'Vie', students: 25 },
    { day: 'Sáb', students: 18 },
    { day: 'Dom', students: 12 }
  ],
  topStudents: [
    { name: 'Valentina R.', xp: 3200, level: 9 },
    { name: 'Sofía M.', xp: 2450, level: 7 },
    { name: 'Lucas P.', xp: 2100, level: 6 },
    { name: 'Isidora V.', xp: 1980, level: 6 },
    { name: 'Tomás A.', xp: 1850, level: 5 }
  ],
  progressByLevel: [
    { level: 'Nivel 1-3', count: 12 },
    { level: 'Nivel 4-6', count: 20 },
    { level: 'Nivel 7-9', count: 10 },
    { level: 'Nivel 10+', count: 3 }
  ]
};

// Medals/Achievements
export const ACHIEVEMENTS = [
  { id: 'first-puzzle', name: 'Primera Jugada', description: 'Completa tu primer puzzle', icon: '🎯', unlocked: true },
  { id: 'streak-7', name: 'Semana Perfecta', description: 'Racha de 7 días', icon: '🔥', unlocked: true },
  { id: 'level-5', name: 'Aprendiz', description: 'Alcanza nivel 5', icon: '⭐', unlocked: true },
  { id: 'tactics-master', name: 'Maestro Táctico', description: 'Resuelve 50 puzzles tácticos', icon: '♟️', unlocked: false },
  { id: 'streak-30', name: 'Mes de Fuego', description: 'Racha de 30 días', icon: '💎', unlocked: false },
  { id: 'level-10', name: 'Experto', description: 'Alcanza nivel 10', icon: '🏆', unlocked: false }
];

// XP levels configuration
export const XP_LEVELS = [
  { level: 1, minXp: 0, maxXp: 100 },
  { level: 2, minXp: 100, maxXp: 250 },
  { level: 3, minXp: 250, maxXp: 500 },
  { level: 4, minXp: 500, maxXp: 850 },
  { level: 5, minXp: 850, maxXp: 1300 },
  { level: 6, minXp: 1300, maxXp: 1850 },
  { level: 7, minXp: 1850, maxXp: 2500 },
  { level: 8, minXp: 2500, maxXp: 3300 },
  { level: 9, minXp: 3300, maxXp: 4200 },
  { level: 10, minXp: 4200, maxXp: 5500 }
];
