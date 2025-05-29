import React, { useEffect, useRef, useState } from "react";
import "./LandingPage.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import one from "./img/one.mp4";
import two from "./img/two.png";
import three from "./img/three.png";
import four from "./img/four.png";
import five from "./img/five.png";
import six from "./img/six.png";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import blank_img from "../../assets/stylist/blank_img.jpg";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";
import { CircularProgress } from "@mui/material";
import { Visibility } from "@mui/icons-material";

const LandingPage = () => {
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [popularsProducts, setPopularsProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const location = useLocation();
  const token = useSelector((state) => state?.login?.token);
  const navigate = useNavigate();
  const cartIconRef = useRef(null);

  const services = [
    { id: 1, imgSrc: three, alt: "Closet Icon", text: "Closet Management", route: "/closet-management" },
    { id: 2, imgSrc: four, alt: "Closet Icon", text: "My Style Capsule", route: "/my-style-capsule" },
    { id: 3, imgSrc: five, alt: "Closet Icon", text: "Market Place", route: "/market-place" },
    { id: 4, imgSrc: six, alt: "Closet Icon", text: "Stylist", route: "/stylist" }, // Stylist route specified
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("sessionExpired")) {
      if (params.get("sessionExpired")) {
        showErrorToast("⚠️ Your session has expired. Please log in again.")
      }
    }
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }, [location.search]);

  const handleServiceClick = (route, text) => {
    if (text === "Stylist" || text === "Market Place") {
      navigate(route);
      return;
    }
    if (!token) {
      showErrorToast("You need to log in first!");
      navigate('/login');
    } else {
      navigate(route);
    }
  };
  const fetchPopularsSubCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        apiUrl("api/marketPlaceSubcat/popularSubcats")
      );
      if (response?.data?.success) {
        setPopularsProducts(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularsSubCategory();
  }, []);

  const handleAddToCart = async (product) => {
    setLoadingProductId(product.id);
    try {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const productIndex = existingCart.findIndex((item) => item.id === product.id && item.name === product.name);
      if (productIndex !== -1) {
        existingCart[productIndex].quantity += 1;
      } else {
        existingCart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(existingCart));
      setCartQuantity(existingCart.reduce((acc, item) => acc + item.quantity, 0));
      showSuccessToast("Product added to cart!");
      if (cartIconRef.current) {
        cartIconRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProductId(null);
    }
  };

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartQuantity(existingCart.length);
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="main-landing-page-home">
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
                <div className="d-flex align-items-center">
                  <Link to="/login" className="text-decoration-none text-black">
                    <button type="button" className="btn btn-outline-dark explore_btn rounded-pill me-2">
                      <i className="fa-regular fa-compass fs-5 me-2"></i>
                      <span>Explore</span>
                    </button>
                  </Link>
                  <div className="navbar-right position-relative">
                    <Link to="/myaddedproducts">
                      <div className="cart-icon position-relative" ref={cartIconRef}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                          {cartQuantity}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="landing1">
              <div className="vid">
                <video src={one} alt="Video" autoPlay loop muted />
              </div>

              <div className="capsule">
                <Link to="/login" className="text-black text-decoration-none">
                  <p>
                    Create Your Capsule
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </p>
                </Link>
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

            <div className="container custom-container h-100">
              <div className="row gx-5">
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                  <div className="p-2">
                    <h2 className="text-size">
                      Most of us don't wear 82% of our closet contents.*
                    </h2>
                  </div>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                  <img src={two} height={400} alt="" />
                </div>
              </div>

              {/* -----------------------------service-------------------------- */}
              <div className="row gx-md-5 mt-5">
                <h2 className="fw-bold fs-1 text-center">Services</h2>
                {services?.map((service) => (
                  <div
                    key={service.id}
                    className="col-12 col-md-6 mt-4 mb-md-0 d-flex justify-content-center align-items-center"
                  >
                    <div
                      className="closet-management"
                      onClick={() => handleServiceClick(service.route, service.text)}
                    >
                      <div className="image">
                        <img src={service.imgSrc} alt={service.alt} />
                      </div>
                      <div className="text fw-bold">{service.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="container landing5 mt-5">
              <div className="row">
                {selectedProduct ? (
                  <div className="col-12">
                    <div className="product-detail">
                      <div className="product-detail-card d-flex">
                        <img src={selectedProduct?.image || blank_img} height={300} alt={selectedProduct?.name} onError={(e) => (e.target.src = blank_img)} className="rounded-pill" />
                        <div className="p-4 mt-3">
                          <h4>{selectedProduct?.name || 'N/A'}</h4>
                          <div className="price"><strong>Price:</strong> ${selectedProduct?.price || 'N/A'}</div>
                          <div>
                            <strong>Brand:</strong> {selectedProduct?.brand || 'N/A'}
                          </div>
                          <div>
                            <strong>Views:</strong> {selectedProduct?.viewCount || '0'}
                          </div>
                          <div>
                            <strong>Created At:</strong> {selectedProduct?.createdAt ? new Date(selectedProduct.createdAt).toLocaleString() : 'N/A'}
                          </div>
                          <div className="d-flex gap-2 mt-3">
                            <button className="btn btn-dark rounded-pill" onClick={() => handleAddToCart(selectedProduct)} disabled={loadingProductId === selectedProduct?.id}>
                              {loadingProductId === selectedProduct?.id ? (
                                <CircularProgress size={20} color="inherit" />
                              ) : (
                                'Add to cart'
                              )}
                            </button>
                            <button onClick={handleBackToList} className="btn btn-dark rounded-pill">
                              Back to Products
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-center fw-bold">Popular Products</h2>
                    {popularsProducts && popularsProducts.length > 0 ? (
                      popularsProducts.map((product, index) => (
                        <div key={index} className="col-12 col-md-6 mt-4">
                          <div className="product-card">
                            <div className="image-container">
                              <img src={product?.image || blank_img} alt={product?.name} onError={(e) => (e.target.src = blank_img)} />
                            </div>
                            <div className="text-container">
                              <div className="info">
                                <h6>  {product?.name ? product.name.length > 25 ? `${product.name.slice(0, 25)}...` : product.name : 'N/A'}
                                </h6>
                                <div className="description-price">
                                  <p>  {product?.description ? product.description.length > 40 ? `${product.description.slice(0, 40)}...` : product.description : 'N/A'}
                                  </p>
                                  <div className="price">${product?.price || 'N/A'}</div>
                                </div>
                              </div>
                              <div className="actions">
                                <button className="add-to-cart" onClick={() => handleAddToCart(product)} disabled={loadingProductId === product.id}>
                                  {loadingProductId === product.id ? (
                                    <CircularProgress size={20} color="inherit" />
                                  ) : (
                                    'Add to cart'
                                  )}
                                </button>
                                <button className="btn btn-dark rounded-pill" onClick={() => handleProductClick(product)}>
                                  <Visibility /> View
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center mt-5">
                        <h5>No popular products available at the moment.</h5>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default LandingPage;
