import { useAuthContext } from '../../context/AuthContext.jsx';
import { useConversationContext } from '../../context/ConversationContext.jsx';
import { extractTime } from '../../utils/extractTime.js';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversationContext();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleClassName = fromMe ? 'bg-success/70' : 'bg-accent/30';
  const shakeClass = message.shouldShake ? 'shake' : '';

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full ring-1">
          <img alt={`${fromMe ? 'Your' : selectedConversation.fullName + "'s"} avatar`} src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleClassName} ${shakeClass}`}>{message.message}</div>
      <div className="chat-footer text-xs text-base-content/50">
        <span>{formattedTime}</span>
        {message.seen && fromMe && <span className="text-info ml-1">seen</span>}
      </div>
    </div>
  );
};

export default Message;
