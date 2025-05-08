import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./RecoveryCode.scss";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const RecoveryCode = () => {
  const [values, setValues] = useState(["", "", "", ""]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [resendBtnLoader, setResendBtnLoader] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(0);
  const location = useLocation();
  const { email, time } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const storedTime = localStorage.getItem("resendCountdown");
    const remainingTime = storedTime ? parseInt(storedTime, 10) : time || 0;

    if (remainingTime > 0) {
      setResendCountdown(remainingTime);
      setResendDisabled(true);
    } else {
      setResendDisabled(false);
    }
  }, []);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setInterval(() => {
        setResendCountdown((prev) => {
          const newTime = prev - 1;

          if (newTime <= 0) {
            clearInterval(timer);
            localStorage.removeItem("resendCountdown");
            setResendDisabled(false);
            return 0;
          }
          localStorage.setItem("resendCountdown", newTime);
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [resendCountdown]);

  const handleResendOtp = async (e) => {
    e.preventDefault();
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      showErrorToast("Please enter a valid email address.");
      return;
    }
    setResendBtnLoader(true);
    try {
      const response = await axios.post(apiUrl("api/auth/send-email"), { email });
      if (response.status === 201 || response?.data?.success === true) {
        showSuccessToast(response?.data?.message || "Email sent successfully!");
        // const newTime = parseInt(response?.data?.time || "60", 10);
        const extractSeconds = (timeStr) => {
          const match = timeStr.match(/(\d+)\s*minute[s]?\s*and\s*(\d+)\s*second[s]?/);
          if (match) {
            const minutes = parseInt(match[1]);
            const seconds = parseInt(match[2]);
            return minutes * 60 + seconds;
          }
          return 60;
        };
        const newTime = extractSeconds(response?.data?.time);
        localStorage.setItem("resendCountdown", newTime);
        setResendCountdown(newTime);
        setResendDisabled(true);
      } else {
        showErrorToast(response?.data?.message || "Failed to send email.");
      }
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setResendBtnLoader(false);
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!/^\d?$/.test(value)) return;
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
    if (otp.length !== values.length) {
      showErrorToast("Please fill in all OTP fields before submitting.");
      setBtnLoader(false);
      return;
    }
    try {
      const response = await axios.post(apiUrl("api/auth/verify-otp"), {
        otp,
      });
      if (response.status === 200) {
        console.log("Navigating with token:", response.data.token);
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

  return (
    <>
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
                  // <input key={index} id={`box-${index}`} className="box me-2" type="number" pattern="[0-9]*" maxLength="1" value={value} onChange={(e) => handleChange(e, index)} />
                  <input
                  key={index}
                  id={`box-${index}`}
                  className="box me-2"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                />
                ))}
              </div>
              <p className="mt-2">
                Please enter your OTP to verify your account. Time remaining:{" "}
                {resendCountdown}s
              </p>
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
                <a className={`text-black ${resendDisabled ? "link-disabled" : ""}`} onClick={handleResendOtp} style={{ cursor: "pointer" }}>
                  {resendBtnLoader ? (
                    <span>
                      <i className="fa-solid fa-spinner fa-spin me-2"></i>{" "}
                      Submitting...
                    </span>
                  ) : (
                    "Resend OTP"
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
