import React, { useState } from 'react';
import './ForgotPassword.scss';
import {Link} from 'react-router-dom'

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="forgot-password">
      <div className="forgot-box">
        <h1 className="brand-name">Style Capsule</h1>
        <h2 className="forgot-title">Forgot Password</h2>

        <form className="forgot-form">

          <div className="input-group">
            <label htmlFor="email">Phone Number or Email</label>
            <input type="text" id="email" placeholder="Phone Number or Email" />
          </div>

          {/* <div className="input-group">
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
          </div> */}

          {/* <div className="options">
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
          </div> */}

<Link to='/recovery-code'>
          <button type="submit" className="submit-button">Submit</button>
          </Link>

        </form>

      </div>
    </div>
  );

};

export default ForgotPassword;
