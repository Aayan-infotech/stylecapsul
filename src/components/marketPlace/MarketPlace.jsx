// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ellipse from "../../assets/marketplace/Ellipse1.png";
import one from "../../assets/marketplace/one.mp4";
import blank_img from "../../assets/stylist/blank_img.jpg";
import "../../styles/MarketPlace.scss";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import Loader from "../Loader/Loader.jsx";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarts } from "../../reduxToolkit/addcartSlice.js";
import { getCookie } from "../../utils/cookieUtils.js";

const MarketPlace = () => {
  const [marketPlaceCategory, setMarketPlaceCategory] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(0)
  const [trendySearch, setTrendySearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const token = getCookie("authToken");

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

  const fetchTrendySearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        apiUrl("api/marketplaces/trendySearch"),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.success) {
        setTrendySearch(response?.data?.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTrendySearch();
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      await dispatch(getAllCarts());
    };
    fetchItem();
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartQuantity(existingCart.length);
    }
  }, [token]);

  const getTotalProductCount = () => {
    if (token) {
      return Array.isArray(cart)
        ? cart.reduce((total, item) => total + item.items.length, 0)
        : 0;
    } else {
      return cartQuantity;
    }

  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <>
            <div className="outer-navbar">
              <div className="navbar d-flex justify-content-between align-items-center p-2">
                <div className="navbar-left d-flex mb-0">
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
                <div className="navbar-center text-center flex-grow-1 mt-0">
                  <h1 className="title mb-0">Market Place</h1>
                </div>
                <div className="navbar-right d-flex">
                  <i className="fa-regular fa-bell me-2"></i>
                  <Link to={token ? "/cart" : "/myaddedproducts"} className="text-decoration-none text-white">
                    <div className="cart-icon position-relative">
                      <i className="fa-solid fa-cart-shopping"></i>
                      <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                        {getTotalProductCount()}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="landing1" style={{ position: "relative" }}>
              <div className="vid">
                <video src={one} alt="Video" autoPlay loop muted className="w-100"></video>
              </div>
            </div>
            <div className="landing2" style={{ position: "absolute", color: "white" }}>
              <div class="marquee-wrapper">
                <div class="marquee">
                  <p>REVOLUTIONIZE YOUR CLOSET</p>
                  <p>REVOLUTIONIZE YOUR CLOSET</p>
                  <p>REVOLUTIONIZE YOUR CLOSET</p>
                  <p>REVOLUTIONIZE YOUR CLOSET</p>
                  <p>REVOLUTIONIZE YOUR CLOSET</p>
                  <p>REVOLUTIONIZE YOUR CLOSET</p>
                  <p>REVOLUTIONIZE YOUR CLOSET</p>
                </div>
              </div>
            </div>
          </>
          <div
            className="container w-75 mt-4 trending-searches-section "
            style={{ display: "block" }}
          >
            {/* Trending Searches */}
            <div className="trending-searches pt-4">
              <h3>Trending Searches</h3>
              <div className="row m-0">
                <div className="col d-flex justify-content-start gap-3 overflow-control flex-wrap flex-row">
                  {trendySearch?.length > 0 ? (
                    trendySearch?.map((item, index) => (
                      <Stack direction="row" spacing={1} key={index}>
                        <Chip
                          avatar={<img src={item?.image} className="rounded-pill" alt="no image available"
                            onError={(e) => {
                              e.target.src = blank_img;
                            }} />}
                          label={item?.name}
                          variant="outlined"
                          className="p-2"
                        />
                      </Stack>
                    ))
                  ) : (
                    <div className="text-muted">Not trending available</div>
                  )}
                </div>
              </div>
            </div>
            {/* -----------------------shop by style------------------------- */}
            <div className="shop-by-style mt-3">
              <h3>Shop by Style</h3>
              <div className="row">
                {marketPlaceCategory?.shop_by_style?.length ? (
                  marketPlaceCategory?.shop_by_style.map((item, index) => (
                    <div className="col-6 col-md-3 d-flex justify-content-center" key={index}>
                      <Link to={`/categories-type/${item?._id}`} className="text-decoration-none w-100">
                        <div className="style-item">
                          <div className="image-container rounded-top-pill">
                            <img src={item.images?.[0] || blank_img} alt={item.name} className="img-fluid" onError={(e) => { e.target.onerror = null; e.target.src = blank_img; }} />
                          </div>
                          <p className="style-text rounded-bottom-pill fw-bold">
                            {item?.name}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-center">
                    Styles are currently being curated. Please check back soon for the latest fashion inspirations!
                  </p>
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
                      <Link to={`/categories-type/${item?._id}`} className="text-decoration-none w-100">
                        <div className="style-item">
                          <div className="image-container rounded-top-pill">
                            <img src={item.images[0]} alt={item.name} className="img-fluid" onError={(e) => { e.target.onerror = null; e.target.src = blank_img; }} />
                          </div>
                          <p className="style-text rounded-bottom-pill fw-bold">
                            {item?.name}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-center w-100 py-4">
                    We're currently curating the best menswear styles for you. Check back soon for a fresh collection!
                  </p>
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
                      <Link to={`/categories-type/${item?._id}`} className="text-decoration-none w-100">
                        <div className="style-item">
                          <div className="image-container rounded-top-pill">
                            <img src={item.images[0]} alt={item.name} className="img-fluid" onError={(e) => { e.target.onerror = null; e.target.src = blank_img; }} />
                          </div>
                          <p className="style-text rounded-bottom-pill fw-bold">
                            {item?.name}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-muted fst-italic text-center w-100 mt-3">
                    Our womenswear collection is getting a stylish update. Check back soon to discover the latest trends!
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MarketPlace;
