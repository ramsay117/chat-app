import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="join p-4 border-t border-white/10">
      <input
        placeholder="Send a message"
        className="input input-bordered join-item w-full focus:outline-none focus:border-primary"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="btn btn-primary join-item">
        {loading ? <span className="loading loading-spinner" /> : <BsSend className="w-5 h-5" />}
      </button>
    </form>
  );
};

export default MessageInput;
