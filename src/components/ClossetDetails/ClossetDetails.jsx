import React, { useEffect, useState } from "react";
import notification from "../../assets/closetmanagement/Group 1806.png";
import closet from "../../assets/closetmanagement/closet.png";
import coinhand from "../../assets/closetmanagement/coin-hand.png";
import imagefocus from "../../assets/closetmanagement/image-focus.png";
import fav1 from "../../assets/closetmanagement/fav1.png";
import fav2 from "../../assets/closetmanagement/fav2.png";
import fav3 from "../../assets/closetmanagement/fav3.png";
import fav4 from "../../assets/closetmanagement/fav4.png";
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

const cardData = [
  {
    id: 1,
    image: notification,
    title: "Clothes",
    imageAlt: "Notification",
    imageStyle: { width: "50px", height: "45px" },
    url: "/all-clothes-list/clothes",
  },
  {
    id: 2,
    image: closet,
    title: "Shoes",
    imageAlt: "closet",
    imageStyle: { width: "50px", height: "45px" },
    url: "/all-clothes-list/shoes",
  },
  {
    id: 3,
    image: coinhand,
    title: "Accessories",
    imageAlt: "coinhand",
    imageStyle: { width: "50px", height: "45px" },
    url: "/all-clothes-list/accessories",
  },
  {
    id: 4,
    image: imagefocus,
    title: "Miscellaneous",
    imageAlt: "imagefocus",
    imageStyle: { width: "50px", height: "45px" },
    url: "/all-clothes-list/miscellaneous",
  },
];


export const ClossetDetails = () => {
  const [showFavourite, setShowFavourite] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = getCookie("authToken");

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


  useEffect(() => {
    fetchFavouriteDesiner();
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
          <div className="container w-50">
            <div className="row g-4">
              <h1 className="text-center fw-bold fs-1">Details</h1>
              {cardData.map((item, index) => (
                <div className="col-md-6" key={index}>
                  <Link to={item.url} className="text-decoration-none">
                    <div className="p-4 text-white text-center rounded" style={{ backgroundColor: "#4C4C4C" }}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          className="mb-4"
                          style={item.imageStyle}
                        />
                      )}
                      <h4 className="card-title fw-bold">{item.title}</h4>
                    </div>
                  </Link>
                </div>
              ))}
              {/* -------------------------------Favorite Designer--------------- */}
              <div className="mt-4">
                <h1 className="fw-bold fs-1 mt-2">Favorite Designer</h1>
                <div className="row g-2 mt-2">
                  {allProfileImages1.map((imageSet, index) => (
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
                  ))}
                </div>
              </div>
              {/* -------------------------------Favorite Searches--------------- */}
              <div className="mt-4">
                <h1 className="fw-bold fs-1 mt-2">Favorite Searches</h1>
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
              </div>
              <div className="mt-4">
                <h4>Credit Cards & Debit Cards</h4>
                <div className="row">
                  <div className="col-12">
                    <div className="card-section p-3 d-flex flex-column">
                      {["xxx7676x77897", "xxx7676x77897", "xxx7676x77897"].map(
                        (card, index) => (
                          <div
                            key={index}
                            className="card-item d-flex justify-content-between align-items-center mb-2"
                          >
                            <div>{card}</div>
                            <div>Used on 22/08/21</div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Media Section */}
                <h4 className="mt-4">Social Media associated</h4>
                <div className="row social-icons">
                  <div className="col text-center">
                    <a
                      href="https://www.facebook.com/discountDoor/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={facebook} alt="Facebook" className="icon-img" />
                    </a>
                  </div>
                  <div className="col text-center">
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
      )}
    </>
  );
};
