import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import useSeenMessages from '../../hooks/useSeenMessages.js';
import { useConversationContext } from '../../context/ConversationContext.jsx';

const Messages = () => {
  const { selectedConversation } = useConversationContext();
  const { loading, messages } = useGetMessages();
  useListenMessages();
  useSeenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const userMessages = messages.filter(message =>
    message.senderId === selectedConversation._id || message.receiverId === selectedConversation._id);
  // other listeners might be adding messages

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading &&
        userMessages.length > 0 &&
        userMessages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && userMessages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;