import React, { useState } from "react";
import capsulimg from "../../assets/mystylecapsule/capsulimg1.png";
import blankimage from "../../assets/mystylecapsule/Group26992.png";
import "../../styles/Mystylecapsule.scss";
import { Link } from "react-router-dom";
import Calendar from "../allmodal/Calendar";

const MyStyleCapsul = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [middleColumnData, setMiddleColumnData] = useState([]); 

  const handleSave = (images, date) => {
    setSelectedDate(date);

    const updatedMiddleColumn = images.map((img, index) => ({
      url: "/emojistylecapsule",
      src: img,
      top: `${index * 30 + 5}%`, 
      right: "70%", 
    }));
    setMiddleColumnData(updatedMiddleColumn);
  };

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <div className="my-style-capsule-container mb-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center px-4">
          <div className="text-center">
            <h5 className="fw-bold">{selectedDate ? getDayOfWeek(selectedDate) : "No Day Selected"}</h5>
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
          <div className="row m-0 gx-5">
            {/* Left Column */}
            <div className="col inner-img">
              <img
                src={capsulimg}
                style={{ position: "relative" }}
                alt="Capsule Left"
              />
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
            </div>

            {/* Middle Column */}
            <div className="col inner-img">
              <img
                src={capsulimg}
                style={{ position: "relative" }}
                alt="Capsule Middle"
              />
              {middleColumnData.length === 0 ? (
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
                middleColumnData.map((image, imageIndex) => (
                  <Link key={imageIndex} to={image.url}>
                    <div
                      key={imageIndex}
                      style={{
                        position: "absolute",
                        top: image.top,
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

            {/* Right Column */}
            <div className="col inner-img">
              <img
                src={capsulimg}
                style={{ position: "relative" }}
                alt="Capsule Right"
              />
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
            </div>
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
