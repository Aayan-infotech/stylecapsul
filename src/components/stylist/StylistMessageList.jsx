import React from 'react';
import '../../styles/StylistMessageList.scss';
import blank_image from '../../assets/stylist/blank_img.jpg';
import { useLocation } from 'react-router-dom';

const StylistMessageList = () => {
    const location = useLocation();
    const stylistList = location?.state?.profile_details;

    return (
        <div className="stylist-message-container">
            <div className="container d-flex justify-content-center align-items-center">
                <div className="row gx-5 mt-2">
                    <h1 className="fw-bold fs-1 text-center text-md-start">Message</h1>
                    <div className="col-12">
                        <div className="border border-2 rounded-pill" style={{ borderColor: 'black', boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
                            <div className="d-flex align-items-center">
                                <img
                                    src={stylistList?.profilePicture || blank_image}
                                    alt={stylistList?.name || 'Stylist'}
                                    className="profile-image rounded-start-pill"
                                />
                                <div className="message-content ms-3">
                                    <h4 className="name fs-4 mb-3">{stylistList?.name}</h4>
                                    <p className="message mb-0 text-black">{stylistList?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StylistMessageList;
