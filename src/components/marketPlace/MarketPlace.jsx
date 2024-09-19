// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import imagefocus from "../../assets/marketplace/Group1806.png";
import ellipse from "../../assets/marketplace/Ellipse1.png";
import one from "../../assets/marketplace/one.mp4";
import shopeimage1 from "../../assets/marketplace/showimg1.jpg";
import shopeimage2 from "../../assets/marketplace/showimg2.jpg";
import shopeimage3 from "../../assets/marketplace/showimg3.jpg";
import casualShirtImage1 from "../../assets/marketplace/subcat1.jpg";
import casualShirtImage2 from "../../assets/marketplace/subcat2.jpg";
import casualShirtImage3 from "../../assets/marketplace/subcat3.jpg";

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

  const shopebystyles = [
    {
      id: 1,
      name: "Shirt",
      imgSrc: shopeimage1,
      subcategories: [
        { id: 1, name: "Casual Shirts", imgSrc: casualShirtImage1 },
        { id: 2, name: "Formal Shirts", imgSrc: casualShirtImage2 }
      ]
    },
    {
      id: 2,
      name: "Dress",
      imgSrc: shopeimage2,
      subcategories: [
        { id: 1, name: "Casual Dresses", imgSrc: casualShirtImage1 },
        { id: 2, name: "Evening Dresses", imgSrc: casualShirtImage3 }
      ]
    },
    {
      id: 3,
      name: "Shoes",
      imgSrc: shopeimage3,
      subcategories: [
        { id: 1, name: "Sneakers", imgSrc: casualShirtImage1 },
        { id: 2, name: "Formal Shoes", imgSrc: casualShirtImage3 }
      ]
    }
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
            <Link to="/myaddedproducts">
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
            <Link to="/orderhistory">
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
      <div
        className="landing2"
        style={{ position: "absolute", top: "80%", color: "white" }}
      >
        <div className="marquee">
          <p>REVOLUTIONIZE YOUR CLOSET</p>
          <p>REVOLUTIONIZE YOUR CLOSET</p>
          <p>REVOLUTIONIZE YOUR CLOSET</p>
          <p>REVOLUTIONIZE YOUR CLOSET</p>
        </div>
      </div>
      {/* -----------------------trending search------------------------- */}
      <div className="container w-75 mt-4 trending-searches-section" style={{ display: "block" }}>
        {/* Trending Searches */}
        <div className="trending-searches">
          <h3>Trending Searches</h3>
          <div className="row">
            <div className="col d-flex justify-content-start">
              <button className="btn btn-outline-dark rounded-pill me-2">SHOP ALL</button>
              <button className="btn btn-outline-dark rounded-pill me-2">CHROME HEARTS</button>
              <button className="btn btn-outline-dark rounded-pill me-2">BALENCIAGA</button>
              <button className="btn btn-outline-dark rounded-pill">CASUAL CHIC</button>
            </div>
          </div>
        </div>
        {/* -----------------------shop by style------------------------- */}
        <div className="shop-by-style mt-1">
          <h3>Shop by Style</h3>
          <div className="row">
            {shopebystyles?.map((item, index) => (
              <div className="col-6 col-md-3 d-flex justify-content-center" key={index}>
                <Link to={`/categories-type/${item.id}`} className="text-decoration-none w-100" >
                  <div className="style-item">
                    <div className="image-container rounded-top-pill">
                      <img src={item?.imgSrc} alt="Shirt" className="img-fluid" />
                    </div>
                    <p className="style-text rounded-bottom-pill fw-bold fs-4">{item?.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* -----------------------Shop Menswear------------------------- */}
        <div className="shop-by-style mt-1">
          <h3>Shop Menswear</h3>
          <div className="row">
            {shopemenswear?.map((item, index) => (
              <div className="col-6 col-md-3 d-flex justify-content-center" key={index}>
                <div className="style-item">
                  <div className="image-container rounded-top-pill">
                    <img src={item?.imgSrc} alt="Shirt" className="img-fluid" />
                  </div>
                  <p className="style-text rounded-bottom-pill fw-bold fs-5">{item?.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* -----------------------Shop Womenswear------------------------- */}
        <div className="shop-by-style mt-1">
          <h3>Shop Womenswear</h3>
          <div className="row">
            {shopwomenwear?.map((item, index) => (
              <div className="col-6 col-md-3 d-flex justify-content-center" key={index}>
                <div className="style-item">
                  <div className="image-container rounded-top-pill">
                    <img src={item?.imgSrc} alt="Shirt" className="img-fluid" />
                  </div>
                  <p className="style-text rounded-bottom-pill fw-bold fs-5">{item?.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* -----------------------Featured Collection------------------------- */}
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
