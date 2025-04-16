import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../../styles/StylistDetails.scss";
import blank_image from "../../assets/stylist/blank_img.jpg";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { getCookie } from "../../utils/cookieUtils";
import Loader from "../Loader/Loader";
import SendIcon from "@mui/icons-material/Send";
import { Button, Rating } from "@mui/material";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const StylistDetails = () => {
  const [showStylistProfileDetails, setSshowStylistProfileDetails] =
    useState(null);
  const [vendorDetails, setVendorDetails] = useState({});
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const { stylistId } = useParams();

  const token = getCookie("authToken");
  const userId = getCookie("userId");
  const navigate = useNavigate();

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

  const fetchVendorDetails = async () => {
    try {
      const response = await axios.get(
        apiUrl(`api/stylist/stylist-profile/${stylistId}`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // if (response?.data?.status === true) {
      setVendorDetails(response?.data);
      // }
    } catch (error) {
      console.error("Error fetching vendor details:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!comment.trim() || rating === 0) {
      setError("Please provide both a review comment and rating.");
      return;
    }
    setError("");
    try {
      const response = await axios.post(apiUrl("api/review/create"), {
        stylistId: stylistId,
        comment: comment,
        ratings: rating,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
      );
      if (response?.data?.success === true && response?.data?.status === 200) {
        showSuccessToast(response?.data?.message || "Review submitted successfully!");
        setComment("");
        setRating(0);
      } else {
        showErrorToast(response?.data?.message || "Failed to submit review.");
      }
      fetchVendorDetails();
    } catch (error) {
      console.error("Error submitting review:", error);
      showErrorToast("Something went wrong while submitting review.");
    }
  };


  useEffect(() => {
    if (stylistId && token) {
      fetchVendorDetails();
    }
  }, [stylistId, token]);

  const averageRating = vendorDetails?.averageRating?.[0]?.averageRating;

  const handleClickToChat = () => {
    if (token) {
      navigate("/chat", { state: { profile_details: profile_details } });
    } else {
      navigate("/login", { state: { fromChat: true, profile_details: profile_details, }, });
    }
  };

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
                  src={vendorDetails?.stylist?.profilePicture || blank_image}
                  className="stylist-profile-image rounded-pill"
                  alt="Stylist"
                />
              </div>
              <div className="col-12 col-md-8">
                <div className="d-flex justify-content-between align-items-center mt-5">
                  <h4 className="fw-bold fs-3">
                    {vendorDetails?.stylist?.name}
                  </h4>
                  <div className="d-flex">
                    {[...Array(totalStars)].map((_, index) => {
                      if (index < fullStars) {
                        return (
                          <i key={index} className="fa fa-star text-warning"></i>
                        );
                      }
                      if (index === fullStars && hasHalfStar) {
                        return (
                          <i key={index} className="fa fa-star-half-alt text-warning"></i>
                        );
                      }
                      return (
                        <i key={index} className="fa fa-star text-secondary"></i>
                      );
                    })}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Outfit Planning</h5>
                  <div>
                    <button type="button" className="btn btn-outline-dark me-2 rounded-pill" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", width: "60px", }}>
                      <i className="fa-solid fa-user-plus"></i>
                    </button>
                    <button type="button" onClick={handleClickToChat} className="btn btn-outline-dark rounded-pill" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", width: "60px", }}>
                      <i className="fa-solid fa-message"></i>
                    </button>
                  </div>
                </div>
                <div align="center" className="mt-5">
                  <button type="button" className="btn hire-custom-btn rounded-pill p-2">
                    Hire
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <h4 className="fw-bold fs-4">Description</h4>
                <p>{vendorDetails?.stylist?.description}</p>
                <h4 className="fw-bold fs-4">Skills</h4>
                <p>
                  {vendorDetails?.stylist?.specialization?.map(
                    (item, index) => (
                      <span key={index}>  {item}  {index !== vendorDetails.stylist.specialization.length - 1 && ", "}
                      </span>
                    )
                  )}
                </p>

                <h4 className="fw-bold fs-4">Work History</h4>
                {vendorDetails?.stylist?.workHistory?.map((job, index) => (
                  <div key={index}>
                    <h6 className="fw-bold fs-6">{job?.title || "N/A"}</h6>
                    <p>
                      <strong>{job?.subtitle || "N/A"}</strong> |{" "}
                      {job?.workLocation || "N/A"}
                      ,&nbsp;&nbsp;&nbsp;
                      {job?.duration || "N/A"}
                    </p>
                    <p>- &nbsp;{job?.previous_experience || "N/A"}</p>
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
                  <div className="display-4 fw-bold">
                    {averageRating || "N/A"}
                  </div>
                  <div className="d-flex my-2">
                    {[...Array(5)].map((_, index) => (
                      <i key={index} className={`fa fa-star ${index < Math.floor(averageRating) ? "text-warning" : index < averageRating ? "fa-star-half-alt text-warning" : "text-muted"}`}></i>
                    ))}
                  </div>
                  <p className="text-h6 text-muted mt-2">  (  {vendorDetails?.reviewsCount?.reduce((acc, review) => acc + review.count, 0)}{" "}  Reviews)</p>
                </div>
                <div className="col-12 col-md-8">
                  {vendorDetails?.reviewsCount?.length ? (
                    vendorDetails.reviewsCount.map((rating, index) => (
                      <div className="row align-items-center gx-1 mb-2" key={index}>
                        <div className="col-12 col-md-2 d-flex justify-content-md-end justify-content-start">
                          <h6 className="mb-0 fw-normal">
                            {rating?.star} stars
                          </h6>
                        </div>
                        <div className="col-12 col-md-8">
                          <div className="progress" style={{ height: "6px" }}><div className="progress-bar" role="progressbar" style={{ width: `${rating?.percentage}%`, backgroundColor: "#E7B66B", }} aria-valuenow={rating?.percentage} aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className="col-12 col-md-2 d-flex justify-content-md-start justify-content-end">
                          <h6 className="mb-0">{rating?.count}</h6>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No reviews available yet.</p>
                  )}
                </div>
              </div>
              <div className="row mt-4">
                {vendorDetails?.reviews?.map((review, index) => (
                  <div key={index} className="col-12 mt-3">
                    <span className="text-muted">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <div className="d-flex align-items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fa fa-star ${i < review?.ratings ? "text-warning" : ""
                            }`}
                        ></i>
                      ))}
                    </div>
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          review?.reviewerId?.profileImage ||
                          "https://via.placeholder.com/30"
                        }
                        alt="Reviewer"
                        className="rounded-circle me-2"
                        style={{
                          width: "30px",
                          height: "30px",
                          objectFit: "cover",
                        }}
                      />
                      <h5 className="mb-0">
                        {review?.reviewerId?.firstName || "Anonymous"}
                      </h5>
                    </div>
                    <div>
                      <p className="text-muted mt-2">{review?.comment}</p>
                    </div>
                  </div>
                ))}

                {/* Review Submission Form */}
                <form onSubmit={handleSubmit} className="mt-4">
                  <h4 className="fw-bold">Leave a Review</h4>
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Write your review"
                      id="floatingTextarea2"
                      style={{ height: "100px" }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                    ></textarea>
                  </div>
                  {error && <p className="text-danger mb-0">{error}</p>}

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <Rating
                      value={rating}
                      onChange={(event, newValue) => setRating(newValue)}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      className="mt-3"
                      type="submit"
                      sx={{ textTransform: "capitalize" }}
                    >
                      Submit Review
                    </Button>
                  </div>
                </form>
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
