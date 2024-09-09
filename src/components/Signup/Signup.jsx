import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { apiUrl } from '../../../apiUtils';

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

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signUp = await axios.post(apiUrl('api/auth/signup'), {
        firstName: formData.firstName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      if (signUp) {
        setFormData({
          firstName: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        toast.success(signUp?.data?.message, {
          autoClose: 1000,
          hideProgressBar: true,
          style: {
            backgroundColor: 'black',
            color: '#C8B199',
            borderRadius: '50px',  
            padding: '10px 20px', 
          }
        });
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message, {
        autoClose: 1000,
        style: { backgroundColor: '#dc3545', color: '#fff' }
      });
    }
  };


  return (
    <>
      <ToastContainer />
      <div className="container signup-main-container d-flex justify-content-center align-items-center">
        <div className="">
            <h1 className="text-center outside-heading fs-1 fw-bold">
              Style Capsule
            </h1>
          <form onSubmit={handleSubmit}>
            <div className="row gy-4 mt-1">
              <h2 className="card-title text-center fs-4 fw-bold">Sign Up</h2>
              <div className="col-12 col-md-4 mt-4">
                <div>
                  <label htmlFor="firstName" className="form-label text-black fw-bold">
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
                  <label htmlFor="email" className="form-label text-black fw-bold">
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
                  <label htmlFor="username" className="form-label text-black fw-bold">
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
                    <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
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
                    <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
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
