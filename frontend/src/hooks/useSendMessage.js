import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useConversationContext } from '../context/ConversationContext.jsx';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } =
    useConversationContext();
  const sendMessage = async (message) => {
    if (!selectedConversation) return;
    try {
      setLoading(true);
      const res = await axios.post(
        `api/messages/send/${selectedConversation._id}`,
        {
          message,
        }
      );
      setMessages([...messages, res.data]);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
