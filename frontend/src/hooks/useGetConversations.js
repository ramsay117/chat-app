import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useConversationContext } from '../context/ConversationContext.jsx';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const { conversations, setConversations } = useConversationContext();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/users');
        setConversations(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || 'Failed to fetch conversations');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
