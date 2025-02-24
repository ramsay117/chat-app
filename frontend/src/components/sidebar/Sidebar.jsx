import SearchInput from './SearchInput.jsx';
import Conversations from './Conversations.jsx';
import LogoutButton from './LogoutButton.jsx';

const Sidebar = () => {
  return (
    <aside className="w-[280px] flex flex-col p-4 border-r border-white/20">
        <SearchInput />
      <div className="divider my-2" />
      <div className="flex-1 overflow-auto">
        <Conversations />
      </div>
      <div className="pt-4 border-t border-white/10">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
