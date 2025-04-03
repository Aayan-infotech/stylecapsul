import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import showimg4 from "../../assets/marketplace/showimg4.jpg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Avatar } from "@mui/material";
import axios from "axios";
import { getCookie } from "../../utils/cookieUtils";
import { apiUrl } from "../../../apiUtils";
import blank_img from "../../assets/stylist/blank_img.jpg";
import notification from "../../assets/closetmanagement/Group 1806.png";
import closet from "../../assets/closetmanagement/closet.png";
import coinhand from "../../assets/closetmanagement/coin-hand.png";
import imagefocus from "../../assets/closetmanagement/image-focus.png";
import Loader from "../Loader/Loader.jsx";

const ExploreUserProfileDetails = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userPostDetails, setUserPostDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [clothesOnDates, setClothesOnDates] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const token = getCookie("authToken");

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
      const response = await axios.get(apiUrl("api/explore/user-profile-data"), {
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
        // if (response?.data?.success) {
        //   setUserPostDetails(response?.data);
        //   const data = response?.data?.styleOfTheDay || [];

        //   const formattedData = data?.styleOfTheDay?.map((item) => {
        //     const styleOfTheDay = item?.styleOfTheDay || {};
        //     const date = styleOfTheDay.date
        //       ? styleOfTheDay.date.split("T")[0]
        //       : null;
        //     const pictures = styleOfTheDay.clothes?.filter((cloth) => cloth?.picture).map((cloth) => cloth.picture);
        //     return {
        //       date,
        //       thumbnail: pictures || [],
        //       id: item._id || null,
        //     };
        //   }).filter((item) => item.date);
        //   console.log(pictures, 'pictures')
        //   setClothesOnDates(formattedData);
        // }

        setClothesOnDates(formattedData);
      }
    } catch (error) {
      console.error("Error fetching clothes data:", error);
    } finally {
      setLoading(false);
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
        <div className="container d-block userprofiledetails" style={{ paddingTop: "6rem" }}>
          <div className="container d-block px-4">
            <div className="row gy-4 m-0 mb-4">
              <div className="col-12 d-flex justify-content-center align-items-center text-center">
                <div>
                  <img
                    alt="User Avatar"
                    className="rounded-circle mb-2"
                    src={userPostDetails?.user?.user?.profileImage || blank_img}
                    style={{
                      border: "2px solid black",
                      padding: "5px",
                      borderRadius: "50%",
                      boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.3)",
                      cursor: "pointer",
                      padding: "5px",
                      height: "200px",
                    }}
                    onError={(e) => { e.target.onerror = null; e.target.src = blank_img }}
                  />
                  <h4 className="fw-bold">
                    {userPostDetails?.user?.user?.firstName
                      ? userPostDetails?.user?.user?.firstName
                        .charAt(0)
                        .toUpperCase() +
                      userPostDetails?.user?.user?.firstName
                        .slice(1)
                        .toLowerCase()
                      : "N/A"}
                  </h4>
                  <p className="m-0">{userPostDetails?.user?.user?.bio}</p>
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
                    <Link to={`/all-clothes-list/${item?._id}`} state={{ category_name: item?.name }} className="text-decoration-none">
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
              {userPostDetails?.user?.image &&
                userPostDetails.user.image.map((image, index) => (
                  <div
                    key={index}
                    className="col-12 col-md-4 d-flex justify-content-center align-items-center rounded-4"
                    style={{
                      height: "300px",
                      overflow: "hidden",
                      position: "relative",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    <img
                      className="w-100 h-100 object-fit-cover rounded-4"
                      src={image}
                      alt={`User Image ${index + 1}`}
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
export default ExploreUserProfileDetails;
