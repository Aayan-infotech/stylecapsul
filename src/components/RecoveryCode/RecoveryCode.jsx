import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RecoveryCode.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { apiUrl } from '../../../apiUtils';

const RecoveryCode = () => {
  const [values, setValues] = useState(["", "", "", ""]);
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
    const otp = values.join('');

    try {
      const response = await axios.post(apiUrl('api/auth/verify-otp'), {
        otp,
      });
      console.log(response, 'response')

      if (response.status === 200) {
        // toast.success(response?.data.message, {
        //   autoClose: 1000,
        //   style: { backgroundColor: '#28a745', color: '#fff' }
        // });
        toast.success(response?.data?.message, {
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
          // if (response?.success === true && response?.status === 200) {
            navigate('/reset-password', { state: { token: response.data.token } });
          // }
        }, 1000);
      } else {
        toast.error(response?.data.message, {
          autoClose: 1000,
          style: { backgroundColor: '#dc3545', color: '#fff' }
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message, {
        autoClose: 1000,
        style: { backgroundColor: '#dc3545', color: '#fff' }
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="recovery-container">
        <h1 className="outside-heading fs-1 fw-bold">Style Capsule</h1>
        <div className="recovery-card mt-3">
          <div className="recovery-box">
            <h2 className="card-title fs-4 text-center fw-bold">Recovery Code</h2>
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
              <button type="submit" className="submit-button fw-bold"> Submit
              </button>
              <div className="reset_otp">
                <a href="#" className="text-black mt-1">
                  Resend OTP?
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