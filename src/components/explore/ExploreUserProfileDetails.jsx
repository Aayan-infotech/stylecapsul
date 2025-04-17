import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { getCookie } from "../../utils/cookieUtils";
import { apiUrl } from "../../../apiUtils";
import blank_img from "../../assets/stylist/blank_img.jpg";
import coinhand from "../../assets/closetmanagement/coin-hand.png";
import Loader from "../Loader/Loader.jsx";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Button, Modal, TextField, Typography, IconButton } from "@mui/material";
import { showSuccessToast } from "../toastMessage/Toast.jsx";
import CloseIcon from '@mui/icons-material/Close';

const ExploreUserProfileDetails = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userPostDetails, setUserPostDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [clothesOnDates, setClothesOnDates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  // At the top of your component
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [loadingComment, setLoadingComment] = useState(false);


  const navigate = useNavigate();
  const token = getCookie("authToken");
  const userId = getCookie("userId");

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

  const fetchPostDetailsByUs = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    try {
      const response = await axios.get(apiUrl("api/explore/user-profile-data"), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.data?.success) {
        setUserPostDetails(response?.data);
        const data = response?.data?.styleOfTheDay || [];
        const formattedData = data?.styleOfTheDay?.map((item) => ({
          date: item.date.split("T")[0],
          thumbnail: item.picture || [],
          id: item._id || null,
        }));
        setClothesOnDates(formattedData);
      }
    } catch (error) {
      console.error("Error fetching clothes data:", error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetailsByUs();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const tileContent = ({ date, view }) => {
    const formattedDate = formatDate(date);
    if (view === "month") {
      const dateEntry = clothesOnDates.find((item) => item.date === formattedDate);
      if (dateEntry && dateEntry.thumbnail.length > 0) {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {dateEntry?.thumbnail?.map((image, index) => (
              <img key={index} src={image} style={{ width: "15px", height: "auto", objectFit: "cover", borderRadius: "4px", }} />
            ))}
          </div>
        );
      }
    }
    return null;
  };

  const handleSelectOutFits = (date) => {
    const formattedDate = formatDate(date);
    const details = clothesOnDates.find((item) => item.date === formattedDate);
    if (details) {
      const selectedData = { date: formattedDate, images: details.thumbnail };
      // navigate("/capsulerangecalendardetails", { state: { selectedData } });
    } else {
      console.log("No data found for this date.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const likePost = async (postId) => {
    console.log("postid", postId, "userId", userId)
    try {
      const response = await axios.post(apiUrl("api/explore/like"), { userId, postId }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      showSuccessToast(response.data.message);
      fetchPostDetailsByUs();
      return response.data;
    } catch (error) {
      console.error('Error liking post:', error.response?.data || error.message);
      return null;
    }
  };

  const handleOpen = (post) => {
    setSelectedPostId(post); // Pass entire post with comments
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setCommentText('');
    setSelectedPostId(null);
  };
  

  const selectedPostComments = selectedPostId?.comments || [];

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    setLoadingComment(true);
    try {
      const response = await axios.post(apiUrl("api/explore/comment"), {
        postId: selectedPostId?._id,
        userId,
        text: commentText
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      setCommentText('');
      await fetchPostDetailsByUs(false);
      const updatedPost = userPostDetails?.styleOfTheDay?.find(p => p._id === selectedPostId._id);
      setSelectedPostId(updatedPost);

    } catch (error) {
      console.error('Error posting comment:', error.response?.data || error.message);
    } finally {
      setLoadingComment(false);
    }
  };



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container d-block userprofiledetails" style={{ paddingTop: "6rem" }}>
          <div className="container d-block px-4">
            <div className="row gy-4 m-0 mb-4">
              <div className="col-12 d-flex justify-content-center align-items-center text-center">
                <div>
                  <img
                    alt="User Avatar"
                    className="rounded-circle mb-2"
                    src={userPostDetails?.user?.profileImage || blank_img}
                    style={{ border: "2px solid black", padding: "5px", borderRadius: "50%", boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.3)", cursor: "pointer", padding: "5px", height: "200px", }}
                    onError={(e) => { e.target.onerror = null; e.target.src = blank_img }}
                  />
                  <h4 className="fw-bold">
                    {userPostDetails?.user?.firstName
                      ? userPostDetails?.user?.firstName
                        .charAt(0)
                        .toUpperCase() +
                      userPostDetails?.user?.firstName
                        .slice(1)
                        .toLowerCase()
                      : "N/A"}
                  </h4>
                  <p className="m-0">{userPostDetails?.user?.bio}</p>
                </div>
              </div>
            </div>
            <div className="row m-0 mb-4">
              <div className="col-12 col-md-6">
                <Calendar
                  value={selectedDate}
                  tileContent={tileContent}
                  onClickDay={(date) => {
                    setSelectedDate(date);
                    handleSelectOutFits(date);
                  }}
                  minDate={new Date()}
                />
              </div>
              <div
                className="col-12 col-md-6"
                style={{
                  height: "350px",
                  overflowY: "auto",
                  borderRadius: "10px",
                  backgroundColor: "#f0f0f0",
                  padding: "10px",
                }}
              >
                <style>
                  {`.col-12.col-md-6::-webkit-scrollbar {
                    width: 7px; 
                  }
                  .col-12.col-md-6::-webkit-scrollbar-track {
                    box-shadow: inset 0 0 5px grey;
                    border-radius: 10px;
                  }
                  .col-12.col-md-6::-webkit-scrollbar-thumb {
                    background: gray; 
                    border-radius: 10px; 
                  }
                  .col-12.col-md-6::-webkit-scrollbar-thumb:hover {
                    background: rgb(61, 61, 61);  
                  }
                `}
                </style>
                {categories?.length > 0 ? (
                  categories.map((item, index) => (
                    // <Link key={index} to={`/all-clothes-list/${item?._id}`} state={{ category_name: item?.name, userPostDetails }} className="text-decoration-none">
                    <div key={index} className="rounded-pill mb-3 d-flex align-items-center" style={{ backgroundColor: "#4C4C4C", height: "70px", padding: "10px", }}>
                      <img
                        src={coinhand || blank_img}
                        alt={coinhand || blank_img}
                        height="30"
                        onError={(e) => { e.target.onerror = null; e.target.src = blank_img; }}
                        className="me-2"
                      />
                      <h4 className="text-white fw-bold">{item?.name}</h4>
                    </div>
                    // </Link>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <p className="text-muted fw-bold">No categories found</p>
                  </div>
                )}
              </div>
            </div>

            <div className="row justify-content-center">
              {userPostDetails?.groupedPosts?.map((post, index) => (
                <div key={index} className="col-md-12 mx-2 mb-4 card shadow-sm" style={{ backgroundColor: '#ededed', color: 'black', height: '500px' }}>

                  {/* Carousel Container */}
                  <div id={`carouselExampleControls-${index}`} className="carousel slide" data-bs-ride="carousel" style={{ height: '200px' }}>
                    <div className="carousel-inner" style={{ height: '100%' }}>
                      {post?.image?.map((img, imgIndex) => (
                        <div key={imgIndex} className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`} style={{ height: '100%' }}>
                          <img src={img} className="d-block w-100" alt="Fashion item" style={{ height: '200px', objectFit: 'cover' }} onError={(e) => { e.target.onerror = null; e.target.src = blank_img; }} />
                        </div>
                      ))}
                    </div>
                    {/* Carousel Controls */}
                    {post?.image?.length > 1 && (
                      <>
                        <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleControls-${index}`} data-bs-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleControls-${index}`} data-bs-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Post Description */}
                  <div className="card-body text-start" style={{ height: '150px', overflow: 'hidden' }}>
                    <p className="card-text">{post?.description || 'No caption'}</p>
                  </div>

                  {/* Like, Comment, and Share Section */}
                  <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top">
                    <div>
                      <FavoriteIcon sx={{ color: "#1e88e5", cursor: "pointer" }} />
                      <span className="ms-2">{post?.likes?.length || 0}</span>
                    </div>
                    <div className="text-end text-muted">
                      {post?.comments?.length || 0} Comments
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex justify-content-between align-items-center py-3 border-top">
                    <div className="d-flex text-primary" onClick={() => likePost(post?._id)} style={{ cursor: "pointer" }}>
                      <FavoriteIcon sx={{ fontSize: 20 }} />
                      <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>Liked</Typography>
                    </div>
                    <div className="d-flex" style={{ cursor: "pointer" }}>
                      <ChatBubbleOutlineIcon sx={{ fontSize: 20 }} />
                      <Typography variant="caption" onClick={() => handleOpen(post)} gutterBottom sx={{ display: 'block' }}>Comment</Typography>
                    </div>
                    <div className="d-flex" style={{ cursor: "pointer" }}>
                      <ShareIcon sx={{ fontSize: 20 }} />
                      <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>Share</Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
              }}
            >
              {/* Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Add a Comment</Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Comments */}
              {selectedPostId?.comments?.length > 0 ? (
                selectedPostId.comments.map((comment) => (
                  <Box key={comment._id} sx={{ mb: 2, p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="body2">{comment.text}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(comment.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
                  No comments yet.
                </Typography>
              )}

              {/* Input */}
              <TextField
                fullWidth
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
              />

              {/* Submit */}
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleCommentSubmit}
                disabled={!commentText.trim() || loadingComment}
              >
                {loadingComment ? "Posting..." : "Comment"}
              </Button>
            </Box>
          </Modal>

        </div>
      )}
    </>
  );
};
export default ExploreUserProfileDetails;
