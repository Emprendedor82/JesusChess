import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  STUDENT_PROFILE, 
  SCHOOLS, 
  TEACHER_STUDENTS, 
  PARENT_VIEW_DATA,
  SCHOOL_DASHBOARD 
} from '../data/mockData';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // User role state
  const [userRole, setUserRole] = useState(null); // 'student', 'teacher', 'parent', 'school'
  const [currentUser, setCurrentUser] = useState(null);
  
  // Onboarding state
  const [studentType, setStudentType] = useState(null); // 'school' or 'private'
  const [selectedSchool, setSelectedSchool] = useState(null);
  
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Login as different roles (mock)
  const loginAs = useCallback((role) => {
    setUserRole(role);
    switch (role) {
      case 'student':
        setCurrentUser({
          ...STUDENT_PROFILE,
          schoolData: selectedSchool ? SCHOOLS.find(s => s.id === selectedSchool) : null
        });
        break;
      case 'teacher':
        setCurrentUser({
          id: 'teacher-1',
          name: 'Prof. Carlos García',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
          students: TEACHER_STUDENTS
        });
        break;
      case 'parent':
        setCurrentUser({
          id: 'parent-1',
          name: 'María Martínez',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
          ...PARENT_VIEW_DATA
        });
        break;
      case 'school':
        const school = selectedSchool 
          ? SCHOOLS.find(s => s.id === selectedSchool)
          : SCHOOLS[0];
        setCurrentUser({
          ...school,
          dashboard: SCHOOL_DASHBOARD
        });
        break;
      default:
        setCurrentUser(null);
    }
  }, [selectedSchool]);

  // Logout
  const logout = useCallback(() => {
    setUserRole(null);
    setCurrentUser(null);
    setStudentType(null);
    setSelectedSchool(null);
  }, []);

  // Select school during onboarding
  const selectSchool = useCallback((schoolId) => {
    setSelectedSchool(schoolId);
    setStudentType('school');
  }, []);

  // Select private student
  const selectPrivate = useCallback(() => {
    setStudentType('private');
    setSelectedSchool(null);
  }, []);

  const value = {
    // State
    userRole,
    currentUser,
    studentType,
    selectedSchool,
    sidebarOpen,
    schools: SCHOOLS,
    
    // Actions
    loginAs,
    logout,
    selectSchool,
    selectPrivate,
    setStudentType,
    setSidebarOpen,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
