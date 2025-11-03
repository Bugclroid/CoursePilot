import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCourseById, enrollInCourse, getStudentEnrollments } from '../services/api'; // 1. Import getStudentEnrollments
import { useAuth } from '../context/AuthContext';

function CourseDetailPage() {
  // --- State ---
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [error, setError] = useState('');
  const [enrollmentError, setEnrollmentError] = useState('');

  // --- NEW STATE ---
  const [isEnrolled, setIsEnrolled] = useState(false); 

  // --- Hooks ---
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // --- Effect to fetch ALL data ---
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setIsLoading(true);
        setError('');

        // 1. Fetch the course details
        const courseRes = await getCourseById(id);
        setCourse(courseRes.course);

        // 2. If the user is a student, fetch their enrollments
        if (isAuthenticated && user.role === 'student') {
          const enrollmentsRes = await getStudentEnrollments();
          
          // 3. Check if this course ID is in their enrollment list
          const alreadyEnrolled = enrollmentsRes.enrollments.some(
            (enrollment) => enrollment.courseId._id === id
          );
          setIsEnrolled(alreadyEnrolled);
        }

      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch course data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPageData();
  }, [id, isAuthenticated, user]); // Re-run if any of these change

  // --- Enroll Handler (no change) ---
  const handleEnroll = async () => {
    // ... (This function remains exactly the same as before) ...
    setEnrollmentError('');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user.role !== 'student') {
      setEnrollmentError('Only students can enroll. Admins manage courses.');
      return;
    }
    try {
      setIsEnrolling(true);
      const res = await enrollInCourse(id);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setEnrollmentError(err.response?.data?.message || 'Enrollment failed. Please try again.');
    } finally {
      setIsEnrolling(false);
    }
  };

  // --- Render Logic ---
  if (isLoading) {
    return <div className="text-center text-2xl p-10">Loading course details...</div>;
  }
  // ... (error and !course checks are the same) ...
  if (error) {
    return <div className="text-center text-2xl text-red-500 p-10">{error}</div>;
  }
  if (!course) {
    return <div className="text-center text-2xl p-10">Course not found.</div>;
  }

  const placeholderImage = `https://placehold.co/800x400/334155/94a3b8?text=${course.title.replace(/\s/g, '+')}`;

  return (
    <div className="container mx-auto p-8">
      <Link to="/" className="text-blue-400 hover:underline mb-6 inline-block">
        &larr; Back to all courses
      </Link>
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
              ${course.price}
            </span>

            {/* --- THIS IS THE BIG CHANGE --- */}
            {isEnrolled ? (
              <span className="w-full md:w-auto bg-green-600 text-white py-3 px-8 rounded-md text-xl font-bold text-center">
                ✓ You are enrolled
              </span>
            ) : (
              <button 
                onClick={handleEnroll}
                disabled={isEnrolling}
                className="w-full md:w-auto bg-blue-600 text-white py-3 px-8 rounded-md text-xl font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isEnrolling ? 'Enrolling...' : 'Enroll & Pay'}
              </button>
            )}
            
          </div>

          {/* ... (rest of the page is the same) ... */}
          {enrollmentError && !isEnrolled && (
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


