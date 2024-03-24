import { useEffect } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { useConversationContext } from '../../context/ConversationContext.jsx';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversationContext();
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        localStorage.removeItem('chat-conversation');
        setSelectedConversation(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setSelectedConversation]);
  return (
    <div className='md:min-w-[450px] flex flex-col'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className='bg-slate-950 px-4 py-2 mb-2'>
            <span className='text-slate-500'>To:</span>{" "}
            <span className='text-slate-400 font-semibold'>{selectedConversation.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-slate-300 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  );
};