import React, { useState } from "react";
import capsulimg from "../../assets/mystylecapsule/capsulimg1.png";
import blankimage from "../../assets/mystylecapsule/Group26992.png";
import "../../styles/Mystylecapsule.scss";
import { Link } from "react-router-dom";
import Calendar from "../allmodal/Calendar";

const MyStyleCapsul = () => {
  const [selectedImage, setSelectedImage] = useState(blankimage);
  const [selectedDate, setSelectedDate] = useState("");

  const handleSave = (image, date) => {
    setSelectedImage(image);
    setSelectedDate(date);
  };

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" })
  }

  const columnsData = [
    [],
    [
      { url: "/emojistylecapsule", src: selectedImage, top: "5%", right: "70%" },
    ],
    [],
  ];

  return (
    <div className="my-style-capsule-container mb-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center px-4">
          <div className="text-center">
            <h4 className="fw-bold">{selectedDate ? getDayOfWeek(selectedDate) : "No Day Selected"}</h4>
            <h6 className="fw-bold">{selectedDate || "No Date Selected"}</h6>
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
            <Calendar onSave={handleSave} />
          </div>
        </div>

        {/* Image columns */}
        <div className="mt-1" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                    <Link key={imageIndex} to={image.url}>
                      <div className="p-3" style={{ height: "450px", backgroundColor: "#e0e0e0" }}>
                        <div className="d-flex justify-content-center align-items-center h-100 rounded-4">
                          <div className="text-center">
                            <img src={image.src} alt={`Image ${imageIndex}`} className="w-100" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            ))}
          </div>

          {/* Like, Comment, and Share section */}
          <div className="border-bottom w-100 mt-4">
            <div className="d-flex justify-content-end align-items-center text-black">
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
export default MyStyleCapsul;
