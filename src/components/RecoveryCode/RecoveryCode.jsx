import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import './RecoveryCode.scss';

const RecoveryCode = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [values, setValues] = useState(['', '', '', '']);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newValues = [...values];
    newValues[index] = value.slice(0, 1); // Ensure only one digit is allowed
    setValues(newValues);

    if (value.length > 0) {
      const nextIndex = index + 1;
      if (nextIndex < values.length) {
        document.getElementById(`box-${nextIndex}`).focus();
      }
    }
  };

  return (
    <div className="recovery-code">
      <div className="recovery-box">
        <h1 className="brand-name">Style Capsule</h1>
        <h2 className="login-title">Recovery Code</h2>

        <form className="recovery-form">

          <div className='text'>
            <p className='one'>OTP has been sent to your registered Email ID/Mobile number.</p>
            <p className='two'>Enter your OTP here</p>
          </div>

          {/* <div className="input-group">
            <label htmlFor="email">Phone Number or Email</label>
            <input type="text" id="email" placeholder="Phone Number or Email" />
          </div> */}

          {/* <div className="box-container">
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
          </div> */}

          <div className="box-container">
            {values.map((value, index) => (
              <input
                key={index}
                id={`box-${index}`}
                className="box"
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
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

          <div className='text'>
            <p>Please enter your OTP to verify your account</p>
          </div>

<Link to="/reset-password">
          <button type="submit" className="submit-button">Submit</button>
          </Link>

        </form>

        <div className="signup-link">
          {/* <span>Doesn't have the account? </span> */}
          <a href="">Resend OTP?</a>
        </div>
      </div>
    </div>
  );

};

export default RecoveryCode;
