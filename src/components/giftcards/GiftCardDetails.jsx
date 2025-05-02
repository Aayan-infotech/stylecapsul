import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "../../styles/GiftCardDetails.scss";
import giftcard1 from "../../assets/giftcards/giftcard1.png";
import axios from 'axios';
import { apiUrl } from '../../../apiUtils';

const GiftCardDetails = () => {
    const [giftDetails, setGiftDetails] = useState(null);
    const [isCopied, setIsCopied] = useState(false);
    const { id } = useParams();

    const fetchGiftDetails = async () => {
        try {
            const response = await axios.get(apiUrl(`api/gifts/giftById/${id}`));
            console.log(response?.data?.data, 'response');
            setGiftDetails(response?.data?.data);
        } catch (error) {
            console.log(error, 'Something went wrong..!');
        }
    };

    useEffect(() => {
        fetchGiftDetails();
    }, [id]);

    const handleCopyPromoCode = () => {
        const promoCode = giftDetails?.giftPromoCode;
        if (promoCode) {
            navigator.clipboard.writeText(promoCode)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => {
                        setIsCopied(false);
                    }, 2000);
                })
                .catch(err => console.error('Failed to copy: ', err));
        }
    };

    useEffect(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, []);

    return (
        <>
            <div className="d-flex justify-content-center align-items-center gift-card--container-sections">
                <div className="container p-4">
                    <div className="row m-0 gx-2">
                        <h1 className="fw-bold fs-1">Gift Details</h1>
                        <div className="col-12 col-md-6 mb-2 mb-md-0 p-3">
                            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active position-relative">
                                        <img src={giftcard1} className="d-block w-100 gift-carousel-image" alt="..." />
                                        <div className="gift-card-carosule-content">
                                            <h5 className="card-title">{giftDetails?.giftTitle}</h5>
                                            <p className="card-text mt-3 w-75">{giftDetails?.giftDescription}</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src={giftcard1} className="d-block w-100 gift-carousel-image" alt="..." />
                                        <div className="gift-card-carosule-content">
                                            <h5 className="card-title">{giftDetails?.giftTitle}</h5>
                                            <p className="card-text mt-3 w-75">{giftDetails?.giftDescription}</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src={giftcard1} className="d-block w-100 gift-carousel-image" alt="..." />
                                        <div className="gift-card-carosule-content">
                                            <h5 className="card-title">{giftDetails?.giftTitle}</h5>
                                            <p className="card-text mt-3 w-75">{giftDetails?.giftDescription}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-indicators gift-custom-indicators">
                                    <button
                                        type="button"
                                        data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide-to="0"
                                        className="active"
                                        aria-current="true"
                                        aria-label="Slide 1"
                                    ></button>
                                    <button
                                        type="button"
                                        data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide-to="1"
                                        aria-label="Slide 2"
                                    ></button>
                                    <button
                                        type="button"
                                        data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide-to="2"
                                        aria-label="Slide 3"
                                    ></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 p-3 gift-service-details">
                            <div>
                                <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center '>
                                    <h5 className='me-3'>{giftDetails?.giftTitle}</h5>
                                    <h5>
                                        <span className="badge text-bg-dark">
                                            {giftDetails?.giftPromoCode}
                                        </span>
                                        <i
                                            className={isCopied ? "fa-solid fa-circle-check text-success" : "fa-regular fa-copy"}
                                            onClick={handleCopyPromoCode}
                                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                                            data-bs-toggle="tooltip"
                                            title={isCopied ? "Copied" : "Copy Code"}
                                        ></i>
                                    </h5>
                                </div>
                                <div className='border-line'></div>
                                <div className='mt-3'>
                                    <p>Valid Up To: {giftDetails?.offerValidity ?
                                        new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(giftDetails.offerValidity))
                                        : 'N/A'}</p>
                                    <p className='fs-5'>{giftDetails?.giftDescription}</p>
                                </div>
                            </div>
                            {/* <div align="center" className="mt-5">
                                <button
                                    type="button"
                                    className="btn gift-custom-btn w-50 rounded-pill p-2">
                                    Share
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GiftCardDetails;
