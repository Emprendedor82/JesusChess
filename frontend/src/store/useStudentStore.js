import { create } from 'zustand';
import { TEACHER_STUDENTS } from '../data/mockData';

const STORAGE_KEY = 'jugadas_custom_students';

const loadCustomStudents = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCustomStudents = (students) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
};

const useStudentStore = create((set, get) => ({
  customStudents: loadCustomStudents(),

  addStudent: (studentData) => {
    const newStudent = {
      id: `st-custom-${Date.now()}`,
      name: `${studentData.nombre} ${studentData.apellido}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${studentData.nombre}${Date.now()}`,
      level: parseInt(studentData.nivel) || 1,
      lastActive: 'Recién creado',
      school: studentData.colegio || '',
      progress: 0,
      email: studentData.email || '',
      age: studentData.edad || null,
      teacher: studentData.profesor || '',
      evaluation: {
        tactica: 0,
        estrategia: 0,
        atencion: 0,
        tiempoGestion: 0,
        actitud: 0,
      },
      feedback: '',
    };
    const updated = [...get().customStudents, newStudent];
    saveCustomStudents(updated);
    set({ customStudents: updated });
    return newStudent;
  },
}));

// Export mock data for components to use
export { TEACHER_STUDENTS };

export default useStudentStore;
