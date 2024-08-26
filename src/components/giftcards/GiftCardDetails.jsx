import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "../../styles/GiftCardDetails.scss";
import giftcard1 from "../../assets/giftcards/giftcard1.png";
import giftcard2 from "../../assets/giftcards/giftcard2.png";
import giftcard3 from "../../assets/giftcards/giftcard3.png";
import giftcard4 from "../../assets/giftcards/giftcard4.png";
import giftcard5 from "../../assets/giftcards/giftcard5.png";

const GiftCardDetails = () => {
    const [showCardDetails, setShowCardDetails] = useState("");

    const giftCardData = [
        {
            id: 1,
            title: "One Family, Big Saving",
            description:
                "Postpaid at just ₹260/connection with Vi Family $1299/plan 300GB data, Disney+ Mobile, Amazon Prime & more.",
            buttonText: "Claim Now",
            imageUrl: giftcard1,
            altText: "Gift Card",
            iconClass: "fa-solid fa-arrow-right-long",
        },
        {
            id: 2,
            title: (
                <>
                    Get upto 100 cashback*
                    <br />
                    in your Paypal Wallet
                </>
            ),
            description: "on transaction of ₹99 and above using Paypal UPI or Wallet",
            buttonText: "Claim Now",
            imageUrl: giftcard1,
            altText: "Gift Card",
            iconClass: "fa-solid fa-angles-right",
        },
        {
            id: 3,
            title: (
                <>
                    Get assured cashback*
                    <br /> up to ₹100
                </>
            ),
            description: "Offer valid on unlimited daily data packs starting ₹100",
            buttonText: "Claim Now",
            imageUrl: giftcard4,
            altText: "Gift Card",
            iconClass: "fa-solid fa-angles-right",
        },
        {
            id: 4,
            title: (
                <>
                    Unlock a better *<br /> tomorrow
                </>
            ),
            description: "Get exclusive solutions to help you get ahead in life",
            buttonText: "Claim Now",
            imageUrl: giftcard3,
            altText: "Gift Card",
            iconClass: "fa-solid fa-angles-right",
        },
        {
            id: 5,
            title: (
                <>
                    Get ₹200 off on your*
                    <br /> first order
                </>
            ),
            description: "on transaction of ₹99 and above using Paypal UPI or Wallet",
            buttonText: "Claim Now",
            imageUrl: giftcard1,
            altText: "Gift Card",
            iconClass: "fa-solid fa-arrow-right-long",
        },
    ];
    const { id } = useParams();
    const cardDetails = giftCardData.find((item) => item.id === parseInt(id));

    if (!cardDetails) {
        return <div>Gift Card not found</div>;
    }


    return (
        <>
            <div className="d-flex justify-content-center align-items-center gift-card--container-sections">
                <div className="container p-4">
                    <h1 className="fw-bold fs-1">Card</h1>
                    <div className="row m-0 gx-2">
                        <div className="col-12 col-md-6 mb-2 mb-md-0 p-3">
                            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active position-relative">
                                        <img src={giftcard1} className="d-block w-100 gift-carousel-image" alt="..." />
                                        <div className="gift-card-carosule-content">
                                            <h5 className="card-title">{cardDetails.title}</h5>
                                            <p className="card-text mt-3 w-75">{cardDetails.description}</p>
                                            <h4 className='mt-5'>{cardDetails.buttonText} <i className={cardDetails.iconClass}></i></h4>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src={giftcard1} className="d-block w-100 gift-carousel-image" alt="..." />
                                        <div className="gift-card-carosule-content">
                                            <h5 className="card-title">{cardDetails.title}</h5>
                                            <p className="card-text mt-3 w-75">{cardDetails.description}</p>
                                            <h4 className='mt-5'>{cardDetails.buttonText} <i className={cardDetails.iconClass}></i></h4>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src={giftcard1} className="d-block w-100 gift-carousel-image" alt="..." />
                                        <div className="gift-card-carosule-content">
                                            <h5 className="card-title">{cardDetails.title}</h5>
                                            <p className="card-text mt-3 w-75">{cardDetails.description}</p>
                                            <h4 className='mt-5'>{cardDetails.buttonText} <i className={cardDetails.iconClass}></i></h4>
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
                                <h5>Cashback Card</h5>
                                <div className='border-line'></div>
                                <div className='mt-3'>
                                    <p className='fw-bold'>Description</p>
                                    <p className='fs-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.</p>
                                </div>
                            </div>
                            <div align="center" className="mt-5">
                                <button
                                    type="button"
                                    className="btn gift-custom-btn w-50 rounded-pill p-2">
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GiftCardDetails;
