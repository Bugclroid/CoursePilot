import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createCourse } from '../services/api'; 

function CourseCreatePage() {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    thumbnail: '', 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      
      await createCourse(formData);
      
      
      navigate('/admin/courses');

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create course');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Create New Course</h1>
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="title">Course Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

       
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows="5"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="price">Price (₹)</label>
              <input
                type="number"
                name="price"
                id="price"
                min="0"
                className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            
  
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="duration">Duration (e.g., "8 Weeks")</label>
              <input
                type="text"
                name="duration"
                id="duration"
                className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2" htmlFor="thumbnail">Thumbnail URL (Optional)</label>
            <input
              type="text"
              name="thumbnail"
              id="thumbnail"
              placeholder="https://placehold.co/..."
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
              value={formData.thumbnail}
              onChange={handleChange}
            />
          </div>

        
          <div className="flex justify-end space-x-4 pt-4">
            <Link 
              to="/admin/courses"
              className="bg-gray-600 text-white py-2 px-6 rounded-md font-bold hover:bg-gray-500 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 text-white py-2 px-6 rounded-md font-bold hover:bg-green-700 transition-colors disabled:bg-gray-500"
            >
              {isLoading ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseCreatePage;
