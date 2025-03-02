import { useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useConversationContext } from '../context/ConversationContext.jsx';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages, selectedConversation } = useConversationContext();

  const sendMessage = useCallback(
    async (message) => {
      if (!selectedConversation?._id || !message.trim()) return false;
      try {
        setLoading(true);
        const res = await axios.post(`api/messages/send/${selectedConversation._id}`, { message });
        setMessages((prev) => [...prev, res.data]);

        return true;
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || 'Failed to send message');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [selectedConversation?._id],
  );

  return { loading, sendMessage };
};

export default useSendMessage;
