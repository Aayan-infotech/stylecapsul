import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/StylistDetails.scss";
import blank_image from "../../assets/stylist/blank_img.jpg";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { getCookie } from "../../utils/cookieUtils";
import Loader from "../Loader/Loader";

const StylistDetails = () => {
  const [showStylistProfileDetails, setSshowStylistProfileDetails] =
    useState(null);
  const [vendorDetails, setVendorDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const token = getCookie("authToken");
  const userId = getCookie("userId");

  const ratingsData = [
    { stars: 5, percentage: 70, count: 488 },
    { stars: 4, percentage: 62, count: 74 },
    { stars: 3, percentage: 53, count: 14 },
    { stars: 2, percentage: 30, count: 10 },
    { stars: 1, percentage: 16, count: 5 },
  ];

  const location = useLocation();
  const profile_details = location.state?.stylist;

  useEffect(() => {
    setLoading(true);
    if (profile_details) {
      setSshowStylistProfileDetails(profile_details);
    }
    setLoading(false);
  }, [profile_details]);

  const fullStars = Math.floor(profile_details?.ratings);
  const hasHalfStar = profile_details?.ratings % 1 !== 0;
  const totalStars = 5;

  const workHistory = [
    {
      role: "Fashion Designer",
      company: "Elegance Couture",
      location: "New York, NY",
      duration: "2021 – Present",
      description:
        "- Designed seasonal collections and oversaw garment production.",
    },
    {
      role: "Stylist",
      company: "Vogue Boutique",
      location: "Los Angeles, CA",
      duration: "2019 – 2021",
      description:
        "- Styled clients for events and curated looks for photoshoots.",
    },
    {
      role: "Fashion Design Intern",
      company: "Urban Threads",
      location: "San Francisco, CA",
      duration: "2018 – 2019",
      description:
        "- Assisted in sketching designs and preparing for photoshoots.",
    },
  ];

  const reviews = [
    {
      date: "Dec 20, 2024",
      stars: 3,
      reviewer: "Abinash Sinha",
      role: "Software Developer",
      review:
        "Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge, and being a part of a team that's revolutionizing how people achieve their goals is immensely fulfilling.",
    },
    {
      date: "Jan 20, 2024",
      stars: 5,
      reviewer: "Alex K.",
      role: "Senior Analyst",
      review:
        "Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge, and being a part of a team that's revolutionizing how people achieve their goals is immensely fulfilling.",
    },
  ];

  const fetchVendorDetials = async () => {
    try {
      const response = await axios.get(apiUrl("api/stylist/vendor-details"), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.data?.success) {
        setVendorDetails(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching clothes data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchVendorDetials();
    }
  }, [userId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="stylist-main-container-sections">
          <div className="container w-75">
            <div className="row gx-4">
              <div className="col-12">
                <h1 className="fw-bold fs-1 text-center text-md-start">
                  Stylist
                </h1>
              </div>
              <div className="col-12 col-md-3">
                <img
                  src={profile_details?.profilePicture || blank_image}
                  className="stylist-profile-image rounded-pill"
                  alt="Stylist"
                />
              </div>
              <div className="col-12 col-md-8">
                <div className="d-flex justify-content-between align-items-center mt-5">
                  <h4 className="fw-bold fs-3">{profile_details?.name}</h4>
                  <div className="d-flex">
                    {[...Array(totalStars)].map((_, index) => {
                      if (index < fullStars) {
                        return (
                          <i
                            key={index}
                            className="fa fa-star text-warning"
                          ></i>
                        );
                      }
                      if (index === fullStars && hasHalfStar) {
                        return (
                          <i
                            key={index}
                            className="fa fa-star-half-alt text-warning"
                          ></i>
                        );
                      }
                      return (
                        <i
                          key={index}
                          className="fa fa-star text-secondary"
                        ></i>
                      );
                    })}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Outfit Planning</h5>
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-dark me-2 rounded-pill"
                      style={{
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                        width: "60px",
                      }}
                    >
                      <i className="fa-solid fa-user-plus"></i>
                    </button>
                    <Link
                      // stylist-list (old route)
                      to={{ pathname: `/chat` }}
                      state={{ profile_details }}
                      className="text-decoration-none w-100"
                    >
                      <button
                        type="button"
                        className="btn btn-outline-dark rounded-pill"
                        style={{
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                          width: "60px",
                        }}
                      >
                        <i className="fa-solid fa-message"></i>
                      </button>
                    </Link>
                  </div>
                </div>
                <div align="center" className="mt-5">
                  <Link to="/categories-type" className="text-decoration-none">
                    <button
                      type="button"
                      className="btn hire-custom-btn rounded-pill p-2"
                    >
                      Hire
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <h4 className="fw-bold fs-4">Description</h4>
                <p>{profile_details?.description}</p>
                <h4 className="fw-bold fs-4">Skills</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <h4 className="fw-bold fs-4">Work History</h4>
                {workHistory.map((job, index) => (
                  <div key={index}>
                    <h6 className="fw-bold fs-6">{job.role}</h6>
                    <p>
                      <strong>{job.company}</strong> | {job.location}{" "}
                      {job.duration}
                    </p>
                    <p>{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-12 mt-4">
                  <h2 className="fw-bold">Reviews</h2>
                </div>
              </div>
              <div className="row gx-4 my-4">
                <div className="col-12 col-md-4">
                  <h6 className="fw-bold">Employee Reviews</h6>
                  <div className="display-4 fw-bold">4.7</div>
                  <div className="d-flex my-2">
                    {[...Array(5)].map((_, index) => (
                      <i
                        key={index}
                        className={`fa fa-star ${
                          index < 4
                            ? "text-warning"
                            : "fa-star-half-alt text-warning"
                        }`}
                      ></i>
                    ))}
                  </div>
                  <p className="text-h6 text-muted mt-2">(578 Reviews)</p>
                </div>
                <div className="col-12 col-md-8">
                  {ratingsData.map((rating, index) => (
                    <div
                      className="row align-items-center gx-1 mb-2"
                      key={index}
                    >
                      <div className="col-12 col-md-2 d-flex justify-content-md-end justify-content-start">
                        <h6 className="mb-0 fw-normal">{rating.stars} stars</h6>
                      </div>
                      <div className="col-12 col-md-8">
                        <div
                          className="progress flex-grow-1"
                          style={{ height: "6px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${rating.percentage}%`,
                              backgroundColor: "#E7B66B",
                            }}
                            aria-valuenow={rating.percentage}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                      <div className="col-12 col-md-2 d-flex justify-content-md-start justify-content-end">
                        <h6 className="mb-0">{rating.count}</h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="row mt-4">
                {reviews.map((review, index) => (
                  <div key={index} className="col-12 mt-2">
                    <span className="text-muted">{review.date}</span>
                    <div className="d-flex align-items-center mb-3">
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fa fa-star ${
                            index < review.stars ? "text-warning" : ""
                          }`}
                        ></i>
                      ))}
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <div
                          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                          style={{ width: "50px", height: "50px" }}
                        >
                          {review.reviewer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </div>
                      <div>
                        <h6 className="m-0">{review.reviewer}</h6>
                      </div>
                    </div>
                    <div>
                      <small className="text-muted">{review.role}</small>
                      <p>{review.review}</p>
                    </div>
                  </div>
                ))}
                <hr className="text-muted mt-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StylistDetails;
