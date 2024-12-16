import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import showimg4 from "../../assets/marketplace/showimg4.jpg";
import SettingsIcon from "@mui/icons-material/Settings";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Avatar, IconButton } from "@mui/material";
import { Edit, Delete, Share } from "@mui/icons-material";
import day1formal from "../../assets/myCapsuleAddAvtar/for2-removebg-preview.png";
import Explore from "./Explore";
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [userPostDetails, setUserPostDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [clothesOnDates, setClothesOnDates] = useState([]);

  const navigate = useNavigate();
  const token = getCookie("authToken");
  const { postId } = useParams();

  const userProfileDetails = {
    name: "Anshuman Rai",
    location: "America",
    bio: "respect is earned honesty is appreciated trust is gained loyalty is returned",
    website:
      "https://www.thestylecapsule.com.au/?srsltid=AfmBOopVoKLa1bj1jGgxH9gpcD61_iWxvK7E3lIiu1Ffs6-gYVRFRqDn",
    avatarUrl: "",
    stats: [
      { label: "posts", value: 26 },
      { label: "followers", value: 206 },
      { label: "following", value: 126 },
    ],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__zJOFi3ef7eGRIlVWo2DKdUXKrCq8dBwtQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__zJOFi3ef7eGRIlVWo2DKdUXKrCq8dBwtQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__zJOFi3ef7eGRIlVWo2DKdUXKrCq8dBwtQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__zJOFi3ef7eGRIlVWo2DKdUXKrCq8dBwtQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__zJOFi3ef7eGRIlVWo2DKdUXKrCq8dBwtQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__zJOFi3ef7eGRIlVWo2DKdUXKrCq8dBwtQ&s",
    ],
    wardrow_categories: [
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
    ],
  };

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
    <div
      className="container d-block userprofiledetails"
      style={{ paddingTop: "6rem" }}
    >
      <div className="container d-block px-4">
        <div className="d-flex justify-content-between mx-5">
          <h1></h1>
          <div className="dropdown">
            <SettingsIcon
              style={{ fontSize: 30, color: "black" }}
              data-bs-toggle="dropdown"
            />
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Delete Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row gy-4 m-0 mb-4">
          <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">
            <div
              style={{
                border: "2px solid black",
                padding: "5px",
                borderRadius: "50%",
                boxShadow: "0px 0px 15px 5px",
                cursor: "pointer",
              }}
              className="rounded-circle"
            >
              <Avatar
                alt="User Avatar"
                className="rounded-circle"
                sx={{ width: 150, height: 150 }}
                src={userProfileDetails.avatarUrl}
              />
            </div>
          </div>
          <div className="col-12 col-md-9">
            <div className="d-flex justify-content-around">
              {userProfileDetails.stats.map((stat, index) => (
                <div key={index} className="p-2 text-center">
                  <h4 className="fw-bold">{stat.value}</h4>
                  <h5>{stat.label}</h5>
                </div>
              ))}
            </div>
            <div className="p-3 my-3">
              <button type="button" class="btn btn-dark rounded-pill w-100 p-2">
                Share Profile
              </button>
            </div>
          </div>
          <div className="col-12 mx-auto" style={{ maxWidth: "1000px" }}>
            <h4 className="m-0">{userPostDetails?.user?.firstName ? userPostDetails?.user?.firstName.charAt(0).toUpperCase() + userPostDetails?.user?.firstName.slice(1).toLowerCase() : ""}</h4>
            <p className="m-0">{userPostDetails?.user?.bio}</p>
            {/* <a
              href={userProfileDetails.website}
              className="text-decoration-none"
            >
              {userProfileDetails.website}
            </a> */}
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
              height: "300px",
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
            {userProfileDetails.wardrow_categories.map((item, index) => (
              <div
                key={index}
                className="rounded-pill mb-3"
                style={{ backgroundColor: "#4C4C4C" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="profile-image rounded-start-pill"
                    style={{ width: "100%", maxWidth: "200px" }}
                  />
                  <div className="text-start p-3 d-flex flex-column justify-content-center text-white w-100">
                    <h4 className="fw-bold mb-0">{item.title}</h4>
                    <div className="d-flex align-items-center">
                      <h6 className="mb-0 me-4">{item.date}</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="row gy-1 g-1 m-0">
          {userProfileDetails.images.map((image, index) => (
            <div
              key={index}
              className="col-12 col-md-4 d-flex justify-content-center align-items-center"
            >
              <img
                className="w-100 rounded-4"
                src={image}
                alt={`User Image ${index + 1}`}
                style={{
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(0.9)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
