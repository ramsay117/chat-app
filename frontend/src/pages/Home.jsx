import MessageContainer from "../components/messages/MessageContainer.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import { ConversationContextProvider } from '../context/ConversationContext.jsx';

const Home = () => {
  return (
    <ConversationContextProvider>
      <div className="min-h-screen grid place-items-center">
        <div className="flex h-[550px] mx-auto max-w-4xl rounded-lg bg-base-100/30 backdrop-blur-md border border-white/10">
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </ConversationContextProvider>
  );
};

export default Home;
