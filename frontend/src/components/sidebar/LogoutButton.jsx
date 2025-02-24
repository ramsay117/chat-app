import { GiExitDoor } from 'react-icons/gi';
import useLogout from '../../hooks/useLogout.js';

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <button onClick={logout} disabled={loading} className="btn btn-ghost btn-circle" aria-label="Logout">
      {loading ? <span className="loading loading-spinner" /> : <GiExitDoor className="w-7 h-7" />}
    </button>
  );
};

export default LogoutButton;
