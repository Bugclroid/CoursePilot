/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCourses, deleteCourse } from '../services/api'; 
function AdminCourseManagement() {

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');

 
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setError('');
        setIsLoading(true);
        const res = await getAllCourses();
        setCourses(res.courses);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch courses');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []); 


  const handleDelete = async (courseId) => {
  
    try {
      setDeleteError('');
      
      await deleteCourse(courseId);
      
      
      setCourses(currentCourses => 
        currentCourses.filter(course => course._id !== courseId)
      );

    } catch (err) {
      console.error(err);
      setDeleteError(err.response?.data?.message || 'Failed to delete course');
    }
  };

 
  if (isLoading) {
    return <div className="text-center text-2xl">Loading courses...</div>;
  }
  if (error) {
    return <div className="text-center text-2xl text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Course Management</h1>
        <Link 
          to="/admin/courses/new"
          className="bg-green-600 text-white py-2 px-5 rounded-md font-bold hover:bg-green-700 transition-colors"
        >
          + Create New Course
        </Link>
      </div>

   
      {deleteError && (
        <div className="bg-red-500 text-white p-3 rounded-md mb-6 text-center">
          {deleteError}
        </div>
      )}

      
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase">Title</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase">Price</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase">Duration</th>
              <th className="py-3 px-6 text-right text-xs font-medium text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {courses.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No courses found.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-700">
                  <td className="py-4 px-6 whitespace-nowrap font-medium">{course.title}</td>
                  <td className="py-4 px-6 whitespace-nowrap">₹ {course.price}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{course.duration}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-right space-x-3">
                    <Link
                      to={`/admin/courses/edit/${course._id}`}
                      className="text-blue-400 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCourseManagement;
