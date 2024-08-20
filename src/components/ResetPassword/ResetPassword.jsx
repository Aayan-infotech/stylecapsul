import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { apiUrl } from '../../../apiUtils';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = location.state || {}; 

  console.log(token, 'token')

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (newPassword !== confirmPassword) {
    //   toast.error('Passwords do not match.');
    //   return;
    // }
    try {
      const response = await axios.post(
        apiUrl('api/auth/resetPassword'),
        { newPassword, token: token },
        {
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`  
          },
        }
      );
      toast.success(response.data.message, {
        autoClose: 1000,
        style: { backgroundColor: '#28a745', color: '#fff' }
      });
      navigate('/login');
    } catch (error) {
      if (error.response?.status === 401 && error.response?.data?.message === "Token has expired. Please request a new password reset.") {
        toast.error('Token has expired. Please request a new password reset link.');
      } else {
        toast.error(error.response?.data?.message, {
          autoClose: 1000,
          style: { backgroundColor: '#dc3545', color: '#fff' }
        });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="reset-container">
        <h1 className="outside-heading fs-1 fw-bold">Style Capsule</h1>
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
                    className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
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
                    className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}
                  ></i>
                </button>
              </div>
              <div className="mt-4 text-center">
                <button type="submit" className="submit-button fw-bold">
                  Submit
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
