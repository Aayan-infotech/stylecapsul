import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { getCookie } from "../../utils/cookieUtils";
import { apiUrl } from "../../../apiUtils";
import blank_img from "../../assets/stylist/blank_img.jpg";
import coinhand from "../../assets/closetmanagement/coin-hand.png";
import { showSuccessToast } from "../toastMessage/Toast";

import Loader from "../Loader/Loader.jsx";

export const SocialUserDetails = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userPostDetails, setUserPostDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [clothesOnDates, setClothesOnDates] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const token = getCookie("authToken");
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

  const fetchPostDetailsByUs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl(`api/explore/user-posts-profile/${postId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
      );
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
      setLoading(false);
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
      const selectedData = {
        date: formattedDate,
        images: details.thumbnail,
        userPostDetails: userPostDetails,
      };
      navigate("/capsulerangecalendardetails", { state: { selectedData } });
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          className="container d-block userprofiledetails"
          style={{ paddingTop: "6rem" }}
        >
          <div className="container d-block px-4">
            <div className="row gy-4 m-0 mb-4">
              <div className="col-12 d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <img
                    alt="User Avatar"
                    className="rounded-circle mb-2"
                    src={userPostDetails?.user?.profileImage || blank_img}
                    onError={(e) => {
                      e.target.src = blank_img;
                    }}
                    style={{
                      display: "inline-block",
                      border: "2px solid black",
                      padding: "5px",
                      borderRadius: "50%",
                      boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.3)",
                      cursor: "pointer",
                      padding: "5px",
                      height: "200px",
                      width: "200px",
                    }}
                  />
                  <h4 className="fw-bold">
                    {userPostDetails?.user?.firstName
                      ? userPostDetails?.user?.firstName
                        .charAt(0)
                        .toUpperCase() +
                      userPostDetails?.user?.firstName.slice(1).toLowerCase()
                      : ""}
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
                {/* {wardrow_categories.map((item, index) => (
                  <Link to={item.url} className="text-decoration-none" key={index}>
                    <div
                      className="rounded-pill mb-3 d-flex align-items-center"
                      style={{
                        backgroundColor: "#4C4C4C",
                        height: "70px",
                        padding: "10px",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="profile-image me-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          marginLeft: "15px",
                        }}
                      />
                      <div className="text-start text-white">
                        <h4 className="fw-bold mb-1">{item.title}</h4>
                        <h6 className="mb-0">{item.date}</h6>
                      </div>
                    </div>
                  </Link>
                ))} */}
                {categories?.length > 0 ? (
                  categories.map((item, index) => (
                    <Link key={index} to={`/all-clothes-list/${item?._id}`} state={{ category_name: item?.name }} className="text-decoration-none">
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
                    </Link>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <p className="text-muted fw-bold">No categories found</p>
                  </div>
                )}
              </div>
            </div>
            <div className="row gy-1 g-1 m-0">
              {userPostDetails.images &&
                userPostDetails.images.map((image, index) => (
                  <div
                    key={index}
                    className="col-12 col-md-3 d-flex justify-content-center align-items-center rounded-4" >
                    <img
                      className="w-75 h-75 object-fit-cover rounded-4"
                      src={image}
                      alt={`posts ${index + 1}`}
                      style={{
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(0.9)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                      }}
                      onError={(e) => {
                        e.target.src = blank_img;
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
