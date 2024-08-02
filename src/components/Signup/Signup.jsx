import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import './Signup.scss';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup-container">
      <div className="login-box">
        <h1 className="brand-name">Style Capsule</h1>
        <h2 className="login-title">Sign Up</h2>

        <form className="login-form">

          <div className='row1'>

        <div className="input-group">
            <label htmlFor="email">Name</label>
            <input type="text" id="email" placeholder="Enter Your Name" />
          </div>

          <div className="input-group">
            <label htmlFor="email">Phone Number or Email</label>
            <input type="text" id="email" placeholder="Enter Email or Phone Number" />
          </div>

          <div className="input-group">
            <label htmlFor="email">Username</label>
            <input type="text" id="email" placeholder="Enter Username" />
          </div>

          </div>

          <div className='row2'>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter Your Password"
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="password-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                placeholder="Confirm Your Password"
              />
              <span
                className="password-toggle-icon"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </span>
            </div>
          </div>

          </div>

          <Link to='/login'><button type="submit" className="login-button">Sign Up</button></Link>

         
        </form>

        <div className="signup-link">
          <span>Already have an account? </span>
          <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );

};

export default Signup;
