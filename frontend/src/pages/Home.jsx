import MessageContainer from '../components/messages/MessageContainer.jsx';
import Sidebar from '../components/sidebar/Sidebar.jsx';
import { ConversationContextProvider } from '../context/ConversationContext.jsx';

const Home = () => {
  return (
    <ConversationContextProvider>
      <main className="min-h-screen grid place-items-center">
        <div className="flex w-full max-w-6xl h-[650px] rounded-lg bg-base-100/50 backdrop-blur-md border border-white/10">
          <Sidebar />
          <MessageContainer />
        </div>
      </main>
    </ConversationContextProvider>
  );
};

export default Home;
