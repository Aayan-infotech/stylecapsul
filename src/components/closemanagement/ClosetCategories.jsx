import React, { useEffect, useState } from "react";
import notification from "../../assets/closetmanagement/Group 1806.png";
import closet from "../../assets/closetmanagement/closet.png";
import coinhand from "../../assets/closetmanagement/coin-hand.png";
import imagefocus from "../../assets/closetmanagement/image-focus.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import blank_img from "../../assets/stylist/blank_img.jpg";

const ClosetCategories = () => {
  const [categories, setCategories] = useState([]);


  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(apiUrl("api/closet/get-closet"));
      if (response?.data?.status === 200 &&
        response?.data?.success === true) {
        setCategories(response?.data?.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ paddingTop: "6rem" }}
    >
      <div className="container d-block w-75">
        <h1 className="text-center fw-bold fs-1">Details</h1>
        <div className="row g-3 m-0">
          {categories?.length > 0 ? (
            categories.map((item, index) => (
              <div className="col-md-6" key={index}>
                <Link
                  to={`/all-clothes-list/${item?._id}`}
                  state={{ category_name: item?.name }}
                  className="text-decoration-none"
                >
                  <div className="p-4 text-white text-center rounded" style={{ backgroundColor: "rgb(76, 76, 76)" }}>
                    <img
                      src={coinhand || blank_img}
                      alt="Category Icon"
                      className="mb-4"
                    />
                    <h4 className="card-title fw-bold">{item?.name}</h4>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted fw-bold">No categories found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClosetCategories;
