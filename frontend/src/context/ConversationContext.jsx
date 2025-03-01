import { createContext, useContext, useState, useEffect } from 'react';

const ConversationContext = createContext();

export const useConversationContext = () => useContext(ConversationContext);

export const ConversationContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(
    JSON.parse(localStorage.getItem('chat-conversation')) || null,
  );
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (selectedConversation?._id) {
      localStorage.setItem('chat-conversation', JSON.stringify(selectedConversation));
    } else {
      localStorage.removeItem('chat-conversation');
    }
  }, [selectedConversation?._id]);
  return (
    <ConversationContext.Provider
      value={{ messages, setMessages, selectedConversation, setSelectedConversation, conversations, setConversations }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
