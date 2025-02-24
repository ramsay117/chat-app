import { useConversationContext } from '../../context/ConversationContext.jsx';
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversationContext();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <div
      className={`p-2 rounded-lg cursor-pointer transition-all
        ${isSelected
          ? 'bg-base-100/50 backdrop-blur-sm border border-white/20'
          : 'hover:bg-base-100/30 hover:backdrop-blur-sm'
        }
      `}
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className={`w-12 rounded-full ring-1 ring-white/10 ${isOnline ? 'online' : ''}`}>
            <img
              src={conversation.profilePic}
              alt={`${conversation.fullName}'s avatar`}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">
            {conversation.fullName}
          </p>
        </div>

        <span className="text-xl opacity-80">{emoji}</span>
      </div>

      {!lastIdx && <div className="divider my-0 h-px" />}
    </div>
  );
};

export default Conversation;
