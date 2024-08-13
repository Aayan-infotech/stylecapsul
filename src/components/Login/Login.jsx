import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="custom-container mt-5">
        <div>
          <h1 className="outside-heading fs-1 fw-bold">Style Capsule</h1>
          <div className="card custom-card mt-0 border-0">
            <div className="card-body p-0 text-black">
              <h2 className="card-title fs-4 text-center fw-bold">Login</h2>
              <form className="mt-4">
                <div className="mb-2">
                  <label htmlFor="emailronumber" className="form-label fw-bold">
                    Phone Number or Email
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Phone Number or Email"
                  />
                </div>
                <div className="mb-2 position-relative">
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
                <div className="d-flex justify-content-between align-items-center">
                  <div className="">
                    <Link
                      to="/forgot-password"
                      className="text-decoration-none text-black"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="form-check">
                    <input
                      className="text-black me-1"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      Remember Me
                    </label>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <Link to="/home">
                    <button
                      type="submit"
                      className="btn custom-button text-white fw-bold rounded-pill w-75 p-2"
                    >
                      Login
                    </button>
                  </Link>
                  <div className="signup-link">
                    <span>Doesn't have the account? </span>
                    <Link to="/signup" className="text-black fw-bold">
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
