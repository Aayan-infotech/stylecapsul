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
import { Swiper, SwiperSlide } from "swiper/react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GifBoxIcon from "@mui/icons-material/GifBox";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

const UserProfilePosts = () => {
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

  const toggleCommentSection = (index) => {
    const updatedPosts = [...userPostDetails];
    updatedPosts[index].showComments = !updatedPosts[index].showComments;
    setUserPostDetails(updatedPosts);
  };

  const handleClose = () => {
    setOpen(false);
    setCommentText('');
    setSelectedPostId(null);
  };

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
        


            {/* <div className="row justify-content-center">
              {userPostDetails?.groupedPosts?.map((post, index) => (
                <div key={index} className="col-md-12 mx-2 mb-4 card shadow-sm" style={{ backgroundColor: '#ededed', color: 'black', height: '500px' }}>
                  <div id={`carouselExampleControls-${index}`} className="carousel slide" data-bs-ride="carousel" style={{ height: '200px' }}>
                    <div className="carousel-inner" style={{ height: '100%' }}>
                      {post?.image?.map((img, imgIndex) => (
                        <div key={imgIndex} className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`} style={{ height: '100%' }}>
                          <img src={img} className="d-block w-100" alt="Fashion item" style={{ height: '200px', objectFit: 'cover' }} onError={(e) => { e.target.onerror = null; e.target.src = blank_img; }} />
                        </div>
                      ))}
                    </div>
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

                  <div className="card-body text-start" style={{ height: '150px', overflow: 'hidden' }}>
                    <p className="card-text">{post?.description || 'No caption'}</p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top">
                    <div>
                      <FavoriteIcon sx={{ color: "#1e88e5", cursor: "pointer" }} />
                      <span className="ms-2">{post?.likes?.length || 0}</span>
                    </div>
                    <div className="text-end text-muted">
                      {post?.comments?.length || 0} Comments
                    </div>
                  </div>

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
            </div> */}
            <div className="row g-2 m-0">
              {userPostDetails?.groupedPosts?.map((post, index) => (
                <div className="col-12">
                  <div className="p-3 border-1 text-black" style={{ backgroundColor: "#f5f5f56e" }}>
                    <div className="text-black mt-2">
                      <p className="fw-bold">{post?.description}</p>
                    </div>
                    <div className="d-flex mt-3">
                      <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={20}
                        className="swiper-types-custom"
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        navigation
                        breakpoints={{ 640: { slidesPerView: 1, }, 768: { slidesPerView: 2, }, 1024: { slidesPerView: 3, }, }}
                      >
                        {post?.image?.map((imageUrl, cardIndex) => (
                          <SwiperSlide key={cardIndex}>
                            <div className="card text-black" style={{ width: "18rem", backgroundColor: "#e8e8e8", }}>
                              <img
                                src={imageUrl || blank_img}
                                className="card-img-top object-fit-cover"
                                height={300}
                                alt={`Image ${cardIndex + 1}`}
                                onError={(e) => { e.target.onerror = null; e.target.src = blank_img }}
                              />
                              <div className="card-body">
                                <p className="card-text">
                                  {post?.description}
                                </p>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center text-black">
                          <ThumbUpIcon className="fs-5 me-3" color={post.likes ? "primary" : "inherit"} />
                          <h6 className="mt-1 mb-0">
                            {post.likes && post.likes.length}
                          </h6>
                        </div>
                      </div>
                      <div className="d-flex align-items-center text-black gap-3 justify-content-center">
                        <h6 style={{ cursor: "pointer" }} onClick={() => toggleCommentSection(index, post)}>
                          {post.comments && post.comments.length} Comments
                        </h6>
                      </div>
                    </div>

                    <hr />
                    <div className="d-flex justify-content-evenly align-items-center text-black">
                      <h5 onClick={() => handleLike(index, post._id)} style={{ cursor: "pointer", color: post.likes.includes(userId) ? "#1976d2" : "black" }}>
                        <i className={`fa-${post.likes.includes(userId) ? "solid" : "regular"} fa-thumbs-up me-2`}></i>
                        {post.likes.includes(userId) ? "Liked" : "Like"}
                      </h5>
                      <h5 onClick={() => toggleCommentSection(index, post)} style={{ cursor: "pointer" }}>
                        <i className="fa-regular fa-comment me-2"></i> Comment
                      </h5>
                      <h5 style={{ cursor: "pointer" }}>
                        <a
                          href="https://www.instagram.com/thestylecapsule/?hl=en"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          <i className="fa-solid fa-share me-2"></i> Share
                        </a>
                      </h5>
                    </div>
                    <hr />
                    {post.showComments && (
                      <div className="comment-section mt-3">
                        <div className="comment-box d-flex align-items-center p-2">
                          <Avatar alt={blank_img} sx={{ width: 40, height: 40, marginRight: 2 }} className="me-3" src={blank_img} />
                          <TextField
                            variant="outlined"
                            placeholder="Write a comment..."
                            fullWidth
                            size="small"
                            sx={{
                              backgroundColor: "#f0f2f5",
                              borderRadius: 25,
                            }}
                            value={post?.newComment}
                            onChange={(e) => handleCommentChange(index, e)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && post?.newComment) {
                                handleCommentSubmit(index, e);
                              }
                            }}
                            InputProps={{
                              sx: { borderRadius: "25px" },
                              endAdornment: (
                                <InputAdornment position="end">
                                  {post?.newComment ? (
                                    <SendIcon
                                      onClick={(e) =>
                                        handleCommentSubmit(index, e)
                                      }
                                    />
                                  ) : (
                                    <>
                                      <CameraAltIcon className="me-2" />
                                      <GifBoxIcon className="me-2" />
                                      <InsertEmoticonIcon className="me-2" />
                                    </>
                                  )}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                        <div className="comments-list px-5 mt-3"
                          style={{ maxHeight: "200px", overflowY: "auto", paddingRight: "10px" }}>

                          {post?.comments?.length > 0 ? (
                            post?.comments?.map((comment, commentIndex) => (
                              <div key={commentIndex} className="mb-3">
                                <div
                                  key={commentIndex}
                                  className="d-flex justify-content-between align-items-center mb-2 text-black"
                                >
                                  <div className="d-flex">
                                    <Avatar alt="User Avatar" sx={{ width: 30, height: 30 }} className="me-2" src={comment?.user?.profileImage || blank_img} />
                                    <div className="text-black p-1 rounded-2" style={{ backgroundColor: "#e0e0e0" }}>
                                      <Typography variant="body2" gutterBottom>
                                        {comment?.user?.firstName}
                                      </Typography>
                                      <Typography variant="body2" gutterBottom>
                                        {comment?.text}
                                      </Typography>
                                    </div>
                                  </div>
                                  <DeleteOutlineIcon size="small" style={{ cursor: "pointer" }} onClick={() => handleDeleteComment(index, commentIndex)} />
                                </div>
                                {comment?.replies &&
                                  comment?.replies.length > 0 && (
                                    <div className="ms-5">
                                      {comment?.replies?.map(
                                        (reply, replyIndex) => (
                                          <div key={replyIndex} className="d-flex justify-content-between align-items-center mb-2 text-black">
                                            <div className="d-flex">
                                              <Avatar alt="User Avatar" sx={{ width: 30, height: 30 }} className="me-2" src={reply?.replies?.user?.profileImage || blank_img} />
                                              <div className="text-black p-1 rounded-2" style={{ backgroundColor: "#e0e0e0", }}>
                                                <Typography variant="caption" className="fw-bold">
                                                  {reply?.user?.firstName}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                  {reply?.text}
                                                </Typography>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                                <div className="ms-5 mt-2">
                                  <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Write a reply..."
                                    value={comment?.newReply}
                                    onChange={(e) =>
                                      handleReplyChange(
                                        index,
                                        commentIndex,
                                        e.target.value
                                      )
                                    }
                                    onKeyDown={(e) => {
                                      if (
                                        e.key === "Enter" &&
                                        comment.newReply?.trim()
                                      ) {
                                        handleReplySubmit(
                                          index,
                                          commentIndex
                                        );
                                        e.preventDefault();
                                      }
                                    }}
                                  />

                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() =>
                                      handleReplySubmit(index, commentIndex)
                                    }
                                  >
                                    Reply
                                  </button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-black">No comments yet!</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <Modal open={open} onClose={handleClose}>
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Add a Comment</Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>

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

              <TextField
                fullWidth
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
              />

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
          </Modal> */}

        </div>
      )}
    </>
  );
};
export default UserProfilePosts;
