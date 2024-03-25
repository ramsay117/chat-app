import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext.jsx';
import { useConversationContext } from '../context/ConversationContext.jsx';
import { useAuthContext } from '../context/AuthContext.jsx';

const useSeenMessages = () => {
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const { messages, setMessages, selectedConversation } =
    useConversationContext();

  useEffect(() => {
    socket?.emit('markMessagesAsSeen', {
      senderId: selectedConversation._id,
      receiverId: authUser._id,
    });

    socket?.on('messagesSeen', (receiverId) => {
      const senderId = authUser._id;
      console.log(receiverId);
      setMessages((prev) => {
        return prev.map((message) => {
          if (
            message.senderId === senderId &&
            message.receiverId === receiverId
          ) {
            return { ...message, seen: true };
          }
          return message;
        });
      });
    });

    return () => {
      socket?.off('messagesSeen');
    };
  }, [socket, messages.length, selectedConversation?._id]);
  // After the re-render, React checks the dependencies of useEffect
  // if the messages are marked as seen (which changes their content but not the array length), it doesn't cause the effect to run again
};

export default useSeenMessages;
