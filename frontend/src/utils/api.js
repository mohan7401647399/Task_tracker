import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.mode === 'development' ? `${process.env.REACT_APP_API_URL}/api` : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add auth token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;