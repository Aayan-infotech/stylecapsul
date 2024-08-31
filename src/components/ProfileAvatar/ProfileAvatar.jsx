import React, { useEffect, useState } from "react";
import "./ProfileAvatar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import fullAvatar from "./img/full-avatar.png";
// -----------------------
import girl from "./img/girl.png";
import changeAvtar from "./img/d3cd5a4cdfd2a1b9677a50a12e6c5818.png";
import halfbtnavtar from "./img/fullbodyimage.png";
import fullbtnavtar from "./img/arrow.png";

import Questionnaire from "../questionnaire/QuestionnaireUpdate.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { createBasic } from '../../reduxToolkit/basiceditprofile.js'
import { fetchProfile } from '../../reduxToolkit/profileSlice.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileAvatar() {
  const [activeTab, setActiveTab] = useState("basic");
  const [activeGenderType, setActiveGenderType] = useState("");
  const [activeBodySize, setActiveBodySize] = useState("");
  const [activeEyeColor, setActiveEyeColor] = useState("");
  const [activeHairColor, setActiveHairColor] = useState("");
  const [activeAgeRange, setActiveAgeRange] = useState("");
  const [activeMaterialStatus, setActiveMaterialStatus] = useState("");
  const [currentImageAvtar, setCurrentImageAvtar] = useState(girl);
  const [selectGender, setSelectGender] = useState([]);
  const [bodySize, setBodySize] = useState([]);
  const [selectEyeColor, setSelectEyeColor] = useState([]);
  const [selectHiarColor, setSelectHiarColor] = useState([]);
  const [selectAgeRange, setSelectAgeRange] = useState([]);
  const [selectMaterialStatus, setSelectMaterialStatus] = useState([]);

  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [shoes, setShoes] = useState(null);
  const [shoulders, setShoulders] = useState(null);
  const [chest, setChest] = useState(null);
  const [waist, setWaist] = useState(null);
  const [hips, setHips] = useState(null);
  const [highHips, setHighHips] = useState(null);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatedProfileData = location.state?.user;
  const { user } = useSelector((state) => state.login);
  const user_id = user?.data?._id

  const handleImageChange = (image) => {
    setCurrentImageAvtar(image)
  }

  const [formData, setFormData] = useState({
    name: updatedProfileData?.firstName || "",
    bio: updatedProfileData?.bio || "",
    email: updatedProfileData?.email || "",
    mobileNumber: updatedProfileData?.mobileNumber || "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(fetchProfile());
        const profileData = actionResult?.payload?.style_capsule_json?.[0]?.profile;
        setSelectGender(profileData?.measurements?.gender)
        setBodySize(profileData?.measurements?.bodySize)
        setSelectEyeColor(profileData?.measurements?.eyeColor)
        setSelectHiarColor(profileData?.measurements?.hairColor)
        setSelectAgeRange(profileData?.measurements?.ageRange)
        setSelectMaterialStatus(profileData?.measurements?.maritalStatus)

        if (profileData) {
          const { measurements } = profileData;
          setActiveGenderType(updatedProfileData.gender || selectGender);
          setActiveBodySize(updatedProfileData.bodySize || bodySize);
          setActiveEyeColor(updatedProfileData.eyeColor || selectEyeColor);
          setActiveHairColor(updatedProfileData.hairColor || selectHiarColor);
          setActiveAgeRange(updatedProfileData.age || selectAgeRange);
          setActiveMaterialStatus(updatedProfileData.maritalStatus || selectMaterialStatus);

          setHeight(updatedProfileData.height || measurements.height?.value);
          setWeight(updatedProfileData.weight || measurements.weight?.value);
          setShoes(updatedProfileData.shoes || measurements.shoes?.size);
          setShoulders(updatedProfileData.shoulders || measurements.shoulders?.value);
          setChest(updatedProfileData.chest || measurements.chest?.value);
          setWaist(updatedProfileData.waist || measurements.waist?.value);
          setHips(updatedProfileData.hips || measurements.hips?.value);
          setHighHips(updatedProfileData.highHips || measurements.highHips?.value);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
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
    } else if (type === "highHips") {
      setHighHips((prev) => Math.max(0, prev + delta));
    }
  };

  const handleClickGenderType = (gender_type) => {
    setActiveGenderType(gender_type);
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

  const handleUpdate = async () => {
    try {
      const actionResult = await dispatch(createBasic({
        userId: user_id,
        profileData: {
          ...formData, height, weight, shoes, shoulders, chest, waist, hips, highHips,
          bodySize: activeBodySize,
          eyeColor: activeEyeColor,
          hairColor: activeHairColor,
          age: activeAgeRange,
          maritalStatus: activeMaterialStatus,
          gender: activeGenderType,
        },
      })).unwrap();
      if (actionResult.success) {
        toast.success(actionResult?.message, {
          autoClose: 1000,
          style: { backgroundColor: '#28a745', color: '#fff' }
        });
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      toast.error(errorMessage, {
        autoClose: 2000,
        style: { backgroundColor: '#dc3545', color: '#fff' }
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="avatar">
        <div className="avatar1">
          <div className="left">
            <div className="girl">
              <div className="up d-flex justify-content-center align-items-center">
                <img src={currentImageAvtar} height={300} alt="Avatar" />
              </div>
              <div className="arrow">
                {currentImageAvtar === girl && (
                  <button type="button" onClick={() => handleImageChange(changeAvtar)} className="btn rounded-circle">
                    <img src={halfbtnavtar} height={30} alt="" />
                  </button>
                )}
                {currentImageAvtar === changeAvtar && (
                  <button type="button" onClick={() => handleImageChange(girl)} className="btn rounded-circle">
                    <img src={fullbtnavtar} height={30} alt="" />
                  </button>
                )}
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
                className={`btn btn-outline-secondary p-2 rounded-pill w-100 fw-bold fs-5 custom-button ${activeTab === "basic" ? "btn-active" : ""
                  }`}
                onClick={() => setActiveTab("basic")}
              >
                Basic
              </button>
            </div>
            <div className="col-12 col-md-6">
              <button
                type="button"
                className={`btn btn-outline-secondary p-2 rounded-pill w-100 fw-bold fs-5 custom-button ${activeTab === "questionnaire" ? "btn-active" : ""
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
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        readOnly
                        style={{ color: "#6c757d" }}
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Not editable"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="bio" className="form-label fw-bold fs-5">
                        Bio
                      </label>
                      <textarea
                        type="text"
                        className="form-control rounded-pill p-3"
                        placeholder="Enter Bio"
                        rows="1"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="form-label fw-bold fs-5"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-pill p-3"
                        placeholder="Enter Email"
                        readOnly
                        style={{ color: "#6c757d" }}
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Not editable"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mobileNumber" className="form-label fw-bold fs-5">
                        Mobile Number
                      </label>
                      <input
                        type="number"
                        className="form-control rounded-pill p-3"
                        placeholder="Enter Mobile Number"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* -------------------------Height, Weight & Shoes------------------------------- */}
            <div className="container mt-4">
              <div className="row g-2">
                <h1 className="fw-bold fs-3">Height, Weight & Shoes</h1>
                <div className="col-12 col-md-4 d-flex align-items-center text-center mt-2">
                  <div>
                    <h5 className="text fs-5">
                      <span className="me-1">{height || 0}</span>Inch
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
                        onClick={() => handleChange("height", 1)}
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
                      <span className="me-2">{weight}</span>Ponds 
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
                        onClick={() => handleChange("weight", 1)}
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
                        onClick={() => handleChange("shoes", 1)}
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
                      <span className="me-2">{shoulders}</span>Inch
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
                        onClick={() => handleChange("shoulders", 1)}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------Chest & west------------------------------- */}
              <div className="row g-2 mt-4">
                <h1 className="fw-bold fs-3">Chest & Waist</h1>
                <div className="col-12 col-md-4 d-flex align-items-center text-center">
                  <div>
                    <h5 className="text fs-5">
                      <span className="me-2">{chest}</span>Inch
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
                        onClick={() => handleChange("chest", 1)}
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
                      <span className="me-2">{waist}</span>Inch
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
                        onClick={() => handleChange("waist", 1)}
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
                      <span className="me-2">{hips}</span>Inch
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
                        onClick={() => handleChange("hips", 1)}
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
                      <span className="me-2">{highHips}</span>Inch
                    </h5>
                    <div
                      className="bg-dark d-flex justify-content-evenly align-items-center rounded-pill"
                      style={{ width: "110px", height: "50px" }}
                    >
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        onClick={() => handleChange("highHips", -1)}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-light fw-bold rounded-pill"
                        onClick={() => handleChange("highHips", 1)}
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
                {selectGender.map((gender_type) => (
                  <div
                    className="col-12 col-md-4 d-flex align-items-center text-center"
                    key={gender_type}
                  >
                    <button
                      type="button"
                      className={`btn rounded-pill w-100 fw-bold p-3 custom-gender-btn ${activeGenderType === gender_type ? "selected" : ""
                        }`}
                      onClick={() => handleClickGenderType(gender_type)}
                    >
                      {gender_type}
                    </button>
                  </div>
                ))}
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
                      className={`btn rounded-pill w-100 fw-bold p-3 custom-gender-btn ${activeBodySize === body_size ? "selected" : ""
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
                      className={`btn rounded-pill w-100 fw-bold p-3 custom-gender-btn ${activeEyeColor === eye_color ? "selected" : ""
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
                      className={`btn rounded-pill w-100 fw-bold p-3 custom-gender-btn ${activeHairColor === hair_color ? "selected" : ""
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
                      className={`btn rounded-pill w-100 fw-bold p-3 custom-gender-btn ${activeAgeRange === age_range ? "selected" : ""
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
                      className={`btn rounded-pill w-100 fw-bold p-3 custom-gender-btn ${activeMaterialStatus === material_status
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
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                  <Link to="/profile" className="w-100 w-md-50">
                    <button
                      type="button"
                      className="btn btn-light w-100 rounded-pill p-3 fw-bold"
                    >
                      Cancel
                    </button>
                  </Link>
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
