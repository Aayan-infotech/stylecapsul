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
                  <h5 className="fw-bold">{category_name || "N/A"}</h5>
                  <div className="border-line"></div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p>Category</p>
                    <p className="fw-bold">{category_name || "N/A"}</p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p>Type</p>
                    <p className="fw-bold">
                      {showClothesDetails?.typeOfFashion || "N/A"}
                    </p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p>Season</p>
                    <p className="fw-bold">
                      {showClothesDetails?.season || "N/A"}
                    </p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p>Part</p>
                    <p className="fw-bold">
                      {showClothesDetails?.part || "N/A"}
                    </p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p>Purchase Date</p>
                    <p className="fw-bold">
                      {showClothesDetails?.purchaseDate ? format(new Date(showClothesDetails.purchaseDate), "dd MMM yyyy") : "N/A"}
                    </p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p>Dominant Color</p>
                    <div className="d-flex align-items-center gap-2">
                      <span>{showClothesDetails?.dominantColor || "N/A"}</span>
                      <div style={{ width: "20px", height: "20px", backgroundColor: showClothesDetails?.dominantColor || "#ccc", border: "1px solid #000", }}></div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p>Created At</p>
                    <p className="fw-bold">
                      {showClothesDetails?.createdAt ? format(new Date(showClothesDetails.createdAt), "dd MMM yyyy HH:mm:ss") : "N/A"}
                    </p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p>Updated At</p>
                    <p className="fw-bold">
                      {showClothesDetails?.updatedAt ? format(new Date(showClothesDetails.updatedAt), "dd MMM yyyy HH:mm:ss") : "N/A"}
                    </p>
                  </div>
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
