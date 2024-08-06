import React from "react";
import "./LandingPage.scss";
import { Link } from "react-router-dom";

import Footer from "../Footer/Footer";
import one from "./img/one.mp4";
import two from "./img/two.png";

import three from "./img/three.png";
import four from "./img/four.png";
import five from "./img/five.png";
import six from "./img/six.png";

import seven from "./img/seven.png";
import eight from "./img/eight.png";
import nine from "./img/nine.png";
import ten from "./img/ten.png";
// import four from './img/four.png'

const LandingPage = () => {
  const services = [
    { id: 1, imgSrc: three, alt: "Closet Icon", text: "Closet Management" },
    { id: 2, imgSrc: four, alt: "Closet Icon", text: "My Style Capsule" },
    { id: 3, imgSrc: five, alt: "Closet Icon", text: "Market Place" },
    { id: 4, imgSrc: six, alt: "Closet Icon", text: "Stylist" },
  ];

  return (
    <>
      <div className="outer-navbar">
        <div className="navbar">
          <div className="navbar-left">
            <Link to="/login">
              <button className="login-btn">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="signup-btn">Sign Up</button>
            </Link>
          </div>
          <div className="navbar-center">
            <h1 className="title">Style Capsule</h1>
          </div>
          <div className="navbar-right">
            <i className="fa-regular fa-bell"></i>
            <i className="fa-solid fa-magnifying-glass"></i>
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
      </div>

      <div className="landing1">
        <div className="vid">
          <video src={one} alt="Video" autoPlay loop muted />
        </div>

        <div className="capsule">
          <p>
            Create Your Capsule <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </div>
      </div>

      <div className="landing2">
        <div className="marquee">
          <p>REVOLUTIONIZE YOUR CLOSET</p>
          <p>REVOLUTIONIZE YOUR CLOSET</p>
          <p>REVOLUTIONIZE YOUR CLOSET</p>
          <p>REVOLUTIONIZE YOUR CLOSET</p>
        </div>
      </div>

      <div className="landing3">
        <div className="left">
          <p>Most of us don't wear 82% of our closet contents.*</p>
        </div>
        <div className="right">
          <img src={two} alt="" />
        </div>
      </div>
      {/* -----------------------------service-------------------------- */}
      <div className="landing4">
        <h3>Services</h3>
        <div className="landing4-row">
          <div className="left">
            {services.slice(0, 2).map((service) => (
              <div key={service.id} className="closet-management">
                <div className="image">
                  <img src={service.imgSrc} alt={service.alt} />
                </div>
                <div className="text fw-bold">{service.text}</div>
              </div>
            ))}
          </div>
          <div className="right">
            {services.slice(2).map((service) => (
              <div key={service.id} className="closet-management">
                <div className="image">
                  <img src={service.imgSrc} alt={service.alt} />
                </div>
                <div className="text fw-bold">{service.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="landing5">
        <h3>Popular Products</h3>
        <div className="landing4-row">
          <div className="left">
            <div className="product-card">
              <div className="image-container">
                <img src={seven} alt="Blue Jeans" />
              </div>
              <div className="text-container">
                <div className="info">
                  <h3>Blue Jeans</h3>
                  <div className="description-price">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing e</p>
                    <div className="price">$28</div>
                  </div>
                </div>
                <div className="actions">
                  <button className="add-to-cart">Add to cart</button>
                  <button className="buy">Buy</button>
                </div>
              </div>
            </div>

            <div className="product-card">
              <div className="image-container">
                <img src={eight} alt="Blue Jeans" />
              </div>
              <div className="text-container">
                <div className="info">
                  <h3>Blue Jeans</h3>
                  <div className="description-price">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing e</p>
                    <div className="price">$28</div>
                  </div>
                </div>
                <div className="actions">
                  <button className="add-to-cart">Add to cart</button>
                  <button className="buy">Buy</button>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="product-card">
              <div className="image-container">
                <img src={nine} alt="Blue Jeans" />
              </div>
              <div className="text-container">
                <div className="info">
                  <h3>Blue Jeans</h3>
                  <div className="description-price">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing e</p>
                    <div className="price">$28</div>
                  </div>
                </div>
                <div className="actions">
                  <button className="add-to-cart">Add to cart</button>
                  <button className="buy">Buy</button>
                </div>
              </div>
            </div>

            <div className="product-card">
              <div className="image-container">
                <img src={ten} alt="Blue Jeans" />
              </div>
              <div className="text-container">
                <div className="info">
                  <h3>Blue Jeans</h3>
                  <div className="description-price">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing e</p>
                    <div className="price">$28</div>
                  </div>
                </div>
                <div className="actions">
                  <button className="add-to-cart">Add to cart</button>
                  <button className="buy">Buy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LandingPage;
