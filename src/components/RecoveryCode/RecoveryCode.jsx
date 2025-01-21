import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RecoveryCode.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const RecoveryCode = () => {
  const [values, setValues] = useState(["", "", "", ""]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newValues = [...values];
    newValues[index] = value.slice(0, 1);
    setValues(newValues);

    if (value.length > 0) {
      const nextIndex = index + 1;
      if (nextIndex < values.length) {
        document.getElementById(`box-${nextIndex}`).focus();
      }
    }
  };

  const handleVerifyToken = async (e) => {
    e.preventDefault();
    setBtnLoader(true);
    const otp = values.join("");
    try {
      const response = await axios.post(apiUrl("api/auth/verify-otp"), {
        otp,
      });
      if (response.status === 200) {
        showSuccessToast(response?.data?.message);
        setTimeout(() => {
          navigate("/reset-password", {
            state: { token: response.data.token },
          });
        }, 1000);
      } else {
        showErrorToast(response?.data?.message);
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message);
    } finally {
      setBtnLoader(false);
    }
  };

  const handleClickResendPassword = async (e) => {
    e.preventDefault();
    setBtnLoader(true);
    setResendDisabled(true);
    setResendCountdown(20);
    try {
      const response = await axios.post(apiUrl("api/auth/resend-otp"), {
        email,
      });
      console.log(response, "abinash");
      if (response.status === 200) {
        showSuccessToast("New OTP has been sent to your email!");
        setValues(["", "", "", ""]);
      } else {
        showErrorToast("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message);
    } finally {
      setBtnLoader(false);
      setTimeout(() => setResendDisabled(false), 15000);
    }
  };

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [resendCountdown]);

  return (
    <>
      <ToastContainer />
      <div className="recovery-container">
        <h1 className="outside-heading fs-1 fw-bold">
          <Link to="/" className="text-decoration-none text-black">
            Style Capsule
          </Link>
        </h1>
        <div className="recovery-card mt-3">
          <div className="recovery-box">
            <h2 className="card-title fs-4 text-center fw-bold">
              Recovery Code
            </h2>
            <form className="recovery-form mt-2" onSubmit={handleVerifyToken}>
              <div className="text">
                <h5 className="otp-message">
                  OTP has been sent to your registered Email ID/Mobile number.
                </h5>
                <p className="enter_otp_text">Enter your OTP here</p>
              </div>
              <div className="box-container">
                {values.map((value, index) => (
                  <input
                    key={index}
                    id={`box-${index}`}
                    className="box me-2"
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                  />
                ))}
              </div>
              <div className="mt-4">
                <p>Please enter your OTP to verify your account</p>
              </div>
              <button type="submit" className="submit-button fw-bold">
                {btnLoader ? (
                  <span>
                    <i className="fa-solid fa-spinner fa-spin me-2"></i>{" "}
                    Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
              <div className="reset_otp my-2">
                <a
                  onClick={handleClickResendPassword}
                  className={`text-black ${resendDisabled ? "disabled" : ""}`}
                  style={{ cursor: resendDisabled ? "not-allowed" : "pointer" }}
                >
                  {btnLoader ? (
                    <span>
                      <i className="fa-solid fa-spinner fa-spin me-2"></i>{" "}
                      Sending...
                    </span>
                  ) : resendDisabled ? (
                    `Resend OTP in ${resendCountdown}s`
                  ) : (
                    "Resend OTP?"
                  )}
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecoveryCode;
