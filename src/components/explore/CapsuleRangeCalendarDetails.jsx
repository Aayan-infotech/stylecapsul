import React, { useState } from "react";
import capsulimg from "../../assets/mystylecapsule/capsulimg1.png";
import blankimage from "../../assets/mystylecapsule/Group26992.png";
import "../../styles/Mystylecapsule.scss";
import { Link, useLocation } from "react-router-dom";
import CapsuleDialog from "../../components/explore/CapsuleDialog";
import showimg4 from "../../assets/myCapsuleAddAvtar/previewImage4.jpg";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Avatar, Box, IconButton, InputAdornment, TextField } from "@mui/material";

export const CapsuleRangeCalendarDetails = () => {
  const location = useLocation();
  const { selectedData } = location.state || {};

  const [selectedImage, setSelectedImage] = useState(selectedData?.image || blankimage);
  const [selectedDate, setSelectedDate] = useState(selectedData?.date || "");

  const handleSave = (image, date) => {
    setSelectedImage(image || selectedData?.image || blankimage);
    setSelectedDate(date || selectedData?.date || "");
  };

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const columnsData = [
    [],
    [
      {
        url: "/calendarstylecapsule",
        src: selectedImage,
        top: "5%",
        right: "70%",
      },
    ],
    [],
  ];

  return (
    <div className="my-style-capsule-container mb-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Avatar
              alt="Remy Sharp"
              src={selectedImage || showimg4}
              className="rounded-pill"
              sx={{ height: "80px", width: "80px", backgroundColor: "#e0e0e0", objectFit: "contain" }}
            />
            <h5 className="fw-bold">Anshuman</h5>
            <p className="mb-0">Elizabeth@gmail.com</p>
            <blockquote className="fw-bold text-center">
              "Fashions fade, style is eternal."
            </blockquote>
          </div>

          {/* Center date section */}
          <div className="text-center">
            <h2 className="fw-bold">
              {selectedDate ? getDayOfWeek(selectedDate) : "No Day Selected"}
            </h2>
            <h5 className="fw-bold">{selectedDate || "No Date Selected"}</h5>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-dark rounded-pill"
              data-bs-toggle="modal"
              data-bs-target="#openCalendarDialogCurrent"
            >
              <i className="fa-solid fa-calendar-days me-2"></i>Calendar
            </button>
            <CapsuleDialog onSave={handleSave} />
          </div>
        </div>

        {/* Image columns */}
        <div className="mt-5" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="row gx-5">
            {columnsData.map((column, columnIndex) => (
              <div key={columnIndex} className="col-12 col-md-4">
                {column.length === 0 ? (
                  <div className="p-3" style={{ height: "450px", backgroundColor: "#e0e0e0" }}>
                    <div className="d-flex justify-content-center align-items-center h-100 rounded-4">
                      <div className="text-center">
                        <img src={blankimage} alt="" className="" />
                        <h5>What is your outfit for today going to be?</h5>
                      </div>
                    </div>
                  </div>
                ) : (
                  column.map((image, imageIndex) => (
                    <div className="p-3" style={{ height: "450px", backgroundColor: "#e0e0e0" }}>
                      <div className="d-flex justify-content-center align-items-center h-100 rounded-4">
                        <div className="text-center">
                          <img src={image.src} alt={`Image ${imageIndex}`} className="w-100" />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>

          {/* Like, Comment, and Share section */}
          <div className="border-bottom w-100">
            <div className="d-flex justify-content-between pt-2 mt-4">
              <div className="d-flex align-items-center text-black">
                <ThumbUpIcon className="fs-5 me-3" />
                <h6 className="mt-1">20</h6>
              </div>
              <div className="d-flex align-items-center text-black">
                <h6 className="me-3">20 Comments</h6>
                <h6>4 Shares</h6>
              </div>
            </div>
            <div className="d-flex justify-content-evenly align-items-center text-black">
              <h5 style={{ cursor: "pointer" }}>
                <i className="fa-regular fa-thumbs-up me-2"></i> Like
              </h5>
              <h5 style={{ cursor: "pointer" }}>
                <i className="fa-regular fa-comment me-2"></i> Comment
              </h5>
              <h5 style={{ cursor: "pointer" }}>
                <i className="fa-solid fa-share me-2"></i> Share
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
