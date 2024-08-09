import React from "react";
import stage from "../../assets/myCapsuleAddAvtar/stage.png";
import girls from "../../assets/myCapsuleAddAvtar/girls.png";
import "../../styles/AvtarLookingCool.scss";

const AvtarLookingCool = () => {
  return (
    <div className="capsule-main-container">
      <div className="container">
        <h1 className="text-center fw-bold fs-1 heading">My Style Capsule</h1>
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <div className="position-relative">
              <img src={stage} className="stage-img" alt="Stage" />
              <img src={girls} className="overlay-img" alt="Girls" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <h1 className="p-3 fs-1 fw-bold text-secondary">It’s looking Cool......</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvtarLookingCool;
