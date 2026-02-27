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
import WelcomeScreen from "./components/pages/WelcomeScreen";

// Pages - Dashboards (other roles)
import TeacherPanel from "./components/pages/TeacherPanel";
import ParentDashboard from "./components/pages/ParentDashboard";
import SchoolDashboard from "./components/pages/SchoolDashboard";

// Pages - Student (Mobile Native)
import StudentHomePage from "./components/pages/StudentHomePage";
import ProfilePage from "./components/pages/ProfilePage";
import ChallengesPage from "./components/pages/ChallengesPage";
import { 
  TrainingHub, 
  LearnPage, 
  LevelDetailPage, 
  PracticePage, 
  TasksPage 
} from "./components/pages/TrainingPages";

// Pages - Course
import CourseLanding from "./components/pages/CourseLanding";
import CourseContent from "./components/pages/CourseContent";
import CourseModule from "./components/pages/CourseModule";

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
      case 'teacher': return '/teacher';
      case 'parent': return '/parent';
      case 'school': return '/school';
      default: return '/';
    }
  };

  return (
    <Routes>
      {/* Welcome Screen - Entry point */}
      <Route path="/" element={userRole ? <Navigate to={getHomeRoute()} replace /> : <WelcomeScreen />} />
      
      {/* Role Selector */}
      <Route path="/roles" element={userRole ? <Navigate to={getHomeRoute()} replace /> : <RoleSelector />} />
      
      {/* Course Landing - Public (sales page) */}
      <Route path="/curso" element={<CourseLanding />} />
      
      {/* Student Routes - Mobile Layout with Bottom Nav */}
      <Route element={<MobileLayout />}>
        <Route 
          path="/inicio" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentHomePage />
            </ProtectedRoute>
          } 
        />
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
        <Route 
          path="/retos" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <ChallengesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/curso/contenido" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <CourseContent />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/curso/modulo/:moduleId" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <CourseModule />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/perfil" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
      </Route>
      
      {/* Other Roles - Desktop Layout */}
      <Route element={<Layout />}>
        <Route 
          path="/teacher" 
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherPanel />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/parent" 
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/school" 
          element={
            <ProtectedRoute allowedRoles={['school']}>
              <SchoolDashboard />
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
