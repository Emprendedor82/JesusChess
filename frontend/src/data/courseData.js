// Mock data for the 12-module chess course
export const COURSE_INFO = {
  title: "Domina el Ajedrez: De Principiante a Competidor",
  subtitle: "El programa completo para transformar tu juego en 12 semanas",
  price: 49990, // CLP
  priceFormatted: "$49.990 CLP",
  promise: "Aprende las estrategias que usan los maestros y compite con confianza",
  transformation: "En 12 módulos pasarás de mover piezas sin rumbo a planificar partidas completas, anticipar jugadas del rival y ganar con estrategia. Tendrás la mentalidad y técnica de un verdadero ajedrecista.",
  benefits: [
    "Dominarás los principios fundamentales que rigen cada partida",
    "Aprenderás tácticas ganadoras: clavadas, horquillas, ataques dobles",
    "Desarrollarás visión de tablero para anticipar 3-5 jugadas",
    "Sabrás cómo ganar finales que antes perdías",
    "Tendrás un método de análisis para mejorar constantemente"
  ]
};

export const COURSE_MODULES = [
  {
    id: 1,
    title: "Fundamentos: tablero y piezas",
    description: "Conoce a fondo cada pieza, su valor y cómo dominar el tablero desde el inicio.",
    youtubeEmbedUrl: "https://www.youtube.com/embed/fKxG8KjH1Qg",
    durationSeconds: 180, // 3 min
    durationText: "3 min"
  },
  {
    id: 2,
    title: "Objetivo del juego y jaque mate",
    description: "Entiende el objetivo final y aprende los patrones de mate más comunes.",
    youtubeEmbedUrl: "https://www.youtube.com/embed/fKxG8KjH1Qg",
    durationSeconds: 240, // 4 min
    durationText: "4 min"
  },
  {
    id: 3,
    title: "Principios de la apertura",
    description: "Las reglas de oro para empezar bien cada partida.",
    youtubeEmbedUrl: "https://www.youtube.com/embed/fKxG8KjH1Qg",
    durationSeconds: 300, // 5 min
    durationText: "5 min"
  },
  {
    id: 4,
    title: "Control del centro",
    description: "Por qué el centro es clave y cómo dominarlo.",
    youtubeEmbedUrl: "https://www.youtube.com/embed/fKxG8KjH1Qg",
    durationSeconds: 240,
    durationText: "4 min"
  },
  {
    id: 5,
    title: "Desarrollo de piezas",
    description: "Activa tus piezas rápidamente y con propósito.",
    youtubeEmbedUrl: "https://www.youtube.com/embed/fKxG8KjH1Qg",
    durationSeconds: 270,
    durationText: "4:30 min"
  },
  {
    id: 6,
    title: "Tácticas básicas: clavada y horquilla",
    description: "Domina las tácticas que ganan material.",
    youtubeEmbedUrl: "https://www.youtube.com/embed/fKxG8KjH1Qg",
    durationSeconds: 360, // 6 min
    durationText: "6 min"
  },
  {
    id: 7,
    title: "Tácticas avanzadas: ataque doble y rayos X",
    description: "Técnicas para crear amenazas múltiples.",
    youtubeEmbedUrl: "https://www.youtube.com/embed/fKxG8KjH1Qg",
    durationSeconds: 330,
    durationText: "5:30 min"
  },
  {
    id: 8,
    title: "Estructura de peones",
    description: "Los peones definen tu estrategia. Aprende a usarlos.",
    youtubeEmbedUrl: "https://www.youtube.com/embed/fKxG8KjH1Qg",
    durationSeconds: 300,
    durationText: "5 min"
  },
  {
    id: 9,
    title: "Finales de peones",
    description: "Gana los finales que antes empatabas o perdías.",
    youtubeEmbedUrl: "https://www.youtube.com/embed/fKxG8KjH1Qg",
    durationSeconds: 360,
    durationText: "6 min"
  },
  {
    id: 10,
    title: "Finales de torres",
    description: "El final más común. Domínalo y ganarás más partidas.",
    youtubeEmbedUrl: "https://www.youtube.com/embed/fKxG8KjH1Qg",
    durationSeconds: 390,
    durationText: "6:30 min"
  },
  {
    id: 11,
    title: "Análisis de partidas propias",
    description: "Método para aprender de tus errores y victorias.",
    youtubeEmbedUrl: "https://www.youtube.com/embed/fKxG8KjH1Qg",
    durationSeconds: 300,
    durationText: "5 min"
  },
  {
    id: 12,
    title: "Planificación y toma de decisiones",
    description: "Piensa como un maestro: planes, evaluación y ejecución.",
    youtubeEmbedUrl: "https://www.youtube.com/embed/fKxG8KjH1Qg",
    durationSeconds: 420, // 7 min
    durationText: "7 min"
  }
];

// Helper functions for localStorage persistence
const STORAGE_KEYS = {
  PURCHASED: 'je_course_purchased',
  PROGRESS: 'je_course_progress',
  COMMENTS: 'je_course_comments'
};

export const courseStorage = {
  // Check if course is purchased
  isPurchased: () => {
    return localStorage.getItem(STORAGE_KEYS.PURCHASED) === 'true';
  },
  
  // Set course as purchased
  setPurchased: () => {
    localStorage.setItem(STORAGE_KEYS.PURCHASED, 'true');
  },
  
  // Get progress for all modules
  getProgress: () => {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : {};
  },
  
  // Get progress for a specific module
  getModuleProgress: (moduleId) => {
    const progress = courseStorage.getProgress();
    return progress[moduleId] || { watched: false, commented: false, completed: false };
  },
  
  // Mark video as watched
  markWatched: (moduleId) => {
    const progress = courseStorage.getProgress();
    progress[moduleId] = { ...progress[moduleId], watched: true };
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  },
  
  // Mark module as completed (after watch + comment)
  markCompleted: (moduleId) => {
    const progress = courseStorage.getProgress();
    progress[moduleId] = { ...progress[moduleId], completed: true };
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  },
  
  // Check if module is unlocked
  isModuleUnlocked: (moduleId) => {
    if (moduleId === 1) return true; // First module always unlocked
    const prevProgress = courseStorage.getModuleProgress(moduleId - 1);
    return prevProgress.completed === true;
  },
  
  // Get completed modules count
  getCompletedCount: () => {
    const progress = courseStorage.getProgress();
    return Object.values(progress).filter(p => p.completed).length;
  },
  
  // Get comments for a module
  getComments: (moduleId) => {
    const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    const comments = data ? JSON.parse(data) : {};
    return comments[moduleId] || [];
  },
  
  // Add a comment to a module
  addComment: (moduleId, text) => {
    const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    const comments = data ? JSON.parse(data) : {};
    if (!comments[moduleId]) comments[moduleId] = [];
    comments[moduleId].push({
      id: Date.now(),
      text,
      date: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    
    // Also update progress
    const progress = courseStorage.getProgress();
    progress[moduleId] = { ...progress[moduleId], commented: true };
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  },
  
  // Reset all course data (for testing)
  reset: () => {
    localStorage.removeItem(STORAGE_KEYS.PURCHASED);
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.COMMENTS);
  }
};
