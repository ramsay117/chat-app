import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { ConversationContextProvider } from '../../context/ConversationContext.jsx';

const Home = () => {
  return (
    <ConversationContextProvider>
      <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-0'>
        <Sidebar />
        <MessageContainer />
      </div>
    </ConversationContextProvider>
  );
};

export default Home;