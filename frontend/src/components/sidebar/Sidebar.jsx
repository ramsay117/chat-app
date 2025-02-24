import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";

const Sidebar = () => {
  return (
    <aside className="min-w-[280px] max-w-[320px] flex flex-col p-4 backdrop-blur-md border-r-2 border-white/30">
      <SearchInput />
      <div className="divider my-2"></div>
      <div className="flex-1 overflow-auto">
        <Conversations />
      </div>
      <div className="pt-4 border-t-2 border-white/30">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
