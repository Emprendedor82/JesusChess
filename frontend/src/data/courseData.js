// Mock data for the 12-module chess course
export const COURSE_INFO = {
  title: "Ataque y Remate",
  subtitle: "Aprende los principios para ganar atacando",
  price: 8000, // CLP
  priceFormatted: "$8.000 CLP",
  paymentUrl: "https://www.flow.cl/uri/xz9n1ygVS",
  promise: "Aprende los principios para ganar atacando",
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
    title: "Todos al Ataque + Esquema de Color",
    youtubeEmbedUrl: "https://www.youtube.com/embed/BC76_pTX7uc",
    durationSeconds: 180,
    durationText: "3 min"
  },
  {
    id: 2,
    title: "Esquema de Color + El Punto Débil",
    youtubeEmbedUrl: "https://www.youtube.com/embed/RGjlqoN8FMI",
    durationSeconds: 240,
    durationText: "4 min"
  },
  {
    id: 3,
    title: "Todos al Ataque (La apertura de líneas)",
    youtubeEmbedUrl: "https://www.youtube.com/embed/Xv63lBdzyIc",
    durationSeconds: 300,
    durationText: "5 min"
  },
  {
    id: 4,
    title: "Control del centro",
    youtubeEmbedUrl: "https://www.youtube.com/embed/GQgStNPZJHU",
    durationSeconds: 240,
    durationText: "4 min"
  },
  {
    id: 5,
    title: "Desarrollo de piezas",
    youtubeEmbedUrl: "https://www.youtube.com/embed/zknplyKGQ0Q",
    durationSeconds: 270,
    durationText: "4:30 min"
  },
  {
    id: 6,
    title: "Tácticas básicas: clavada y horquilla",
    youtubeEmbedUrl: "https://www.youtube.com/embed/dSyVLgFQor4",
    durationSeconds: 360,
    durationText: "6 min"
  },
  {
    id: 7,
    title: "Tácticas avanzadas: ataque doble y rayos X",
    youtubeEmbedUrl: "https://www.youtube.com/embed/6kDPsIYcoHk",
    durationSeconds: 330,
    durationText: "5:30 min"
  },
  {
    id: 8,
    title: "Estructura de peones",
    youtubeEmbedUrl: "https://www.youtube.com/embed/3jyeIQU77H0",
    durationSeconds: 300,
    durationText: "5 min"
  },
  {
    id: 9,
    title: "Finales de peones",
    youtubeEmbedUrl: "https://www.youtube.com/embed/s_ARUvdLghk",
    durationSeconds: 360,
    durationText: "6 min"
  },
  {
    id: 10,
    title: "Finales de torres",
    youtubeEmbedUrl: "https://www.youtube.com/embed/RlEBPD3mLKs",
    durationSeconds: 390,
    durationText: "6:30 min"
  },
  {
    id: 11,
    title: "Análisis de partidas propias",
    youtubeEmbedUrl: "https://www.youtube.com/embed/ksJFhqZ1vb0",
    durationSeconds: 300,
    durationText: "5 min"
  },
  {
    id: 12,
    title: "Planificación y toma de decisiones",
    youtubeEmbedUrl: "https://www.youtube.com/embed/8yjKIfJ_VLs",
    durationSeconds: 420,
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
