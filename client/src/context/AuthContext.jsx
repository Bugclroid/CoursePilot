/* eslint-disable react-refresh/only-export-components */
import React,{createContext, useState, useEffect, useContext} from "react";
import { loginUser,registerUser,getUserProfile } from "../services/api";

const AuthContext = createContext(null);
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const loadUser = async () => {
            if (token){
                localStorage.getItem('token',token);
                try {
                    const res = await getUserProfile();
                    setUser(res.user)
                } catch (error) {
                    console.error('Failed to fetch user', error)          
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
            setIsLoading(false)
        };
       loadUser(); 
    },[token]);

    const login = async (email, password) =>{
        const res = await loginUser(email,password);
        const {token, user} = res.data;
        setToken(token)
        setUser(user)
        localStorage.setItem('token', token)
    };

    const signup = async (name, email, password) => {
    const res = await registerUser(name, email, password);
    const { token, user } = res.data;
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token, 
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
        {!isLoading && children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
    return useContext(AuthContext);
};