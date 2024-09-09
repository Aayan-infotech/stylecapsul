import React from "react";
import "./FullAvatar.scss";
import { Link } from "react-router-dom";

import girls from "./img/one.png";
import stage from "./img/one1.png";
import two from "./img/two.png";
import three from "./img/three.png";

function FullAvatar() {
  return (
    <>
      <div className="capsule-main-container">
        <div className="container">
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
              <div className="position-relative">
                <img src={stage} className="stage-img" alt="Stage" />
                <img src={girls} className="overlay-img" alt="Girls" />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="row g-2">
                <div className="col-12">
                  <div className="p-2">
                    <Link to="/body">
                      <button
                        type="button"
                        className="btn rounded-pill text-white fw-bold"
                        style={{ width: "200px", backgroundColor: "black" }}
                      >
                        <img src={two} alt="" className="me-3" />
                        Edit Avatar
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-2">
                    <button
                      type="button"
                      className="btn rounded-pill p-3 text-white fw-bold"
                      style={{ width: "200px", backgroundColor: "black" }}
                    >
                      <img src={three} alt="" height={25} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FullAvatar;
