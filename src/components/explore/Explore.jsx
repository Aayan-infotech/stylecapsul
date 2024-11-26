import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GifBoxIcon from "@mui/icons-material/GifBox";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Box, InputAdornment, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from 'axios';
import { getCookie } from '../../utils/cookieUtils';
import { apiUrl } from "../../../apiUtils";

const Explore = ({ isAuth }) => {
  const [loading, setLoading] = useState(true);
  const [allSocialPosts, setAllSocialPosts] = useState([]);
  const [posts, setPosts] = useState([
    {
      id: 1,
      userName: "John Doe",
      postDate: "October 11",
      email: "Elizabeth@gmail.com",
      description: "“Fashions fade, style is eternal.”",
      avatarUrl:
        "https://www.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg",
      postContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quos ipsum alias optio ut excepturi facilis cumque numquam corporis doloribus!",
      hashtags: "#hashtag",
      cardContent: [
        {
          title: "Headline: 32 characters",
          text: "Description: 18 characters",
          imageUrl:
            "https://img.freepik.com/free-photo/medium-shot-romantic-couple-with-plaid-blanket_23-2150561506.jpg",
        },
        {
          title: "Headline: 32 characters",
          text: "Description: 18 characters",
          imageUrl:
            "https://www.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg",
        },
        {
          title: "Headline: 32 characters",
          text: "Description: 18 characters",
          imageUrl: "https://m.media-amazon.com/images/I/61zj4JTBO4L.jpg",
        },
      ],
      likes: 177,
      liked: false,
      comments: [],
      shares: 42,
      shared: false,
      showComments: false,
      newComment: "",
    },
    {
      id: 2,
      userName: "Anshuman Ray",
      postDate: "October 11",
      email: "Elizabeth@gmail.com",
      description: "“Fashions fade, style is eternal.”",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu5uvKyZDNWgp-mBB2qY_is0IrPhHOVtwUkw&s",
      postContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quos ipsum alias optio ut excepturi facilis cumque numquam corporis doloribus!",
      hashtags: "#hashtag",
      cardContent: [
        {
          title: "Headline: 32 characters",
          text: "Description: 18 characters",
          imageUrl:
            "https://img.freepik.com/free-photo/medium-shot-romantic-couple-with-plaid-blanket_23-2150561506.jpg",
        },
        {
          title: "Headline: 32 characters",
          text: "Description: 18 characters",
          imageUrl:
            "https://www.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg",
        },
        {
          title: "Headline: 32 characters",
          text: "Description: 18 characters",
          imageUrl: "https://m.media-amazon.com/images/I/61zj4JTBO4L.jpg",
        },
      ],
      likes: 177,
      liked: false,
      comments: [],
      shares: 42,
      shared: false,
      showComments: false,
      newComment: "",
    },
  ]);

  const token = getCookie("authToken");

  const fetchDayByCloths = async () => {
    try {
      const response = await axios.get(apiUrl(''), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (response?.data?.success) {
        setAllSocialPosts(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching clothes data:", error);
    }
  };

  useEffect(() => {
    fetchDayByCloths();
  }, []);

  const handleCommentChange = (index, e) => {
    const updatedPosts = [...posts];
    updatedPosts[index].newComment = e.target.value;
    setPosts(updatedPosts);
  };

  const handleCommentSubmit = (index, e) => {
    e.preventDefault();
    const updatedPosts = [...posts];
    const newComment = updatedPosts[index].newComment.trim();
    if (newComment) {
      updatedPosts[index].comments.push(newComment);
      updatedPosts[index].newComment = "";
    }
    setPosts(updatedPosts);
  };

  const toggleCommentSection = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].showComments = !updatedPosts[index].showComments;
    setPosts(updatedPosts);
  };

  const handleLike = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].liked = !updatedPosts[index].liked;
    updatedPosts[index].likes += updatedPosts[index].liked ? 1 : -1;
    setPosts(updatedPosts);
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
<<<<<<< Updated upstream
        <div className="mb-4" style={{ marginTop: "6rem" }}>
          <div className="text-center p-3 px-4">
=======
        <div className="mb-4" style={{marginTop:"8rem"}}>
          <div className="text-center p-3 px-5">
>>>>>>> Stashed changes
            <TextField
              variant="outlined"
              placeholder="Search"
              fullWidth
              size="small"
              className="w-75"
            />
          </div>
          <div className="container d-block w-75">
            {posts.map((post, index) => (
              <>
                <div className="row g-2" key={post.id}>
                  <div className="col-12">
                    <div
                      className="p-3 border-1 text-black"
                      style={{ backgroundColor: "#f5f5f56e" }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <Link
                          to={{ pathname: "/socialUserDetails" }}
                          state={{ post }}
                          className="text-decoration-none"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <Avatar
                              alt={post.userName}
                              sx={{ width: 56, height: 56 }}
                              className="me-3"
                              src={post.avatarUrl}
                            />
                            <div className="text-black">
                              <h5 style={{ lineHeight: "1.2" }}>
                                {post.userName}
                              </h5>
                              <h6 style={{ fontSize: "13px" }}>
                                {post.postDate} •{" "}
                                <i className="fa-solid fa-earth-americas"></i>
                              </h6>
                            </div>
                          </div>
                        </Link>
                        <div>
                          {/* <i className="fa-solid fa-ellipsis-vertical fs-4 text-black"></i> */}
                          <i id="dropdownIcon"
                            class="fa-solid fa-ellipsis-vertical fs-4 text-black"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"></i>

                          <ul class="dropdown-menu dropdown-menu-start" aria-labelledby="dropdownIcon">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="text-black mt-2">
                        <p className="fw-bold">{post.postContent}</p>
                      </div>

                      <div className="d-flex mt-3">
                        <Swiper
                          // install Swiper modules
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
                          {post.cardContent.map((card, cardIndex) => (
                            <>
                              <SwiperSlide>
                                <div
                                  className="card text-black"
                                  style={{
                                    width: "18rem",
                                    backgroundColor: "#e8e8e8",
                                  }}
                                  key={cardIndex}
                                >
                                  <img
                                    src={card.imageUrl}
                                    className="card-img-top object-fit-cover"
                                    height={300}
                                    alt="..."
                                  />
                                  <div className="card-body">
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text">{card.text}</p>
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
                              onClick={() => handleLike(index)}
                              className="fs-5 me-3"
                              color={post.liked ? "primary" : "inherit"}
                            />
                            <h6 className="mt-1 mb-0">{post.likes}</h6>
                          </div>
                        </div>
                        <div className="d-flex align-items-center text-black gap-3 justify-content-center">
                          <h6 className="">{post.comments.length} Comments</h6>
                          <h6>{post.shares} Shares</h6>
                        </div>
                      </div>

                      <hr />
                      <div className="d-flex justify-content-evenly align-items-center text-black">
                        <h5
                          onClick={() => handleLike(index)}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa-regular fa-thumbs-up me-2"></i> Like
                        </h5>
                        <h5
                          onClick={() => toggleCommentSection(index)}
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
                              src={post.avatarUrl}
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
                              value={post.newComment}
                              onChange={(e) => handleCommentChange(index, e)}
                              onKeyDown={(e) => {
                                if (
                                  e.key === "Enter" &&
                                  post.newComment.trim()
                                ) {
                                  handleCommentSubmit(index, e);
                                }
                              }}
                              InputProps={{
                                sx: { borderRadius: "25px" },
                                endAdornment: (
                                  <InputAdornment position="end">
                                    {post.newComment.trim() ? (
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

                          {/* Display comments */}
                          <div className="comments-list px-5 mt-3">
                            {post.comments.length > 0 ? (
                              post.comments.map((comment, commentIndex) => (
                                <div
                                  key={commentIndex}
                                  className="d-flex mb-2 text-black"
                                >
                                  <Avatar
                                    alt="User Avatar"
                                    sx={{ width: 30, height: 30 }}
                                    className="me-2"
                                    src={post.avatarUrl}
                                  />
                                  <p
                                    className="mb-0 text-black p-2 rounded-3"
                                    style={{ backgroundColor: "#e0e0e0" }}
                                  >
                                    {comment}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p className="text-black">No comments yet !.</p>
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
