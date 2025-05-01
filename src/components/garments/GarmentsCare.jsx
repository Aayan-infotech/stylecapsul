import React, { useEffect, useState, useCallback } from "react";
import "../../styles/GarmentCare.scss";
import { apiUrl } from "../../../apiUtils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { getCookie } from "../../utils/cookieUtils";
import Loader from '../../components/Loader/Loader.jsx';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';

const GarmentsCare = () => {
  const [showGarments, setShowGarments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = getCookie('authToken');

  const fetchAllGarmentCareServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl("api/garment/garment-care"), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response?.data?.data?.length > 0) {
        setShowGarments(response.data.data);
        setMessage("");
      } else {
        setShowGarments([]);
        setMessage("No services found.");
      }
    } catch (error) {
      setShowGarments([]);
      setMessage(error?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const fetchGarmentCareServicesByQuery = async (query) => {
    try {
      const response = await axios.get(apiUrl(`api/garment/garment-care/services/${query}`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response?.data?.data?.length > 0) {
        setShowGarments(response.data.data);
        setMessage("");
      } else {
        setShowGarments([]);
        setMessage("No services found.");
      }
    } catch (error) {
      setShowGarments([]);
      setMessage(error?.response?.data?.message || "An error occurred.");
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchGarmentCareServicesByQuery(searchQuery);
    } else {
      fetchAllGarmentCareServices();
    }
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
    const id = garment._id;
    navigate(`/service-provider/${id}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center add-clothes-card">
      <div className="container w-75" style={{ display: "block" }}>
        <div className="row gx-5">
          <div className="col-12 col-md-6">
            <h1 className="fw-bold fs-1">Garments Care</h1>
          </div>
          <div className="col-12 col-md-6">
            <div className="garment-search-input">
              <div className="search-box">
                <i className="fa fa-search"></i>
                <input type="text" className="rounded-pill text-white" placeholder="Search" onChange={handleSearchInputChange} />
              </div>
            </div>
          </div>
        </div>

        <div className="row m-0">
          {loading ? (
            <div className="text-center">
              <Loader />
            </div>
          ) : message ? (
            <div className="text-center">
              <h2 className="fs-3">{message}</h2>
            </div>
          ) : (
            showGarments.map((garment) => (
              <div className="col-12 mt-3" style={{ cursor: "pointer" }} key={garment._id} onClick={() => handleShowServiceProvider(garment)}>
                <div className="d-flex rounded-pill" style={{ backgroundColor: "#4C4C4C" }}>
                  <div className="me-2 image-rounded d-flex justify-content-center align-items-center">
                    <DryCleaningIcon sx={{ fontSize: 70, color: "white" }} />
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
