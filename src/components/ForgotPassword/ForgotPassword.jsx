import React, { useState } from "react";
import "./ForgotPassword.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const navigate = useNavigate();

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      showErrorToast("Please enter a valid email address.");
      return;
    }
    setBtnLoader(true);
    try {
      const response = await axios.post(apiUrl("api/auth/send-email"), {
        email,
      });
      if (response?.data?.success && response?.data?.status === 200) {
        const timeRemaining = parseInt(response?.data?.time);
        showSuccessToast(response?.data?.message || "Email sent successfully!");
        navigate("/recovery-code", { state: { email, time: timeRemaining } });
      } else {
        showErrorToast(response?.data?.message || "Failed to send email.");
      }
    } catch (error) {
      showErrorToast(error.response?.data?.message || "An error occurred.");
    } finally {
      setBtnLoader(false);
    }
  };

  return (
    <>
      <div className="forgot-custom-container mt-5">
        <div>
          <h1 className="outside-heading fs-1 fw-bold">Style Capsule</h1>
          <div className="card custom-card mt-0 border-0">
            <div className="card-body p-5 text-black">
              <h2 className="card-title fs-4 text-center fw-bold">
                Forgot Password
              </h2>
              <form className="mt-3" onSubmit={handleForgetPassword}>
                <div className="">
                  <label htmlFor="email" className="form-label fw-bold">
                    Enter Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="form-control rounded-pill"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn custom-button text-white fw-bold rounded-pill w-50 p-2"
                  >
                    {btnLoader ? (
                      <span>
                        <i className="fa-solid fa-spinner fa-spin me-2"></i>{" "}
                        Resetting...
                      </span>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
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
