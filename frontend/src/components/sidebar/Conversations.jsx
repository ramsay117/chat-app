import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="space-y-2">
      {loading ? (
        <span className="loading loading-spinner" />
      ) : (
        conversations.map((conversation) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
          />
        ))
      )}
    </div>
  );
};

export default Conversations;
