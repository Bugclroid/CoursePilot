import React from 'react';
import { Link, Outlet, NavLink } from 'react-router-dom'; // 1. Import NavLink
import { useAuth } from '../context/AuthContext';

function MainLayout() {
  const { isAuthenticated, user, logout } = useAuth();

  // 2. Add NavLink styling function
  const getNavLinkStyle = ({ isActive }) =>
    isActive ? "text-white font-bold" : "text-gray-300 hover:text-white";

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* --- HEADER / NAVBAR --- */}
      <header className="bg-gray-800 shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo / Home Link (remains a simple Link) */}
          <Link to="/" className="text-3xl font-bold text-white hover:text-blue-400">
            CoursePilot
          </Link>
          
          {/* 3. Update spacing to space-x-6 */}
          <div className="flex items-center space-x-6">
            
            {/* 4. Use NavLink for Home */}
            <NavLink to="/" className={getNavLinkStyle}>
              Home
            </NavLink>

            {/* --- Conditional Auth Links --- */}
            {isAuthenticated ? (
              <>
                {/* 5. Use NavLink for Dashboard */}
                <NavLink 
                  to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} 
                  className="text-blue-400 font-semibold hover:underline"
                >
                  My Dashboard
                </NavLink>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white py-2 px-4 rounded-md font-bold hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* 6. Use NavLink for Login */}
                <NavLink to="/login" className={getNavLinkStyle}>
                  Login
                </NavLink>
                <Link 
                  to="/signup" 
                  className="bg-blue-600 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-800 p-6 text-center text-gray-400">
        {/* 7. Update the footer to [Your Name] */}
        <p>&copy; {new Date().getFullYear()} CoursePilot. Built by Bugclroid.</p>
      </footer>
    </div>
  );
}

export default MainLayout;

