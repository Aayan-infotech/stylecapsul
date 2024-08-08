import React, { useState } from "react";
import previewImage1 from "../../assets/myCapsuleAddAvtar/previewImage1.jpg";
import previewImage2 from "../../assets/myCapsuleAddAvtar/previewImage2.jpg";
import previewImage3 from "../../assets/myCapsuleAddAvtar/previewImage3.jpg";
import previewImage4 from "../../assets/myCapsuleAddAvtar/previewImage4.jpg";
import previewImage5 from "../../assets/myCapsuleAddAvtar/previewImage5.jpg";
import previewImage6 from "../../assets/myCapsuleAddAvtar/previewImage6.jpg";
import previewImage7 from "../../assets/myCapsuleAddAvtar/previewImage7.jpg";
import previewImage8 from "../../assets/myCapsuleAddAvtar/previewImage8.jpg";
import previewImage9 from "../../assets/myCapsuleAddAvtar/previewImage9.jpg";
import previewImage10 from "../../assets/myCapsuleAddAvtar/previewImage10.png";
import { Link } from "react-router-dom";
import "../../styles/MyCapsuleAddAvtar.scss";

const MyCapsuleAddAvtar = () => {
  const selectAvtar = [
    { id: "1", title: "check this", src: previewImage1 },
    { id: "2", title: "check this", src: previewImage2 },
    { id: "3", title: "check this", src: previewImage3 },
    { id: "4", title: "check this", src: previewImage4 },
    { id: "5", title: "check this", src: previewImage5 },
    { id: "6", title: "check this", src: previewImage6 },
    { id: "7", title: "check this", src: previewImage7 },
    { id: "8", title: "check this", src: previewImage8 },
    { id: "9", title: "check this", src: previewImage9 },
  ];

  const selectOutfits = [
    { id: "1", heartIcon: "", src: previewImage10 },
    { id: "2", heartIcon: "", src: previewImage10 },
    { id: "3", heartIcon: "", src: previewImage10 },
    { id: "4", heartIcon: "", src: previewImage10 },
    { id: "5", heartIcon: "", src: previewImage10 },
    { id: "6", heartIcon: "", src: previewImage10 },
    { id: "7", heartIcon: "", src: previewImage10 },
    { id: "8", heartIcon: "", src: previewImage10 },
    { id: "9", heartIcon: "", src: previewImage10 },
    { id: "10", heartIcon: "", src: previewImage10 },
  ];

  const [activeTab, setActiveTab] = useState("items");
  return (
    <div className="d-flex justify-content-center align-items-center capsule-main-container">
      <div className="container w-50">
        <h1 className="text-center fw-bold fs-1">My Style Capsule</h1>
        <div className="row g-2 mt-4">
          <div className="col-6 d-flex justify-content-center align-items-center">
            <button
              type="button"
              className={`btn btn-outline-secondary p-2 w-75 rounded-pill fw-bold fs-5 custom-button ${
                activeTab === "items" ? "btn-active" : ""
              }`}
              onClick={() => setActiveTab("items")}
            >
              Items
            </button>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            <button
              type="button"
              className={`btn btn-outline-secondary p-2 w-75 rounded-pill fw-bold fs-5 custom-button ${
                activeTab === "outfits" ? "btn-active" : ""
              }`}
              onClick={() => setActiveTab("outfits")}
            >
              Outfits
            </button>
          </div>
        </div>
        {activeTab === "items" && (
          <div className="row gy-5 mt-4">
            {selectAvtar.map((image, index) => (
              <div
                key={index}
                className="col-6 col-md-4 d-flex justify-content-center align-items-center"
              >
                <div>
                  <div className="image-container">
                    <img
                      src={image.src}
                      alt={`Preview ${index + 1}`}
                      className="img-fluid"
                    />
                  </div>
                  <div className="capsule-title d-flex justify-content-center align-items-center fw-bold fs-5">
                    Shirt
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "outfits" && (
          <div className="row g-2 mt-4">
            {selectOutfits.map((item, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-6 d-flex justify-content-center align-items-center"
              >
                <Link to="/try-avtar">
                  <div className="card border-0 outfits-background position-relative">
                    <div className="card-body">
                      <div className="outfits-image-container">
                        <img
                          src={item.src}
                          alt={`Preview ${index + 1}`}
                          className="outfit-preview"
                        />
                      </div>
                    </div>
                    <i className="fa-regular fa-heart fs-4 position-absolute heart-icon"></i>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCapsuleAddAvtar;
