import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/StylistDetails.scss';
import blank_image from '../../assets/stylist/blank_img.jpg'

const StylistDetails = () => {

    const [showStylistDetails, setShowStylistDetails] = useState(null);
    const location = useLocation();
    const stylist = location.state?.stylist;

    useEffect(() => {
        if (stylist) {
            setShowStylistDetails(stylist);
        }
    }, [stylist]);

    return (
        <>
            <div className="d-flex justify-content-center align-items-center stylist-main-container-sections">
                <div className="container p-4">
                    <h1 className="fw-bold fs-1">Stylist</h1>
                    <div className="row m-0 gx-2">
                        <div className="col-12 col-md-6 mb-2 mb-md-0 p-3">
                            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {[...Array(3)].map((item, index) => (
                                        <div
                                            className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                            key={index}
                                        >
                                            {showStylistDetails?.profilePicture ? (
                                                <img
                                                    src={showStylistDetails.profilePicture}
                                                    className="d-block w-100 stylist-carousel-image"
                                                    alt="Stylist"
                                                />
                                            ) : (
                                                <img
                                                    src={blank_image}
                                                    className="d-block w-100 stylist-carousel-image"
                                                    alt="No Image Available"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="carousel-indicators stylist-custom-indicators">
                                    {[...Array(3)].map((item, index) => (
                                        <button
                                            type="button"
                                            data-bs-target="#carouselExampleIndicators"
                                            data-bs-slide-to={index}
                                            className={index === 0 ? "active" : ""}
                                            aria-current={index === 0 ? "true" : ""}
                                            aria-label={`Slide ${index + 1}`}
                                            key={index}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 p-3 stylist-serviece-details">
                            <div>
                                <h5>{showStylistDetails?.name}</h5>
                                <div className='border-line'></div>
                                <div className='mt-2'>
                                    <h4 className='fw-bold'>Description</h4>
                                    <p className='fs-6'>{showStylistDetails?.description}</p>
                                </div>
                                <div className=''>
                                    <h4 className='fw-bold'>Skills</h4>
                                    <p className='fs-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                                </div>
                            </div>
                            <div align="center" className="">
                                <button type="button" className="btn hire-custom-btn w-50 rounded-pill p-2">Hire</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StylistDetails;