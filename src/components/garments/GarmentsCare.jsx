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
  const [userLocation, setUserLocation] = useState(null);

  const location = new window.google.maps.LatLng(26.8467, 80.9462);
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

  console.log(places, 'places')

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
            {!loading && filteredPlaces.length === 0 ? (
              <div className="text-center py-5">
                <h4 className="text-muted">No service found</h4>
              </div>
            ) : (
              (showAll ? filteredPlaces : filteredPlaces.slice(0, 5)).map((place, index) => {
                const photo = place.photos ? place.photos[0].getUrl() : blank_image;
                const name = place.name || "Unnamed";
                const address = place.vicinity || "No address available";
                const rating = place.rating || "N/A";
                const userRatings = place.user_ratings_total || 0;
                const phone = place.formatted_phone_number || "N/A";
                const website = place.website || `https://www.google.com/search?q=${encodeURIComponent(place.name)}`;
                const placeUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.name)},${place.geometry.location.lat},${place.geometry.location.lng}`;

                return (
                  <div className="garment-card border border-2 px-5 rounded-pill mb-3" key={index}>
                    <img src={photo} alt={name} className="card-img" onError={(e) => { e.target.onerror = null; e.target.src = blank_image; }} />
                    <div className="card-content">
                      <h3 className="place-name">{name}</h3>
                      <p className="mb-0"><strong>Address:</strong> {address}</p>
                      <p className="mb-0">
                        <strong>Rating:</strong> {rating}{" "}
                        <StarIcon fontSize="small" style={{ color: "#ffc107" }} /> ({userRatings}) |{" "}
                        <strong>Phone:</strong> {phone}{""} | {" "} <a href={website} target="_blank" rel="noreferrer">Visit Website</a> {" "} | {" "}
                        <Link to={placeUrl} className="" target="_blank" rel="noreferrer">
                          <RoomIcon fontSize="small" /> Visit Location
                        </Link>
                      </p>
                    </div>

                  </div>
                );
              })
            )}
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