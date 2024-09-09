import React, { useState } from "react";
import "./ForgotPassword.scss";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { apiUrl } from '../../../apiUtils';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(apiUrl('api/auth/send-email'), {
        email,
      });

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
          if (response?.data.message) {
            navigate("/recovery-code");
          }
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
      <div className="forgot-custom-container mt-5">
        <div>
          <h1 className="outside-heading fs-1 fw-bold">Style Capsule</h1>
          <div className="card custom-card mt-0 border-0">
            <div className="card-body p-5 text-black">
              <h2 className="card-title fs-4 text-center fw-bold">Forgot Password</h2>
              <form className="mt-5" onSubmit={handleForgetPassword}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    Phone Number or Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="form-control rounded-pill mt-4"
                    placeholder="Phone Number or Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="text-center mt-4">
                  {/* <Link to="/recovery-code"> */}
                  <button
                    type="submit"
                    className="btn custom-button text-white fw-bold rounded-pill w-50 p-2"
                  >
                    Submit
                  </button>
                  {/* </Link> */}
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
