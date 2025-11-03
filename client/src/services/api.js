import axios from 'axios';

const api = axios.create({
    baseURL: 'https://coursepilot-api.onrender.com/api',
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
  return res.data; 
};

export const registerUser = async (name, email, password) => {
  const res = await api.post('/auth/signup', { name, email, password });
  return res.data; 
};

export const getUserProfile = async () => {
  const res = await api.get('/auth/profile');
  return res.data; 
};


export const getAllCourses = async () => {
  const res = await api.get('/courses');
  return res.data; 
};

export const getCourseById = async (id) => {
  const res = await api.get(`/courses/${id}`);
  return res.data; 
};

export const enrollInCourse = async (courseId) => {
  
  const res = await api.post('/enrollments', { courseId });
  return res.data;
};

export const getStudentEnrollments = async () => {
  const res = await api.get('/enrollments/student');
  return res.data;
};

export const getAdminEnrollments = async () => {
  const res = await api.get('/enrollments/admin');
  return res.data;
};

export const createCourse = async (courseData) => {
  const res = await api.post('/courses', courseData);
  return res.data;
};

export const updateCourse = async (id, courseData) => {
  const res = await api.put(`/courses/${id}`, courseData);
  return res.data;
};

export const deleteCourse = async (id) => {
  const res = await api.delete(`/courses/${id}`);
  return res.data;
};



export default api;