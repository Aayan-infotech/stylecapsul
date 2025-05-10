import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../styles/StylistDetails.scss";
import blank_image from "../../assets/stylist/blank_img.jpg";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { getCookie } from "../../utils/cookieUtils";
import Loader from "../Loader/Loader";
import { format, addDays, isAfter, isToday, isSameMonth } from "date-fns";
import { Box, Button, Card, Chip, CircularProgress, Rating, Typography } from "@mui/material";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

const StylistDetails = () => {
  const [showStylistProfileDetails, setSshowStylistProfileDetails] =
    useState(null);
  const [vendorDetails, setVendorDetails] = useState({});
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [bookingSlotId, setBookingSlotId] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showBookingAvailability, setShowBookingAvailability] = useState([]);
  const [slotLoading, setSlotLoading] = useState(false);

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

  const fetchVendorDetails = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const response = await axios.get(apiUrl(`api/stylist/stylist-profile/${stylistId}`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        }
      );
      // if (response?.data?.status === true) {
      setVendorDetails(response?.data);
      // }
    } catch (error) {
      console.error("Error fetching vendor details:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const fetchStylistBookingAvalability = async (showLoading = true) => {
    if (showLoading) setSlotLoading(true);
    try {
      const response = await axios.get(apiUrl(`api/stylist/get-slots-by-date/${stylistId}`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setShowBookingAvailability(response?.data);
    } catch (error) {
      console.error("Error fetching vendor details:", error);
    } finally {
      if (showLoading) setSlotLoading(false);
    }
  };


  useEffect(() => {
    if (stylistId) {
      fetchStylistBookingAvalability();
      fetchVendorDetails();
    }
  }, [stylistId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBtnLoading(true);
    if (!comment.trim() || rating === 0) {
      setError("Please provide both a review comment and rating.");
      setBtnLoading(false);
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
      await fetchVendorDetails(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      // showErrorToast("Something went wrong while submitting review.");
    } finally {
      setBtnLoading(false)
    }
  };


  const averageRating = vendorDetails?.averageRating?.[0]?.averageRating;

  const handleClickToChat = () => {
    if (token) {
      navigate("/chat", { state: { profile_details: profile_details } });
    } else {
      navigate("/login", { state: { fromChat: true, profile_details: profile_details, }, });
    }
  };

  const handleOpenModal = async () => {
    if (!token) {
      navigate("/login", {
        state: {
          fromHire: true,
          profile_details: profile_details,
        },
      });
      return;
    }
    setOpenModal(true);
    await fetchStylistBookingAvalability();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDay(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingSlotId(null);
  };

  const bookAppointment = async (time, slotId) => {
    if (!selectedDate || !time) return;
    setBookingSlotId(slotId._id);
    try {
      const res = await axios.post(apiUrl("api/appointment/create-appointment"),
        {
          stylistId: vendorDetails?.stylist?._id,
          userId: userId,
          date: selectedDate,
          time: time,
          slotId: slotId._id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        setBookingSlotId(null);
        setOpenModal(false);
        showSuccessToast(res.data.message || "Appointment booked successfully!");
        await fetchVendorDetails(false);
        await fetchStylistBookingAvalability(false);
      } else {
        showErrorToast(res?.data?.message || "Booking failed.");
        setBookingSlotId(null);
      }
    } catch (error) {
      showErrorToast(error.response?.data?.message || "An error occurred while booking.");
      setBookingSlotId(null);
    }
  };


  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(apiUrl(`api/review/delete/${reviewId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response?.data?.success === true && response?.data?.status === 200) {
        showSuccessToast(response?.data?.message || "Review deleted successfully!");
        await fetchVendorDetails(false);
      }
    } catch (error) {
      console.log(error);
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
                  <button type="button" onClick={handleClickToChat} className="btn btn-outline-dark rounded-pill" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", width: "60px", }}>
                    <i className="fa-solid fa-message"></i>
                  </button>
                </div>
                <div align="center" className="mt-5">
                  <button type="button" onClick={handleOpenModal} className="btn hire-custom-btn rounded-pill p-2">
                    Hire
                  </button>
                  {!token && (
                    <p className="text-danger mt-2" style={{ fontSize: "0.9rem" }}>
                      * Please log in to hire this stylist
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div className="my-3">
                  <h5>Appointment Booking Time Slots</h5>
                  {vendorDetails?.stylist?.availability?.days && vendorDetails?.stylist?.availability?.slots ? (
                    <div className="d-flex gap-2 mt-2 flex-wrap">
                      {vendorDetails?.stylist?.availability?.days.map((day) => (
                        <Chip
                          key={day}
                          label={day}
                          sx={{ backgroundColor: "#17a2b8", color: "#fff" }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted mt-2">No available booking slots at the moment.</div>
                  )}
                </div>
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
                    <h6 className="fw-bold fs-6">{job?.title || "Freelance Fashion Stylist with extensive client collaboration experience"}</h6>
                    <p>
                      <strong>{job?.subtitle || "Worked with top fashion brands on seasonal collections and personal styling."}</strong> |{" "}
                      {job?.workLocation || "Remote / On-Site Assignments across major cities"}
                      ,&nbsp;&nbsp;&nbsp;
                      {job?.duration || "Over 2 years"}
                    </p>
                    <p>
                      - &nbsp;
                      {job?.previous_experience ||
                        "Specialized in creating personalized style guides for diverse clients, handling wardrobe makeovers, and providing trend consultations tailored to individual needs. Also collaborated with photographers and designers for editorial shoots."}
                    </p>
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
                    {averageRating ? averageRating.toFixed(1) : ""}
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
                    <p className="text-muted">
                      This stylist hasn't received any reviews yet. Be the first to share your experience and help others make informed choices.
                    </p>
                  )}
                </div>
              </div>
              <div className="row mt-4">
                {/* {(showAllReviews ? vendorDetails?.reviews : vendorDetails?.reviews?.slice(0, 2))?.map((review, index) => ( */}
                {[...(vendorDetails?.reviews || [])].reverse().slice(0, showAllReviews ? undefined : 2).map((review, index) => (
                  <div key={index} className="col-12 mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-muted">
                          {new Date(review.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <div className="d-flex align-items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fa fa-star ${i < review?.ratings ? "text-warning" : ""}`}></i>
                          ))}
                        </div>
                        <div className="d-flex align-items-center">
                          <img
                            src={review?.reviewerId?.profileImage || blank_image}
                            alt="Reviewer"
                            className="rounded-circle me-2"
                            style={{ width: "30px", height: "30px", objectFit: "cover", }}
                            onError={(e) => { e.target.onerror = null; e.target.src = blank_image }}
                          />
                          <h5 className="mb-0">
                            {review?.reviewerId?.firstName || "Anonymous"}
                          </h5>
                        </div>
                        <div>
                          <p className="text-muted mt-2">{review?.comment}</p>
                        </div>
                      </div>
                      {review?.reviewerId?._id === userId && (
                        <IconButton aria-label="delete" onClick={() => handleDeleteReview(review?._id, review?.reviewerId?._id)}>
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>
                ))}
                {vendorDetails?.reviews?.length > 2 && (
                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-outline-dark rounded-pill"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                    >
                      {showAllReviews ? "See Less" : "See More"}
                    </button>
                  </div>
                )}


                {/* Review Submission Form */}
                {token && (
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
                      <Rating value={rating} onChange={(event, newValue) => setRating(newValue)} />
                      <Button variant="contained" size="small" className="mt-3 rounded-pill" disabled={btnLoading} type="submit" sx={{ textTransform: "capitalize", backgroundColor: "black" }}>
                        Submit Review
                      </Button>
                    </div>
                  </form>
                )}
                <hr className="text-muted mt-4" />
              </div>
            </div>
          </div>

          <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md" disableEnforceFocus disableAutoFocus disableRestoreFocus>
            <DialogTitle className="d-flex justify-content-between align-items-center">
              Appointment Slots
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              {slotLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                  <p>Loading Booking Slot</p><br />
                  <CircularProgress />
                </Box>
              ) : showBookingAvailability?.availability?.length ? (
                <>
                  <div className="d-flex gap-2 mt-2 flex-wrap mb-4">
                    {showBookingAvailability.availability.map((availability) => (
                      <Chip
                        key={availability.date}
                        label={`${availability.day} - ${format(new Date(availability.date), "dd MMM yyyy")}`}
                        sx={{
                          backgroundColor:
                            selectedDate === availability.date ? "#0d6efd" : "#17a2b8",
                          color: "#fff",
                        }}
                        onClick={() => {
                          setSelectedDate(availability.date);
                        }}
                      />
                    ))}
                  </div>

                  {selectedDate && (
                    <>
                      {showBookingAvailability.availability
                        .find((availability) => availability.date === selectedDate)
                        ?.slots?.filter((slot) => slot.available).length === 0 ? (
                        <div className="text-muted mt-2">
                          Slots are not available for the selected date.
                        </div>
                      ) : (
                        <div className="d-flex gap-2 flex-wrap">
                          {showBookingAvailability.availability
                            .find((availability) => availability.date === selectedDate)
                            ?.slots.map((slot) => (
                              <Card
                                key={slot._id}
                                onClick={() => {
                                  if (slot.available && bookingSlotId === null) {
                                    const timeRange = `${slot.start} - ${slot.end}`;
                                    setSelectedTime(timeRange);
                                    bookAppointment(timeRange, slot);
                                  }
                                }}
                                sx={{
                                  width: 150,
                                  padding: 2,
                                  borderRadius: 2,
                                  boxShadow: 3,
                                  cursor: slot.available && bookingSlotId === null ? "pointer" : "not-allowed",
                                  backgroundColor: "#fff",
                                  opacity: slot.available ? 1 : 0.5,
                                  transition: "0.3s",
                                  "&:hover": { boxShadow: slot.available && bookingSlotId === null ? 6 : 3, },
                                  pointerEvents: bookingSlotId && bookingSlotId !== slot._id ? "none" : "auto",
                                  "&:hover": { boxShadow: slot.available && bookingSlotId === null ? 6 : 3, },
                                }}
                              >
                                <Typography fontWeight="bold" variant="body1">
                                  {bookingSlotId === slot._id ? (
                                    <Box display="flex" alignItems="center" gap={1}>
                                      <CircularProgress size={16} thickness={5} />
                                      <span>Booking...</span>
                                    </Box>
                                  ) : (
                                    `${slot.start} - ${slot.end}`
                                  )}
                                </Typography>
                                <Box display="flex" alignItems="center" gap={1} mt={1}>
                                  {slot.available ? (
                                    <>
                                      <CheckCircleIcon fontSize="small" sx={{ color: "#17a2b8" }} />
                                      <Typography variant="body2" color="textSecondary">
                                        Available
                                      </Typography>
                                    </>
                                  ) : (
                                    <>
                                      <RemoveCircleIcon fontSize="small" sx={{ color: "red" }} />
                                      <Typography variant="body2" fontWeight="bold" sx={{ color: "red" }}>
                                        Booked
                                      </Typography>
                                    </>
                                  )}
                                </Box>
                                <Typography variant="caption" color="textSecondary" mt={1}>
                                  {slot.bookedCount}/{slot.maxBookings} booked
                                </Typography>
                              </Card>
                            ))}
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <div className="text-muted mt-2">No available booking slots at the moment.</div>
              )}
            </DialogContent>

          </Dialog>
        </div>
      )}
    </>
  );
};

export default StylistDetails;
