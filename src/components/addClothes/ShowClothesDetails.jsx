import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../../styles/ShowClothesDetails.scss';
import blank_image from '../../assets/stylist/blank_img.jpg'
import { format } from 'date-fns';
import axios from 'axios';
import { apiUrl } from '../../../apiUtils';
import { getCookie } from '../../utils/cookieUtils';
import Loader from "../Loader/Loader.jsx";
// import { apiUrl } from "../../apiUtils";

const ShowClothesDetails = () => {
    const [showClothesDetails, setShowClothesDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const { clothid } = useParams();
    const token = getCookie("authToken");

    const fetchClothDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/cloths/getClothById/${clothid}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response?.data?.success) {
                setShowClothesDetails(response.data.data);
                setLoading(false);
            } else {
                console.error(response?.data?.message);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error(error.response.data.message);
            } else {
                console.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (clothid) {
            fetchClothDetails(clothid);
        }
    }, [clothid]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="d-flex justify-content-center align-items-center clothes-main-container-sections">
                    <div className="container p-4">
                        <div className="row m-0 gx-2">
                            <h1 className="fw-bold fs-3">View Clothes</h1>
                            <p className='fs-6'>{showClothesDetails?.description || 'N/A'}</p>
                            <div className="col-12 col-md-6 mb-2 mb-md-0">
                                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {[...Array(3)].map((item, index) => (
                                            <div
                                                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                                key={index}
                                            >
                                                {showClothesDetails?.picture ? (
                                                    <img
                                                        src={showClothesDetails?.picture}
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
                                    <h5>{showClothesDetails?.category || 'N/A'}</h5>
                                    <div className='border-line'></div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p>Category</p>
                                        <p className='fw-bold'>{showClothesDetails?.category || 'N/A'}</p>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p>Color</p>
                                        <p className='fw-bold'>{showClothesDetails?.color || 'N/A'}</p>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p>Type</p>
                                        <p className='fw-bold'>{showClothesDetails?.typesOfCloths || 'N/A'}</p>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p>Brand</p>
                                        <p className='fw-bold'>{showClothesDetails?.brand || 'N/A'}</p>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p>Purchase date</p>
                                        <p className='fw-bold'>
                                            {showClothesDetails?.purchaseDate
                                                ? format(new Date(showClothesDetails.purchaseDate), 'dd MMM yyyy')
                                                : 'N/A'}
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
            )}
        </>
    )
}

export default ShowClothesDetails;