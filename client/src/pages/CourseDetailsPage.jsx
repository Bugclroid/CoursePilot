import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams gets the :id from the URL
import { getCourseById,enrollInCourse  } from '../services/api'; // We already built this!
import { useAuth } from '../context/AuthContext';

function CourseDetailPage() {
  // --- State ---
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false); 
  const [error, setError] = useState('');
  const [enrollmentError, setEnrollmentError] = useState('');

  // --- Hooks ---
  const { id } = useParams(); // Gets the course ID from the URL
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // --- Effect to fetch course data ---
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await getCourseById(id);
        setCourse(res.course); // Our controller sends { success: true, course: ... }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch course');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [id]); // Re-run this effect if the ID in the URL ever changes

  // --- Handler for the Enroll button ---
  const handleEnroll = async () => {
    setEnrollmentError(''); 
     if (!isAuthenticated) { navigate('/login'); return; } // 2. Check if user is a student
     if (user.role !== 'student') { setEnrollmentError('Only students can enroll. Admins manage courses.'); return; } 
     // 3. Try to enroll 
     try { setIsEnrolling(true);
        const res = await enrollInCourse(id); 
        navigate('/dashboard'); } 
        catch (err) { 
             console.error(err); setEnrollmentError(err.response?.data?.message || 'Enrollment failed. Please try again.'); } 
             finally { setIsEnrolling(false); }
  };

  // --- Render Logic ---
  if (isLoading) {
    return <div className="text-center text-2xl p-10">Loading course details...</div>;
  }

  if (error) {
    return <div className="text-center text-2xl text-red-500 p-10">{error}</div>;
  }

  if (!course) {
    return <div className="text-center text-2xl p-10">Course not found.</div>;
  }

  // Fallback image
  const placeholderImage = `https://placehold.co/800x400/334155/94a3b8?text=${course.title.replace(/\s/g, '+')}`;

  return (
    <div className="container mx-auto p-8">
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <img
          src={course.thumbnail || placeholderImage}
          alt={`${course.title} thumbnail`}
          className="w-full h-96 object-cover"
          onError={(e) => e.target.src = placeholderImage}
        />
        <div className="p-10">
          <h1 className="text-5xl font-extrabold mb-4">{course.title}</h1>
          <p className="text-xl text-gray-400 mb-6">Duration: {course.duration}</p>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <span className="text-5xl font-bold text-blue-400 mb-4 md:mb-0">
              ₹ {course.price}
            </span>
            <button 
              onClick={handleEnroll}
              className="w-full md:w-auto bg-blue-600 text-white py-3 px-8 rounded-md text-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Enroll & Pay
            </button>
          </div>

          {/* Enrollment error message */}
          {enrollmentError && (
            <div className="bg-red-500 text-white p-3 rounded-md mb-6 text-center">
              {enrollmentError}
            </div>
          )}

          <h2 className="text-3xl font-bold mb-4">About this course</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {course.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;
