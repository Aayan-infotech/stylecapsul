import React, { useState } from "react";
import showimg4 from "../../assets/myCapsuleAddAvtar/previewImage4.jpg";
import previewImage9 from "../../assets/myCapsuleAddAvtar/previewImage9.jpg";
import { Edit, Delete, Share } from "@mui/icons-material";
import "react-calendar/dist/Calendar.css";
import { useLocation, useNavigate } from "react-router-dom";

export const Cloths = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item;

  const categories = [
    {
      _id: 1,
      title: "Jacket",
      date: "23 Jan 2024",
      image: showimg4,
    },
    {
      _id: 2,
      title: "Blazer",
      date: "23 Jan 2024",
      image: previewImage9,
    },
    {
      _id: 3,
      title: "Dress",
      date: "25 Mar 2024",
      image: showimg4,
    },
    {
      _id: 4,
      title: "T-Shirt",
      date: "23 Jan 2024",
      image: previewImage9,
    },
  ];

  const handleClothsDetails = (id) => {
    navigate(`/cloths-details/${id}`);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="text-center w-100">
          <div className="profile-section text-center">
            <h1 className="fw-bold">{item?.title}</h1>
          </div>

          <div className="container d-block">
            <div className="row">
              {categories?.map((item, index) => (
                <div className="col-12 col-md-6 mt-4" key={index}>
                  <div
                    className="rounded-pill mb-3"
                    style={{ backgroundColor: "#4C4C4C" }}
                    onClick={() => handleClothsDetails(item?._id)}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="profile-image rounded-start-pill"
                        style={{
                          width: "100%",
                          maxWidth: "200px",
                          maxHeight: "125px",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <div className="text-start p-3 d-flex flex-column justify-content-center text-white w-100">
                        <h4 className="fw-bold mb-0">{item?.title}</h4>
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-4">{item?.date}</h6>
                          <h6 className="edit-text text-decoration-underline">
                            Edit
                          </h6>
                        </div>
                        <button
                          type="button"
                          className="btn btn-dark rounded-pill w-50 mt-2 d-flex justify-content-center align-items-center px-2 py-1"
                          style={{ fontSize: "0.8rem" }}
                        >
                          Delete <Delete className="ms-2" fontSize="x-small" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
