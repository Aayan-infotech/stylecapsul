import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.scss";

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
    <div className="container d-flex justify-content-center align-items-center full-height">
      <div className="">
        <h1 className="text-center outside-heading fs-1 fw-bold">
          Style Capsule
        </h1>
        <div className="row gy-4 mt-1">
          <h2 className="card-title text-center fs-4 fw-bold">Sign Up</h2>
          <div className="col-12 col-md-4 mt-4">
            <div>
              <label
                for="exampleInputEmail1"
                className="form-label text-black fw-bold"
              >
                Name
              </label>
              <input
                type="email"
                className="form-control rounded-pill"
                placeholder="Enter Your Name"
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div>
              <label
                for="exampleInputEmail1"
                className="form-label text-black fw-bold"
              >
                Enter Email or Phone Number
              </label>
              <input
                type="email"
                className="form-control rounded-pill"
                placeholder="Enter Email or Phone Number"
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div>
              <label
                for="exampleInputEmail1"
                className="form-label text-black fw-bold"
              >
                Username
              </label>
              <input
                type="email"
                className="form-control rounded-pill"
                placeholder="Enter Username"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
            <div className="mb-2 position-relative custom-password-input">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control rounded-pill"
                placeholder="Password"
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
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-start align-items-center">
            <div className="mb-2 position-relative custom-password-input">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control rounded-pill"
                placeholder="Password"
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
          </div>
          <div className="text-center mt-4">
            <Link to="/login">
              <button type="submit" className="login-button fw-bold">
                Sign Up
              </button>
            </Link>
          </div>
          <div className="text-center mt-2">
            <span>Already have an account? </span>
            <Link to="/login" className="text-black">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
