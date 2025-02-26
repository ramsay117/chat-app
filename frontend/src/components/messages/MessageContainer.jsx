import { useEffect } from 'react';
import { TiMessages } from 'react-icons/ti';
import Messages from './Messages.jsx';
import MessageInput from './MessageInput.jsx';
import { useAuthContext } from '../../context/AuthContext.jsx';
import { useConversationContext } from '../../context/ConversationContext.jsx';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversationContext();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedConversation(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col min-w-[400px]">
      {!selectedConversation?._id ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="p-4 border-b border-white/10">
            <span className="text-base-content/70">To:</span>{' '}
            <span className="font-medium">{selectedConversation.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-lg">
          Welcome <span className="text-primary font-medium">{authUser.fullName}</span> 👋
        </p>
        <p className="text-base-content/70">Select a chat to start messaging</p>
        <TiMessages className="w-16 h-16 mx-auto text-base-content/50" />
      </div>
    </div>
  );
};

export default MessageContainer;
