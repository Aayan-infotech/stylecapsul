import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../../styles/ServiceProvider.scss";
import blank_image from '../../assets/stylist/blank_img.jpg';
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import Loader from '../../components/Loader/Loader.jsx';
import { getCookie } from "../../utils/cookieUtils.js";

const ServiceProvider = () => {
  const [serviceProviderData, setServiceProviderData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { garmentId } = useParams();
  const token = getCookie('authToken');

  useEffect(() => {
    if (garmentId) {
      fetchServiceProviderDetails(garmentId);
    }
  }, [garmentId]);

  const fetchServiceProviderDetails = async (garmentId) => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl(`api/garment/garment-care/${garmentId}`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = response.data?.data;
      if (data?.ServiceProvider) {
        setServiceProviderData(data);
        setMessage("");
      } else {
        setServiceProviderData(null);
        setMessage("No services found.");
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      setServiceProviderData(null);
      setMessage(error?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    navigate("/schedule-booking", { state: { serviceProviderData } });
  };

  const ratingsData = [
    { stars: 5, percentage: 70, count: 488 },
    { stars: 4, percentage: 62, count: 74 },
    { stars: 3, percentage: 53, count: 14 },
    { stars: 2, percentage: 30, count: 10 },
    { stars: 1, percentage: 16, count: 5 },
  ];


  return (
    <>
      <div className="service-provider-sections">
        <div className="container w-75">
          <div className="row">
            <div className="col-12">
              <h1 className="fw-bold fs-2 text-center text-md-start">Service Provider</h1>
            </div>
            <div className="col-12 col-md-3 d-flex">
              <div id="serviceProviderCarousel" className="carousel slide" data-bs-ride="carousel">
                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#serviceProviderCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#serviceProviderCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#serviceProviderCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>

                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="https://media.istockphoto.com/id/155288041/photo/indian-girl-in-the-university.jpg?s=612x612&w=0&k=20&c=OPg_GzXdIMZ3btYu61HX79KxSBe7A6BYPSYYknNBafQ="
                      className="d-block w-100 rounded-pill" alt="Stylist 1" />
                  </div>
                  <div className="carousel-item">
                    <img src="https://media.istockphoto.com/id/155288041/photo/indian-girl-in-the-university.jpg?s=612x612&w=0&k=20&c=OPg_GzXdIMZ3btYu61HX79KxSBe7A6BYPSYYknNBafQ="
                      className="d-block w-100 rounded-pill" alt="Stylist 2" />
                  </div>
                  <div className="carousel-item">
                    <img src="https://media.istockphoto.com/id/155288041/photo/indian-girl-in-the-university.jpg?s=612x612&w=0&k=20&c=OPg_GzXdIMZ3btYu61HX79KxSBe7A6BYPSYYknNBafQ="
                      className="d-block w-100 rounded-pill" alt="Stylist 3" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8">
              <div className="d-flex justify-content-between align-items-center">
                <h3>{serviceProviderData?.ServiceProvider?.name || "Service Provider Name"}</h3>
                <h5>Laundry</h5>
              </div>
              <p>
                <i className="fa-solid fa-location-dot me-2"></i>
                {serviceProviderData?.ServiceProvider?.address || "No Location available"}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <p>Category</p>
                <p className="fw-bold">{serviceProviderData?.service || "No Service available"}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p>Timing</p>
                <p className="fw-bold"> {serviceProviderData?.startTime && serviceProviderData?.endTime
                  ? `${new Date(serviceProviderData.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} to ${new Date(serviceProviderData.endTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
                  : "Timing not available"}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p>Rating</p>
                <p>
                  {[...Array(5)].map((_, index) => (
                    <i key={index} className={`fa fa-star ${index < 4 ? 'text-warning' : 'fa-star-half-alt text-warning'}`}></i>
                  ))}
                </p>
              </div>
              <div align="center" className="mt-5">
                <button type="button" className="btn hire-custom-btn rounded-pill p-2" onClick={handleClick}>Book</button>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <h4 className="fw-bold fs-4">Description</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, et cumque vitae possimus voluptate excepturi nostrum quis minima! Laboriosam, sint.</p>
              <h4 className="fw-bold fs-4">History</h4>
              <h6 className="fw-bold fs-6 mb-3">Inaguration</h6>
              <p><strong>Elegance Couture</strong> | New York, NY 2021 – Present</p>
              <p>- Designed seasonal collections and oversaw garment production.</p>
              <h6 className="fw-bold fs-6">Tagline</h6>
              <p className="fw-bold fs-6 mb-3">Detailed Desciption</p>
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
                <h2 className="fw-bold">Ratings & Reviews</h2>
              </div>
            </div>
            <div className="row gx-4 my-4">
              <div className="col-12 col-md-4 mb-5">
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
      {/* <div className="d-flex justify-content-center align-items-center service-provider-sections">
        <div className="container p-4">
          <div className="row m-0 gx-2">
            <h1 className="fw-bold fs-1">Service Provider</h1>
            <div className="col-12 col-md-6 mb-2 mb-md-0 p-3">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1724411829738-2841c0f47977?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D"
                      className="d-block w-100 carousel-image"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://images.unsplash.com/photo-1719937206642-ca0cd57198cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D"
                      className="d-block w-100 carousel-image"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://images.unsplash.com/photo-1724217552369-22b256e395d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D"
                      className="d-block w-100 carousel-image"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="carousel-indicators custom-indicators">
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
            <div className="col-12 col-md-6 p-3 bookservice-details">
              <div>
                <h5>{serviceProviderData.name || "Service Provider Name"}</h5>
                <div className="border-line"></div>
                <div className="mt-3">
                  <p>
                    <i className="fa-solid fa-location-dot me-2"></i>
                    {serviceProviderData.address || "Location"}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Category</p>
                    <p className="fw-bold">{garment?.service || "Service"}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Timing</p>
                    <p className="fw-bold">{`${new Date(
                      garment?.startTime
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} to ${new Date(garment?.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
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
      </div> */}
    </>
  );
};

export default ServiceProvider;
