import React from 'react'
import {useAuth} from '../context/AuthContext';
import { Navigate,Outlet } from 'react-router-dom';

const ProtectedRoute = () =>{
    const {isAuthenticated, isLoading} = useAuth();

    if(isLoading){
        return(
            <div className="min-h-screen flex items-center justify-center bg-yellow-400 text-red-500">
                Loading CoursePilot...
            </div>
        )
    }

    if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
