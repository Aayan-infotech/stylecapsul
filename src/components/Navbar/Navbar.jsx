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
                    <Link to="/#" className="text-decoration-none dropdown-item">
                      Scheduled
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Refer a friend
                    </a>
                  </li>
                  <li>
                    <Link to="/gift-cards" className="text-decoration-none dropdown-item">
                      Gift Card
                    </Link>
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
    </>
  );
}
export default Navbar;
