import { useEffect, useRef } from 'react';
import MessageSkeleton from '../skeletons/MessageSkeleton.jsx';
import Message from './Message.jsx';
import useGetMessages from '../../hooks/useGetMessages.js';
import useListenMessages from '../../hooks/useListenMessages.js';
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
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  const userMessages = messages.filter(
    (message) => message.senderId === selectedConversation._id || message.receiverId === selectedConversation._id,
  );

  return (
    <div className="flex-1 overflow-auto p-4 space-y-4">
      {loading && <MessageSkeleton />}

      {!loading && userMessages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-base-content/70">Send a message to start the conversation</p>
        </div>
      )}

      {!loading &&
        userMessages.length > 0 &&
        userMessages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};

export default Messages;
