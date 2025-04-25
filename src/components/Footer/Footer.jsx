import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4 footer-column">
              <h4 className="fw-bold">Style Capsule</h4>
              <p>
                As the world prioritizes a technology-driven environment for the
                benefit of all, Style Capsule stands committed to supporting
                agencies dedicated to national development.
              </p>
            </div>
            <div className="col-md-4 footer-column">
              <h5>
                <span className="me-2">Important Links</span>
              </h5>
              <div>
                <Link to="/termsConditions" className="text-black">
                  <h6>Terms & Condition</h6>
                </Link>
                <Link to="/policy" className="text-black">
                  <h6>Privacy Policy</h6>
                </Link>
                <Link to="/contact" className="text-black">
                  <h6>Contact</h6>
                </Link>
              </div>
            </div>
            <div className="col-md-4 footer-column">
              <div>
                <h5>
                  <span className="me-2">Available On</span>
                  <i className="fa-solid fa-robot me-2"></i>
                  <i className="fa-brands fa-apple"></i>
                </h5>
                <div>
                  <h6>
                    <a
                      href="https://www.facebook.com/thestylecapsuleonlineboutique/"
                      target="_blank"
                      rel="noopener noreferrer" className="text-black">
                      <i className="fa-brands fa-facebook"></i>
                      Facebook
                    </a>
                  </h6>
                  <h6>
                    <a
                      href="https://www.tiktok.com"
                      target="_blank"
                      rel="noopener noreferrer" className="text-black">
                      <i className="fa-brands fa-x-twitter"></i>(Twitter)
                    </a>
                  </h6>
                  <h6>
                    <a
                      href="https://www.instagram.com/thestylecapsule/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer" className="text-black">
                      <i className="fa-brands fa-instagram"></i>
                      Instagram
                    </a>
                  </h6>
                  <Link
                    to="/contact"
                    className="text-decoration-none"
                    style={{ color: "#363636" }}
                  >
                    <h6>
                      <i className="fa-solid fa-headset"></i>&nbsp; Contact
                      Support
                    </h6>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
