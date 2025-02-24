import { Link } from 'react-router-dom';
import GenderCheckbox from '../components/ui/GenderCheckbox.jsx';
import { useState } from 'react';
import useSignup from '../hooks/useSignup.js';

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="card w-96 bg-base-200/70 backdrop-blur-md">
        <div className="card-title text-3xl font-bold justify-center py-6">
          Sign Up to
          <span className="text-primary ml-2">FlowChat</span>
        </div>

        <div className="card-body pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="fullName">
                <span className="label-text">Full Name</span>
              </label>
              <input
                id="fullName"
                className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary bg-opacity-50"
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="username">
                <span className="label-text">Username</span>
              </label>
              <input
                id="username"
                className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary bg-opacity-50"
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
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
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="confirmPassword">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary bg-opacity-50"
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              />
            </div>

            <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

            <div className="card-actions flex-col gap-4 pt-2">
              <Link to="/login" className="link link-primary text-sm">
                Already have an account?
              </Link>

              <button className="btn btn-primary w-full" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
