import React, { useState } from "react";
import previewImage10 from "../../assets/myCapsuleAddAvtar/previewImage10.png";
import topimgs1 from "../../assets/myCapsuleAddAvtar/topimgs1.png";
import shoseimg2 from "../../assets/myCapsuleAddAvtar/shoseimg2.png";
import "../../styles/TryAvtar.scss";
import { Link } from "react-router-dom";

const TryAvtar = () => {
  return (
    <div className="tryavtar-main-container">
      <div className="container w-50">
        <h1 className="text-center fw-bold fs-1">My Style Capsule</h1>
        <div className="row g-2 mt-4">
          <div className="col-6 d-flex justify-content-center align-items-center">
            <Link to="/avtarlookingcool" className="text-decoration-none">
              {/* text-black */}
              <h1 className="text-center fw-bold fs-4">
                Now that’s your outfit!
              </h1>
            </Link>
          </div>
          <div className="col-6">
            <div className="row g-2">
              <div className="col">
                <div className="p-2 border-0 h-100 col-bg-color">
                  <div className="outfits-image-container">
                    <img src={previewImage10} />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row g-2">
                  <div className="col col-bg-color d-flex justify-content-center align-items-center">
                    <div className="p-2 border-0">
                      <div className="">
                        <img src={topimgs1} height={100} />
                      </div>
                    </div>
                  </div>
                  <div className="col col-bg-color d-flex justify-content-center align-items-center">
                    <div className="p-2 border-0">
                      <img src={shoseimg2} height={100} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h4 className="text-center fw-bold fs-5">
              Try this on your Avatar{" "}
              <i className="fa-solid fa-angles-right fs-5"></i>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryAvtar;
