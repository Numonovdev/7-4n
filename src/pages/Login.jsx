import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { http } from '../axios';


const Login = () => {

  const emailRef = useRef()
  const passwordRef = useRef()



  function handleLogin(e) {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    http.post("auth/local", data) // to'g'ri axios chaqirildi
      .then(response => {
        navigate('./');
        console.log(response.data);
      })
      .catch(error => {
        alert('nimadir xato kiritdingiz')
        console.log(error);
      });
  }





  return (
    <div className="flex items-center justify-center h-screen bg-neutral">
      <div className="card w-96 bg-base-100 shadow-xl p-5">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form >
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input 
              type="email" 
              placeholder="Enter email" 
              className="input input-bordered w-full"
              ref={emailRef}
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
              ref={passwordRef}
            />
          </div>

          <button onClick={handleLogin} className="btn btn-primary w-full mb-2">LOGIN</button>

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
