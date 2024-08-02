import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ResetPassword.scss';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="reset-container">
      <div className="login-box">
        <h1 className="brand-name">Style Capsule</h1>
        <h2 className="login-title">Reset Password</h2>

        <form className="login-form">
          <div className="input-group">
            <label htmlFor="password">New Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter Your New Password"
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
                placeholder="Confirm Your New Password"
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

          <Link to="/login">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </Link>
        </form>

      </div>
    </div>
  );
};

export default ResetPassword;
