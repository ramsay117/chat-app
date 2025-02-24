import { useConversationContext } from '../../context/ConversationContext.jsx';
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversationContext();
  const { onlineUsers } = useSocketContext();
  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <button
      onClick={() => setSelectedConversation(conversation)}
      className={`w-full p-2 flex items-center gap-3 rounded-lg transition-colors ${
        isSelected
          ? 'bg-primary/10 border border-white/20'
          : 'hover:bg-secondary/10'
      }`}
    >
      <div className={`avatar ${isOnline ? 'online' : ''}`}>
        <div className="w-12 rounded-full ring-1 ring-primary">
          <img
            src={conversation.profilePic}
            alt={`${conversation.fullName}'s avatar`}
          />
        </div>
      </div>

      <span className="flex-1 text-left font-medium truncate">
        {conversation.fullName}
      </span>

      <span className="text-xl opacity-80">{emoji}</span>
    </button>
  );
};

export default Conversation;
