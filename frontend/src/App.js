import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { Toaster } from "./components/ui/sonner";

// Layout
import Layout from "./components/layout/Layout";
import MobileLayout from "./components/layout/MobileLayout";

// Pages - Role Selector
import AuthScreen from "./components/pages/AuthScreen";

// Pages - Dashboards (other roles)
import TeacherPanel from "./components/pages/TeacherPanel";
import ParentDashboard from "./components/pages/ParentDashboard";
import SchoolDashboard from "./components/pages/SchoolDashboard";
import AdminDashboard from "./components/pages/AdminDashboard";

// Pages - Student (Mobile Native)
import StudentHomePage from "./components/pages/StudentHomePage";
import ProfilePage from "./components/pages/ProfilePage";
import ChallengesPage from "./components/pages/ChallengesPage";
import NotificationsPage from "./components/pages/NotificationsPage";
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
      case 'admin': return '/admin';
      default: return '/';
    }
  };

  return (
    <Routes>
      {/* Auth Screen - Entry point */}
      <Route path="/" element={userRole ? <Navigate to={getHomeRoute()} replace /> : <AuthScreen />} />
      
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
          path="/notificaciones" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <NotificationsPage />
            </ProtectedRoute>
          } 
        />
      </Route>
      
      {/* Other Roles - Desktop Layout */}
      <Route element={<Layout />}>
        {/* Teacher routes */}
        <Route 
          path="/teacher" 
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherPanel />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher/students" 
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherPanel section="students" />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher/tasks" 
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherPanel section="tasks" />
            </ProtectedRoute>
          } 
        />
        {/* Parent routes */}
        <Route 
          path="/parent" 
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/parent/progress" 
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentDashboard section="progress" />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/parent/feedback" 
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentDashboard section="feedback" />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/parent/tasks" 
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentDashboard section="tasks" />
            </ProtectedRoute>
          } 
        />
        {/* School routes */}
        <Route 
          path="/school" 
          element={
            <ProtectedRoute allowedRoles={['school']}>
              <SchoolDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/school/students" 
          element={
            <ProtectedRoute allowedRoles={['school']}>
              <SchoolDashboard section="students" />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/school/analytics" 
          element={
            <ProtectedRoute allowedRoles={['school']}>
              <SchoolDashboard section="analytics" />
            </ProtectedRoute>
          } 
        />
        {/* Admin route */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* Profile - standalone for all roles */}
      <Route 
        path="/perfil" 
        element={
          <ProtectedRoute allowedRoles={['student', 'teacher', 'parent', 'school', 'admin']}>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      
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
