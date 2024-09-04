import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/StylistDetails.scss';
import blank_image from '../../assets/stylist/blank_img.jpg';
import image_1 from '../../assets/marketplace/showimg5.jpg';

const StylistDetails = () => {
    const [showStylistProfileDetails, setSshowStylistProfileDetails] = useState(null);

    const ratingsData = [
        { stars: 5, percentage: 70, count: 488 },
        { stars: 4, percentage: 62, count: 74 },
        { stars: 3, percentage: 53, count: 14 },
        { stars: 2, percentage: 30, count: 10 },
        { stars: 1, percentage: 16, count: 5 },
    ];

    const location = useLocation();
    const profile_details = location.state?.stylist;
    console.log(profile_details, 'profile_details')

    useEffect(() => {
        if (profile_details) {
            setSshowStylistProfileDetails(profile_details);
        }
    }, [profile_details]);

    const fullStars = Math.floor(profile_details?.ratings);
    const hasHalfStar = (profile_details?.ratings) % 1 !== 0;
    const totalStars = 5;

    return (
        <div className="stylist-main-container-sections">
            <div className="container w-75">
                <div className="row gx-4">
                    <div className="col-12">
                        <h1 className="fw-bold fs-1 text-center text-md-start">Stylist</h1>
                    </div>
                    <div className="col-12 col-md-3 d-flex justify-content-center">
                        <img src={image_1} className='stylist-profile-image rounded-pill' alt="Stylist" />
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="d-flex justify-content-between align-items-center mt-5">
                            <h4 className="fw-bold fs-3">{profile_details?.name}</h4>
                            <div className="d-flex">
                                {[...Array(totalStars)].map((_, index) => {
                                    if (index < fullStars) {
                                        return <i key={index} className="fa fa-star text-warning"></i>;
                                    }
                                    if (index === fullStars && hasHalfStar) {
                                        return <i key={index} className="fa fa-star-half-alt text-warning"></i>;
                                    }
                                    return <i key={index} className="fa fa-star text-secondary"></i>;
                                })}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5>Outfit Planning</h5>
                            <div>
                                <button type="button" className="btn btn-outline-dark me-2 rounded-pill" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", width: "60px" }}>
                                    <i className="fa-solid fa-user-plus"></i>
                                </button>
                                <button type="button" className="btn btn-outline-dark rounded-pill" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", width: "60px" }}>
                                    <i className="fa-solid fa-message"></i>
                                </button>
                            </div>
                        </div>
                        <div align="center" className="mt-5">
                            <Link to={{ pathname: `/stylist-message-list`, }} state={{ profile_details }} className="text-decoration-none w-100">
                                <button type="button" className="btn hire-custom-btn rounded-pill p-2">Hire</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <h4 className="fw-bold fs-4">Description</h4>
                        <p>{profile_details?.description}</p>
                        <h4 className="fw-bold fs-4">Skills</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <h4 className="fw-bold fs-4">Work History</h4>
                        <h6 className="fw-bold fs-6">Fashion Designer</h6>
                        <p><strong>Elegance Couture</strong> | New York, NY 2021 – Present</p>
                        <p>- Designed seasonal collections and oversaw garment production.</p>
                        <h6 className="fw-bold fs-6">Stylist</h6>
                        <p><strong>Vogue Boutique</strong> | Los Angeles, CA 2019 – 2021</p>
                        <p>- Styled clients for events and curated looks for photoshoots.</p>
                        <h6 className="fw-bold fs-6">Fashion Design Intern</h6>
                        <p><strong>Urban Threads</strong> | San Francisco, CA 2018 – 2019</p>
                        <p>- Assisted in sketching designs and preparing for photoshoots.</p>
                    </div>
                </div>
                <div>
                    <div className="row">
                        <div className="col-12 mt-4">
                            <h2 className="fw-bold">Reviews</h2>
                        </div>
                    </div>
                    <div className="row gx-4 my-4">
                        <div className="col-12 col-md-4">
                            <h6 className="fw-bold">Employee Reviews</h6>
                            <div className="display-4 fw-bold">4.7</div>
                            <div className="d-flex my-2">
                                {[...Array(5)].map((_, index) => (
                                    <i key={index} className={`fa fa-star ${index < 4 ? 'text-warning' : 'fa-star-half-alt text-warning'}`}></i>
                                ))}
                            </div>
                            <p className="text-h6 text-muted mt-2">(578 Reviews)</p>
                        </div>
                        <div className="col-12 col-md-8">
                            {ratingsData.map((rating, index) => (
                                <div className="row align-items-center gx-1 mb-2" key={index}>
                                    <div className="col-12 col-md-2 d-flex justify-content-md-end justify-content-start">
                                        <h6 className="mb-0 fw-normal">{rating.stars} stars</h6>
                                    </div>
                                    <div className="col-12 col-md-8">
                                        <div className="progress flex-grow-1" style={{ height: '6px' }}>
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width: `${rating.percentage}%`,
                                                    backgroundColor: '#E7B66B',
                                                }}
                                                aria-valuenow={rating.percentage}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-2 d-flex justify-content-md-start justify-content-end">
                                        <h6 className="mb-0">{rating.count}</h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row mt-4">
                        <span className="text-muted">Jan 20, 2024</span>
                        <div className="col-12 mt-2">
                            <div className="d-flex align-items-center mb-3">
                                {[...Array(5)].map((_, index) => (
                                    <i key={index} className={`fa fa-star ${index < 5 ? 'text-warning' : ''}`}></i>
                                ))}
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>AK</div>
                                </div>
                                <div>
                                    <h6 className="m-0">Alex K.</h6>
                                </div>
                            </div>
                            <div>
                                <small className="text-muted mt-2">Senior Analyst</small>
                                <p className="mt-2">
                                    Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge, and being a part of a team that's revolutionizing how people achieve their goals is immensely fulfilling.
                                </p>
                            </div>
                        </div>
                        <hr className="text-muted mt-4" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StylistDetails;
