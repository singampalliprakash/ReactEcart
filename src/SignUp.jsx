import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './store';
import './SignUp.css'; // 👈 Import the CSS file

function SignUp() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myFunc = (data) => {
    dispatch(registerUser(data));
    alert('Registration Successful');
    navigate('/signin');
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Account</h2>
      <form className="signup-form" onSubmit={handleSubmit(myFunc)}>
        <input type="text" placeholder="Username" {...register("username")} className="signup-input" />
        <input type="email" placeholder="Email" {...register("email")} className="signup-input" />
        <input type="password" placeholder="Password" {...register("password")} className="signup-input" />
        <input type="number" placeholder="Phone Number" {...register("phone")} className="signup-input" />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;