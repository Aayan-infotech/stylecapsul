import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/ServiceProvider.scss';

const ServiceProvider = () => {
    const [serviceProviderData, setServiceProviderData] = useState({});

    const location = useLocation();
    const navigate = useNavigate();
    const { garment } = location.state || {};

    useEffect(() => {
        if (garment?.ServiceProvider) {
            setServiceProviderData(garment.ServiceProvider);
        }
    }, [garment]);

    const handleClick = () => {
        navigate('/schedule-booking', { state: { garment } });
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center service-provider-sections">
                <div className="container p-4">
                    <h1 className="fw-bold fs-1">Service Provider</h1>
                    <div className="row m-0 gx-2">
                        <div className="col-12 col-md-6 mb-2 mb-md-0 p-3">
                            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="https://plus.unsplash.com/premium_photo-1724411829738-2841c0f47977?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 carousel-image" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://images.unsplash.com/photo-1719937206642-ca0cd57198cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 carousel-image" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://images.unsplash.com/photo-1724217552369-22b256e395d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 carousel-image" alt="..." />
                                    </div>
                                </div>
                                <div className="carousel-indicators custom-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 p-3 bookservice-details">
                            <div>
                                <h5>{serviceProviderData.name || 'Service Provider Name'}</h5>
                                <div className='border-line'></div>
                                <div className='mt-3'>
                                    <p><i className="fa-solid fa-location-dot me-2"></i>{serviceProviderData.address || 'Location'}</p>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p>Category</p>
                                        <p className='fw-bold'>{garment?.service || 'Service'}</p>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p>Timing</p>
                                        <p className='fw-bold'>{`${new Date(garment?.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to ${new Date(garment?.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</p>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p>Rating</p>
                                        <p>
                                            <i className="fa-regular fa-star me-2 fs-5"></i>
                                            <i className="fa-regular fa-star me-2 fs-5"></i>
                                            <i className="fa-regular fa-star me-2 fs-5"></i>
                                            <i className="fa-regular fa-star me-2 fs-5"></i>
                                            <i className="fa-regular fa-star fs-5"></i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div align="center" className="mt-4">
                                <button
                                    type="button"
                                    className="btn book-custom-btn w-50 rounded-pill p-2"
                                    onClick={handleClick}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceProvider;
