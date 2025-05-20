import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load user function
  const loadUser = useCallback(async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`);
        setUser(res.data.data);
        setIsAuthenticated(true);
        setError(null);
      } catch (err) {
        console.error('Error loading user:', err.response?.data);
        clearAuth();
        setError(err.response?.data?.message || 'Failed to load user');
      }
    }
    setLoading(false);
  }, []);

  // Check for token and load user on mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Clear auth state
  const clearAuth = () => {
    localStorage.removeItem('token');
    setAuthToken(false);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Register user
  const register = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, formData);
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      await loadUser();
      navigate('/dashboard');
      return { success: true };
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, formData);
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      await loadUser();
      navigate('/dashboard');
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    clearAuth();
    navigate('/login');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    register,
    login,
    logout,
    loadUser
  };

  return (
    <AuthContext.Provider value={ value }>
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;