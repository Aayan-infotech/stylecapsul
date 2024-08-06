import React from "react";
import { Link } from "react-router-dom";
import imagefocus from "../../assets/marketplace/Group1806.png";
import ellipse from "../../assets/marketplace/Ellipse1.png";
import one from "../../assets/marketplace/one.mp4";
import shopeimage1 from "../../assets/marketplace/showimg1.jpg";
import shopeimage2 from "../../assets/marketplace/showimg2.jpg";
import shopeimage3 from "../../assets/marketplace/showimg3.jpg";
import shopeimage4 from "../../assets/marketplace/showimg4.jpg";
import shopeimage5 from "../../assets/marketplace/showimg5.jpg";
import shopeimage6 from "../../assets/marketplace/showimg6.jpg";
import shopeimage7 from "../../assets/marketplace/showimg7.jpg";
import shopeimage8 from "../../assets/marketplace/showimg8.jpg";
import shopeimage9 from "../../assets/marketplace/showimg9.jpg";

import menswearimg1 from "../../assets/marketplace/menswearimg1.png";
import menswearimg2 from "../../assets/marketplace/menswearimg2.jpg";
import menswearimg3 from "../../assets/marketplace/menswearimg3.jpg";
import menswearimg4 from "../../assets/marketplace/menswearimg4.png";
import menswearimg5 from "../../assets/marketplace/menswearimg5.png";
import menswearimg6 from "../../assets/marketplace/menswearimg6.png";

import shopwomenimg1 from "../../assets/marketplace/shopwomenimg1.png";
import shopwomenimg2 from "../../assets/marketplace/shopwomenimg2.png";
import shopwomenimg3 from "../../assets/marketplace/shopwomenimg3.png";
import shopwomenimg4 from "../../assets/marketplace/shopwomenimg4.png";
import shopwomenimg5 from "../../assets/marketplace/menswearimg5.png";
import shopwomenimg6 from "../../assets/marketplace/shopwomenimg6.png";

import leatherjacket from "../../assets/marketplace/leatherjacket.png";

import "../../styles/MarketPlace.scss";

const MarketPlace = () => {
  const items = [
    {
      name: "SHOP ALL",
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ZlHgDdHgqbNTsRNC0L6ALo1ACSUp94eozg&s",
    },
    {
      name: "CHROMEHEARTS",
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ZlHgDdHgqbNTsRNC0L6ALo1ACSUp94eozg&s",
    },
    {
      name: "BALENCIAGA",
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ZlHgDdHgqbNTsRNC0L6ALo1ACSUp94eozg&s",
    },
    {
      name: "CLASSICAL CHIC",
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ZlHgDdHgqbNTsRNC0L6ALo1ACSUp94eozg&s",
    },
  ];

  const shopebystyles = [
    { name: "Shirt", imgSrc: shopeimage1 },
    { name: "Dress", imgSrc: shopeimage2 },
    { name: "Shose", imgSrc: shopeimage3 },
    { name: "Watch", imgSrc: shopeimage4 },
    { name: "T-Shirt", imgSrc: shopeimage5 },
    { name: "Top", imgSrc: shopeimage6 },
    { name: "Blazer", imgSrc: shopeimage7 },
    { name: "Jeans", imgSrc: shopeimage8 },
    { name: "Skirt", imgSrc: shopeimage9 },
  ];

  const shopemenswear = [
    { name: "Tops", imgSrc: menswearimg1 },
    { name: "Bottoms", imgSrc: menswearimg2 },
    { name: "Outerwear", imgSrc: menswearimg3 },
    { name: "Footwear", imgSrc: menswearimg4 },
    { name: "Tailoring", imgSrc: menswearimg5 },
    { name: "Accessories", imgSrc: menswearimg6 },
  ];

  const shopwomenwear = [
    { name: "Tops", imgSrc: shopwomenimg1 },
    { name: "Bottoms", imgSrc: shopwomenimg2 },
    { name: "Outerwear", imgSrc: shopwomenimg3 },
    { name: "Footwear", imgSrc: shopwomenimg4 },
    { name: "Bags", imgSrc: shopwomenimg5 },
    { name: "Accessories", imgSrc: shopwomenimg6 },
  ];

  const featuredCollection = [
    { name: "Leather Jackets", imgSrc: leatherjacket },
    { name: "Leather Jackets", imgSrc: leatherjacket },
    { name: "Leather Jackets", imgSrc: leatherjacket },
    { name: "Leather Jackets", imgSrc: leatherjacket },
  ];

  return (
    <>
      <div className="outer-navbar">
        <div className="navbar d-flex justify-content-between align-items-center p-2">
          <div className="navbar-left d-flex">
            <Link to="/login">
              <button
                type="button"
                className="rounded-pill btn bg-black text-white me-2"
              >
                <span className="border-end border-white me-2 pe-2">
                  <img
                    src={imagefocus}
                    alt="imagefocus"
                    style={{ width: "20px", height: "20px" }}
                  />
                </span>
                My Added Products
              </button>
            </Link>
            <Link to="/signup">
              <button
                type="button"
                className="rounded-pill btn bg-black text-white"
              >
                <span className="border-end border-white me-2 pe-2">
                  <img
                    src={ellipse}
                    alt="ellipse"
                    style={{ width: "20px", height: "20px" }}
                  />
                </span>
                Order History
              </button>
            </Link>
          </div>
          <div className="navbar-center text-center flex-grow-1">
            <h1 className="title mb-0">Market Place</h1>
          </div>
          <div className="navbar-right d-flex">
            <i className="fa-regular fa-bell me-2"></i>
            <i className="fa-solid fa-magnifying-glass me-2"></i>
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
      </div>
      <div className="landing1" style={{ position: "relative" }}>
        <div className="vid">
          <video
            src={one}
            alt="Video"
            autoPlay
            loop
            muted
            className="w-100 h-75"
          ></video>
        </div>
      </div>
      {/* <div
        className="landing2"
        style={{ position: "absolute", top: "80%", color: "white" }}
      >
        <div className="marquee">
          <p>REVOLUTIONIZE YOUR CLOSET</p>
          <p>REVOLUTIONIZE YOUR CLOSET</p>
          <p>REVOLUTIONIZE YOUR CLOSET</p>
          <p>REVOLUTIONIZE YOUR CLOSET</p>
        </div>
      </div> */}
      {/* -----------------------trending search------------------------- */}
      <div className="container mt-4 w-50">
        <div>
          <h2 className="fw-bold">Trending Search</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 mt-1">
            {items.map((item, index) => (
              <div className="col" key={index}>
                <div className="d-flex justify-content-center align-items-center border border-1 rounded-pill p-1">
                  <span className="me-2">{item.name}</span>
                  <img
                    src={item.imgSrc}
                    height={10}
                    width={10}
                    alt={item.name.toLowerCase().replace(" ", "-")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -----------------------shop by style------------------------- */}

      <div className="container mt-4 w-50">
        <h2 className="fw-bold">Shop By Style</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-1">
          {shopebystyles.map((style, index) => (
            <div className="col" key={index}>
              <div>
                <div>
                  <img
                    src={style.imgSrc}
                    height={150}
                    width={130}
                    style={{
                      borderTopRightRadius: "60px",
                      borderTopLeftRadius: "60px",
                    }}
                    alt={style.name}
                  />
                </div>
                <h5
                  className="text-center text-white d-flex justify-content-center align-items-center"
                  style={{
                    height: "80px",
                    width: "130px",
                    backgroundColor: "#4C4C4C",
                    borderBottomRightRadius: "60px",
                    borderBottomLeftRadius: "60px",
                  }}
                >
                  {style.name}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -----------------------Shop Menswear------------------------- */}
      <div className="container mt-4 w-50">
        <h2 className="fw-bold">Shop Menswear</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-1">
          {shopemenswear.map((style, index) => (
            <div className="col" key={index}>
              <div>
                <div>
                  <img
                    src={style.imgSrc}
                    height={150}
                    width={130}
                    style={{
                      borderTopRightRadius: "60px",
                      borderTopLeftRadius: "60px",
                    }}
                    alt={style.name}
                  />
                </div>
                <h5
                  className="text-center text-white d-flex justify-content-center align-items-center"
                  style={{
                    height: "80px",
                    width: "130px",
                    backgroundColor: "#4C4C4C",
                    borderBottomRightRadius: "60px",
                    borderBottomLeftRadius: "60px",
                  }}
                >
                  {style.name}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -----------------------Shop Womenswear------------------------- */}
      <div className="container mt-4 w-50">
        <h2 className="fw-bold">Shop Womenswear</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-1">
          {shopwomenwear.map((style, index) => (
            <div className="col" key={index}>
              <div>
                <div>
                  <img
                    src={style.imgSrc}
                    height={150}
                    width={130}
                    style={{
                      borderTopRightRadius: "60px",
                      borderTopLeftRadius: "60px",
                    }}
                    alt={style.name}
                  />
                </div>
                <h5
                  className="text-center text-white d-flex justify-content-center align-items-center"
                  style={{
                    height: "80px",
                    width: "130px",
                    backgroundColor: "#4C4C4C",
                    borderBottomRightRadius: "60px",
                    borderBottomLeftRadius: "60px",
                  }}
                >
                  {style.name}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -------------------------------------Featured Collection---------------------- */}
      <div className="container mt-4 w-50">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h2 className="fw-bold">Featured Collection</h2>
          </div>
          <div className="col-md-2 text-md-end">
            <p className="fw-bold text-center border border-primary rounded-pill p-2">
              See All
            </p>
          </div>
        </div>
        <div className="scroll-container mt-1" id="scroll-container">
          <div className="d-flex flex-nowrap">
            {featuredCollection.map((style, index) => (
              <div className="col flex-shrink-0" key={index}>
                <div>
                  <div>
                    <img
                      src={style.imgSrc}
                      width={500}
                      style={{
                        borderTopRightRadius: "60px",
                        borderTopLeftRadius: "60px",
                      }}
                      alt={style.name}
                    />
                  </div>
                  <h6
                    className="text-white d-flex justify-content-center align-items-center"
                    style={{
                      height: "80px",
                      width: "500px",
                      backgroundColor: "#4C4C4C",
                      borderBottomRightRadius: "60px",
                      borderBottomLeftRadius: "60px",
                    }}
                  >
                    {style.name}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPlace;
