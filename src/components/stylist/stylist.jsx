import React, { useEffect, useState } from "react";
import "../../styles/Stylist.scss";
import { apiUrl } from "../../../apiUtils";
import axios from "axios";
import { Link } from "react-router-dom";
import blank_image from "../../assets/stylist/blank_img.jpg";
import { getCookie } from "../../utils/cookieUtils";
import Loader from "../Loader/Loader";
import Pagination from "@mui/material/Pagination";

const Stylist = () => {
  const [showStylists, setShowStylists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [showAll, setShowAll] = useState(false);


  const token = getCookie("authToken");

  const fetchStylists = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl("api/stylist/get-stylist"), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.data?.stylists?.length > 0) {
        setShowStylists(response.data.stylists);
        setMessage("");
      } else {
        setShowStylists([]);
        setMessage(response?.data?.message || "No stylists found.");
      }
    } catch (error) {
      setShowStylists([]);
      setMessage(error?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const searchStylists = async (query) => {
    try {
      const response = await axios.get(apiUrl(`api/stylist/search/${query}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.stylists?.length > 0) {
        setShowStylists(response.data.stylists);
        setMessage("");
      } else {
        setShowStylists([]);
        setMessage(response?.data?.message || "No stylists found.");
      }
    } catch (error) {
      setShowStylists([]);
      setMessage(error?.response?.data?.message || "An error occurred.");
    }
  };

  useEffect(() => {
    if (searchQuery) {
      searchStylists(searchQuery);
    } else {
      fetchStylists();
    }
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="styliset-search-container">
          <div className="container w-75">
            <div className="row gx-5">
              <div className="col-12 col-md-6">
                <h1 className="fw-bold fs-1">Stylist</h1>
              </div>
              <div className="col-12 col-md-6">
                <div className="styliset-search">
                  <div className="search-box">
                    <i className="fa fa-search"></i>
                    <input type="text" className="rounded-pill text-white" placeholder="Search" value={searchQuery} onChange={handleSearchInputChange} />
                  </div>
                </div>
              </div>
            </div>
            <div className=" d-block">
              <div className="row m-0 my-1">
                {message ? (
                  <div className="text-center">
                    <h2 className="fs-3">{message}</h2>
                  </div>
                ) : (
                  showStylists.slice(0, visibleCount).map((stylist, index) => (
                    <Link to={`/stylist-profile/${stylist._id}`} className="text-decoration-none p-0" state={{ stylist }} key={index}>
                      <div className="col-12 w-100 mt-3 p-0">
                        <div className="d-flex rounded-pill classic-card" style={{ backgroundColor: "#4C4C4C", height: "120px", }}>
                          <div className="me-2" style={{ width: "150px" }}>
                            <img className="image-rounded" src={stylist?.profilePicture || blank_image} alt={stylist?.name} style={{ width: "150px", height: "120px", objectFit: "fill" }} />
                          </div>
                          <div className="p-2 text-white">
                            <h6>{stylist?.name}</h6>
                            <h6>{stylist?.specialization.join(", ")}</h6>
                            <h6>{stylist?.experience}+ Years of Experience</h6>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
            {showStylists.length > 4 && (
              <div className="text-center mt-3">
                <button className="btn btn-dark rounded-pill" onClick={() => { if (showAll) { setVisibleCount(4); } else { setVisibleCount(showStylists.length); } setShowAll(!showAll); }}>
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Stylist;
