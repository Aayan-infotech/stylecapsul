import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer class="footer mt-4">
        <div class="container">
          <div class="row">
            <div class="col-md-4 footer-column">
              <h4 className="fw-bold">Style Capsule</h4>
              <p>
                {" "}
                As the world prioritizes a technology-driven environment for the
                benefit of all, Style Capsule stands committed to supporting
                agencies dedicated to national development.
              </p>
            </div>
            <div class="col-md-4 footer-column d-flex justify-content-end align-items-center">
             <div>
             <h6>Legal</h6>
              <h6>Terms & Condition</h6>
              <h6>Privacy Policy</h6>
              <h6>Contact</h6>
             </div>
            </div>
            <div class="col-md-4 footer-column d-flex justify-content-end align-items-center">
              <div>
                <h5>
                  <span className="me-2">Available On</span>{" "}
                  <i className="fa-solid fa-robot me-2"></i>
                  <i className="fa-brands fa-apple"></i>
                </h5>
                <div>
                  <h6>
                    {" "}
                    <i className="fa-brands fa-facebook"></i>
                    Facebook
                  </h6>
                  <h6>
                    {" "}
                    <i className="fa-brands fa-x-twitter"></i>(Twitter)
                  </h6>
                  <h6>
                    {" "}
                    <i className="fa-brands fa-linkedin"></i>
                    LinkedIn
                  </h6>
                  <h6>
                    {" "}
                    <i className="fa-brands fa-instagram"></i>
                    Instagram
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ------------------------------------- */}
      {/* <div className="outer-footer">
        <div className="footer">
          <div className="footer-left">
            <h2 className="footer-title">Style Capsule</h2>
            <p className="footer-description">
              As the world prioritizes a technology-driven environment for the
              benefit of all, Style Capsule stands committed to supporting
              agencies dedicated to national development.
            </p>
          </div>
          <div className="footer-center">
            <ul className="footer-links">
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#legal">Legal</a>
              </li>
              <li>
                <a href="#terms">Terms & Condition</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-right">
            <p>
              Available On <i className="fa-solid fa-robot"></i>
              <i className="fa-brands fa-apple"></i>
            </p>
            <ul className="social-media">
              <li>
                <i className="fa-brands fa-facebook"></i>
                <a href="https://facebook.com">Facebook</a>
              </li>
              <li>
                <i className="fa-brands fa-x-twitter"></i>
                <a href="https://twitter.com">X (Twitter)</a>
              </li>
              <li>
                <i className="fa-brands fa-linkedin"></i>
                <a href="https://linkedin.com">LinkedIn</a>
              </li>
              <li>
                <i className="fa-brands fa-instagram"></i>
                <a href="https://instagram.com">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Style Capsule. All rights reserved.</p>
        </div>
      </div> */}
    </>
  );
};

export default Footer;
