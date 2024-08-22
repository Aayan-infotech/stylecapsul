import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logout } from "../allmodal/Logout.jsx";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { apiUrl } from '../../../apiUtils';

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
  const [basicProfileDetails, setBasicProfileDetails] = useState(null);

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const { user } = useSelector((state) => state.login);
  const createdBaiscProfileId = location.state?.createdProfileId;

  const handleShowModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       if (user?.data?._id) {
  //         const response = await axios.get(apiUrl(`api/user/${user.data._id}`));
  //         setLogedInUserData(response?.data?.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchUserData();
  // }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.data?._id) {
          const userResponse = await axios.get(apiUrl(`api/user/${user.data._id}`));
          setLogedInUserData(userResponse?.data?.data);
        }
        if (createdBaiscProfileId) {
          const basicResponse = await axios.get(apiUrl(`api/user/get-basic-details/${createdBaiscProfileId}`));
          setBasicProfileDetails(basicResponse?.data?.data);
          // console.log(basicResponse.data?.data?.bio, 'basicResponse')
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, createdBaiscProfileId]);

  const handleEditProfile = () => {
    // console.log(basicProfileDetails?.bio, 'basicProfileDetails')
    navigate('/edit-profile-avatar', {
      state: {
        user: logedInUserData,
        basicProfile: basicProfileDetails
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
                    <h2>{(logedInUserData?.firstName || "Default Name").charAt(0).toUpperCase() + (logedInUserData?.firstName || "Default Name").slice(1)}</h2>
                    <h5 className="fs-6">{logedInUserData?.email || "Elizabeth@gmail.com"}</h5>
                    <blockquote>
                      “{basicProfileDetails?.bio || "“Fashions fade, style is eternal.”"}”
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
