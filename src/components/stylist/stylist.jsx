import React, { useEffect, useState } from "react";
import "../../styles/Stylist.scss";
import { apiUrl } from "../../../apiUtils";
import axios from "axios";
import { Link } from "react-router-dom";
import blank_image from '../../assets/stylist/blank_img.jpg';
import { useSelector } from "react-redux";
import { getCookie } from "../../utils/cookieUtils";
import Loader from "../Loader/Loader";

const Stylist = () => {
  const [showstylists, setShowstylists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = getCookie('authToken');

  useEffect(() => {
    const fetchUserData = async (query = "") => {
      // setLoading(true);
      try {
        const url = query ? apiUrl(`api/stylist/search/${query}`) : apiUrl('api/stylist/get-stylist');
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(response, 'response')
        if (response?.data?.stylists?.length > 0) {
          setShowstylists(response.data.stylists);
          setMessage("");
        } else {
          setShowstylists([]);
          setMessage(response?.data?.message || "No stylists found.");
        }
      } catch (error) {
        setShowstylists([]);
        setMessage(error?.response?.data?.message || "An error occurred.");
      } 
      // finally {
      //   setLoading(false);
      // }
    };

    fetchUserData(searchQuery);
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
          <div className="row gx-5">
            <div className="col-12 col-md-6">
              <h1 className="fw-bold fs-1">Stylist</h1>
            </div>
            <div className="col-12 col-md-6">
              <div className="styliset-search">
                <div className="search-box">
                  <i className="fa fa-search"></i>
                  <input
                    type="text"
                    className="rounded-pill text-white"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <i className="fa-solid fa-sliders"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row mt-1">
              {message ? (
                <div className="text-center">
                  <h2 className="fs-3">{message}</h2>
                </div>
              ) : (
                showstylists.map((stylist) => (
                  <Link to="/stylist-profile" className="text-decoration-none p-0" state={{ stylist }} key={stylist._id}>
                    <div className="col-12 w-100 mt-3 p-0">
                      <div className="d-flex rounded-pill" style={{ backgroundColor: "#4C4C4C" }}>
                        <div className="me-2">
                          <img
                            className="image-rounded"
                            src={stylist?.profilePicture || blank_image}
                            height={120}
                            width={150}
                            alt={stylist.name}
                          />
                        </div>
                        <div className="p-2 text-white">
                          <h6>{stylist?.name}</h6>
                          <h6>{stylist?.specialization.join(", ")}</h6>
                          <h6 className="mt-4">{stylist?.experience}+ Years of Experience</h6>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Stylist;
