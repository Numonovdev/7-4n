import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // Bu yerda serverga yuborish yoki validatsiya qilishni amalga oshirishingiz mumkin
  };

  return (
    <div className="flex items-center justify-center h-screen bg-neutral">
      <div className="card w-96 bg-base-100 shadow-xl p-5">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input 
              type="email" 
              placeholder="Enter email" 
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input 
              type="password" 
              placeholder="Enter password" 
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mb-2">LOGIN</button>

          <button className="btn btn-secondary w-full mb-4">GUEST USER</button>

          <p className="text-center">
            Not a member yet? <Link to="/register" className="link link-primary">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
