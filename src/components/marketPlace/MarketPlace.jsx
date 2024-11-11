// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import imagefocus from "../../assets/marketplace/Group1806.png";
import ellipse from "../../assets/marketplace/Ellipse1.png";
import one from "../../assets/marketplace/one.mp4";
import blank_img from '../../assets/stylist/blank_img.jpg'
import leatherjacket from "../../assets/marketplace/leatherjacket.png";
import "../../styles/MarketPlace.scss";

const MarketPlace = () => {
  const [marketPlaceCategory, setMarketPlaceCategory] = useState(null);

  const featuredCollection = [
    { name: "Leather Jackets", imgSrc: leatherjacket },
    { name: "Leather Jackets", imgSrc: leatherjacket },
    { name: "Leather Jackets", imgSrc: leatherjacket },
    { name: "Leather Jackets", imgSrc: leatherjacket },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch('http://44.196.192.232:3555/api/marketplaces');
      const result = await response.json();
      setMarketPlaceCategory(result.groupedProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            {marketPlaceCategory?.shop_by_style?.length ? (
              marketPlaceCategory?.shop_by_style.map((item, index) => (
                <div className="col-6 col-md-3 d-flex justify-content-center" key={index}>
                  <Link to={`/categories-type/${item?._id}`} className="text-decoration-none w-100">
                    <div className="style-item">
                      <div className="image-container rounded-top-pill">
                        <img src={item.images[0] || blank_img} alt={item.name} className="img-fluid" />
                      </div>
                      <p className="style-text rounded-bottom-pill fw-bold">{item?.name}</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No styles available</p>
            )}
          </div>
        </div>
        {/* -----------------------Shop Menswear------------------------- */}
        <div className="shop-by-style mt-1">
          <h3>Shop Menswear</h3>
          <div className="row">
            {marketPlaceCategory?.shop_menswear?.length ? (
              marketPlaceCategory?.shop_menswear.map((item, index) => (
                <div className="col-6 col-md-3 d-flex justify-content-center" key={index}>
                  <div className="style-item">
                    <div className="image-container rounded-top-pill">
                      <img src={item.images[0]} alt={item.name} className="img-fluid" />
                    </div>
                    <p className="style-text rounded-bottom-pill fw-bold">{item?.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No menswear available</p>
            )}
          </div>
        </div>
        {/* -----------------------Shop Womenswear------------------------- */}
        <div className="shop-by-style mt-1">
          <h3>Shop Womenswear</h3>
          <div className="row">
          {marketPlaceCategory?.shop_womenswear?.length ? (
              marketPlaceCategory?.shop_womenswear.map((item, index) => (
              <div className="col-6 col-md-3 d-flex justify-content-center" key={index}>
                <div className="style-item">
                  <div className="image-container rounded-top-pill">
                  <img src={item.images[0]} alt={item.name} className="img-fluid" />
                  </div>
                  <p className="style-text rounded-bottom-pill fw-bold">{item?.name}</p>
                </div>
              </div>
           ))
          ) : (
            <p>No womenswear available</p>
          )}
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
