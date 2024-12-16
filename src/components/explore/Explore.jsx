import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GifBoxIcon from "@mui/icons-material/GifBox";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { InputAdornment, TextField, Typography } from "@mui/material";
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

const Explore = ({ isAuth }) => {
  const [loading, setLoading] = useState(true);
  const [allSocialPosts, setAllSocialPosts] = useState([]);
  const token = getCookie("authToken");
  const userId = getCookie("userId");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchExplorePostMedia = async () => {
    try {
      const response = await axios.get(apiUrl("api/explore/getall"), {
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
      }
    } catch (error) {
      console.error("Error fetching clothes data:", error);
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
        } else {
          showErrorToast(data.message);
        }
        // fetchExplorePostMedia();
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

  const handleLike = async (index, post_id) => {
    try {
      const { data } = await axios.post(
        apiUrl("api/explore/like"),
        { userId, postId: post_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      data?.success
        ? showSuccessToast(data.message)
        : showErrorToast(data.message);
      fetchExplorePostMedia();
      setAllSocialPosts((prevPosts) =>
        prevPosts.map((post, idx) =>
          idx === index
            ? {
                ...post,
                liked: !post.liked,
                likes: post.likes + (post.liked ? -1 : 1),
              }
            : post
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].shares += 1;
    setPosts(updatedPosts);
    if (navigator.share) {
      navigator
        .share({
          title: "Check this out!",
          text: updatedPosts[index].postContent,
          url: window.location.href,
        })
        .then(() => console.log("Post shared successfully!"))
        .catch((error) => console.error("Error sharing the post:", error));
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
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
          fetchExplorePostMedia();
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
      fetchExplorePostMedia();
    }
  }, [userId]);

  let debounceTimeout;
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (value.trim() !== "") {
        fetchResults(value);
      } else {
        setResults([]);
      }
    }, 300);
  };

  const fetchResults = async (searchQuery) => {
    try {
      const response = await axios.get(
        "http://localhost:3555/api/explore/search",
        {
          params: {
            query: searchQuery,
            sort: "name",
            order: "asc",
            page: 1,
            limit: 5,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setLoading(false);
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
              <TextField
                variant="outlined"
                placeholder="Search"
                fullWidth
                size="small"
                className="me-2 w-100"
                onChange={handleInputChange}
                value={query}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    padding: "10px",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "7px 14px",
                  },
                }}
              />
              <div
                style={{
                  border: "2px solid black",
                  padding: "5px",
                  borderRadius: "50%",
                  boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.3)",
                  cursor: "pointer",
                }}
                className="rounded-circle"
              >
                <Link to="/user-profile">
                  <Avatar alt="Remy Sharp" className="rounded-circle" src="" />
                </Link>
              </div>
            </div>
            {allSocialPosts?.map((post, index) => (
              <>
                <div className="row g-2 m-0" key={index}>
                  <div className="col-12">
                    <div
                      className="p-3 border-1 text-black"
                      style={{ backgroundColor: "#f5f5f56e" }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <Link
                          to={`/socialUserDetails/${post._id}`}
                          className="text-decoration-none"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <Avatar
                              alt="profile image"
                              sx={{ width: 56, height: 56 }}
                              className="me-3"
                              src={blank_img}
                            />
                            <div className="text-black">
                              {/* <h5 style={{ lineHeight: "1.2" }}> */}
                              {/* {post?.user?.firstName} */}
                              <Typography variant="h6" className="fw-bold">
                                {post?.user?.firstName.charAt(0).toUpperCase() +
                                  post?.user?.firstName.slice(1).toLowerCase()}
                              </Typography>

                              {/* </h5> */}
                              <h6 style={{ fontSize: "13px" }}>
                                {formatDate(post.updatedAt)} •{" "}
                                <i className="fa-solid fa-earth-americas"></i>
                              </h6>
                            </div>
                          </div>
                        </Link>
                        <div>
                          <i
                            id="dropdownIcon"
                            className="fa-solid fa-ellipsis-vertical fs-4 text-black"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          ></i>

                          <ul
                            className="dropdown-menu dropdown-menu-start"
                            aria-labelledby="dropdownIcon"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
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
                          breakpoints={{
                            640: {
                              slidesPerView: 1,
                            },
                            768: {
                              slidesPerView: 2,
                            },
                            1024: {
                              slidesPerView: 3,
                            },
                          }}
                        >
                          {post?.image.map((imageUrl, cardIndex) => (
                            <>
                              <SwiperSlide key={cardIndex}>
                                <div
                                  className="card text-black"
                                  style={{
                                    width: "18rem",
                                    backgroundColor: "#e8e8e8",
                                  }}
                                >
                                  <img
                                    src={imageUrl}
                                    className="card-img-top object-fit-cover"
                                    height={300}
                                    alt={`Image ${cardIndex + 1}`}
                                  />
                                  <div className="card-body">
                                    <p className="card-text">
                                      {post?.description}
                                    </p>
                                  </div>
                                </div>
                              </SwiperSlide>
                            </>
                          ))}
                        </Swiper>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center text-black">
                            <ThumbUpIcon
                              className="fs-5 me-3"
                              color={post.likes ? "primary" : "inherit"}
                            />
                            <h6 className="mt-1 mb-0">{post.likes.length}</h6>
                          </div>
                        </div>
                        <div className="d-flex align-items-center text-black gap-3 justify-content-center">
                          <h6
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleCommentSection(index, post)}
                          >
                            {post.comments.length} Comments
                          </h6>
                          {/* <h6>{post.shares} Shares</h6> */}
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
                      </div>

                      <hr />
                      <div className="d-flex justify-content-evenly align-items-center text-black">
                        <h5
                          onClick={() => handleLike(index, post)}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa-regular fa-thumbs-up me-2"></i> Like
                        </h5>
                        <h5
                          onClick={() => toggleCommentSection(index, post)}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa-regular fa-comment me-2"></i> Comment
                        </h5>
                        <h5
                          onClick={() => handleShare(index)}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa-solid fa-share me-2"></i> Share
                        </h5>
                      </div>
                      <hr />
                      {post.showComments && (
                        <div className="comment-section mt-3">
                          <div className="comment-box d-flex align-items-center p-2">
                            <Avatar
                              alt="Remy Sharp"
                              sx={{ width: 40, height: 40, marginRight: 2 }}
                              className="me-3"
                              src={blank_img}
                            />
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
                          <div className="comments-list px-5 mt-3">
                            {post?.comments?.length > 0 ? (
                              post?.comments?.map((comment, commentIndex) => (
                                <div key={commentIndex} className="mb-3">
                                  <div
                                    key={commentIndex}
                                    className="d-flex justify-content-between align-items-center mb-2 text-black"
                                  >
                                    <div className="d-flex">
                                      <Avatar
                                        alt="User Avatar"
                                        sx={{ width: 30, height: 30 }}
                                        className="me-2"
                                        src={blank_img}
                                      />
                                      <div
                                        className="text-black p-2 rounded-3"
                                        style={{ backgroundColor: "#e0e0e0" }}
                                      >
                                        {/*                                         <Typography
                                          variant="subtitle2"
                                          className="fw-bold"
                                        >
                                          {comment?.user?.firstName.charAt(0).toUpperCase() + comment?.user?.firstName.slice(1).toLowerCase()}
                                        </Typography> */}
                                        <Typography
                                          variant="body2"
                                          gutterBottom
                                        >
                                          {comment?.text}
                                        </Typography>
                                      </div>
                                    </div>
                                    <DeleteOutlineIcon
                                      size="small"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleDeleteComment(index, commentIndex)
                                      }
                                    />
                                  </div>
                                  {comment.replies &&
                                    comment.replies.length > 0 && (
                                      <div className="ms-5">
                                        {comment.replies.map(
                                          (reply, replyIndex) => (
                                            <div
                                              key={replyIndex}
                                              className="d-flex justify-content-between align-items-center mb-2 text-black"
                                            >
                                              <div className="d-flex">
                                                <Avatar
                                                  alt="User Avatar"
                                                  sx={{ width: 30, height: 30 }}
                                                  className="me-2"
                                                  src={blank_img}
                                                />
                                                <div
                                                  className="text-black p-2 rounded-3"
                                                  style={{
                                                    backgroundColor: "#e0e0e0",
                                                  }}
                                                >
                                                  <Typography
                                                    variant="subtitle2"
                                                    className="fw-bold"
                                                  >
                                                    {comment?.user?.firstName
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                      comment?.user?.firstName
                                                        .slice(1)
                                                        .toLowerCase()}
                                                  </Typography>
                                                  <Typography
                                                    variant="body2"
                                                    gutterBottom
                                                  >
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
                                      value={comment.newReply || ""}
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
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Explore;
