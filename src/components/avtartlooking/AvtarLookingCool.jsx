import React, { useState } from "react";
import stage from "../../assets/myCapsuleAddAvtar/stage.png";
import girls from "../../assets/myCapsuleAddAvtar/girls.png";
import "../../styles/AvtarLookingCool.scss";

const AvtarLookingCool = () => {
  return (
    <div className="d-flex justify-content-center align-items-center capsule-main-container">
      <div className="container w-50">
        {/* <h1 className="text-center fw-bold fs-1">My Style Capsule</h1> */}
        <div className="row g-2">
          <div className="col-6 d-flex justify-content-center align-items-center">
            <div className="position-relative">
              <img src={stage} className="stage-img" alt="Stage" />
              <img src={girls} className="overlay-img" alt="Girls" />
            </div>
          </div>
          <div className="col-6">
            <div className="p-3">It’s looking Cool......</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvtarLookingCool;
