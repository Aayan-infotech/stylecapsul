import React, { useState } from "react";
import "./ProfileAvatar.scss";
import { Link } from "react-router-dom";

import girl from "./img/girl.png";
import fullAvatar from "./img/full-avatar.png";
import arrow from "./img/arrow.png";
import Questionnaire from "../questionnaire/QuestionnaireUpdate.jsx";

function ProfileAvatar() {
  const [activeTab, setActiveTab] = useState("basic");
  const [activeGender, setActiveGender] = useState("");
  const [activeBodySize, setActiveBodySize] = useState("");
  const [activeEyeColor, setActiveEyeColor] = useState("");
  const [activeHairColor, setActiveHairColor] = useState("");
  const [activeAgeRange, setActiveAgeRange] = useState("");
  const [activeMaterialStatus, setActiveMaterialStatus] = useState("");

  const [height, setHeight] = useState(150);
  const [weight, setWeight] = useState(70);
  const [shoes, setShoes] = useState(5);
  const [shoulders, setShoulders] = useState(90);
  const [chest, setChest] = useState(90);
  const [waist, setWaist] = useState(90);
  const [hips, setHips] = useState(90);
  const [high, setHigh] = useState(90);

  const handleChange = (type, delta) => {
    if (type === "height") {
      setHeight((prev) => Math.max(0, prev + delta));
    } else if (type === "weight") {
      setWeight((prev) => Math.max(0, prev + delta));
    } else if (type === "shoes") {
      setShoes((prev) => Math.max(0, prev + delta));
    } else if (type === "shoulders") {
      setShoulders((prev) => Math.max(0, prev + delta));
    } else if (type === "chest") {
      setChest((prev) => Math.max(0, prev + delta));
    } else if (type === "waist") {
      setWaist((prev) => Math.max(0, prev + delta));
    } else if (type === "hips") {
      setHips((prev) => Math.max(0, prev + delta));
    } else if (type === "high") {
      setHigh((prev) => Math.max(0, prev + delta));
    }
  };

  const bodySize = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const selectEyeColor = [
    "Amber",
    "Blue",
    "Brown",
    "Gray",
    "Hazal",
    "Green",
    "Others",
  ];
  const selectHiarColor = [
    "Black",
    "Blond",
    "Brown",
    "Auburn",
    "Red",
    "Gray",
    "Others",
  ];
  const selectAgeRange = [
    "18-20",
    "23-27",
    "28-32",
    "33-37",
    "38-42",
    "43-46",
    "47-50",
    "51-54",
    "55+",
  ];
  const selectMaterialStatus = ["Single", "Married"];

  const handleClickGender = (gender) => {
    setActiveGender(gender);
  };

  const handleClickBodySize = (body_size) => {
    setActiveBodySize(body_size);
  };

  const handleClickEyeColor = (eye_color) => {
    setActiveEyeColor(eye_color);
  };

  const handleClickHairColor = (hair_color) => {
    setActiveHairColor(hair_color);
  };

  const handleClickAgeRange = (age_range) => {
    setActiveAgeRange(age_range);
  };

  const handleClickMaterialStatus = (material_status) => {
    setActiveMaterialStatus(material_status);
  };

  return (
    <>
      <div className="avatar">
        <div className="avatar1">
          <div className="left">
            <div className="girl">
              <div className="up">
                <img src={girl} alt="" />
              </div>
              <div className="arrow">
                <img src={arrow} alt="" />
              </div>
            </div>
          </div>
          <Link to="/full-avatar">
            <div className="right">
              <img src={fullAvatar} alt="" />
            </div>
          </Link>
        </div>

        <div className="container w-50 mt-5 tab-section">
          <div className="row g-2">
            <div className="col-12 col-md-6">
              <button
                type="button"
                className={`btn btn-outline-secondary p-2 rounded-pill w-100 fw-bold fs-5 custom-button ${
                  activeTab === "basic" ? "btn-active" : ""
                }`}
                onClick={() => setActiveTab("basic")}
              >
                Basic
              </button>
            </div>
            <div className="col-12 col-md-6">
              <button
                type="button"
                className={`btn btn-outline-secondary p-2 rounded-pill w-100 fw-bold fs-5 custom-button ${
                  activeTab === "questionnaire" ? "btn-active" : ""
                }`}
                onClick={() => setActiveTab("questionnaire")}
              >
                Questionnaire
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row g-2">
            <div className="col-12 w-100">
              <hr />
            </div>
          </div>
        </div>

        {activeTab === "basic" && (
          <div className="container w-50">
            <div className="row">
              <div className="col-12">
                <div className="p-2">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-bold fs-5">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill p-3"
                        placeholder="Enter Your Name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="bio" className="form-label fw-bold fs-5">
                        Bio
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill p-3"
                        placeholder="Enter Bio"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="form-label fw-bold fs-5"
                      >
                        Bio
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-pill p-3"
                        placeholder="Enter Email"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="mobile-number"
                        className="form-label fw-bold fs-5"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="number"
                        className="form-control rounded-pill p-3"
                        placeholder="Enter Mobile Number"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* -------------------------Height, Weight & Shoes------------------------------- */}
            <div className="container mt-4">
              <div className="row g-2">
                <h1 className="fw-bold fs-3">My Style Capsule</h1>
                <div className="col-12 col-md-4 d-flex align-items-center text-center mt-2">
                  <div>
                    <h5 className="text fs-5">
                      <span>{height}</span>cm
                    </h5>
                    <div
                      className="bg-dark d-flex justify-content-evenly align-items-center rounded-pill"
                      style={{ width: "110px", height: "50px" }}
                    >
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        onClick={() => handleChange("height", -1)}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        onClick={() => handleChange("height", -1)}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-4 d-flex align-items-center text-center">
                  <div>
                    <h5 className="text fs-5">
                      <span>{weight}</span>kg
                    </h5>
                    <div
                      className="bg-dark d-flex justify-content-evenly align-items-center rounded-pill"
                      style={{ width: "110px", height: "50px" }}
                    >
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        style={{ width: "40px", height: "40px" }}
                        onClick={() => handleChange("weight", -1)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        style={{ width: "40px", height: "40px" }}
                        onClick={() => handleChange("weight", -1)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 d-flex align-items-center text-center">
                  <div>
                    <h5 className="text fs-5">
                      <span>{shoes}</span>
                    </h5>
                    <div
                      className="bg-dark d-flex justify-content-evenly align-items-center rounded-pill"
                      style={{ width: "110px", height: "50px" }}
                    >
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        style={{ width: "40px", height: "40px" }}
                        onClick={() => handleChange("shoes", -1)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        style={{ width: "40px", height: "40px" }}
                        onClick={() => handleChange("shoes", -1)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------Shoulders------------------------------- */}
              <div className="row g-2 mt-4">
                <h1 className="fw-bold fs-3">Shoulders</h1>
                <div className="col-12 col-md-4 d-flex align-items-center text-center">
                  <div>
                    <h5 className="text fs-5">
                      <span>{shoulders}</span>cm
                    </h5>
                    <div
                      className="bg-dark d-flex justify-content-evenly align-items-center rounded-pill"
                      style={{ width: "110px", height: "50px" }}
                    >
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        onClick={() => handleChange("shoulders", -1)}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        onClick={() => handleChange("shoulders", -1)}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------Shoulders------------------------------- */}
              <div className="row g-2 mt-4">
                <h1 className="fw-bold fs-3">Chest & Waist</h1>
                <div className="col-12 col-md-4 d-flex align-items-center text-center">
                  <div>
                    <h5 className="text fs-5">
                      <span>{chest}</span>cm
                    </h5>
                    <div
                      className="bg-dark d-flex justify-content-evenly align-items-center rounded-pill"
                      style={{ width: "110px", height: "50px" }}
                    >
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        onClick={() => handleChange("chest", -1)}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        onClick={() => handleChange("chest", -1)}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 d-flex align-items-center text-center">
                  <div>
                    <h5 className="text fs-5">
                      <span>{waist}</span>cm
                    </h5>
                    <div
                      className="bg-dark d-flex justify-content-evenly align-items-center rounded-pill"
                      style={{ width: "110px", height: "50px" }}
                    >
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        onClick={() => handleChange("waist", -1)}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        onClick={() => handleChange("waist", -1)}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------Hips & High Hips------------------------------- */}
              <div className="row g-2 mt-4">
                <h1 className="fw-bold fs-3">Hips & High Hips</h1>
                <div className="col-12 col-md-4 d-flex align-items-center text-center">
                  <div>
                    <h5 className="text fs-5">
                      <span>{hips}</span>cm
                    </h5>
                    <div
                      className="bg-dark d-flex justify-content-evenly align-items-center rounded-pill"
                      style={{ width: "110px", height: "50px" }}
                    >
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        onClick={() => handleChange("hips", -1)}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        onClick={() => handleChange("hips", -1)}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 d-flex align-items-center text-center">
                  <div>
                    <h5 className="text fs-5">
                      <span>{high}</span>cm
                    </h5>
                    <div
                      className="bg-dark d-flex justify-content-evenly align-items-center rounded-pill"
                      style={{ width: "110px", height: "50px" }}
                    >
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        onClick={() => handleChange("high", -1)}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        onClick={() => handleChange("high", -1)}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------Gender------------------------------- */}
              <div className="row g-2" style={{ paddingTop: "5rem" }}>
                <h1 className="fw-bold fs-3">Gender</h1>
                <div className="col-12 col-md-4">
                  <button
                    type="button"
                    className={`btn rounded-pill w-100 fw-bold p-3 custom-gender-btn ${
                      activeGender === "Male" ? "selected" : ""
                    }`}
                    onClick={() => handleClickGender("Male")}
                  >
                    Male
                  </button>
                </div>
                <div className="col-12 col-md-4 d-flex align-items-center text-center">
                  <button
                    type="button"
                    className={`btn rounded-pill w-100 fw-bold p-3 custom-gender-btn ${
                      activeGender === "Female" ? "selected" : ""
                    }`}
                    onClick={() => handleClickGender("Female")}
                  >
                    Female
                  </button>
                </div>
                <div className="col-12 col-md-4 d-flex align-items-center text-center">
                  <button
                    type="button"
                    className={`btn rounded-pill w-100 fw-bold p-3 custom-gender-btn ${
                      activeGender === "Gender-Inc." ? "selected" : ""
                    }`}
                    onClick={() => handleClickGender("Gender-Inc.")}
                  >
                    Gender-Inc.
                  </button>
                </div>
              </div>

              {/* -------------------------Body Size------------------------------- */}
              <div className="row g-2" style={{ paddingTop: "5rem" }}>
                <h1 className="fw-bold fs-3">Body Size</h1>
                {bodySize.map((body_size) => (
                  <div
                    className="col-12 col-md-4 d-flex align-items-center text-center"
                    key={body_size}
                  >
                    <button
                      type="button"
                      className={`btn rounded-pill w-100 fw-bold p-3 custom-gender-btn ${
                        activeBodySize === body_size ? "selected" : ""
                      }`}
                      onClick={() => handleClickBodySize(body_size)}
                    >
                      {body_size}
                    </button>
                  </div>
                ))}
              </div>

              {/* -------------------------Eye Color------------------------------- */}
              <div className="row g-2" style={{ paddingTop: "5rem" }}>
                <h1 className="fw-bold fs-3">Eye Color</h1>
                {selectEyeColor.map((eye_color) => (
                  <div
                    className="col-12 col-md-4 d-flex align-items-center text-center"
                    key={eye_color}
                  >
                    <button
                      type="button"
                      className={`btn rounded-pill w-100 fw-bold p-3 custom-gender-btn ${
                        activeEyeColor === eye_color ? "selected" : ""
                      }`}
                      onClick={() => handleClickEyeColor(eye_color)}
                    >
                      {eye_color}
                    </button>
                  </div>
                ))}
              </div>

              {/* -------------------------Hair Color------------------------------- */}
              <div className="row g-2" style={{ paddingTop: "5rem" }}>
                <h1 className="fw-bold fs-3">Hair Color</h1>
                {selectHiarColor.map((hair_color) => (
                  <div
                    className="col-12 col-md-4 d-flex align-items-center text-center"
                    key={hair_color}
                  >
                    <button
                      type="button"
                      className={`btn rounded-pill w-100 fw-bold p-3 custom-gender-btn ${
                        activeHairColor === hair_color ? "selected" : ""
                      }`}
                      onClick={() => handleClickHairColor(hair_color)}
                    >
                      {hair_color}
                    </button>
                  </div>
                ))}
              </div>

              {/* -------------------------What age range you're in?------------------------------- */}
              <div className="row g-2" style={{ paddingTop: "5rem" }}>
                <h1 className="fw-bold fs-3">What age range you're in?</h1>
                {selectAgeRange.map((age_range) => (
                  <div
                    className="col-12 col-md-4 d-flex align-items-center text-center"
                    key={age_range}
                  >
                    <button
                      type="button"
                      className={`btn rounded-pill w-100 fw-bold p-3 custom-gender-btn ${
                        activeAgeRange === age_range ? "selected" : ""
                      }`}
                      onClick={() => handleClickAgeRange(age_range)}
                    >
                      {age_range}
                    </button>
                  </div>
                ))}
              </div>

              {/* -------------------------Marital Status------------------------------- */}
              <div className="row g-2" style={{ paddingTop: "5rem" }}>
                <h1 className="fw-bold fs-3">Marital Status</h1>
                {selectMaterialStatus.map((material_status) => (
                  <div
                    className="col-12 col-md-4 d-flex align-items-center text-center"
                    key={material_status}
                  >
                    <button
                      type="button"
                      className={`btn rounded-pill w-100 fw-bold p-3 custom-gender-btn ${
                        activeMaterialStatus === material_status
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleClickMaterialStatus(material_status)}
                    >
                      {material_status}
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-container mt-5">
                <div className="border-fade-left"></div>
                <div className="border-dark"></div>
                <div className="border-fade-right"></div>
              </div>

              {/* -------------------------update------------------------------- */}
              <div className="row g-2 mt-4">
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center mb-2 mb-md-0">
                  <button
                    type="button"
                    className="btn btn-dark w-100 w-md-50 rounded-pill p-3 fw-bold"
                  >
                    Update
                  </button>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                  <button
                    type="button"
                    className="btn btn-light w-100 w-md-50 rounded-pill p-3 fw-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "questionnaire" && (
          <div>
            <Questionnaire />
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileAvatar;
