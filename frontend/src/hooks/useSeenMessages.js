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
    if (
      !socket ||
      !selectedConversation ||
      messages.length === 0 ||
      messages[messages.length - 1].senderId == authUser._id
    )
      return;
    socket.emit('markMessagesAsSeen', {
      senderId: selectedConversation._id,
      receiverId: authUser._id,
    });
  }, [socket, messages, selectedConversation?._id]);

  useEffect(() => {
    socket?.on('messagesSeen', (receiverId) => {
      setMessages((prev) => {
        return prev.map((message) => {
          if (
            message.senderId === authUser._id &&
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
  }, [socket, messages, selectedConversation?._id]);
  // When we use a state updater function (a function passed to setState),
  // React ensures that the state update is based on the previous state,
  // which can prevent unnecessary re-renders if the new state is the same as the previous state
};

export default useSeenMessages;
