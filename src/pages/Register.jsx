import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

function handleRegister(e){
  e,preventDefault()
  console.log(usernameRef,emailRef,passwordRef)

}

  return (
    <div className="flex items-center justify-center h-screen bg-neutral">
      <div className="card w-96 bg-base-100 shadow-xl p-5">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <form >
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              ref={usernameRef} 
              type="text" 
              placeholder="Enter username" 
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input 
              ref={emailRef}
              type="email" 
              placeholder="Enter email" 
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input 
              ref={passwordRef}
              type="password" 
              placeholder="Enter password" 
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input 
              ref={passwordRef}
              type="password" 
              placeholder="pas password" 
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" onClick={handleRegister} className="btn btn-primary w-full mb-2">REGISTER</button>

          <p className="text-center">
            Already a member? <Link to="/login" className="link link-primary">Login</Link>       </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
