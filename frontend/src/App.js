import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { Toaster } from "./components/ui/sonner";

// Layout
import MobileLayout from "./components/layout/MobileLayout";

// Pages
import SimpleRoleSelector from "./components/pages/SimpleRoleSelector";
import StudentHome from "./components/pages/StudentHome";
import CoachHome from "./components/pages/CoachHome";
import ChallengesPage from "./components/pages/ChallengesPage";
import { 
  TrainingHub, 
  LearnPage, 
  LevelDetailPage, 
  PracticePage, 
  TasksPage 
} from "./components/pages/TrainingPages";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userRole } = useApp();
  
  if (!userRole) {
    return <Navigate to="/" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Route Configuration
const AppRoutes = () => {
  const { userRole } = useApp();

  // Determine the home route based on role
  const getHomeRoute = () => {
    switch (userRole) {
      case 'student': return '/inicio';
      case 'coach': return '/coach';
      default: return '/';
    }
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={userRole ? <Navigate to={getHomeRoute()} replace /> : <SimpleRoleSelector />} />
      
      {/* Protected Routes - wrapped in MobileLayout */}
      <Route element={<MobileLayout />}>
        {/* Student Routes */}
        <Route 
          path="/inicio" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentHome />
            </ProtectedRoute>
          } 
        />
        
        {/* Coach Routes */}
        <Route 
          path="/coach" 
          element={
            <ProtectedRoute allowedRoles={['coach']}>
              <CoachHome />
            </ProtectedRoute>
          } 
        />
        
        {/* Training Routes - Both roles */}
        <Route 
          path="/entrenamiento" 
          element={
            <ProtectedRoute allowedRoles={['student', 'coach']}>
              <TrainingHub />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/entrenamiento/aprende" 
          element={
            <ProtectedRoute allowedRoles={['student', 'coach']}>
              <LearnPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/entrenamiento/aprende/:levelId" 
          element={
            <ProtectedRoute allowedRoles={['student', 'coach']}>
              <LevelDetailPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/entrenamiento/practica" 
          element={
            <ProtectedRoute allowedRoles={['student', 'coach']}>
              <PracticePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/entrenamiento/tareas" 
          element={
            <ProtectedRoute allowedRoles={['student', 'coach']}>
              <TasksPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Challenges/Retos - Both roles */}
        <Route 
          path="/retos" 
          element={
            <ProtectedRoute allowedRoles={['student', 'coach']}>
              <ChallengesPage />
            </ProtectedRoute>
          } 
        />
      </Route>
      
      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AppProvider>
      <div className="App">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Toaster position="top-right" />
      </div>
    </AppProvider>
  );
}

export default App;
