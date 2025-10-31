import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate,Link, Navigate } from 'react-router-dom'

const SignupPage = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const {signup} = useAuth();
  const navigate = useNavigate(); 
  const handleSubmit = async(e) =>{
    e.preventDefault();
    setError('')
    try {
      await signup(name, email, password);
      navigate('/dashboard')
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Failed to login. Please try again')
    }
  }
  return (
   <div className="min-h-screen flex items-center justify-center bg-yellow-400 text-yellow-300">
    <div className="bg-purple-800 p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
      {error &&(
        <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 mb-2">
            Name
          </label>
          <input 
          type="text" 
          id='name'
          className='w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Email
          </label>
          <input 
          type="email" 
          id='email'
          className='w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 mb-2">
            Password
          </label>
          <input 
          type="password" 
          id='password'
          className='w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        </div>
        <button type='submit'
        className="w-full bg-yellow-500 text-white p-3 rounded-md font-bold hover:bg-yellow-700 transition-colors">
          Sign Up
        </button>
      </form>
      <p className="text-center text-gray-400 mt-6">
        Have an account already? {' '}
        <Link  to='/login' className="text-blue-400 hover:underline">
        Login
        </Link>
      </p>
    </div>
   </div>
  )
}

export default SignupPage