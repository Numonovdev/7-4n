import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios to'g'ri import qilindi
import { http } from '../axios';

function Register() {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  function handleRegister(e) {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    if (data.password !== data.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    http.post("auth/local/register", data) // to'g'ri axios chaqirildi
      .then(response => {
        navigate('/login');
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
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <form onSubmit={handleRegister}>
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
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              ref={confirmPasswordRef}
              type="password"
              placeholder="Confirm password"
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mb-2">
            REGISTER
          </button>

          <p className="text-center">
            Already a member?{' '}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
