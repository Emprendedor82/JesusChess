import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { Toaster } from "./components/ui/sonner";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import RoleSelector from "./components/pages/RoleSelector";
import Onboarding from "./components/pages/Onboarding";
import StudentDashboard from "./components/pages/StudentDashboard";
import TeacherPanel from "./components/pages/TeacherPanel";
import ParentDashboard from "./components/pages/ParentDashboard";
import SchoolDashboard from "./components/pages/SchoolDashboard";
import Training from "./components/pages/Training";
import Challenges from "./components/pages/Challenges";
import Tasks from "./components/pages/Tasks";
import Achievements from "./components/pages/Achievements";

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
      <Route path="/onboarding" element={<Onboarding />} />
      
      {/* Protected Routes - wrapped in Layout */}
      <Route element={<Layout />}>
        {/* Student Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/training" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Training />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/challenges" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Challenges />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tasks" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Tasks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/achievements" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Achievements />
            </ProtectedRoute>
          } 
        />
        
        {/* Teacher Routes */}
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
              <TeacherPanel />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher/tasks" 
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherPanel />
            </ProtectedRoute>
          } 
        />
        
        {/* Parent Routes */}
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
              <ParentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/parent/feedback" 
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/parent/tasks" 
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* School Routes */}
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
              <SchoolDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/school/analytics" 
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
