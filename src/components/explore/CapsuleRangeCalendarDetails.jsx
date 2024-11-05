import React, { useState } from "react";
import capsulimg from "../../assets/mystylecapsule/capsulimg1.png";
import blankimage from "../../assets/mystylecapsule/Group26992.png";
import "../../styles/Mystylecapsule.scss";
import { Link } from "react-router-dom";
// import Calendar from "../../components/allmodal/Calendar";
import CapsuleDialog from "../../components/explore/CapsuleDialog";
import showimg4 from "../../assets/myCapsuleAddAvtar/previewImage4.jpg";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
// import Avatar from "react-avatar";

export const CapsuleRangeCalendarDetails = () => {
  const [selectedImage, setSelectedImage] = useState(blankimage);
  const [selectedDate, setSelectedDate] = useState("");

  const handleSave = (image, date) => {
    setSelectedImage(image);
    setSelectedDate(date);
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
    <div>
      <div className="my-style-capsule-container mb-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Avatar
                alt="Remy Sharp"
                src={showimg4}
                className="rounded-pill"
                sx={{ height: "20px", width: "20px" }}
              />
              <h5 className="fw-bold">Anshuman</h5>
              <p className="mb-0">Elizabeth@gmail.com</p>
              <blockquote className="fw-bold text-center">
                "Fashions fade, style is eternal."
              </blockquote>
            </div>
            <div className="text-center">
              <h4 className="fw-bold">
                {selectedDate ? getDayOfWeek(selectedDate) : "No Day Selected"}
              </h4>
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
          <div className="mt-5">
            <div className="row gx-5">
              {columnsData.map((column, columnIndex) => (
                <div key={columnIndex} className="col inner-img">
                  <img
                    src={capsulimg}
                    style={{ position: "relative" }}
                    alt={`Capsule ${columnIndex}`}
                  />
                  {column.length === 0 ? (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div>
                        <img
                          style={{ marginLeft: "4rem" }}
                          src={blankimage}
                          height={50}
                          width={50}
                          alt="No Image"
                        />
                        <br />
                        <br />
                        <h6
                          style={{ marginLeft: "2rem" }}
                          className="fs-6 text-center mt-2"
                        >
                          What is your outfit for today going to be?
                        </h6>
                      </div>
                    </div>
                  ) : (
                    column.map((image, imageIndex) => (
                      <Link key={imageIndex} to={image.url}>
                        <div
                          key={imageIndex}
                          style={{
                            position: "absolute",
                            top: image.top,
                            left: image.left,
                            right: image.right,
                          }}
                        >
                          <img
                            src={image.src}
                            width={200}
                            alt={`Image ${imageIndex}`}
                          />
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              ))}
            </div>
            <div className="border-bottom">
              <div className="d-flex justify-content-between pt-2 mt-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center text-black">
                    <ThumbUpIcon className="fs-5 me-3" />
                    <h6 className="mt-1">20</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center text-black">
                  <h6 className="me-3">20 Comments</h6>
                  <h6>4 Shares</h6>
                </div>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
