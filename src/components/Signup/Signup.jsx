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
  const [usernameValid, setUsernameValid] = useState(true);
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
    const updatedValue = name === "email" ? value.toLowerCase() : value;
    setFormData({ ...formData, [name]: updatedValue });
    if (name === "firstName") {
      const nameRegex = /^[A-Za-z\s]*$/;
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
      setIsNameValid(nameRegex.test(value));
      setFormData({ ...formData, [name]: capitalized });
      return;
    }
    if (name === "username") {
      if (value.length > 25) {
        setUsernameValid(false);
      } else {
        setUsernameValid(true);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/i;
    if (!formData.firstName.trim()) { showErrorToast("Name is required"); return false; }
    if (!formData.email.trim()) {
      showErrorToast("Email is required");
      return false;
    } else if (!emailRegex.test(formData.email)) {
      showErrorToast("Invalid email format");
      return false;
    }
    if (!formData.username.trim() || !usernameValid) {
      showErrorToast("Username is required and cannot exceed 25 characters");
      return false;
    }
    if (!formData.password) {
      showErrorToast("Password is required");
      return false;
    } else if (formData.password.length < 8) {
      showErrorToast("Password must be at least 8 characters");
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
                  <label htmlFor="firstName" className="form-label text-black fw-bold">Name</label>
                  <input type="text" className="form-control rounded-pill" placeholder="Enter Your Name" pattern="[A-Za-z\s]*" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                </div>
              </div>
              <div className="col-12 col-md-4 mt-4">
                <div>
                  <label htmlFor="email" className="form-label text-black fw-bold">  Enter Email</label>
                  <input type="text" className="form-control rounded-pill" placeholder="Enter Email Address" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div>
                  <label htmlFor="username" className="form-label text-black fw-bold">  Username</label>
                  <input type="text" className="form-control rounded-pill" placeholder="Enter Username" name="username" value={formData.username} onChange={handleInputChange} />
                  {!usernameValid && (<small className="text-danger">Username cannot be more than 25 characters</small>)}
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
                <div className="mb-2 position-relative custom-password-input">
                  <label htmlFor="password" className="form-label fw-bold">  Password</label>
                  <input type={showPassword ? "text" : "password"} className="form-control rounded-pill" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} />
                  <button type="button" className="btn btn-link position-absolute end-0 showhidepassword translate-middle-y" onClick={togglePasswordVisibility} style={{ background: "none", border: "none" }}>
                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                  <small
                    className={`d-block mt-1 ${formData.password && formData.password.length < 8 ? "text-danger" : "text-muted"}`}
                    style={{ fontSize: "0.85rem" }}
                  >
                    Password must be at least 8 characters.
                  </small>

                </div>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-start align-items-center">
                <div className="mb-2 position-relative custom-password-input">
                  <label htmlFor="confirmPassword" className="form-label fw-bold">  Confirm Password</label>
                  <input type={showConfirmPassword ? "text" : "password"} className="form-control rounded-pill" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
                  <button type="button" className="btn btn-link position-absolute end-0 showhidepassword translate-middle-y" onClick={toggleConfirmPasswordVisibility} style={{ background: "none", border: "none" }}>
                    <i className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                  <small
                    className={`d-block mt-1 ${formData.password && formData.password.length < 8 ? "text-danger" : "text-muted"}`}
                    style={{ fontSize: "0.85rem" }}
                  >
                    Password must be at least 8 characters.
                  </small>

                </div>
              </div>
              <div className="text-center mt-4">
                <button type="submit" className="login-button fw-bold" disabled={!isNameValid || btnLoader} style={{ display: isNameValid ? 'inline-block' : 'none', opacity: isNameValid ? 1 : 0, transform: isNameValid ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.3s ease', pointerEvents: isNameValid ? 'auto' : 'none' }}>
                  {btnLoader ? (
                    <span>
                      <i className="fa-solid fa-spinner fa-spin me-2"></i> Waiting...
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </button>
                {!isNameValid && (
                  <small className="text-danger fw-bold">Please enter a valid name (letters only, no numbers or special characters).</small>
                )}
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
