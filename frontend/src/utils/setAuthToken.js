import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // Store in localStorage
    localStorage.setItem('token', token);
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
    // Remove from localStorage
    localStorage.removeItem('token');
  }
};

export default setAuthToken;