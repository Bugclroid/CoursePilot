import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers:{
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

// --- Auth Routes ---
export const loginUser = async (email, password) => {
  const res = await api.post('/auth/signin', { email, password });
  return res.data; // <-- Return server data
};

export const registerUser = async (name, email, password) => {
  const res = await api.post('/auth/signup', { name, email, password });
  return res.data; // <-- Return server data
};

export const getUserProfile = async () => {
  const res = await api.get('/auth/profile');
  return res.data; // <-- Return server data
};

// --- Course Routes ---
export const getAllCourses = async () => {
  const res = await api.get('/courses');
  return res.data; // <-- Return server data
};

export const getCourseById = async (id) => {
  const res = await api.get(`/courses/${id}`);
  return res.data; // <-- Return server data
};

export const enrollInCourse = async (courseId) => {
  // Our backend is expecting an object with a 'courseId' property
  const res = await api.post('/enrollments', { courseId });
  return res.data;
};

// --- Student Dashboard ---
export const getStudentEnrollments = async () => {
  const res = await api.get('/enrollments/student');
  return res.data;
};

// --- Admin Dashboard ---
export const getAdminEnrollments = async () => {
  const res = await api.get('/enrollments/admin');
  return res.data;
};



export default api;