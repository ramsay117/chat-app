import { useEffect, useRef } from 'react';
import { useConversationContext } from '../context/ConversationContext.jsx';
import { useSocketContext } from '../context/SocketContext.jsx';
import notificationSound from '../assets/sounds/notification.mp3';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversationContext();
  const audioRef = useRef(new Audio(notificationSound));

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      newMessage.shouldShake = true;

      try {
        audioRef.current.volume = 0.5;
        audioRef.current.play();
      } catch (error) {
        console.log('Audio error:', error);
      }

      setMessages(prev => {
        if (prev.some(msg => msg._id === newMessage._id)) return prev;
        return [...prev, newMessage];
      });
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket]);
};

export default useListenMessages;
