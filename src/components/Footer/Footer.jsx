import React from 'react';
import './Footer.scss';
import {Link} from 'react-router-dom'


const Footer = () => {
  return (
    <>
    <div className='outer-footer'>
    <div className="footer">
      <div className="footer-left">
        <h2 className="footer-title">Style Capsule</h2>
        <p className="footer-description">
          As the world prioritizes a technology-driven environment for the benefit of all, Style Capsule stands committed to supporting agencies dedicated to national development.
        </p>
      </div>
      <div className="footer-center">
        <ul className="footer-links">
          <li><a href="#about">About</a></li>
          <li><a href="#legal">Legal</a></li>
          <li><a href="#terms">Terms & Condition</a></li>
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      <div className="footer-right">
        <p>Available On <i class="fa-solid fa-robot"></i><i class="fa-brands fa-apple"></i></p>
        <ul className="social-media">
          <li><i class="fa-brands fa-facebook"></i><a href="https://facebook.com">Facebook</a></li>
          <li><i class="fa-brands fa-x-twitter"></i><a href="https://twitter.com">X (Twitter)</a></li>
          <li><i class="fa-brands fa-linkedin"></i><a href="https://linkedin.com">LinkedIn</a></li>
          <li><i class="fa-brands fa-instagram"></i><a href="https://instagram.com">Instagram</a></li>
        </ul>
      </div>
      
    </div>
    <div className="footer-bottom">
    <p>© 2024 Style Capsule. All rights reserved.</p>
  </div>
  </div>
  </>
  );
};

export default Footer;
