import { useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const validateUser = ({ fullName, username, password, confirmPassword, gender }) => {
  if (!fullName?.trim()) {
    return { isValid: false, message: 'Full name is required' };
  }

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

  if (!confirmPassword) {
    return { isValid: false, message: 'Please confirm your password' };
  } else if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }

  if (!gender) {
    return { isValid: false, message: 'Please select your gender' };
  }

  return { isValid: true, message: '' };
};

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = useCallback(async (user) => {
    const validation = validateUser(user);
    if (!validation.isValid) {
      toast.error(validation.message);
      return false;
    }

    try {
      setLoading(true);
      const res = await axios.post('api/auth/signup', user);
      setAuthUser(res.data);

      toast.success('Signup successful');
      return true;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data?.message || 'Username already exists');
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(error.response?.data?.message || error.message || 'Signup failed');
      }

      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, signup };
};

export default useSignup;
