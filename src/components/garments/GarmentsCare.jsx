import React, { useEffect, useState, useCallback } from "react";
import "../../styles/GarmentCare.scss";
import { apiUrl } from "../../../apiUtils";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { getCookie } from "../../utils/cookieUtils";
import Loader from '../../components/Loader/Loader.jsx';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import blank_image from "../../assets/stylist/blank_img.jpg";

const GarmentsCare = () => {
  const [places, setPlaces] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const apiKey = "AIzaSyDg2wdDb3SFR1V_3DO2mNVvc01Dh6vR5Mc";
  const placeLocation = "26.8467,80.9462";
  const radius = 5000;
  const type = "laundry|Washing|cloths";
  const defaultImage = "https://via.placeholder.com/400x200?text=No+Image";

  useEffect(() => {
    const fetchPlaceDetails = async (placeId) => {
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_phone_number,website,opening_hours&key=${apiKey}`;
      try {
        const res = await axios.get(proxy + detailsUrl);
        return res.data.result || {};
      } catch (err) {
        console.error("Details fetch error:", err);
        return {};
      }
    };

    const fetchPlaces = async () => {
      const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${placeLocation}&radius=${radius}&type=${type}&key=${apiKey}`;
      try {
        const res = await axios.get(proxy + nearbyUrl);
        const results = res.data.results || [];

        const enrichedResults = await Promise.all(
          results.map(async (place) => {
            const details = await fetchPlaceDetails(place.place_id);
            return { ...place, details };
          })
        );

        setPlaces(enrichedResults);
      } catch (err) {
        console.error("Nearby fetch error:", err);
      }
    };

    fetchPlaces();
  }, []);

  const toggleShow = () => setShowAll(!showAll);
  const placesToDisplay = showAll ? places : places.slice(0, 3);

  const filteredPlaces = placesToDisplay.filter((place) => {
    const searchQueryLower = searchQuery.toLowerCase();
    return (
      (place.name?.toLowerCase().includes(searchQueryLower) || 
       place.vicinity?.toLowerCase().includes(searchQueryLower))
    );
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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
                <input type="text"
                  value={searchQuery}
                  onChange={handleSearchChange} className="rounded-pill text-white" placeholder="Search" />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {filteredPlaces?.map((place, index) => {
            const photoRef = place.photos?.[0]?.photo_reference;
            const photoUrl = photoRef
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${apiKey}`
              : defaultImage;

            const directionUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.name)},${place.geometry.location.lat},${place.geometry.location.lng}`;

            return (
              <div key={index} className="col-12 mb-4">
                <div className="p-3 border border-1 rounded-pill px-5 d-flex">
                  <div className="me-4 d-flex align-items-center">
                    <img
                      src={photoUrl}
                      className="card-img-top"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = blank_image;
                      }}
                      alt="garment"
                      style={{ height: '100px', width: '100px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="me-4">
                      <h6 className="card-title mb-1">{place.name || "No Name"}</h6>
                      <p className="mb-1"><strong>Address:</strong> {place.vicinity || "N/A"}</p>
                      <p className="mb-1"><strong>Rating:</strong> {place.rating || "N/A"} ⭐ ({place.user_ratings_total || 0})</p>
                      {place.details.formatted_phone_number && (
                        <p className="mb-1"><strong>Phone:</strong> {place.details.formatted_phone_number}</p>
                      )}
                      {place.details.website && (
                        <div>
                          <Link to={place.details.website} target="_blank" className="text-black" rel="noreferrer">Visit Website</Link>
                        </div>
                      )}
                      <Link to={directionUrl} target="_blank">
                        <button type="button" className="btn btn-dark btn-sm rounded-pill">
                          <i className="fas fa-map-marker-alt me-2"></i> Visit Location
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Show All / Show Less button */}
          <div className="col-12 text-center mt-3">
            <button
              type="button"
              onClick={toggleShow}
              className="btn btn-outline-dark rounded-pill"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarmentsCare;
