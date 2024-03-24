import { createContext, useContext, useState, useEffect } from 'react';

const ConversationContext = createContext();

export const useConversationContext = () => useContext(ConversationContext);

export const ConversationContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(() => {
    const savedConversation = localStorage.getItem('chat-conversation');
    return savedConversation ? JSON.parse(savedConversation) : null;
  });

  useEffect(() => {
    if (selectedConversation) {
      localStorage.setItem('chat-conversation', JSON.stringify(selectedConversation));
    }
  }, [selectedConversation]);

  return (
    <ConversationContext.Provider value={{ messages, setMessages, selectedConversation, setSelectedConversation }}>
      {children}
    </ConversationContext.Provider>
  );
};
