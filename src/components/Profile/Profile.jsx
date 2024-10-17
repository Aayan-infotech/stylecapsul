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

function Profile() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [logedInUserData, setLogedInUserData] = useState(null);

  const navigate = useNavigate();

  const { user, status } = useSelector((state) => state.login);
  const singleUser = user;

  useEffect(() => {
    if (status === "succeeded") {
      setLogedInUserData(singleUser);
    }
  }, [status, singleUser]);


  const handleShowModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleEditProfile = () => {
    navigate('/edit-profile-avatar', {
      state: {
        user: logedInUserData,
      }
    });
  };

  return (
    <>
      <div className="profile">
        <div className="card">
          <div className="card-body">
            <div className="row gx-2">
              <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <img
                    src={profile}
                    alt="Profile"
                    className="rounded-pill"
                    height={120}
                    width={120}
                  />
                  <div className="profile-info mt-3">
                    <h2>{(logedInUserData?.firstName || "Default Name").charAt(0).toUpperCase() + (logedInUserData?.firstName || "Elizabeth").slice(1)}</h2>
                    <h5 className="fs-6">{logedInUserData?.email || "Elizabeth@gmail.com"}</h5>
                    <blockquote>
                      “{logedInUserData?.bio || "“Fashions fade, style is eternal.”"}”
                    </blockquote>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <button className="action-button" onClick={handleEditProfile}>
                    <FaUserEdit className="icon" /> Edit Profile
                    <IoIosArrowForward className="arrow-icon" />
                  </button>
                </div>
                <div>
                  <Link to="/scheduled-appointment" className="text-decoration-none">
                    <button className="action-button">
                      <FaCalendarAlt className="icon" /> Scheduled Appointment{" "}
                      <IoIosArrowForward className="arrow-icon" />
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to="/change-password" className="text-decoration-none">
                    <button className="action-button">
                      <FaLock className="icon" /> Change Password{" "}
                      <IoIosArrowForward className="arrow-icon" />
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to="/setting-and-security" className="text-decoration-none">
                    <button className="action-button">
                      <FaCog className="icon" /> Settings{" "}
                      <IoIosArrowForward className="arrow-icon" />
                    </button>
                  </Link>
                </div>
                <div>
                  <button className="action-button" onClick={handleShowModal}>
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
  );
}

export default Profile;
