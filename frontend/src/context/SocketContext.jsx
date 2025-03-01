import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuthContext } from './AuthContext.jsx';

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser?._id) {
      const newSocket = io('http://localhost:8000', {
        query: {
          userId: authUser._id,
        },
      });

      newSocket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
        setSocket(null);
      };
    }
  }, [authUser?._id]);

  return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
