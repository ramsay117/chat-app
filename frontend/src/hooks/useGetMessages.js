import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useConversationContext } from '../context/ConversationContext.jsx';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversationContext();

  useEffect(() => {
    (async () => {
      if (!selectedConversation?._id) return;
      try {
        setLoading(true);
        const res = await axios.get(`api/messages/${selectedConversation._id}/`);
        setMessages(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || 'Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedConversation?._id]);

  return { loading, messages };
};

export default useGetMessages;
