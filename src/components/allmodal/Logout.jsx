import React, { useEffect, useRef } from "react";
import "../../styles/Logout.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteCookie, getCookie } from "../../utils/cookieUtils";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../reduxToolkit/loginSlice";

export const Logout = ({ isModalVisible, onClose }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isModalVisible) {
      modalRef.current.classList.add("show");
    } else {
      modalRef.current.classList.remove("show");
    }
  }, [isModalVisible]);

  const handleLogout = async () => {
    const resultAction = await dispatch(logoutUser());
    if (resultAction?.payload?.status === 200) {
      toast.success(resultAction?.payload?.message, {
        autoClose: 1000,
        hideProgressBar: true,
        style: {
          backgroundColor: 'black',
          color: '#C8B199',
          borderRadius: '50px',
          padding: '10px 20px',
        }
      })
      navigate('/');
      onClose();
    } else {
      toast.error('Some thing went wrong', {
        autoClose: 1000,
        hideProgressBar: true,
        style: {
          backgroundColor: 'red',
          color: '#C8B199',
          borderRadius: '50px',
          padding: '10px 20px',
        }
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={`modal ${isModalVisible ? "fade-in" : "fade-out"}`}
        style={{ display: isModalVisible ? "block" : "none" }}
        ref={modalRef} >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <h2 className="fw-bold">
                Are you sure you want <br /> to logout?
              </h2>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill w-25 custom-bg-button fw-bold"
                  onClick={handleLogout}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill w-25 custom-bg-button fw-bold"
                  onClick={onClose}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
