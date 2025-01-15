import React, { useEffect, useRef, useState } from "react";
import "../../styles/Logout.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteCookie, getCookie } from "../../utils/cookieUtils";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../reduxToolkit/loginSlice";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

export const Logout = ({ isModalVisible, onClose }) => {
  const [btnLoader, setBtnLoader] = useState(false);
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

  const handleLogout = async (e) => {
    e.preventDefault();
    setBtnLoader(true);
    try {
      const resultAction = await dispatch(logoutUser());
      if (resultAction?.payload?.status === 200) {
        showSuccessToast(resultAction?.payload?.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        onClose();
      } else {
        showErrorToast(
          resultAction?.payload?.message || "Some thing went wrong"
        );
      }
    } catch (error) {
      showErrorToast(error || "Some thing went wrong");
    } finally {
      setBtnLoader(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className={`modal ${isModalVisible ? "fade-in" : "fade-out"}`}
        style={{ display: isModalVisible ? "block" : "none" }}
        ref={modalRef}
      >
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
                  {btnLoader ? (
                    <span>
                      <i className="fa-solid fa-spinner fa-spin me-2"></i>{" "}
                      Logout...
                    </span>
                  ) : (
                    "Yes"
                  )}
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
