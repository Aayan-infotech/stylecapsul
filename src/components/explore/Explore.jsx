import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "./explore.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { getCookie } from "../../utils/cookieUtils";
import blank_img from "../../assets/stylist/blank_img.jpg";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MuiPagination from "@mui/material/Pagination";
import debounce from "lodash.debounce";
import { useSelector } from "react-redux";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Explore = () => {
  const [loading, setLoading] = useState(true);
  const [allSocialPosts, setAllSocialPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [error, setError] = useState("");
  const [likeLoadingIndex, setLikeLoadingIndex] = useState(null);
  const [profileImageShow, seProfileImageShow] = useState({});

  const token = getCookie("authToken");
  const userId = getCookie("userId");

  const { user } = useSelector((state) => state.login);
  const singleUser = user?.payload || user;

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const userResponse = await axios.get(apiUrl(`api/user/get/${userId}`));
      if (userResponse?.data?.status === 200 && userResponse?.data?.success === true) {
        seProfileImageShow(userResponse?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPostsByExplore = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    try {
      const response = await axios.get(apiUrl("api/explore/getallPosts"), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.data?.success) {
        const updatedPosts = response?.data?.data.map((post) => ({
          ...post,
          showComments: false,
        }));
        setAllSocialPosts(updatedPosts);
        setDisplayPosts(updatedPosts);
      }
    } catch (error) {
      console.error("Error fetching clothes data:", error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const handleCommentChange = (index, e) => {
    const updatedPosts = [...allSocialPosts];
    updatedPosts[index].newComment = e.target.value;
    setAllSocialPosts(updatedPosts);
  };

  const handleCommentSubmit = async (index, e) => {
    e.preventDefault();
    const updatedPosts = [...allSocialPosts];
    const newComment = updatedPosts[index].newComment;
    if (newComment) {
      try {
        const { data } = await axios.post(
          apiUrl("api/explore/comment"),
          {
            postId: updatedPosts[index]._id,
            userId,
            text: newComment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (data?.success) {
          updatedPosts[index].comments.push({ text: newComment });
          updatedPosts[index].newComment = "";
          setAllSocialPosts(updatedPosts);
          await fetchAllPostsByExplore(false);
        } else {
          showErrorToast(data.message);
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const handleDeleteComment = async (postIndex, commentIndex) => {
    const post = allSocialPosts[postIndex];
    const comment = post.comments[commentIndex];
    try {
      const response = await axios.delete(
        apiUrl(`api/explore/delete-comment/${userId}`),
        {
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
        showSuccessToast("Comment deleted successfully!");
        const updatedPosts = [...allSocialPosts];
        updatedPosts[postIndex].comments.splice(commentIndex, 1);
        setAllSocialPosts(updatedPosts);
        await fetchAllPostsByExplore(false);
      } else {
        showErrorToast("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const toggleCommentSection = (index) => {
    const updatedPosts = [...allSocialPosts];
    updatedPosts[index].showComments = !updatedPosts[index].showComments;
    setAllSocialPosts(updatedPosts);
  };

  const handleLike = async (postId, index) => {
    setLikeLoadingIndex(index);
    try {
      const response = await axios.post(apiUrl("api/explore/like"), { userId, postId }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      // showSuccessToast(response.data.message);
      setQuery("");
      setDisplayPosts(allSocialPosts);
      await fetchAllPostsByExplore(false);
      return response.data;
    } catch (error) {
      console.error('Error liking post:', error.response?.data || error.message);
      return null;
    } finally {
      setLikeLoadingIndex(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date";
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    return `${day} ${month}`;
  };

  const handleReplyChange = (postIndex, commentIndex, value) => {
    const updatedPosts = allSocialPosts.map((post, idx) => {
      if (idx === postIndex) {
        return {
          ...post,
          comments: post.comments.map((comment, cIdx) => {
            if (cIdx === commentIndex) {
              return {
                ...comment,
                newReply: value,
              };
            }
            return comment;
          }),
        };
      }
      return post;
    });

    setAllSocialPosts(updatedPosts);
  };

  const handleReplySubmit = async (postIndex, commentIndex) => {
    const post = allSocialPosts[postIndex];
    const comment = post.comments[commentIndex];
    const newReply = comment.newReply;
    if (newReply) {
      try {
        const response = await axios.post(
          apiUrl("api/explore/reply"),
          {
            postId: post._id,
            userId,
            commentId: comment._id,
            text: newReply,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.data?.success) {
          showSuccessToast("Reply added successfully!");
          const updatedPosts = [...allSocialPosts];
          updatedPosts[postIndex].comments[commentIndex].replies =
            updatedPosts[postIndex].comments[commentIndex].replies || [];
          updatedPosts[postIndex].comments[commentIndex].replies.push({
            text: newReply,
            userId,
          });
          updatedPosts[postIndex].comments[commentIndex].newReply = "";
          fetchAllPostsByExplore();
          setAllSocialPosts(updatedPosts);
        } else {
          showErrorToast("Failed to add reply");
        }
      } catch (error) {
        console.error("Error adding reply:", error);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAllPostsByExplore();
    }
  }, [userId]);

  const fetchPostsUserSearch = async () => {
    setError("");
    try {
      const response = await axios.get(apiUrl(`api/explore/search?query=${query}&sort=name&order=asc&page=${page}&limit=5`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.data?.success) {
        if (response.data.data.length === 0) {
          setError("No results found");
          setDisplayPosts([]);
          await fetchAllPostsByExplore(false);
        } else {
          setDisplayPosts(response.data.data || []);
          setTotalPages(response.data.pagination.totalPages);
        }
      } else {
        setError("Error fetching search results");
        setDisplayPosts([]);
        setTotalPages(0);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      setDisplayPosts([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setPage(1);
  };

  useEffect(() => {
    if (query.trim()) {
      const fetchDebounced = debounce(() => {
        fetchPostsUserSearch();
      }, 1000);
      fetchDebounced();
      return () => fetchDebounced.cancel();
    } else {
      setDisplayPosts(allSocialPosts);
      setTotalPages(Math.ceil(allSocialPosts.length / 5));
      setError("");
    }
  }, [query, page]);

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(apiUrl(`api/explore/delete-post/${userId}/${postId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
      );
      if (response?.data?.success) {
        showSuccessToast(response?.data?.message || "Post deleted successfully!");
        await fetchAllPostsByExplore(false);
      } else {
        showErrorToast("Failed to delete post");
      }
    } catch (error) {
      showErrorToast(error || "Failed to delete the post. Please try again.");
    }
  };


  const handleDeleteReply = async (postIndex, commentIndex, replyIndex) => {
    const post = allSocialPosts[postIndex];
    const comment = post.comments[commentIndex];
    const reply = comment.replies[replyIndex];

    try {
      const response = await axios.delete(apiUrl(`api/explore/delete-reply/${userId}`), {
        data: {
          postId: post._id,
          commentId: comment._id,
          replyId: reply._id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.success) {
        showSuccessToast("Reply deleted successfully!");
        const updatedPosts = [...allSocialPosts];
        updatedPosts[postIndex].comments[commentIndex].replies.splice(replyIndex, 1);
        setAllSocialPosts(updatedPosts);
        await fetchAllPostsByExplore(false);
      } else {
        showErrorToast("Failed to delete reply");
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
      showErrorToast("Something went wrong while deleting the reply.");
    }
  };



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mb-4 explore-container">
          <div className="container d-block w-75">
            <div className="d-flex align-items-center justify-content-center">
              <TextField variant="outlined" placeholder="Search" fullWidth size="small" className="me-2 w-100" onChange={handleInputChange} value={query} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px", padding: "10px", }, "& .MuiOutlinedInput-input": { padding: "7px 14px", }, }} />
              <div style={{ border: "2px solid black", padding: "5px", borderRadius: "50%", boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.3)", cursor: "pointer", }} className="rounded-circle">
                <Link to="/user-profile">
                  <Avatar alt="Remy Sharp" src={profileImageShow?.profileImage || blank_img} onError={(e) => { e.target.onerror = null; e.target.src = blank_img }} />
                </Link>
              </div>
            </div>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
                <CircularProgress size={50} />
              </div>
            ) : error ? (
              <div className="text-center mt-4">
                <Typography variant="h6" className="text-danger">
                  {error}
                </Typography>
              </div>
            ) : displayPosts?.length > 0 ? (
              displayPosts?.map((post, index) => (
                <div className="row g-2 m-0" key={index}>
                  <div className="col-12">
                    <div className="p-3 border-1 text-black" style={{ backgroundColor: "#f5f5f56e" }}>  <div className="d-flex justify-content-between align-items-center">
                      <Link to={`/socialUserDetails/${post?.user?._id}`} className="text-decoration-none">
                        <div className="d-flex justify-content-between align-items-center">
                          <img
                            className="mb-2 me-2"
                            src={post?.user?.profileImage || blank_img}
                            alt={blank_img}
                            style={{ border: "2px solid black", padding: "5px", borderRadius: "50%", cursor: "pointer", padding: "5px", height: "50px", width: "50px", }}
                            onError={(e) => { e.target.onerror = null; e.target.src = blank_img }}
                          />
                          <div className="text-black">
                            <Typography variant="h6" className="fw-bold">
                              {post?.user?.firstName?.charAt(0).toUpperCase() +
                                post?.user?.firstName?.slice(1).toLowerCase()}
                            </Typography>
                            <h6 style={{ fontSize: "13px" }}>
                              {formatDate(post.updatedAt)} •{" "}
                              <i className="fa-solid fa-earth-americas"></i>
                            </h6>
                          </div>
                        </div>
                      </Link>
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
                        <p className="fw-bold">
                          {post?.user.bio?.length > 100 ? post.user.bio.substring(0, 100) + "..." : post?.user.bio}
                        </p>
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
                              <div className="card text-black" style={{ width: "18rem", backgroundColor: "#e8e8e8", }}><img src={imageUrl || blank_img} className="card-img-top object-fit-cover" height={300} alt={`Image ${cardIndex + 1}`} onError={(e) => { e.target.onerror = null; e.target.src = blank_img }} />
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
                            {/* <ThumbUpIcon className="fs-5 me-3" color={post.likes ? "text-danger" : "inherit"} /> */}
                            <ThumbUpIcon className="fs-5 me-3" style={{ color: post.likes ? "red" : "inherit" }} />
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
                        <h5
                          onClick={() => { if (likeLoadingIndex === index) return; handleLike(post._id, index); }}
                          style={{
                            cursor: likeLoadingIndex === index ? "not-allowed" : "pointer",
                            opacity: likeLoadingIndex === index ? 0.5 : 1,
                            color: post.likes.includes(userId) ? "#1976d2" : "black",
                            pointerEvents: likeLoadingIndex === index ? "none" : "auto",
                          }}
                        >
                          <i className={`fa-${post.likes.includes(userId) ? "solid" : "regular"} fa-thumbs-up me-2`}></i>
                          {likeLoadingIndex === index ? "Liking..." : post.likes.includes(userId) ? "Liked" : "Like"}
                        </h5>
                        <h5 onClick={() => toggleCommentSection(index, post)} style={{ cursor: "pointer" }}>
                          <i className="fa-regular fa-comment me-2"></i> Comment
                        </h5>
                        <h5 style={{ cursor: "pointer" }}>
                          <h5 style={{ cursor: "pointer" }}>
                            <a
                              href={`https://www.instagram.com/create/story/?media=${encodeURIComponent(post?.image[0])}&caption=${encodeURIComponent(post?.description)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <i className="fa-brands fa-instagram me-2"></i> Share On Instagram
                            </a>
                          </h5>
                        </h5>
                      </div>
                      <hr />
                      {post.showComments && (
                        <div className="comment-section mt-3">
                          <div className="comment-box d-flex align-items-center p-2">
                            <Avatar alt={post?.user?.firstName} sx={{ width: 40, height: 40, marginRight: 2 }} className="me-3" src={post?.user?.profileImage || blank_img} />
                            <TextField
                              variant="outlined"
                              placeholder="Write a comment..."
                              fullWidth
                              size="small"
                              sx={{ backgroundColor: "#f0f2f5", borderRadius: 25, }}
                              value={post?.newComment}
                              onChange={(e) => handleCommentChange(index, e)}
                              onKeyDown={(e) => { if (e.key === "Enter" && post?.newComment) { handleCommentSubmit(index, e); } }}
                              InputProps={{
                                sx: { borderRadius: "25px" },
                                endAdornment: (
                                  <InputAdornment position="end">
                                    {post?.newComment ? (
                                      <SendIcon onClick={(e) => handleCommentSubmit(index, e)} />
                                    ) : (
                                      <>
                                        <SendIcon style={{ cursor: "pointer" }} />
                                      </>
                                    )}
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                          <div className="comments-list px-5 mt-3" style={{ maxHeight: "200px", overflowY: "auto", paddingRight: "10px" }}>
                            {post?.comments?.length > 0 ? (
                              post?.comments?.map((comment, commentIndex) => (
                                <div key={commentIndex} className="mb-3">
                                  <div key={commentIndex} className="d-flex justify-content-between align-items-center mb-2 text-black">
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
                                    {comment?.user?._id === userId && (
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
                                                <div className="text-black p-1 rounded-2" style={{ backgroundColor: "#e0e0e0", }}>
                                                  <Typography variant="caption" className="fw-bold">
                                                    {reply?.user?.firstName}
                                                  </Typography>
                                                  <Typography variant="body2" gutterBottom>
                                                    {reply?.text}
                                                  </Typography>
                                                </div>
                                              </div>
                                              {reply?.user?._id === userId && (
                                                <DeleteOutlineIcon
                                                  size="small"
                                                  style={{ cursor: "pointer" }}
                                                  onClick={() => handleDeleteReply(index, commentIndex, replyIndex)}
                                                />
                                              )}
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
                                      onChange={(e) => handleReplyChange(index, commentIndex, e.target.value)}
                                      onKeyDown={(e) => { if (e.key === "Enter" && comment.newReply?.trim()) { handleReplySubmit(index, commentIndex); e.preventDefault(); } }}
                                    />

                                    <button className="btn btn-primary btn-sm" onClick={() => handleReplySubmit(index, commentIndex)}>
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
                </div>
              ))
            ) : (
              <div className="text-center mt-4">
                <Typography variant="h6">No results found. Share your first style and inspire others!</Typography>
                <Link to="/my-style-capsule" className="text-black text-decoration-none">
                  <Typography variant="h6">Create your first post <ArrowForwardIcon /></Typography>
                </Link>
              </div>
            )}
            <div>
              <MuiPagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} color="primary" size="large" style={{ marginTop: "2rem", display: "flex", justifyContent: "center", }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Explore;
