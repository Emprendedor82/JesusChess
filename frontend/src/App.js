import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { Toaster } from "./components/ui/sonner";

// Layout
import Layout from "./components/layout/Layout";
import MobileLayout from "./components/layout/MobileLayout";

// Pages - Role Selector
import RoleSelector from "./components/pages/RoleSelector";

// Pages - Dashboards (4 roles)
import StudentDashboard from "./components/pages/StudentDashboard";
import TeacherPanel from "./components/pages/TeacherPanel";
import ParentDashboard from "./components/pages/ParentDashboard";
import SchoolDashboard from "./components/pages/SchoolDashboard";

// Pages - Student Features
import StudentHome from "./components/pages/StudentHome";
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
      case 'student': return '/dashboard';
      case 'teacher': return '/teacher';
      case 'parent': return '/parent';
      case 'school': return '/school';
      default: return '/';
    }
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={userRole ? <Navigate to={getHomeRoute()} replace /> : <RoleSelector />} />
      
      {/* Protected Routes - wrapped in Layout */}
      <Route element={<Layout />}>
        {/* Student Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Teacher Panel */}
        <Route 
          path="/teacher" 
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherPanel />
            </ProtectedRoute>
          } 
        />
        
        {/* Parent Dashboard */}
        <Route 
          path="/parent" 
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* School Dashboard */}
        <Route 
          path="/school" 
          element={
            <ProtectedRoute allowedRoles={['school']}>
              <SchoolDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Training Routes - Student only */}
        <Route 
          path="/entrenamiento" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <TrainingHub />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/entrenamiento/aprende" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <LearnPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/entrenamiento/aprende/:levelId" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <LevelDetailPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/entrenamiento/practica" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <PracticePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/entrenamiento/tareas" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <TasksPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Challenges/Retos - Student only */}
        <Route 
          path="/retos" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
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
