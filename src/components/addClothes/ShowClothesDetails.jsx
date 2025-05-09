import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../styles/ShowClothesDetails.scss";
import blank_image from "../../assets/stylist/blank_img.jpg";
import { format } from "date-fns";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { getCookie } from "../../utils/cookieUtils";
import Loader from "../Loader/Loader.jsx";
import { showErrorToast } from "../toastMessage/Toast.jsx";
import CategoryIcon from '@mui/icons-material/Category';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import StyleIcon from '@mui/icons-material/Style';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ShowClothesDetails = () => {
  const [showClothesDetails, setShowClothesDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const { clothid } = useParams();
  const token = getCookie("authToken");
  const location = useLocation();
  const { category_name } = location.state || {};

  const fetchClothDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        apiUrl(`api/cloths/getClothById/${clothid}`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === 200 && response.data.success === true) {
        setShowClothesDetails(response.data.data);
        setLoading(false);
      } else {
        showErrorToast(response?.data?.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        showErrorToast(error.response.data.message);
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
              <p className="fs-6">{showClothesDetails?.description || "N/A"}</p>
              <div className="col-12 col-md-6 mb-2 mb-md-0">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {showClothesDetails?.pictures?.map((image, index) => (
                      <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                        <img src={image} className="d-block w-100 clothes-carousel-image" alt={`Image ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                  <div className="carousel-indicators clothes-custom-indicators">
                    {showClothesDetails?.pictures?.map((_, index) => (
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : undefined}
                        aria-label={`Slide ${index + 1}`}
                        key={index}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 p-3 clothes-service-details">
                <div>
                  <h5 className="fw-bold">Basic Info</h5>
                  <div className="border-line"></div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p><CategoryIcon fontSize="small" className="me-2" />Category</p>
                    <p>{category_name || "N/A"}</p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p><SubtitlesIcon fontSize="small" className="me-2" />Sub Category</p>
                    <p>{showClothesDetails?.subcategory || "N/A"}</p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p><ViewModuleIcon fontSize="small" className="me-2" />Part</p>
                    <p>{showClothesDetails?.part || "N/A"}</p>
                  </div>

                  <h5 className="fw-bold">Style Details</h5>

                  <div className="d-flex justify-content-between align-items-center">
                    <p><StyleIcon fontSize="small" className="me-2" />Type</p>
                    <p>{showClothesDetails?.typeOfFashion || "N/A"}</p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p><WbSunnyIcon fontSize="small" className="me-2" />Season</p>
                    <p>{showClothesDetails?.season || "N/A"}</p>
                  </div>

                  <h5 className="fw-bold">Additional Info</h5>

                  <div className="d-flex justify-content-between align-items-center">
                    <p><CalendarTodayIcon fontSize="small" className="me-2" />Purchase Date</p>
                    <p>{showClothesDetails?.purchaseDate ? format(new Date(showClothesDetails?.purchaseDate), "dd MMM yyyy") : "N/A"}</p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p><AccessTimeIcon fontSize="small" className="me-2" />Created At</p>
                    <p>{showClothesDetails?.createdAt ? format(new Date(showClothesDetails?.createdAt), "dd MMM yyyy HH:mm:ss") : "N/A"}</p>
                  </div>

                  {/* <div className="d-flex justify-content-between align-items-center">
                    <p><AccessTimeIcon fontSize="small" className="me-2" />Updated At</p>
                    <p>{showClothesDetails?.updatedAt ? format(new Date(showClothesDetails?.updatedAt), "dd MMM yyyy HH:mm:ss") : "N/A"}</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowClothesDetails;
