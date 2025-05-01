import React, { useEffect, useState, useCallback } from "react";
import "../../styles/GarmentCare.scss";
import Loader from "../../components/Loader/Loader.jsx";
import blank_image from "../../assets/stylist/blank_img.jpg";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";

const GarmentsCare = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const location = new window.google.maps.LatLng(26.8467, 80.9462); // Lucknow
  const radius = 5000;

  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps SDK not loaded");
      return;
    }

    const map = new window.google.maps.Map(document.createElement("div"));
    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location,
      radius,
      keyword: "laundry|Washing|cloths",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
        setFilteredPlaces(results);
      } else {
        console.error("Places API error:", status);
      }
      setLoading(false);
    });
  }, []);

  const handleSearch = useCallback(
    debounce((text) => {
      const filtered = places.filter((place) =>
        place.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPlaces(filtered);
    }, 300),
    [places]
  );

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className="garments-care-wrapper">
      <div className="text-center d-flex justify-content-around align-items-center mb-4">
        <h1 className="fw-bold fs-1">Garments Care</h1>
        <div className="garment-search-input">
          <div className="search-box">
            <i className="fa fa-search"></i>
            <input type="text"
              value={searchTerm}
              onChange={onSearchChange} className="rounded-pill text-white" placeholder="Search" />
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="d-flex justify-content-center align-items-center garments-care-section">
          <div className="garments-care-list">
            {(showAll ? filteredPlaces : filteredPlaces.slice(0, 5)).map((place, index) => {
              const photo = place.photos ? place.photos[0].getUrl() : blank_image;
              const name = place.name || "Unnamed";
              const address = place.vicinity || "No address available";
              const rating = place.rating || "N/A";
              const userRatings = place.user_ratings_total || 0;
              const phone = place.formatted_phone_number || "N/A";
              const website = place.website || "#";
              const placeUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}&query_place_id=${place.place_id}`;

              return (
                <div className="garment-card border border-2 px-5 rounded-pill" key={index}>
                  <img src={photo} alt={name} className="card-img" />
                  <div className="card-content">
                    <h3 className="place-name">{name}</h3>
                    <p><strong>Address:</strong> {address}</p>
                    <p>
                      <strong>Rating:</strong> {rating}{" "}
                      <StarIcon fontSize="small" style={{ color: "#ffc107" }} /> ({userRatings})
                    </p>
                    <p><strong>Phone:</strong> {phone}</p>
                    {/* <div className="card-links">
                      <a href={website} target="_blank" rel="noreferrer">Visit Website</a>
                    </div> */}
                    <a href={placeUrl} className="location-btn" target="_blank" rel="noreferrer">
                      <RoomIcon fontSize="small" /> Visit Location
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="text-center my-4">
        {filteredPlaces.length > 5 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="btn btn-outline-dark rounded-pill"
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        )}
      </div>
    </div>
  );
};

export default GarmentsCare;