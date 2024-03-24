import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    try {
      setLoading(true);
      if (!isValidUser({ username, password })) return;
      const res = await axios.post('api/auth/login', { username, password });
      toast.success('Login successful');
      localStorage.setItem('chat-user', JSON.stringify(res.data));
      setAuthUser(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

const isValidUser = ({ username, password }) => {
  if (!username || !password) {
    toast.error('All fields are required');
    return false;
  }
  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }
  return true;
};
