import React, { useState } from "react";
import "./ForgotPassword.scss";
import { Link } from "react-router-dom";

const ForgotPassword = () => {

  return (
    <>
      <div className="forgot-custom-container mt-5">
        <div>
          <h1 className="outside-heading fs-1 fw-bold">Style Capsule</h1>
          <div className="card custom-card mt-0 border-0">
            <div className="card-body p-4 text-black">
              <h2 className="card-title fs-4 text-center fw-bold">Forgot Password</h2>
              <form className="mt-5">
                <div className="mb-3">
                  <label htmlFor="emailronumber" className="form-label fw-bold">
                    Phone Number or Email
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Phone Number or Email"
                  />
                </div>
                <div className="text-center mt-4">
                  <Link to="/recovery-code">
                    <button
                      type="submit"
                      className="btn custom-button text-white fw-bold rounded-pill w-50 p-2"
                    >
                      Submit
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
