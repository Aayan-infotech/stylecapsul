import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import './Login.scss';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="brand-name">Style Capsule</h1>
        <h2 className="login-title">Log In</h2>

        <form className="login-form">

          <div className="input-group">
            <label htmlFor="email">Email or Phone Number</label>
            <input type="text" id="email" placeholder="Email or Phone Number" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                placeholder="Password" 
              />
              <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </span>
            </div>
          </div>

          <Link to='/home'><button type="submit" className="login-button">Log In</button></Link>

          
          <div className="options">
            <Link to="/forgot-password" className='forgot'>Forgot Password?</Link>
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
          </div>


        </form>

        <div className="signup-link">
          <span>Doesn't have the account? </span>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );

};

export default Login;
