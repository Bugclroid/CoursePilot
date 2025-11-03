import React, { useState, useEffect } from 'react';
import { getStudentEnrollments } from '../services/api';
import { Link } from 'react-router-dom';

function StudentDashboard() {
  
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setError('');
        setIsLoading(true);
        // We already added this to api.js
        const res = await getStudentEnrollments();
        setEnrollments(res.enrollments);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch enrollments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrollments();
  }, []);


  let content;
  if (isLoading) {
    content = <div className="text-center text-2xl">Loading your courses...</div>;
  } else if (error) {
    content = <div className="text-center text-2xl text-red-500">{error}</div>;
  } else if (enrollments.length === 0) {
    content = (
      <div className="text-center">
        <h2 className="text-2xl mb-4">You are not enrolled in any courses yet.</h2>
        <Link to="/" className="text-blue-400 text-xl hover:underline">
          Browse available courses &rarr;
        </Link>
      </div>
    );
  } else {
    
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enrollments.map((enrollment) => (
          <div key={enrollment._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img 
              src={enrollment.courseId.thumbnail || `https://placehold.co/600x400/334155/94a3b8?text=${enrollment.courseId.title.replace(/\s/g, '+')}`}
              alt={enrollment.courseId.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{enrollment.courseId.title}</h3>
              <p className="text-gray-400 mb-4">Duration: {enrollment.courseId.duration}</p>
              <p className="text-gray-300 mb-4">
                Payment: <span className="font-bold text-green-400">rs {enrollment.amount} (Paid)</span>
            </p>

              <Link 
                to={`/course/${enrollment.courseId._id}`} 
                className="bg-blue-600 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-700 transition-colors"
              >
                View Course
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">My Enrolled Courses</h1>
      {content}
    </div>
  );
}

export default StudentDashboard;
