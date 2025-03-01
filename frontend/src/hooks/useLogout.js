import { useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';
import { useConversationContext } from '../context/ConversationContext.jsx';

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { setSelectedConversation, setMessages } = useConversationContext();

  const logout = useCallback(async () => {
    try {
      setLoading(true);

      localStorage.removeItem('chat-user');
      localStorage.removeItem('chat-conversation');

      setAuthUser(null);
      setSelectedConversation(null);
      setMessages([]);

      await axios.get('api/auth/logout');

      toast.success('Logged out successfully');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong during logout');
      return false;
    } finally {
      setLoading(false);
    }
  }, [setAuthUser, setSelectedConversation, setMessages]);

  return { loading, logout };
};

export default useLogout;
