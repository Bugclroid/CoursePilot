import React from 'react';
import { Routes, Route } from 'react-router-dom';

// --- Layouts ---
import MainLayout from './components/MainLayout';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// --- Pages ---
// Public
import HomePage from './pages/HomePage';
import CourseDetailPage from './pages/CourseDetailPage';
// Auth
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
// Student
import StudentDashboard from './pages/StudentDashboard';
// Admin
import AdminDashboard from './pages/AdminDashboard';
import AdminCourseManagement from './pages/AdminCourseManagement';
import CourseCreatePage from './pages/CourseCreatePage';
import CourseEditPage from './pages/CourseEditPage';
import AiTestPage from './pages/AiTestPage'; // Keep this for your PoC

function App() {
  return (
    // No wrapper div here, the layouts handle the styling
    <Routes>
      
      {/* --- Public Routes (with Main Navbar) --- */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:id" element={<CourseDetailPage />} />
      </Route>

      {/* --- Auth Routes (no layout) --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* --- Protected Routes (with Dashboard Navbar) --- */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          
          {/* Student Route */}
          <Route path="/dashboard" element={<StudentDashboard />} />
          
          {/* Admin-Only Routes */}
          <Route element={<AdminRoute />}> 
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/courses" element={<AdminCourseManagement />} />
            <Route path="/admin/courses/new" element={<CourseCreatePage />} />
            <Route path="/admin/courses/edit/:id" element={<CourseEditPage />} />
            <Route path="/admin/ai-test" element={<AiTestPage />} />
          </Route>
          
        </Route>
      </Route>

    </Routes>
  );
}

export default App;

