import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logInUser } from './store';
import './SignIn.css'; // 👈 Import CSS file

function SignIn() {
  let { register, handleSubmit } = useForm();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let myFunc = (data) => {
    dispatch(logInUser(data));
    navigate("/");
  }

  return (
    <div className="signin-container">
      <h2 className="signin-title">User Sign In</h2>
      <form className="signin-form" onSubmit={handleSubmit(myFunc)}>
        <input
          className="signin-input"
          type="text"
          placeholder="Username"
          {...register("username")}
        />
        <input
          className="signin-input"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <button className="signin-button" type="submit">Sign In</button>
      </form>
      <p className="signin-footer">
        New user?{" "}
        <Link className="signup-link" to="/SignUp">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default SignIn;