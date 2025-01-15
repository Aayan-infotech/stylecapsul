import React, { useState } from "react";
import capsulimg from "../../assets/mystylecapsule/capsulimg1.png";
import blankimage from "../../assets/mystylecapsule/Group26992.png";
import "../../styles/Mystylecapsule.scss";
import { Link } from "react-router-dom";
import Calendar from "../allmodal/Calendar";
import { apiUrl } from "../../../apiUtils";
import { getCookie } from "../../utils/cookieUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";
import axios from "axios";

const MyStyleCapsul = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [middleColumnData, setMiddleColumnData] = useState([]);
  const [capsuleId, setCapsuleId] = useState("");
  const [isLoadingExplore, setIsLoadingExplore] = useState(false);
  const [isLoadingInstagram, setIsLoadingInstagram] = useState(false);

  const userId = getCookie("userId");
  const token = getCookie("authToken");

  const handleSave = (images, date, id) => {
    setSelectedDate(date);
    setCapsuleId(id);

    const updatedMiddleColumn = images.map((img, index) => ({
      url: "/emojistylecapsule",
      src: img,
      top: `${index * 30 + 5}%`,
      right: "70%",
    }));
    setMiddleColumnData(updatedMiddleColumn);
    console.log("Capsule ID:", id);
  };

  console.log(middleColumnData, "middleColumnData");

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const handleExploreShare = async () => {
    try {
      if (!capsuleId) {
        showErrorToast("Please select a capsule to share.");
        return;
      }
      const payload = {
        userId: userId,
        styleCapsuleId: capsuleId,
      };
      setIsLoadingExplore(true);
      const response = await axios.post(apiUrl("api/explore/create"), payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.data?.success) {
        const successMessage = response?.data?.message;
        showSuccessToast(successMessage);
        setMiddleColumnData([]);
        setSelectedDate("");
        setCapsuleId("");
      } else {
        showErrorToast(response?.data?.message);
      }
    } catch (error) {
      console.log(error?.response, "error");
      if (error?.response?.data?.message) {
        showErrorToast(error?.response?.data?.message);
      } else {
        showErrorToast("Error sharing data on Explore.");
      }
    } finally {
      setIsLoadingExplore(false);
    }
  };

  const handleInstagramShare = () => {
    const instagramShareUrl = `https://www.instagram.com/stylecapsule/`;
    window.open(instagramShareUrl, "_blank");
  };

  return (
    <div className="my-style-capsule-container mb-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center px-4">
          <div className="text-center">
            <h5 className="fw-bold">
              {selectedDate ? getDayOfWeek(selectedDate) : "No Day Selected"}
            </h5>
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
        <div
          className="mt-1"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="row m-0 gx-5">
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

          <div className="border-bottom w-100 mt-4">
            <div className="border-bottom w-100 mt-4">
              <div className="d-flex justify-content-end align-items-center text-black">
                <h5
                  style={{
                    cursor: capsuleId ? "pointer" : "not-allowed",
                    position: "relative",
                    opacity: capsuleId ? 1 : 0.5,
                  }}
                  onClick={capsuleId ? handleExploreShare : null}
                  className="me-3"
                >
                  {isLoadingExplore ? (
                    <span className="loading-text">
                      <i className="fa-solid fa-spinner fa-spin me-2"></i>
                      Sharing...
                    </span>
                  ) : (
                    <>
                      <i className="fa-solid fa-share me-2"></i> Share
                    </>
                  )}
                </h5>
                <h5
                  style={{
                    cursor: capsuleId ? "pointer" : "not-allowed",
                    position: "relative",
                    opacity: capsuleId ? 1 : 0.5,
                  }}
                  onClick={capsuleId ? handleInstagramShare : null}
                >
                  {isLoadingInstagram ? (
                    <span className="loading-text">
                      <i className="fa-solid fa-spinner fa-spin me-2"></i>{" "}
                      Opening...
                    </span>
                  ) : (
                    <div className="p-2 rounded-circle d-flex align-items-center">
                      <img
                        src="https://static-00.iconduck.com/assets.00/instagram-with-circle-icon-2048x2048-21sdb59c.png"
                        height="30"
                        alt="Instagram"
                      />
                    </div>
                  )}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStyleCapsul;
