import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';
import { useConversationContext } from '../context/ConversationContext.jsx';

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { setSelectedConversation } = useConversationContext();

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get('api/auth/logout');
      localStorage.removeItem('chat-user');
      localStorage.removeItem('chat-conversation');
      setAuthUser(null);
      setSelectedConversation(null);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
