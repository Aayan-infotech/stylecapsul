import React, { useEffect, useState } from "react";
import notification from "../../assets/closetmanagement/Group 1806.png";
import closet from "../../assets/closetmanagement/closet.png";
import coinhand from "../../assets/closetmanagement/coin-hand.png";
import imagefocus from "../../assets/closetmanagement/image-focus.png";
import SwipeRightAltIcon from '@mui/icons-material/SwipeRightAlt';
import facebook from "../../assets/closetmanagement/facebook.png";
import instagram from "../../assets/closetmanagement/instagram.png";
import tiktok from "../../assets/closetmanagement/tiktok.png";
import twitter from "../../assets/closetmanagement/twiter.png";
import { Link } from "react-router-dom";
import "../../components/ClossetDetails/CalendarStyleCapsule.scss";
import axios from "axios";
import { getCookie } from "../../utils/cookieUtils";
import { FaCheckCircle } from "react-icons/fa";
import Loader from "../Loader/Loader";
import { apiUrl } from "../../../apiUtils";

export const ClossetDetails = () => {
  const [showFavourite, setShowFavourite] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [cardDetails, setCardDetails] = useState([]);

  const token = getCookie("authToken");


  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(apiUrl("api/closet/get-closet"));
      if (response?.data?.status === 200 &&
        response?.data?.success === true) {
        setCategories(response?.data?.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchFavouriteDesiner = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl('api/stylist/getFav'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (response?.data?.success) {
        setShowFavourite(response?.data?.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorite designers:", error);
      setLoading(false);
    }
  };

  const fetchCardDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl('api/order/payment-cards'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (response?.data?.success) {
        setCardDetails(response?.data?.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorite designers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavouriteDesiner();
    fetchCardDetails();
  }, []);

  const allProfileImages1 = showFavourite.reduce((acc, curr, index) => {
    const chunkIndex = Math.floor(index / 3);
    if (!acc[chunkIndex]) acc[chunkIndex] = [];
    acc[chunkIndex].push(curr);
    return acc;
  }, []);

  const handleSelectDesigner = (designerId) => {
    setSelectedDesigner((prev) => (prev === designerId ? null : designerId));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="d-flex justify-content-center align-items-center close-management-details-container">
          <div className="container w-75">
            <div className="row g-4">
              <h1 className="text-center fw-bold fs-1">Details</h1>
              {categories?.length > 0 ? (
                categories.map((item, index) => (
                  <div className="col-md-6" key={index}>
                    <Link
                      to={`/all-clothes-list/${item?._id}`}
                      state={{ category_name: item?.name }}
                      className="text-decoration-none"
                    >
                      <div className="p-4 text-white text-center rounded" style={{ backgroundColor: "rgb(76, 76, 76)" }}>
                        <img
                          src={coinhand || blank_img}
                          alt="Category Icon"
                          className="mb-4"
                        />
                        <h4 className="card-title fw-bold">{item?.name}</h4>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p className="text-muted fw-bold">No categories found</p>
                </div>
              )}
              {/* -------------------------------Favorite Designer--------------- */}
              <div className="mt-4">
                <h1 className="fw-bold fs-1 mt-2">Favorite Designer</h1>
                <div className="row g-2 mt-2">
                  {allProfileImages1.length > 0 ? (
                    allProfileImages1.map((imageSet, index) => (
                      <div key={index} className="col-12 col-md-4 mb-2 mb-md-0">
                        {imageSet.map((designer, imgIndex) => (
                          <div
                            key={designer._id}
                            className={`position-relative ${imgIndex > 0 ? "mt-2" : ""}`}
                            onClick={() => handleSelectDesigner(designer._id)}
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={designer.profilePicture}
                              alt={`Closet ${imgIndex}`}
                              className="img-fluid"
                            />
                            {selectedDesigner === designer._id && (
                              <FaCheckCircle
                                className="position-absolute top-0 end-0 text-success"
                                size={24}
                                style={{ margin: "5px" }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="mt-2">
                      <h4>Your Style Journey Awaits!</h4>
                      <p className="text-muted">
                        You haven't marked any designer as your favorite yet. Discover a world of creative styles and unique fashion statements curated just for you.
                        Dive in, explore, and select the designers who inspire your fashion sense!
                      </p>
                      <Link to="/stylist" className="text-black text-decoration-none">
                        <p className="fw-bold">
                          Let your style story begin by choosing your favorite designers!
                          stylist{" "}<SwipeRightAltIcon />
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              {/* -------------------------------Favorite Searches--------------- */}
              <div className="mt-4">
                <h1 className="fw-bold fs-1 mt-2">Favorite Searches</h1>
                {allProfileImages1 && allProfileImages1.length > 0 ? (
                  <div className="row g-2 mt-2">
                    {allProfileImages1.map((imageSet, index) => (
                      <div key={index} className="col-12 col-md-4 mb-2 mb-md-0">
                        {imageSet.map((src, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={src}
                            alt={`Closet ${imgIndex}`}
                            className={`img-fluid ${imgIndex > 0 ? "mt-2" : ""}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3">
                    <h3 className="fw-bold">Your Style Exploration Awaits!</h3>
                    <p className="text-muted">
                      You haven't marked any search as your favorite yet. Unlock a world of trendy fashion insights and personalized search results crafted just for you. Start exploring, experimenting, and saving the searches that shape your unique style!
                    </p>
                    <p className="fw-bold">Let your fashion quest begin by selecting your favorite searches!</p>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <h4>Credit Cards & Debit Cards</h4>
                <div className="row">
                  <div className="col-12">
                    <div className="card-section p-3 d-flex flex-column">
                      {cardDetails?.length > 0 ? (
                        cardDetails.map((card, index) => (
                          <div key={index} className="card-item d-flex justify-content-between align-items-center mb-2 text-muted">
                            <div>XXXX&nbsp;XXXX&nbsp;XXXX&nbsp;{card?.paymentDetails?.transactionDetails?.payment_method?.card?.last4}</div>
                            <div>Used on {new Date(card?.paymentDetails?.transactionDetails?.payment_method?.created * 1000).toLocaleDateString()}</div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 text-center">
                          <p className="text-muted fw-bold">no details available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Media Section */}
                <h4 className="mt-4">Social Media associated</h4>
                <div className="container">
                  <div className="row social-icons">
                    <div className="col text-center">
                      <a
                        href="https://www.facebook.com/thestylecapsuleonlineboutique/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={facebook} alt="Facebook" className="icon-img" />
                      </a>
                    </div>
                    <div className="col text-center">
                      <a
                        href="https://www.instagram.com/thestylecapsule/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer">
                        <img src={instagram} alt="Instagram" className="icon-img" />
                      </a>
                    </div>
                    <div className="col text-center">
                      <a
                        href="https://www.tiktok.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={tiktok} alt="TikTok" className="icon-img" />
                      </a>
                    </div>
                    <div className="col text-center">
                      <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={twitter} alt="Twitter" className="icon-img" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      )}
    </>
  );
};
