import React, { useState, useEffect } from "react";
import blankimage from "../../assets/mystylecapsule/Group26992.png";
import "../../styles/Mystylecapsule.scss";
import { useLocation } from "react-router-dom";
import CapsuleDialog from "../../components/explore/CapsuleDialog";
import blank_img from "../../assets/stylist/blank_img.jpg";

export const CapsuleRangeCalendarDetails = () => {
  const [capsuleId, setCapsuleId] = useState([]);
  const location = useLocation();
  const { selectedData } = location.state || {};
  console.log(selectedData, "selectedData");

  const [selectedImage, setSelectedImage] = useState(
    selectedData?.image || blankimage
  );
  const [selectedDate, setSelectedDate] = useState(selectedData?.date || "");

  const [columnsData, setColumnsData] = useState([
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
  ]);

  useEffect(() => {
    if (selectedData && selectedData.images) {
      const updatedMiddleColumn = selectedData.images.map((img) => ({
        url: "#",
        src: img,
        top: "5%",
        right: "70%",
      }));
      setColumnsData((prevData) => {
        const newColumnsData = [...prevData];
        newColumnsData[1] = updatedMiddleColumn;
        return newColumnsData;
      });
    }
  }, [selectedData]);

  const handleSave = (images, date, id) => {
    setSelectedDate(date);
    setCapsuleId(id);
    const updatedMiddleColumn = images.map((img) => ({
      url: "#",
      src: img,
      top: "5%",
      right: "70%",
    }));
    setColumnsData((prevData) => {
      const newColumnsData = [...prevData];
      newColumnsData[1] = updatedMiddleColumn;
      return newColumnsData;
    });

    console.log("Capsule ID:", id);
  };

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <div>
      <div className="my-style-capsule-container mb-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img
                alt="User Avatar"
                className="rounded-circle mb-2"
                src={
                  selectedData?.userPostDetails?.user?.profileImage || blank_img
                }
                style={{
                  border: "2px solid black",
                  padding: "5px",
                  borderRadius: "50%",
                  boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.3)",
                  cursor: "pointer",
                  padding: "5px",
                  height: "80px", width: "80px",
                }}
              />
              <h5 className="fw-bold">
                {selectedData?.userPostDetails?.user?.firstName}
              </h5>
              <blockquote className="fw-bold text-center">
                "{selectedData?.userPostDetails?.user?.bio}"
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
          <div
            className="my-1"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="row gx-5">
              {columnsData.map((column, columnIndex) => (
                <div key={columnIndex} className="col-12 col-md-4">
                  {column.length === 0 ? (
                    <div
                      className="p-3"
                      style={{ height: "450px", backgroundColor: "#e0e0e0" }}
                    >
                      <div className="d-flex justify-content-center align-items-center h-100 rounded-4">
                        <div className="text-center">
                          <img src={blankimage} alt="" className="" />
                          <h5>What is your outfit for today going to be?</h5>
                        </div>
                      </div>
                    </div>
                  ) : (
                    column.map((image, imageIndex) => (
                      <div
                        className="p-3"
                        style={{ height: "450px", backgroundColor: "#e0e0e0" }}
                      >
                        <div className="d-flex justify-content-center align-items-center h-100 rounded-4">
                          <div className="text-center">
                            <img
                              src={image.src}
                              alt={`Image ${imageIndex}`}
                              className="w-100"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>

            {/* <div className="border-bottom w-100">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
