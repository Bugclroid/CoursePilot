import React, { useState, useEffect } from 'react';
import { getAllCourses } from '../services/api'; // We already built this!
import CourseCard from '../components/CourseCard'; // Our new component

function HomePage() {
  // --- State ---
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // --- Effect ---
  // This runs once when the component first loads (thanks to the empty `[]`)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setError('');
        setIsLoading(true);
        // Call our API service
        const res = await getAllCourses();
        setCourses(res.courses); // Set the courses in state
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // --- Render Logic ---
  let content;
  if (isLoading) {
    content = <div className="text-center text-2xl">Loading courses...</div>;
  } else if (error) {
    content = <div className="text-center text-2xl text-red-500">{error}</div>;
  } else if (courses.length === 0) {
    content = <div className="text-center text-2xl">No courses found.</div>;
  } else {
    // If we have courses, map over them and render a card for each one
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-yellow-300">
      <h1 className="text-5xl font-extrabold text-center mb-12">
        Welcome to CoursePilot
      </h1>
      <h2 className="text-3xl font-bold text-center text-blue-300 mb-8">
        Available Courses
      </h2>
      {content}
    </div>
  );
}

export default HomePage;
