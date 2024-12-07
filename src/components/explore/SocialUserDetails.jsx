import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import showimg4 from "../../assets/marketplace/showimg4.jpg";
import { Edit, Delete, Share } from "@mui/icons-material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import day1formal from "../../assets/myCapsuleAddAvtar/for2-removebg-preview.png";
import Explore from "./Explore";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative } from "swiper/modules";
import Loader from "../Loader/Loader";
import axios from "axios";
import { getCookie } from "../../utils/cookieUtils";
import { apiUrl } from "../../../apiUtils";
import blank_img from "../../assets/stylist/blank_img.jpg";

export const SocialUserDetails = () => {
  const categories = [
    {
      title: "Clothes",
      date: "23 Jan 2024",
      image: showimg4,
    },
    {
      title: "Shoes",
      date: "23 Jan 2024",
      image: showimg4,
    },
    {
      title: "Accessories",
      date: "25 Mar 2024",
      image: showimg4,
    },
    {
      title: "Other",
      date: "23 Jan 2024",
      image: showimg4,
    },
  ];
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [userPostDetails, setUserPostDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [clothesOnDates, setClothesOnDates] = useState([]);

  const navigate = useNavigate();
  const token = getCookie("authToken");
  const { postId } = useParams();

  const fetchDayByCloths = async () => {
    try {
      const response = await axios.get(apiUrl("api/myStyleCapsule/getStyle"), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = response?.data?.data?.styleOfTheDay || [];
      const formattedData = data.map((item) => ({
        date: item.date,
        thumbnail: item.picture.map((picture) => apiUrl(`uploads/${picture}`)),
        id: response?.data?.data?._id || null,
      }));
      setClothesOnDates(formattedData);
    } catch (error) {
      console.error("Error fetching clothes data:", error);
    }
  };

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(
        apiUrl(`api/explore/get-post/${postId}`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response?.data?.data, "response?.data?.data");
      if (response?.data?.success) {
        setUserPostDetails(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching clothes data:", error);
    }
  };

  useEffect(() => {
    fetchDayByCloths();
    if (postId) {
      fetchPostDetails();
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
      const dateEntry = clothesOnDates.find(
        (item) => item.date === formattedDate
      );
      if (dateEntry) {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              overflow: "hidden",
            }}
          >
            {dateEntry.thumbnail.map((image, index) => (
              <img
                key={index}
                src={image}
                style={{
                  width: "15px",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            ))}
          </div>
        );
      }
    }
    return null;
  };

  const handleClick = (item) => {
    navigate("/cloths", { state: { item } });
  };

  const handleSelectOutFits = (date) => {
    const formattedDate = formatDate(date);
    const details = clothesOnDates.find((item) => item.date === formattedDate);
    if (details) {
      const selectedData = { date: formattedDate, images: details.thumbnail };
      setSelectedDetails(selectedData);
      navigate("/capsulerangecalendardetails", { state: { selectedData } });
    } else {
      setSelectedDetails(null);
      console.log("No data found for this date.");
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
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ paddingTop: "6rem" }}
        >
          <div className="text-center w-100">
            <div className="profile-section mb-2 text-center">
              <Avatar
                src={showimg4}
                alt="User Avatar"
                sx={{
                  width: { xs: 100, sm: 150 },
                  height: { xs: 100, sm: 150 },
                  margin: "0 auto",
                }}
              />
              <h1 className="fw-bold mt-3">
                {userPostDetails?.user?.firstName
                  ? userPostDetails?.user?.firstName.charAt(0).toUpperCase() +
                    userPostDetails?.user?.firstName.slice(1).toLowerCase()
                  : ""}
              </h1>
              <p className="text-muted">{userPostDetails?.user?.email}</p>
              <div className="d-flex justify-content-center align-items-center flex-wrap">
                <blockquote className="fw-bold me-3 mb-2 text-center">
                  "{userPostDetails?.user?.bio || "“N/A”"}"
                </blockquote>
                <IconButton
                  className="btn-dark rounded-circle text-white"
                  sx={{ bgcolor: "black", mt: { xs: 2, md: 0 } }}
                  aria-label="share"
                >
                  <Share />
                </IconButton>
              </div>
            </div>

            <div className="container d-block">
              <div className="row m-0">
                {categories?.map((item, index) => (
                  <div className="col-12 col-md-6" key={index}>
                    <div
                      className="rounded-pill mb-3"
                      style={{ backgroundColor: "#4C4C4C" }}
                      onClick={() => handleClick(item)}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="profile-image rounded-start-pill"
                          style={{ width: "100%", maxWidth: "200px" }}
                        />
                        <div className="text-start p-3 d-flex flex-column justify-content-center text-white w-100">
                          <h4 className="fw-bold mb-0">{item?.title}</h4>
                          <div className="d-flex align-items-center">
                            <h6 className="mb-0 me-4">{item?.date}</h6>
                            <h6 className="edit-text text-decoration-underline">
                              Edit
                            </h6>
                          </div>
                          <button
                            type="button"
                            className="btn btn-dark rounded-pill w-50 mt-2 d-flex justify-content-center align-items-center px-2 py-1"
                            style={{ fontSize: "0.8rem" }}
                          >
                            Delete{" "}
                            <Delete className="ms-2" fontSize="x-small" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row gx-5 mt-4">
                <div className="col-12 col-md-6">
                  <Calendar
                    value={selectedDate}
                    tileContent={tileContent}
                    onClickDay={(date) => {
                      setSelectedDate(date);
                      handleSelectOutFits(date);
                    }}
                  />
                </div>
                <div className="col-12 col-md-6 text-start">
                  <Swiper
                    grabCursor={true}
                    effect={"creative"}
                    style={{ backgroundColor: "azure" }}
                    creativeEffect={{
                      prev: {
                        shadow: true,
                        translate: ["-120%", 0, -500],
                      },
                      next: {
                        shadow: true,
                        translate: ["120%", 0, -500],
                      },
                    }}
                    modules={[EffectCreative]}
                    className="mySwiper2"
                  >
                    <SwiperSlide>
                      <div className="text-center">
                        <img src={day1formal} className="me-2" height={200} />
                        <div className="text-start">
                          <h6>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Odio cumque nisi ipsa quibusdam quidem cum.
                          </h6>
                          <h6>Lorem ipsum dolor sit amet.</h6>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div>
                        <img src={day1formal} className="me-2" height={200} />
                        <div className="text-start">
                          <h6>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Odio cumque nisi ipsa quibusdam quidem cum.
                          </h6>
                          <h6>Lorem ipsum dolor sit amet.</h6>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div>
                        <img src={day1formal} className="me-2" height={200} />
                        <div className="text-start">
                          <h6>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Odio cumque nisi ipsa quibusdam quidem cum.
                          </h6>
                          <h6>Lorem ipsum dolor sit amet.</h6>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
