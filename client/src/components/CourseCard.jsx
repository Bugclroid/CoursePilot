import React from 'react'
import {Link} from 'react-router-dom'

const CourseCard = ({course})=> {
  const placeholderImage = `https://placehold.co/600x400/334155/94a3b8?text=${course.title.replace(/\s/g, '+')}`;
  return(
    <div className="bg-purple-600 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <img src={course.thumbnail || placeholderImage} 
        alt={`${course.title} thumbnail`} 
        className="w-full h-48 object-cover" 
        onError={(e) => e.target.src = placeholderImage}
        />
       <div className="p-6">
            <h3 className="text-2xl font-bold mb-2 truncate">{course.title}</h3>
            <p className="text-yellow-400 text-sm mb-4 font-bold">Duration: {course.duration}</p>
            <p className="text-gray-300 mb-4 h-20 overflow-hidden text-ellipsis">
                {course.description}
            </p>
            <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-blue-400">₹ {course.price}</span>
                <Link 
                to={`/course/${course._id}`}
                className="bg-blue-600 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-700 transition-colors">
                View Details
                </Link>
            </div>
       </div>    
    </div>
  );
}

export default CourseCard;