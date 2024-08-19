import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ResetPassword.scss";

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
      <h1 className="outside-heading fs-1 fw-bold">Style Capsule</h1>
      <div className="reset-card">
        <div className="login-box">
          <h2 className="card-title fs-4 text-center fw-bold">
            Reset Password
          </h2>
          <form className="mt-4">
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label fw-bold">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control rounded-pill"
                placeholder="Enter Your New Password"
              />
              <button
                type="button"
                className="btn btn-link position-absolute end-0 showhidepassword translate-middle-y"
                onClick={togglePasswordVisibility}
                style={{ background: "none", border: "none" }}
              >
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                ></i>
              </button>
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label fw-bold">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control rounded-pill"
                placeholder="Enter Your New Password"
              />
              <button
                type="button"
                className="btn btn-link position-absolute end-0 showhidepassword translate-middle-y"
                onClick={toggleConfirmPasswordVisibility}
                style={{ background: "none", border: "none" }}
              >
                <i
                  className={`fa-solid ${
                    showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                ></i>
              </button>
            </div>
            <div className="mt-4 text-center">
              <Link to="/login">
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
