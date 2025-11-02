import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CourseDetailPage from './pages/CourseDetailPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminCourseManagement from './pages/AdminCourseManagement'; 
import CourseCreatePage from './pages/CourseCreatePage';     
import CourseEditPage from './pages/CourseEditPage';       


import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Routes>
    
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/course/:id" element={<CourseDetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
         
            <Route path="/dashboard" element={<StudentDashboard />} />
            
       
            <Route element={<AdminRoute />}> 
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/courses" element={<AdminCourseManagement />} />
              <Route path="/admin/courses/new" element={<CourseCreatePage />} />
              <Route path="/admin/courses/edit/:id" element={<CourseEditPage />} />
            </Route>
            
          </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;



