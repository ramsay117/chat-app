import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chat-user')) || null);

  useEffect(() => {
    if (authUser?._id) {
      localStorage.setItem('chat-user', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('chat-user');
    }
  }, [authUser?._id]);

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};
