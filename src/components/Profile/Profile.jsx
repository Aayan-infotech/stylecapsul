import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../allmodal/Logout.jsx";
import { useSelector } from "react-redux";
import {
  FaUserEdit,
  FaCalendarAlt,
  FaLock,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import profile from "./img/profile.png";
import Loader from "../Loader/Loader.jsx";
import axios from "axios";
import { getCookie } from "../../utils/cookieUtils";
import { apiUrl } from "../../../apiUtils";
import CircularProgress from "@mui/material/CircularProgress";

function Profile() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [logedInUserData, setLogedInUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const { user, status } = useSelector((state) => state.login);
  const singleUser = user?.payload || user;

  useEffect(() => {
    if (status === "succeeded") {
      const timeoutId = setTimeout(() => {
        setLogedInUserData(singleUser);
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [status, singleUser]);

  const handleShowModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleEditProfile = () => {
    navigate("/edit-profile-avatar", {
      state: {
        user: logedInUserData,
      },
    });
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      handleUploadProfileImage(file);
    }
  };

  const handleUploadProfileImage = async (file) => {
    try {
      const token = getCookie("authToken");
      const userId = getCookie("userId");
      const formData = new FormData();
      formData.append("image", file, file.name);
      const response = await axios.post(
        apiUrl(`api/user/profile/${userId}`),
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted); // Update progress state
          },
        }
      );
      if (response?.data?.profileImage) {
        setLogedInUserData((prevData) => ({
          ...prevData,
          profileImage: response.data.profileImage,
        }));
      }
      console.log("Upload success:", response.data);
    } catch (error) {
      console.error("Error uploading avatar image:", error);
      setUploadProgress(0);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="profile">
            <div className="card">
              <div className="card-body">
                <div className="row gx-2">
                  <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                    <div className="text-center">
                      <div className="hover-upload-profile">
                        <div
                          className="profile-image-container"
                          onClick={handleImageClick}
                        >
                          <img
                            src={
                              previewImage ||
                              logedInUserData?.profileImage ||
                              profile
                            }
                            alt="Profile"
                            className="rounded-pill"
                            height={200}
                            width={200}
                            style={{ objectFit: "cover" }}
                          />
                          <div className="upload-overlay">
                            <i className="fa fa-camera"></i> {/* Upload icon */}
                          </div>
                        </div>
                        <input
                          type="file"
                          id="fileInput"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        {uploadProgress > 0 && uploadProgress < 100 && (
                          <div className="progress-container">
                            <CircularProgress
                              variant="determinate"
                              value={uploadProgress}
                              color="primary"
                            />
                          </div>
                        )}
                      </div>
                      <div className="profile-info mt-3">
                        <h2>
                          {(logedInUserData?.firstName || "Default Name")
                            .charAt(0)
                            .toUpperCase() +
                            (logedInUserData?.firstName || "Elizabeth").slice(
                              1
                            )}
                        </h2>
                        <h5 className="fs-6">
                          {logedInUserData?.email || "Elizabeth@gmail.com"}
                        </h5>
                        <blockquote>
                          “
                          {logedInUserData?.bio ||
                            "“Fashions fade, style is eternal.”"}
                          ”
                        </blockquote>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div>
                      <button
                        className="action-button"
                        onClick={handleEditProfile}
                      >
                        <FaUserEdit className="icon" /> Edit Profile
                        <IoIosArrowForward className="arrow-icon" />
                      </button>
                    </div>
                    <div>
                      <Link
                        to="/scheduled-appointment"
                        className="text-decoration-none"
                      >
                        <button className="action-button">
                          <FaCalendarAlt className="icon" />
                          <span>Scheduled Appointment</span>
                          <IoIosArrowForward className="arrow-icon" />
                        </button>
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/change-password"
                        className="text-decoration-none"
                      >
                        <button className="action-button">
                          <FaLock className="icon" /> Change Password{" "}
                          <IoIosArrowForward className="arrow-icon" />
                        </button>
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/setting-and-security"
                        className="text-decoration-none"
                      >
                        <button className="action-button">
                          <FaCog className="icon" /> Settings{" "}
                          <IoIosArrowForward className="arrow-icon" />
                        </button>
                      </Link>
                    </div>
                    <div>
                      <button
                        className="action-button"
                        onClick={handleShowModal}
                      >
                        <FaSignOutAlt className="icon" /> Log Out{" "}
                        <IoIosArrowForward className="arrow-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Logout isModalVisible={isModalVisible} onClose={handleCloseModal} />
        </>
      )}
    </>
  );
}

export default Profile;
