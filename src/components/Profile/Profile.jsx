import React, { useState } from "react";
import "./Profile.scss";
import { Link } from "react-router-dom";
import { Logout } from "../allmodal/Logout.jsx";

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

  const handleShowModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

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
                    <h2>Elizabeth</h2>
                    <h5 className="fs-6">Elizabeth@gmail.com</h5>
                    <blockquote>
                      “Fashions fade, style is eternal.”
                    </blockquote>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <Link to="/edit-profile-avatar" style={{ textDecoration: "none" }}>
                    <button className="action-button">
                      <FaUserEdit className="icon" /> Edit Profile{" "}
                      <IoIosArrowForward className="arrow-icon" />
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to="/scheduled-appointment" style={{ textDecoration: "none" }}>
                    <button className="action-button">
                      <FaCalendarAlt className="icon" /> Scheduled Appointment{" "}
                      <IoIosArrowForward className="arrow-icon" />
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to="/change-password" style={{ textDecoration: "none" }}>
                    <button className="action-button">
                      <FaLock className="icon" /> Change Password{" "}
                      <IoIosArrowForward className="arrow-icon" />
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to="/settingAndSecurity" style={{ textDecoration: "none" }}>
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
