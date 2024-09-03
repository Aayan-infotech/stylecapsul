import React, { useEffect, useState, useCallback } from "react";
import image1 from "../../assets/stylist/img1.png";
import "../../styles/GarmentCare.scss";
import { apiUrl } from "../../../apiUtils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

const GarmentsCare = () => {
  const [showGarments, setShowGarments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async (query = "") => {
      setLoading(true);
      try {
        const url = query
          ? apiUrl(`api/garment/garment-care/services/${query}`)
          : apiUrl("api/garment/garment-care");
        const response = await axios.get(url);
        if (response?.data?.data?.length > 0) {
          setShowGarments(response.data.data);
          setMessage("");
        } else {
          setShowGarments([]);
          setMessage("No services found.");
        }
      } catch (error) {
        console.log(error.response?.data?.message);
        setShowGarments([]);
        setMessage(error?.response?.data?.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData(searchQuery);
  }, [searchQuery]);

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  const handleSearchInputChange = (event) => {
    debouncedSearch(event.target.value);
  };

  const handleShowServiceProvider = (garment) => {
    navigate("/service-provider", { state: { garment } });
  };

  return (
    <div className="d-flex justify-content-center align-items-center add-clothes-card">
      <div className="container w-75 p-4">
        <div className="row gx-5">
          <div className="col-12 col-md-6">
            <h1 className="fw-bold fs-1">Garments Care</h1>
          </div>
          <div className="col-12 col-md-6">
            <div className="garment-search-input">
              <div className="search-box">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="rounded-pill text-white"
                  placeholder="Search"
                  onChange={handleSearchInputChange}
                />
                <i className="fa-solid fa-sliders"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          {loading ? (
            <div className="text-center">
              <h2 className="fs-3">Loading...</h2>
            </div>
          ) : message ? (
            <div className="text-center">
              <h2 className="fs-3">{message}</h2>
            </div>
          ) : (
            showGarments.map((garment) => (
              <div
                className="col-12 mt-3"
                style={{ cursor: "pointer" }}
                key={garment._id}
                onClick={() => handleShowServiceProvider(garment)}
              >
                <div
                  className="d-flex rounded-pill"
                  style={{ backgroundColor: "#4C4C4C" }}
                >
                  <div className="me-2">
                    <img
                      className="image-rounded"
                      src={image1}
                      alt={garment.ServiceProvider.name}
                    />
                  </div>
                  <div className="p-2 text-white">
                    <h6>{garment.ServiceProvider.name}</h6>
                    <h6>{garment.service}</h6>
                    <h6 className="mt-4">
                      <i className="fa-solid fa-location-dot me-2"></i>
                      {garment.ServiceProvider.address}
                    </h6>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GarmentsCare;
