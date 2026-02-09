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
  // User role state - simplified to student/coach
  const [userRole, setUserRole] = useState(null); // 'student', 'coach'
  const [currentUser, setCurrentUser] = useState(null);

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
          streak: 5
        });
        break;
      case 'coach':
        setCurrentUser({
          id: 'coach-1',
          name: 'Prof. Carlos García',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
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
    
    // Actions
    loginAs,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
