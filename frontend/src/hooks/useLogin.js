import { useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const validateUser = ({ username, password }) => {
  if (!username?.trim()) {
    return { isValid: false, message: 'Username is required' };
  } else if (username.length < 3) {
    return { isValid: false, message: 'Username must be at least 3 characters' };
  }

  if (!password) {
    return { isValid: false, message: 'Password is required' };
  } else if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters' };
  }

  return { isValid: true, message: '' };
};

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = useCallback(async (username, password) => {
    const validation = validateUser({ username, password });
    if (!validation.isValid) {
      toast.error(validation.message);
      return false;
    }

    try {
      setLoading(true);
      const res = await axios.post('api/auth/login', { username, password });
      setAuthUser(res.data);

      toast.success('Login successful');
      return true;
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error(error.response.data?.message || 'Invalid credentials');
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(error.response?.data?.message || error.message || 'Login failed');
      }
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, login };
};

export default useLogin;
