// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import imagefocus from "../../assets/marketplace/Group1806.png";
import ellipse from "../../assets/marketplace/Ellipse1.png";
import one from "../../assets/marketplace/one.mp4";
import blank_img from "../../assets/stylist/blank_img.jpg";
import leatherjacket from "../../assets/marketplace/leatherjacket.png";
import "../../styles/MarketPlace.scss";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import Loader from "../Loader/Loader.jsx";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarts } from "../../reduxToolkit/addcartSlice.js";

const MarketPlace = () => {
  const [marketPlaceCategory, setMarketPlaceCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const featuredCollection = [
    { name: "Leather Jackets", imgSrc: leatherjacket },
    { name: "Leather Jackets", imgSrc: leatherjacket },
    { name: "Leather Jackets", imgSrc: leatherjacket },
    { name: "Leather Jackets", imgSrc: leatherjacket },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl("api/marketplaces"));
      if (response?.data?.success) {
        setMarketPlaceCategory(response?.data?.groupedProducts);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      await dispatch(getAllCarts());
    };
    fetchItem();
  }, [dispatch]);

  const getTotalProductCount = () => {
    return Array.isArray(cart)
      ? cart.reduce((total, item) => total + item.items.length, 0)
      : 0;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <><><div className="outer-navbar">
          <div className="navbar d-flex justify-content-between align-items-center p-2">
            <div className="navbar-left d-flex mb-0">
              <Link to="/myaddedproducts">
                <button
                  type="button"
                  className="rounded-pill btn bg-black text-white me-2"
                >
                  <span className="border-end border-white me-2 pe-2">
                    <img
                      src={imagefocus}
                      alt="imagefocus"
                      style={{ width: "20px", height: "20px" }} />
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
                      style={{ width: "20px", height: "20px" }} />
                  </span>
                  Order History
                </button>
              </Link>
            </div>
            <div className="navbar-center text-center flex-grow-1 mt-0">
              <h1 className="title mb-0">Market Place</h1>
            </div>
            <div className="navbar-right d-flex">
              <i className="fa-regular fa-bell me-2"></i>
              {/* <i className="fa-solid fa-magnifying-glass me-2"></i> */}
              <Link to="/cart" className="text-decoration-none text-white">
                <div className="cart-icon position-relative">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                    {getTotalProductCount()}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div><div className="landing1" style={{ position: "relative" }}>
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
          </div><div
            className="landing2"
            style={{ position: "absolute", color: "white" }}
          >
            <div className="marquee">
              <p>REVOLUTIONIZE YOUR CLOSET</p>
              <p>REVOLUTIONIZE YOUR CLOSET</p>
              <p>REVOLUTIONIZE YOUR CLOSET</p>
              <p>REVOLUTIONIZE YOUR CLOSET</p>
            </div>
          </div></>
          <div className="container w-75 mt-4 trending-searches-section " style={{ display: "block" }}>
            {/* Trending Searches */}
            <div className="trending-searches pt-4">
              <h3>Trending Searches</h3>
              <div className="row">
                <div className="col d-flex justify-content-start gap-3 overflow-control flex-wrap flex-row">
                  <Stack direction="row" spacing={1}>
                    <Chip label=" Shop All" variant="outlined" />
                    <Chip label="Chrome Hearts" variant="outlined" />
                    <Chip label="Balenciaga" variant="outlined" />
                    <Chip label="Casual Chic" variant="outlined" />
                  </Stack>
                </div>
              </div>
            </div>
            {/* -----------------------shop by style------------------------- */}
            <div className="shop-by-style mt-3">
              <h3>Shop by Style</h3>
              <div className="row">
                {marketPlaceCategory?.shop_by_style?.length ? (
                  marketPlaceCategory?.shop_by_style.map((item, index) => (
                    <div
                      className="col-6 col-md-3 d-flex justify-content-center"
                      key={index}
                    >
                      <Link
                        to={`/categories-type/${item?._id}`}
                        className="text-decoration-none w-100"
                      >
                        <div className="style-item">
                          <div className="image-container rounded-top-pill">
                            <img
                              src={item.images[0] || blank_img}
                              alt={item.name}
                              className="img-fluid" />
                          </div>
                          <p className="style-text rounded-bottom-pill fw-bold">
                            {item?.name}
                          </p>
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
                    <div
                      className="col-6 col-md-3 d-flex justify-content-center"
                      key={index}
                    >
                      <Link
                        to={`/categories-type/${item?._id}`}
                        className="text-decoration-none w-100"
                      >
                        <div className="style-item">
                          <div className="image-container rounded-top-pill">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="img-fluid" />
                          </div>
                          <p className="style-text rounded-bottom-pill fw-bold">
                            {item?.name}
                          </p>
                        </div>
                      </Link>
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
                    <div
                      className="col-6 col-md-3 d-flex justify-content-center"
                      key={index}
                    >
                      <Link
                        to={`/categories-type/${item?._id}`}
                        className="text-decoration-none w-100"
                      >
                        <div className="style-item">
                          <div className="image-container rounded-top-pill">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="img-fluid" />
                          </div>
                          <p className="style-text rounded-bottom-pill fw-bold">
                            {item?.name}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>No womenswear available</p>
                )}
              </div>
            </div>

            {/* -----------------------Featured Collection------------------------- */}
            {/* <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              className="swiper-types-custom"
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              <div className="d-flex flex-nowrap">
                {featuredCollection.map((style, index) => (
                  <SwiperSlide key={index}>
                    <div className="col flex-shrink-0">
                      <div>
                        <div>
                          <img
                            src={style.imgSrc}
                            className="w-100 h-100"
                            style={{
                              borderTopRightRadius: "60px",
                              borderTopLeftRadius: "60px",
                            }}
                            alt={style.name} />
                        </div>
                        <h6
                          className="text-white d-flex justify-content-center align-items-center w-100 h-100 py-4"
                          style={{
                            backgroundColor: "#4C4C4C",
                            borderBottomRightRadius: "60px",
                            borderBottomLeftRadius: "60px",
                          }}
                        >
                          {style.name}
                        </h6>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper> */}
          </div></>
      )}
    </>
  );
};

export default MarketPlace;
