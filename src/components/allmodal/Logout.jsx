import React, { useEffect, useRef } from "react";
import "../../styles/Logout.css";

export const Logout = ({ isModalVisible, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isModalVisible) {
      modalRef.current.classList.add("show");
    } else {
      modalRef.current.classList.remove("show");
    }
  }, [isModalVisible]);

  return (
    <div
      className={`modal ${isModalVisible ? "fade-in" : "fade-out"}`}
      style={{ display: isModalVisible ? "block" : "none" }}
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body text-center">
            <h2 className="fw-bold">
              Are you sure you want
              <br /> to logout?
            </h2>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill w-25 custom-bg-button fw-bold"
                onClick={onClose}
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
  );
};
