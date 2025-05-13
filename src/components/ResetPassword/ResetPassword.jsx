import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.scss";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { token } = location.state || {};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const validatePasswords = () => {
    if (!newPassword || !confirmPassword) {
      setErrorMessage("Both fields are required.");
      return false;
    }
    if (!strongPasswordRegex.test(newPassword)) {
      setErrorMessage(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return false;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setBtnLoader(true);
    // setErrorMessage("");
    // if (!newPassword || !confirmPassword) {
    //   setErrorMessage("Both fields are required.");
    //   setBtnLoader(false);
    //   return;
    // }
    // if (newPassword !== confirmPassword) {
    //   setErrorMessage("Passwords do not match.");
    //   setBtnLoader(false);
    //   return;
    // }
    e.preventDefault();
    if (!validatePasswords()) return;
    setBtnLoader(true);

    try {
      const response = await axios.post(
        apiUrl("api/auth/resetPassword"),
        { newPassword, token: token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      showSuccessToast(response?.data?.message);
      setNewPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      if (
        error.response?.status === 401 &&
        error.response?.data?.message ===
        "Token has expired. Please request a new password reset."
      ) {
        showErrorToast("Token has expired. Please request a new password reset link.");
      } else {
        showErrorToast(error.response?.data?.message);
      }
    } finally {
      setBtnLoader(false);
    }
  };

  // const isFormValid = newPassword && confirmPassword && newPassword === confirmPassword;
  const isPasswordValid = strongPasswordRegex.test(newPassword);
  const isFormValid =
    newPassword &&
    confirmPassword &&
    isPasswordValid &&
    newPassword === confirmPassword;

  return (
    <>
      <div className="reset-container">
        <Link to="/" className="text-decoration-none text-black">
          <h1 className="outside-heading fs-1 fw-bold">Style Capsule</h1>
        </Link>
        <div className="reset-card">
          <div className="login-box">
            <h2 className="card-title fs-4 text-center fw-bold">
              Reset Password
            </h2>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label fw-bold">
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control rounded-pill"
                  placeholder="Enter Your New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
              <div className="mb-3 position-relative">
                <label htmlFor="confirmPassword" className="form-label fw-bold">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control rounded-pill"
                  placeholder="Confirm Your New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              {errorMessage}
              {newPassword && !isPasswordValid && (
                <small className="text-danger d-block mt-1">
                  Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
                </small>
              )}
              <div className="mt-4 text-center">
                <button
                  type="submit"
                  className="submit-button fw-bold"
                  disabled={!isFormValid} // Disable if the form is invalid
                  style={{
                    backgroundColor: !isFormValid ? "#ddd" : "black",
                    color: !isFormValid ? "#888" : "white",
                    border: !isFormValid ? "1px solid #ccc" : "1px solid black",
                    cursor: !isFormValid ? "not-allowed" : "pointer",
                    pointerEvents: !isFormValid ? "none" : "auto"
                  }}
                >
                  {btnLoader ? (
                    <span>
                      <i className="fa-solid fa-spinner fa-spin me-2"></i> Submitting...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
