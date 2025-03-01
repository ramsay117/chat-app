import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { useConversationContext } from '../../context/ConversationContext.jsx';
import useGetConversations from '../../hooks/useGetConversations.js';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { setSelectedConversation } = useConversationContext();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length < 3) {
      return toast.error('Search term must be at least 3 characters long');
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else toast.error('No such user found!');
  };

  return (
    <form onSubmit={handleSubmit} className="join">
      <input
        placeholder="Search users..."
        className="input input-bordered join-item w-full focus:outline-none focus:border-primary"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-primary join-item">
        <IoSearchSharp className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchInput;
