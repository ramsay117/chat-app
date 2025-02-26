import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSocketContext } from '../context/SocketContext.jsx';
import { useConversationContext } from '../context/ConversationContext.jsx';
import { useAuthContext } from '../context/AuthContext.jsx';

const useSeenMessages = () => {
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const { messages, setMessages, selectedConversation } = useConversationContext();

  // Effect to mark messages as seen when viewing a conversation
  useEffect(() => {
    if (!socket || !selectedConversation?._id || !authUser?._id || messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.senderId === authUser._id) return;

    socket.emit('markMessagesAsSeen', {
      senderId: selectedConversation._id,
      receiverId: authUser._id,
    });

    socket.on('error', (error) => {
      toast.error(error?.message || 'Error marking messages as seen');
    });

    return () => {
      socket.off('error');
    };
  }, [socket, selectedConversation?._id, authUser?._id, messages.length]);

  // Effect to listen for messages seen by other users
  useEffect(() => {
    if (!socket || !authUser?._id) return;

    const handleMessagesSeen = (receiverId) => {
      setMessages((prev) => {
        const indicesToUpdate = [];

        for (let i = prev.length - 1; i >= 0; i--) {
          const message = prev[i];

          if (message.senderId === authUser._id && message.receiverId === receiverId) {
            if (!message.seen) {
              indicesToUpdate.push(i);
            } else {
              break;
            }
          }
        }

        if (indicesToUpdate.length === 0) return prev;

        const newMessages = [...prev];
        for (const index of indicesToUpdate) {
          newMessages[index] = { ...newMessages[index], seen: true };
        }

        return newMessages;
      });
    };

    socket.on('messagesSeen', handleMessagesSeen);

    return () => {
      socket.off('messagesSeen', handleMessagesSeen);
    };
  }, [socket, authUser?._id]);
};

export default useSeenMessages;
