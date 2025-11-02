import React, { useState, useEffect } from 'react';
import { getAdminEnrollments } from '../services/api'; 
function AdminDashboard() {

  const [enrollments, setEnrollments] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setError('');
        setIsLoading(true);
    
        const res = await getAdminEnrollments();
        setEnrollments(res.enrollments);
        setTotalRevenue(res.totalRevenue);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch admin data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);


  if (isLoading) {
    return <div className="text-center text-2xl">Loading admin data...</div>;
  }

  if (error) {
    return <div className="text-center text-2xl text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-300 mb-2">Total Revenue</h2>
          <p className="text-5xl font-extrabold">₹ {totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-300 mb-2">Total Enrollments</h2>
          <p className="text-5xl font-extrabold">{enrollments.length}</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">All Enrollments</h2>
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Student</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Course</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No enrollments found.
                </td>
              </tr>
            ) : (
              enrollments.map((enrollment) => (
                <tr key={enrollment._id} className="hover:bg-gray-700">
                  <td className="py-4 px-6 whitespace-nowrap">{enrollment.studentId?.name || 'N/A'}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{enrollment.studentId?.email || 'N/A'}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{enrollment.courseId?.title || 'Course Not Found'}</td>
                  <td className="py-4 px-6 whitespace-nowrap">${enrollment.amount}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="py-1 px-3 rounded-full text-xs font-bold bg-green-500 text-green-900">
                      {enrollment.paymentStatus}
                    </span>
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

export default AdminDashboard;
