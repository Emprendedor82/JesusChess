import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // User role state - 4 roles: student, teacher, parent, school
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Login as different roles (mock)
  const loginAs = useCallback((role) => {
    setUserRole(role);
    switch (role) {
      case 'student':
        setCurrentUser({
          id: 'student-1',
          name: 'Sofía Martínez',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
          level: 2,
          xp: 450,
          xpToNextLevel: 1000,
          streak: 5,
          completedLessons: 8,
          totalLessons: 24,
          medals: ['gold', 'silver', 'bronze']
        });
        break;
      case 'teacher':
        setCurrentUser({
          id: 'teacher-1',
          name: 'Prof. Carlos García',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
        });
        break;
      case 'parent':
        setCurrentUser({
          id: 'parent-1',
          name: 'María López',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
        });
        break;
      case 'school':
        setCurrentUser({
          id: 'school-1',
          name: 'Colegio San Ignacio',
          logo: 'https://api.dicebear.com/7.x/initials/svg?seed=CSI',
        });
        break;
      default:
        setCurrentUser(null);
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    setUserRole(null);
    setCurrentUser(null);
  }, []);

  const value = {
    // State
    userRole,
    currentUser,
    sidebarOpen,
    
    // Actions
    loginAs,
    logout,
    setSidebarOpen,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
