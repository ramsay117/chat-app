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
    if (authUser) {
      const socket = io('https://chat-app-mxtx.onrender.com', {
        query: {
          userId: authUser._id
        }
      });
      socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users)
      })
      setSocket(socket)

      return () => socket.close();
    } else {
      if (socket) {
        socket.close()
        setSocket(null);
      }
    }
  }, [authUser])

  return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
}