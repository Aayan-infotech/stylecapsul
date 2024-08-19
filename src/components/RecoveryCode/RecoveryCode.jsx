import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RecoveryCode.scss";

const RecoveryCode = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [values, setValues] = useState(["", "", "", ""]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newValues = [...values];
    newValues[index] = value.slice(0, 1);
    setValues(newValues);

    if (value.length > 0) {
      const nextIndex = index + 1;
      if (nextIndex < values.length) {
        document.getElementById(`box-${nextIndex}`).focus();
      }
    }
  };

  return (
    <div className="recovery-container">
      <h1 className="outside-heading fs-1 fw-bold">Style Capsule</h1>
      <div className="recovery-card mt-3">
        <div className="recovery-box">
        <h2 className="card-title fs-4 text-center fw-bold">Recovery Code</h2>
          <form className="recovery-form mt-2">
            <div className="text">
              <h5 className="otp-message">
                OTP has been sent to your registered Email ID/Mobile number.
              </h5>
              <p className="enter_otp_text">Enter your OTP here</p>
            </div>
            <div className="box-container">
              {values.map((value, index) => (
                <input
                  key={index}
                  id={`box-${index}`}
                  className="box me-2"
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                />
              ))}
            </div>
            <div className="mt-4">
              <p>Please enter your OTP to verify your account</p>
            </div>
            <Link to="/reset-password">
              <button type="submit" className="submit-button fw-bold"> Submit
              </button>
            </Link>
            <div className="reset_otp">
              <a href="#" className="text-black mt-1">
                Resend OTP?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecoveryCode;