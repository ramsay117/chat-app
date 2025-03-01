import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin.js';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="card w-96 bg-base-200/70 backdrop-blur-md">
        <div className="card-title text-3xl font-bold justify-center py-6">
          Login to
          <span className="text-primary ml-2">FlowChat</span>
        </div>

        <div className="card-body pt-0">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label" htmlFor="username">
                <span className="label-text">Username</span>
              </label>
              <input
                id="username"
                className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary bg-opacity-50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary bg-opacity-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="card-actions flex-col gap-4 pt-2">
              <Link to="/signup" className="link link-primary text-sm">
                Don't have an account?
              </Link>

              <button className="btn btn-primary w-full" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
