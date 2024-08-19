import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/LOGOSC.png";
import { Logout } from "../allmodal/Logout";

function Navbar() {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleShowModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      <div className="top">
        <div className="top1">
          <div className="left">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                style={{ width: "300px", height: "60px" }}
              />
            </Link>
          </div>
          <div className="right">
            <div className="icons">
              <i className="fa-regular fa-user"></i>
              <i className="fa-solid fa-magnifying-glass"></i>
              <Link to="/cart" className="text-decoration-none text-white">
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </div>
            <div className="hamburger">
              <div className="dropdown">
                <i
                  className="fa-solid fa-bars"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></i>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Scheduled
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Refer a friend
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/gift-cards">
                      Gift Card
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/help-support">
                      Help & Support
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={handleShowModal}>
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Logout isModalVisible={isModalVisible} onClose={handleCloseModal} />
      {/* <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <h2 className="fw-bold">
                Are you sure you want
                <br /> to logout ?
              </h2>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-outline-secondary rounded-pill w-25 custom-bg-button fw-bold"
                >
                  Yes
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-outline-secondary rounded-pill w-25 custom-bg-button fw-bold"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
export default Navbar;
