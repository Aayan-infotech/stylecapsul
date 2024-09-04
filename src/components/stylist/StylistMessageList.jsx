import React from 'react';
import '../../styles/StylistMessageList.scss';
import img_1 from '../../assets/stylist/img2.png'
import { useLocation } from 'react-router-dom';

const StylistMessageList = () => {
    const location = useLocation();
    const stylistList = location?.state?.profile_details;
    console.log(stylistList, 'stylistList')

    return (
        <div className="stylist-message-container">
            <div className="container d-flex justify-content-center align-items-center">
                <div className="row gx-5 mt-2">
                    <h1 className="fw-bold fs-1 text-center text-md-start">Message</h1>
                    <div className="col-12">
                        <div className="border border-2 rounded-pill">
                            <div className="d-flex align-items-center p-2">
                                <img
                                    src={img_1}
                                    alt="John Doe"
                                    className="profile-image rounded-circle"
                                />
                                <div className="message-content ms-3">
                                    <h5 className="name mb-1">John Doe</h5>
                                    <p className="message mb-0">Hey john this side, i hope you’re doing well.</p>
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
