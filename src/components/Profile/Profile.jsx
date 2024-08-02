import React from 'react'
import './Profile.scss'
import {Link} from 'react-router-dom'

import { FaUserEdit, FaCalendarAlt, FaLock, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import profile from './img/profile.png'

function Profile() {
  return (
    <>
    <div className='profile'>
    <div className="profile-card">
      <div className="profile-left">
        <img 
          src={profile} 
          alt="Profile" 
          className="profile-image" 
        />
        <div className="profile-info">
          <h2>Elizabeth</h2>
          <p>Elizabeth@gmail.com</p>
          <blockquote>“Fashions fade, style is eternal.”</blockquote>
        </div>
      </div>
      <div className="profile-actions">
        <Link to='/edit-profile-avatar' style={{textDecoration: "none"}}>
        <button className="action-button">
          <FaUserEdit className="icon" /> Edit Profile <IoIosArrowForward className="arrow-icon" />
        </button>
        </Link>

        <Link to='/scheduled-appointment' style={{textDecoration: "none"}}>
        <button className="action-button">
          <FaCalendarAlt className="icon" /> Scheduled Appointment <IoIosArrowForward className="arrow-icon" />
        </button>
        </Link>
        <button className="action-button">
          <FaLock className="icon" /> Change Password <IoIosArrowForward className="arrow-icon" />
        </button>
        <button className="action-button">
          <FaCog className="icon" /> Settings <IoIosArrowForward className="arrow-icon" />
        </button>
        <button className="action-button">
          <FaSignOutAlt className="icon" /> Log Out <IoIosArrowForward className="arrow-icon" />
        </button>
      </div>
    </div>
    </div>
    </>
  )
}

export default Profile