import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { getCookie } from "../../utils/cookieUtils";
import { apiUrl } from "../../../apiUtils";
import blank_img from "../../assets/stylist/blank_img.jpg";
import coinhand from "../../assets/closetmanagement/coin-hand.png";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";
import Loader from "../Loader/Loader.jsx";
import { TextField, Typography, Avatar, InputAdornment, CircularProgress, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

export const SocialUserDetails = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userPostDetails, setUserPostDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [clothesOnDates, setClothesOnDates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [likeLoadingIndex, setLikeLoadingIndex] = useState(null);
  const [commentLoadingIndex, setCommentLoadingIndex] = useState(null);
  const [replyLoadingIndex, setReplyLoadingIndex] = useState({ postIndex: null, commentIndex: null });

  const token = getCookie("authToken");
  const userId = getCookie("userId");
  const { postId } = useParams();
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
      const response = await axios.get(apiUrl(`api/explore/user-posts-profile/${postId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response, 'response')
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
      showSuccessToast(error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPostDetailsByUs();
    }
  }, [postId]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const tileContent = ({ date, view }) => {
    const formattedDate = formatDate(date);
    if (view === "month") {
      const dateEntry = clothesOnDates?.find((item) => item.date === formattedDate);
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
      const selectedData = {
        date: formattedDate,
        images: details.thumbnail,
        userPostDetails: userPostDetails,
      };
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

  const likePost = async (postId, index) => {
    setLikeLoadingIndex(index);
    try {
      const response = await axios.post(apiUrl("api/explore/like"), { userId, postId }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      showSuccessToast(response.data.message);
      await fetchPostDetailsByUs(false);
      return response.data;
    } catch (error) {
      console.error('Error liking post:', error.response?.data || error.message);
      return null;
    } finally {
      setLikeLoadingIndex(null);
    }
  };

  const toggleCommentSection = (index) => {
    const updatedPosts = { ...userPostDetails };
    const updatedGroupedPosts = [...updatedPosts.groupedPosts];
    updatedGroupedPosts[index].showComments = !updatedGroupedPosts[index].showComments;
    updatedPosts.groupedPosts = updatedGroupedPosts;
    setUserPostDetails(updatedPosts);
  };

  const handleCommentChange = (index, e) => {
    const updatedPosts = { ...userPostDetails };
    updatedPosts.groupedPosts[index].newComment = e.target.value;
    setUserPostDetails(updatedPosts);
  };

  const handleCommentSubmit = async (index, event) => {
    event?.preventDefault();

    const post = userPostDetails.groupedPosts[index];
    if (!post?.newComment?.trim()) return;
    setCommentLoadingIndex(index);
    try {
      await axios.post(apiUrl("api/explore/comment"), {
        postId: post._id,
        userId,
        text: post.newComment
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      const updatedPosts = { ...userPostDetails };
      updatedPosts.groupedPosts[index].newComment = '';
      setUserPostDetails(updatedPosts);
      await fetchPostDetailsByUs(false);
    } catch (error) {
      console.error('Error posting comment:', error.response?.data || error.message);
    } finally {
      setCommentLoadingIndex(null);
    }
  };

  const handleReplyChange = (postIndex, commentIndex, value) => {
    const updatedPosts = { ...userPostDetails };
    const updatedGroupedPosts = [...updatedPosts.groupedPosts];

    const updatedComments = updatedGroupedPosts[postIndex].comments.map((comment, cIdx) => {
      if (cIdx === commentIndex) {
        return {
          ...comment,
          newReply: value,
        };
      }
      return comment;
    });

    updatedGroupedPosts[postIndex].comments = updatedComments;
    updatedPosts.groupedPosts = updatedGroupedPosts;

    setUserPostDetails(updatedPosts);
  };


  const handleReplySubmit = async (postIndex, commentIndex) => {
    const post = userPostDetails.groupedPosts[postIndex];
    const comment = post.comments[commentIndex];
    const newReply = comment.newReply;
    if (newReply) {
      setReplyLoadingIndex({ postIndex, commentIndex });
      try {
        const response = await axios.post(apiUrl("api/explore/reply"), {
          postId: post._id,
          userId,
          commentId: comment._id,
          text: newReply,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response?.data?.success) {
          showSuccessToast("Reply added successfully!");
          const updatedPosts = { ...userPostDetails };
          const updatedGroupedPosts = [...updatedPosts.groupedPosts];
          const updatedComments = [...updatedGroupedPosts[postIndex].comments];
          updatedComments[commentIndex].replies = updatedComments[commentIndex].replies || [];
          updatedComments[commentIndex].replies.push({
            text: newReply,
            user: { _id: userId },
          });
          updatedComments[commentIndex].newReply = "";
          updatedGroupedPosts[postIndex].comments = updatedComments;
          updatedPosts.groupedPosts = updatedGroupedPosts;
          setUserPostDetails(updatedPosts);
          // fetchAllPostsByExplore();
        } else {
          showErrorToast("Failed to add reply");
        }
      } catch (error) {
        console.error("Error adding reply:", error);
      } finally {
        setReplyLoadingIndex({ postIndex: null, commentIndex: null });
      }
    }
  };

  const handleDeleteComment = async (postIndex, commentIndex) => {
    const post = userPostDetails.groupedPosts[postIndex];
    const comment = post.comments[commentIndex];
    if (comment?.user === userId) {
      try {
        const response = await axios.delete(apiUrl(`api/explore/delete-comment/${userId}`), {
          data: {
            commentId: comment._id,
            postId: post._id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
        );
        if (response?.data?.success) {
          const updatedPosts = { ...userPostDetails };
          updatedPosts.groupedPosts[postIndex].comments.splice(commentIndex, 1);
          setUserPostDetails(updatedPosts);
          showSuccessToast("Comment deleted successfully!");
          await fetchPostDetailsByUs(false);
        } else {
          showErrorToast("Failed to delete comment");
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    } else {
      showErrorToast("You can only delete your own comments");
    }
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(apiUrl(`api/explore/delete-post/${userId}/${postId}`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        showSuccessToast(response?.data?.message || "Post deleted successfully!");
        await fetchPostDetailsByUs(false);
      } else {
        showErrorToast("Failed to delete post");
      }
    } catch (error) {
      showErrorToast(error || "Failed to delete the post. Please try again.");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container d-block userprofiledetails" style={{ paddingTop: "6rem", animation: "fadeIn 1s ease-in-out" }}>
          <div className="container d-block px-4">
            <div className="row gy-4 m-0 mb-4">
              <div className="col-12 d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <img alt="User Avatar" className="rounded-circle mb-2" src={userPostDetails?.user?.profileImage || blank_img} onError={(e) => { e.target.src = blank_img; }} style={{ display: "inline-block", border: "2px solid black", padding: "5px", borderRadius: "50%", boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.3)", cursor: "pointer", padding: "5px", height: "200px", width: "200px", }} />
                  <h4 className="fw-bold">
                    {userPostDetails?.user?.firstName ? userPostDetails?.user?.firstName.charAt(0).toUpperCase() + userPostDetails?.user?.firstName.slice(1).toLowerCase() : ""}
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
              <div className="col-12 col-md-6" style={{ height: "350px", overflowY: "auto", borderRadius: "10px", backgroundColor: "#f0f0f0", padding: "10px", }}>
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
                  categories.map((item, index) => {
                    const isOwner = userId === userPostDetails?.user?._id;
                    const route = isOwner
                      ? `/all-clothes-list/${item?._id}`
                      : `/public-profile/${userPostDetails?.user?._id}/${item?._id}`;

                    return (
                      <Link key={index} to={route} state={{ category_name: item?.name, userPostDetails }} className="text-decoration-none">
                        <div className="rounded-pill mb-3 d-flex align-items-center px-4" style={{ backgroundColor: "#4C4C4C", height: "70px"}}>
                          <img src={item?.icon || blank_img} alt="Category Icon" height={50} width={50} className="me-2" onError={(e) => { e.target.onerror = null; e.target.src = blank_img; }} />
                          <h4 className="text-white fw-bold">{item?.name}</h4>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div className="col-12 text-center">
                    <p className="text-muted fw-bold">No categories found</p>
                  </div>
                )}
              </div>
            </div>

            <div className="row g-2 m-0">
              {userPostDetails?.groupedPosts?.map((post, index) => (
                <div className="col-12" key={index}>
                  <div className="p-3 border-1 text-black" style={{ backgroundColor: "#f5f5f56e" }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div></div>
                      {userId === post?.user?._id && (
                        <div className="dropdown">
                          <i className="fa-solid fa-ellipsis-vertical" role="button" id={`dropdownMenuButton-${post._id}`} data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: "pointer", fontSize: "20px" }}></i>
                          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`dropdownMenuButton-${post._id}`}>
                            <li>
                              <button className="dropdown-item text-danger" onClick={() => handleDelete(post._id)}>
                                <i className="fa-solid fa-trash me-2"></i>Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
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
                              <img src={imageUrl || blank_img} className="card-img-top object-fit-cover" height={300} alt={`Image ${cardIndex + 1}`} onError={(e) => { e.target.onerror = null; e.target.src = blank_img }} />
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
                          {post?.comments?.length || 0} Comments
                        </h6>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-evenly align-items-center text-black">
                      <h5 onClick={() => { if (likeLoadingIndex === index) return; likePost(post._id, index); }} style={{ cursor: likeLoadingIndex === index ? "not-allowed" : "pointer", opacity: likeLoadingIndex === index ? 0.5 : 1, color: post.likes.includes(userId) ? "#1976d2" : "black", }}>
                        <i className={`fa-${post.likes.includes(userId) ? "solid" : "regular"} fa-thumbs-up me-2`}></i>
                        {likeLoadingIndex === index ? "Liking..." : post.likes.includes(userId) ? "Liked" : "Like"}
                      </h5>
                      <h5 onClick={() => toggleCommentSection(index, post)} style={{ cursor: "pointer" }}>
                        <i className="fa-regular fa-comment me-2"></i> Comment
                      </h5>
                      <h5 style={{ cursor: "pointer" }}>
                        <a href="https://www.instagram.com/thestylecapsule/?hl=en" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit", }}>
                          <i className="fa-solid fa-share me-2"></i> Share
                        </a>
                      </h5>
                    </div>
                    <hr />
                    {post.showComments && (
                      <div className="comment-section mt-3">
                        <div className="comment-box d-flex align-items-center p-2">
                          <Avatar alt={post?.user?.firstName} src={post?.user?.profileImage || blank_img} sx={{ width: 40, height: 40, marginRight: 2 }} className="me-3" />
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
                            onKeyDown={(e) => { if (e.key === "Enter" && post?.newComment) { handleCommentSubmit(index, e); } }}
                            InputProps={{
                              sx: { borderRadius: "25px" },
                              endAdornment: (
                                <InputAdornment position="end">
                                  {post?.newComment ? (
                                    commentLoadingIndex === index ? (
                                      <CircularProgress size={20} />
                                    ) : (
                                      <SendIcon style={{ cursor: "pointer" }} onClick={(e) => handleCommentSubmit(index, e)} />
                                    )
                                  ) : (
                                    <>
                                      <SendIcon style={{ cursor: "pointer" }} />
                                    </>
                                  )}
                                </InputAdornment>
                              )
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
                                        {comment?.text}
                                      </Typography>
                                    </div>
                                  </div>
                                  {comment?.user === userId && (
                                    <DeleteOutlineIcon size="small" style={{ cursor: "pointer" }} onClick={() => handleDeleteComment(index, commentIndex)} />
                                  )}
                                </div>
                                {comment?.replies &&
                                  comment?.replies.length > 0 && (
                                    <div className="ms-5">
                                      {comment?.replies?.map(
                                        (reply, replyIndex) => (
                                          <div key={replyIndex} className="d-flex justify-content-between align-items-center mb-2 text-black">
                                            <div className="d-flex">
                                              <Avatar alt="User Avatar" sx={{ width: 30, height: 30 }} className="me-2" src={reply?.user?.profileImage || blank_img} />
                                              <div className="text-black p-1 rounded-2" style={{ backgroundColor: "#e0e0e0" }}>
                                                <Typography variant="body2" gutterBottom>
                                                  {reply?.text}
                                                </Typography>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                    </div>
                                  )}
                                <div className="ms-5 mt-2">
                                  <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Write a reply..."
                                    value={comment?.newReply}
                                    onChange={(e) => handleReplyChange(index, commentIndex, e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter" && comment.newReply?.trim()) { handleReplySubmit(index, commentIndex); e.preventDefault(); } }}
                                  />
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleReplySubmit(index, commentIndex)}
                                    disabled={replyLoadingIndex.postIndex === index && replyLoadingIndex.commentIndex === commentIndex}
                                  >
                                    {replyLoadingIndex.postIndex === index && replyLoadingIndex.commentIndex === commentIndex ? (
                                      <CircularProgress size={15} color="inherit" />
                                    ) : (
                                      "Reply"
                                    )}
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
        </div>
      )}
    </>
  );
};
