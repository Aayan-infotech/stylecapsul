import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/ShowClothesDetails.scss';
import blank_image from '../../assets/stylist/blank_img.jpg'
import { format } from 'date-fns';

const ShowClothesDetails = () => {

    const [showClothes, setShowClothes] = useState(null);
    const location = useLocation();
    const clothProduct = location.state?.product;

    useEffect(() => {
        if (clothProduct) {
            setShowClothes(clothProduct);
        }
    }, [clothProduct]);

    return (
        <>
            <div className="d-flex justify-content-center align-items-center clothes-main-container-sections">
                <div className="container p-4">
                    <h1 className="fw-bold fs-4">View Clothes</h1>
                    <div className="row m-0 gx-2">
                        <p className='fs-6'>{showClothes?.description}</p>
                        <div className="col-12 col-md-6 mb-2 mb-md-0">
                            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {[...Array(3)].map((item, index) => (
                                        <div
                                            className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                            key={index}
                                        >
                                            {showClothes?.picture ? (
                                                <img
                                                    src={showClothes.picture}
                                                    className="d-block w-100 clothes-carousel-image"
                                                    alt="Stylist"
                                                />
                                            ) : (
                                                <img
                                                    src={blank_image}
                                                    className="d-block w-100 clothes-carousel-image"
                                                    alt="No Image Available"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="carousel-indicators clothes-custom-indicators">
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

                        <div className="col-12 col-md-6 p-3 clothes-serviece-details">
                            <div>
                                <h5>{showClothes?.category}</h5>
                                <div className='border-line'></div>
                                {/* <div className='mt-2'>
                                    <h4 className='fw-bold'>Description</h4>
                                    <p className='fs-6'>{showClothes?.description}</p>
                                </div> */}
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p>Category</p>
                                    <p className='fw-bold'>{showClothes?.category}</p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p>Color</p>
                                    <p className='fw-bold'>{showClothes?.color}</p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p>Type</p>
                                    <p className='fw-bold'>{showClothes?.typesOfCloths}</p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p>Brand</p>
                                    <p className='fw-bold'>{showClothes?.brand}</p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p>Purchase date</p>
                                    <p className='fw-bold'>
                                        {/* {format(new Date(showClothes.purchaseDate), 'dd MMM yyyy')} */}
                                    </p>
                                </div>
                            </div>
                            <div align="center" className="">
                                <button type="button" className="btn clothes-custom-btn w-50 rounded-pill p-2">Share</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowClothesDetails;