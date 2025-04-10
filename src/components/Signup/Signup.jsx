import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const Signup = () => {
  const [btnLoader, setBtnLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "firstName") {
      const nameRegex = /^[A-Za-z\s]*$/;
      setIsNameValid(nameRegex.test(value));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.firstName.trim()) { showErrorToast("Name is required"); return false; }
    if (!formData.email.trim()) {
      showErrorToast("Email is required");
      return false;
    } else if (!emailRegex.test(formData.email)) {
      showErrorToast("Invalid email format");
      return false;
    }
    if (!formData.username.trim()) {
      showErrorToast("Username is required");
      return false;
    }
    if (!formData.password) {
      showErrorToast("Password is required");
      return false;
    } else if (formData.password.length < 6) {
      showErrorToast("Password must be at least 6 characters");
      return false;
    }
    if (!formData.confirmPassword) {
      showErrorToast("Confirm password is required");
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      showErrorToast("Passwords do not match");
      return false;
    }
    return true;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formData.firstName && formData.email) {
    //   showSuccessToast('error')
    // }
    if (!validateForm()) return;
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
      <div className="container signup-main-container d-flex justify-content-center align-items-center">
        <div className="my-5 my-lg-0">
          <Link to="/" className="text-black text-decoration-none">
            <h1 className="text-center outside-heading fs-1 fw-bold">
              Style Capsule
            </h1>
          </Link>
          <form onSubmit={handleSubmit}>
            <div className="row gy-4 mt-1">
              <h2 className="card-title text-center fs-4 fw-bold">Sign Up</h2>
              <div className="col-12 col-md-4 mt-4">
                <div>
                  <label htmlFor="firstName" className="form-label text-black fw-bold">  Name</label>
                  <input type="text" className="form-control rounded-pill" placeholder="Enter Your Name" pattern="[A-Za-z\s]*" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                </div>
              </div>
              <div className="col-12 col-md-4 mt-4">
                <div>
                  <label htmlFor="email" className="form-label text-black fw-bold">  Enter Email</label>
                  <input type="text" className="form-control rounded-pill" placeholder="Enter Email or Phone Number" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div>
                  <label htmlFor="username" className="form-label text-black fw-bold">  Username</label>
                  <input type="text" className="form-control rounded-pill" placeholder="Enter Username" name="username" value={formData.username} onChange={handleInputChange} />
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
                <div className="mb-2 position-relative custom-password-input">
                  <label htmlFor="password" className="form-label fw-bold">  Password</label>
                  <input type={showPassword ? "text" : "password"} className="form-control rounded-pill" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} />
                  <button type="button" className="btn btn-link position-absolute end-0 showhidepassword translate-middle-y" onClick={togglePasswordVisibility} style={{ background: "none", border: "none" }}>
                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-start align-items-center">
                <div className="mb-2 position-relative custom-password-input">
                  <label htmlFor="confirmPassword" className="form-label fw-bold">  Confirm Password</label>
                  <input type={showConfirmPassword ? "text" : "password"} className="form-control rounded-pill" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
                  <button type="button" className="btn btn-link position-absolute end-0 showhidepassword translate-middle-y" onClick={toggleConfirmPasswordVisibility} style={{ background: "none", border: "none" }}>
                    <i className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>
              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="login-button fw-bold"
                  disabled={!isNameValid || btnLoader}
                  style={{
                    display: isNameValid ? 'inline-block' : 'none',
                    opacity: isNameValid ? 1 : 0,
                    transform: isNameValid ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.3s ease',
                    pointerEvents: isNameValid ? 'auto' : 'none'
                  }}
                >
                  {btnLoader ? (
                    <span>
                      <i className="fa-solid fa-spinner fa-spin me-2"></i> Waiting...
                    </span>
                  ) : (
                    "Sign Up"
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
