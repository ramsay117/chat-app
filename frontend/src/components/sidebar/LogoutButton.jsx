import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <button
      onClick={logout}
      disabled={loading}
      className="btn btn-ghost btn-block justify-start gap-2"
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <>
          <BiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </>
      )}
    </button>
  );
};

export default LogoutButton;
