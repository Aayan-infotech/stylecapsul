import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import axios from "axios";
import { loginUser } from "../../reduxToolkit/loginSlice";
import { apiUrl } from "../../../apiUtils";
import blank_img from "../../assets/stylist/blank_img.jpg";
import { showErrorToast } from "../toastMessage/Toast";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [popularsProducts, setPopularsProducts] = useState([]);
  const token = useSelector((state) => state?.login?.token);

  const services = [
    { id: 1, imgSrc: three, alt: "Closet Icon", text: "Closet Management" },
    { id: 2, imgSrc: four, alt: "Closet Icon", text: "My Style Capsule" },
    { id: 3, imgSrc: five, alt: "Closet Icon", text: "Market Place" },
    { id: 4, imgSrc: six, alt: "Closet Icon", text: "Stylist" },
  ];

  const products = [
    { id: 1, src: seven, title: "Blue Jeans", price: "$28" },
    { id: 2, src: eight, title: "Blue Jeans", price: "$28" },
    { id: 3, src: nine, title: "Blue Jeans", price: "$28" },
    { id: 4, src: ten, title: "Blue Jeans", price: "$28" },
  ];

  const handleServiceClick = (route) => {
    if (!token) {
      showErrorToast("You need to log in first!")
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
                    <button
                      type="button"
                      className="btn btn-outline-dark explore_btn rounded-pill me-2"
                    >
                      <i className="fa-regular fa-compass fs-5 me-2"></i>
                      <span>Explore</span>
                    </button>
                  </Link>
                  <div className="navbar-right">
                    <i className="fa-regular fa-bell"></i>
                    {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                    <i className="fa-solid fa-cart-shopping"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="landing1">
              <div className="vid">
                <video src={one} alt="Video" autoPlay loop muted />
              </div>

              <div className="capsule">
                <p>
                  Create Your Capsule{" "}
                  <i className="fa-solid fa-arrow-right-long"></i>
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
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="col-12 col-md-6 mt-4 mb-md-0 d-flex justify-content-center align-items-center"
                  >
                    <div
                      className="closet-management"
                      onClick={() => handleServiceClick(service?.route)}
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
                <h2 className="text-center fw-bold">Popular Products</h2>
                {popularsProducts?.map((product, index) => (
                  <div key={index} className="col-12 col-md-6 mt-4">
                    <div className="product-card">
                      <div className="image-container">
                        <img
                          src={product?.image || blank_img}
                          alt={product?.name}
                        />
                      </div>
                      <div className="text-container">
                        <div className="info">
                          <h6>
                            {product?.name
                              ? product.name.length > 25
                                ? `${product.name.slice(0, 25)}...`
                                : product.name
                              : "N/A"}
                          </h6>

                          <div className="description-price">
                            <p>
                              {" "}
                              {product?.description
                                ? product.description.length > 40
                                  ? `${product.description.slice(0, 40)}...`
                                  : product.description
                                : "N/A"}{" "}
                            </p>
                            <div className="price">
                              ${product?.price || "N/A"}
                            </div>
                          </div>
                        </div>
                        <div className="actions">
                          <button
                            className="add-to-cart"
                            onClick={() => handleServiceClick(product?.route)}
                          >
                            Add to cart
                          </button>
                          <button
                            className="buy"
                            onClick={() => handleServiceClick(product?.route)}
                          >
                            Buy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
