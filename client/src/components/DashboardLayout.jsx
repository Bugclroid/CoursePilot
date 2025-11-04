import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Outlet, useNavigate, Link, NavLink } from 'react-router-dom';

function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Style for the main "Home" link
  const getNavLinkStyle = ({ isActive }) =>
    isActive ? "text-white font-bold" : "text-gray-300 hover:text-white";

  const getStudentLinkStyle = ({ isActive }) =>
    isActive ? "text-blue-300 font-bold underline" : "text-blue-400 hover:underline";
  
  const getAdminLinkStyle = ({ isActive }) =>
    isActive ? "text-yellow-300 font-bold underline" : "text-yellow-400 hover:underline";

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      <header className="bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400">
            CoursePilot
          </Link>
          
          <div className="flex items-center space-x-6">
            <span className="text-gray-300 hidden sm:inline">
              Welcome, <strong className="font-medium">{user?.name}</strong>!
            </span>
            
            {/* --- NEW HOME LINK --- */}
            <NavLink to="/" className={getNavLinkStyle}>
              Home
            </NavLink>
            
            {/* --- Role-Specific Links --- */}
            {user?.role === 'admin' && (
              <>
                <NavLink 
                  to="/admin/dashboard" 
                  className={getAdminLinkStyle}
                >
                  Admin Stats
                </NavLink>
                <NavLink 
                  to="/admin/courses" 
                  className={getAdminLinkStyle}
                >
                  Manage Courses
                </NavLink>
                <NavLink 
                  to="/admin/ai-test" 
                  className={getAdminLinkStyle}
                >
                 AI POC
                </NavLink>
              </>
            )}

            {user?.role === 'student' && (
              <NavLink 
                to="/dashboard" 
                className={getStudentLinkStyle}
              >
                My Dashboard
              </NavLink>
            )}
            
            {/* --- Logout Button --- */}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-md font-bold hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;

