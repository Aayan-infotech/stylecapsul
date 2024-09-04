import React, { useEffect, useRef } from "react";
import "../../styles/Logout.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteCookie, getCookie } from "../../utils/cookieUtils";

export const Logout = ({ isModalVisible, onClose }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isModalVisible) {
      modalRef.current.classList.add("show");
    } else {
      modalRef.current.classList.remove("show");
    }
  }, [isModalVisible]);

  const handleLogout = () => {
    deleteCookie('authToken');
    console.log('Cookie after deletion:', getCookie('authToken'));
    toast.success('Logout Successfully..!', {
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
      navigate('/');
    }, 1000);
    onClose();
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
