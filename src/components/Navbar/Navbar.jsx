import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/LOGOSC.png";

function Navbar() {
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
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <div className="hamburger">
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
