import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useConversationContext } from '../context/ConversationContext.jsx';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } =
    useConversationContext();
  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `api/messages/${selectedConversation._id}/`
        );
        setMessages(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation) getMessages();
  }, [selectedConversation._id]);

  return { loading, messages };
};

export default useGetMessages;
