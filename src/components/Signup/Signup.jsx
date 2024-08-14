import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Initialize navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        firstName: formData.firstName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      // Show success toast message
      toast.success("Signup successful");

      // Clear form data
      setFormData({
        firstName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      
      setSuccess("Signup successful");
      setError("");
      
      // Navigate to login page
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      setSuccess("");
      
      // Show error toast message
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <ToastContainer />
      <div className="container d-flex justify-content-center align-items-center full-height">
        <div className="">
          <h1 className="text-center outside-heading fs-1 fw-bold">
            Style Capsule
          </h1>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row gy-4 mt-1">
              <h2 className="card-title text-center fs-4 fw-bold">Sign Up</h2>
              <div className="col-12 col-md-4 mt-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="form-label text-black fw-bold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Enter Your Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4 mt-4">
                <div>
                  <label
                    htmlFor="email"
                    className="form-label text-black fw-bold"
                  >
                    Enter Email or Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Enter Email or Phone Number"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div>
                  <label
                    htmlFor="username"
                    className="form-label text-black fw-bold"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Enter Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
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
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 showhidepassword translate-middle-y"
                    onClick={togglePasswordVisibility}
                    style={{ background: "none", border: "none" }}
                  >
                    <i
                      className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"
                        }`}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-start align-items-center">
                <div className="mb-2 position-relative custom-password-input">
                  <label htmlFor="confirmPassword" className="form-label fw-bold">
                    Confirm Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control rounded-pill"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 showhidepassword translate-middle-y"
                    onClick={toggleConfirmPasswordVisibility}
                    style={{ background: "none", border: "none" }}
                  >
                    <i
                      className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                        }`}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="login-button fw-bold"
                >
                  Sign Up
                </button>
              </div>
              {error && (
                <div className="text-center mt-2 text-danger">{error}</div>
              )}
              <div className="text-center mt-2">
                <span>Already have an account? </span>
                <Link to="/login" className="text-black">
                  Log In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
