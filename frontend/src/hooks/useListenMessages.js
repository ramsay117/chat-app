import { useEffect } from 'react';
import { useConversationContext } from '../context/ConversationContext.jsx';
import { useSocketContext } from '../context/SocketContext.jsx';
import notificationSound from '../assets/sounds/notification.mp3';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversationContext();

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => socket?.off('newMessage');
  }, [socket]);
};

export default useListenMessages;
