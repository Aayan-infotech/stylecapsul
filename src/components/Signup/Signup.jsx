import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const Signup = () => {
  const [btnLoader, setBtnLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // const validateForm = () => {
  //   const newErrors = {};
  //   if (!formData.firstName.trim()) newErrors.firstName = "Name is required.";
  //   if (!formData.email.trim()) {
  //     newErrors.email = "Email or phone number is required.";
  //   } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
  //     newErrors.email = "Please enter a valid email address.";
  //   }
  //   if (!formData.username.trim()) newErrors.username = "Username is required.";
  //   if (!formData.password.trim()) newErrors.password = "Password is required.";
  //   if (formData.password.length < 6) {
  //     newErrors.password = "Password must be at least 6 characters.";
  //   }
  //   if (formData.password !== formData.confirmPassword) {
  //     newErrors.confirmPassword = "Passwords do not match.";
  //   }
  //   return newErrors;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const newErrors = validateForm();
    // if(Object.keys(newErrors).length > 0){
    //   setErrors(newErrors);
    //   return;
    // };
    if(!formData.firstName && formData.email){
      showSuccessToast('error')
    }
    
    setBtnLoader(true);
    try {
      const signUp = await axios.post(apiUrl("api/auth/signup"), {
        firstName: formData.firstName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      if (signUp) {
        setFormData({
          firstName: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        showSuccessToast(signUp?.data?.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      showErrorToast(err.response?.data?.message);
    } finally {
      setBtnLoader(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container signup-main-container d-flex justify-content-center align-items-center">
        <div className="my-5 my-lg-0">
          <h1 className="text-center outside-heading fs-1 fw-bold">
            Style Capsule
          </h1>
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
                      className={`fa-solid ${
                        showPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-start align-items-center">
                <div className="mb-2 position-relative custom-password-input">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label fw-bold"
                  >
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
                      className={`fa-solid ${
                        showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="text-center mt-4">
                <button type="submit" className="login-button fw-bold">
                  {btnLoader ? (
                    <span>
                      <i className="fa-solid fa-spinner fa-spin me-2"></i>{" "}
                      Waiting...
                    </span>
                  ) : (
                    " Sign Up"
                  )}
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
