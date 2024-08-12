import React from "react";
import "../../styles/QuestionnaireUpdate.css";

const QuestionnaireUpdate = () => {
  const question = "Do you like minimal style?";
  const allProfileImages = [
    [
      "https://images.unsplash.com/photo-1720048171527-208cb3e93192?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
    ],
    [
      "https://plus.unsplash.com/premium_photo-1722945721803-d7a1cdb06fdd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx",
      "https://images.unsplash.com/photo-1722959124885-b73921a69946?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
    ],
    [
      "https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1722962496035-d6c08f9085be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2Mnx8fGVufDB8fHx8fA%3D%3D",
    ],
  ];

  const question1 = "Do you like feminine style?";
  const allProfileImages1 = [
    [
      "https://images.unsplash.com/photo-1720048171527-208cb3e93192?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
    ],
    [
      "https://plus.unsplash.com/premium_photo-1722945721803-d7a1cdb06fdd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx",
      "https://images.unsplash.com/photo-1722959124885-b73921a69946?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
    ],
    [
      "https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1722962496035-d6c08f9085be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2Mnx8fGVufDB8fHx8fA%3D%3D",
    ],
  ];

  const question3 = "Do you like boho style?";
  const allProfileImages3 = [
    [
      "https://images.unsplash.com/photo-1720048171527-208cb3e93192?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
    ],
    [
      "https://plus.unsplash.com/premium_photo-1722945721803-d7a1cdb06fdd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx",
      "https://images.unsplash.com/photo-1722959124885-b73921a69946?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
    ],
    [
      "https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1722962496035-d6c08f9085be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2Mnx8fGVufDB8fHx8fA%3D%3D",
    ],
  ];

  const question4 = "Do you like classic style?";
  const allProfileImages4 = [
    [
      "https://images.unsplash.com/photo-1720048171527-208cb3e93192?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
    ],
    [
      "https://plus.unsplash.com/premium_photo-1722945721803-d7a1cdb06fdd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx",
      "https://images.unsplash.com/photo-1722959124885-b73921a69946?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
    ],
    [
      "https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1722962496035-d6c08f9085be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2Mnx8fGVufDB8fHx8fA%3D%3D",
    ],
  ];

  const question5 = "Do you like sexy style?";
  const allProfileImages5 = [
    [
      "https://images.unsplash.com/photo-1720048171527-208cb3e93192?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
    ],
    [
      "https://plus.unsplash.com/premium_photo-1722945721803-d7a1cdb06fdd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx",
      "https://images.unsplash.com/photo-1722959124885-b73921a69946?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
    ],
    [
      "https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1722888879060-ed9d1e88c2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1722962496035-d6c08f9085be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2Mnx8fGVufDB8fHx8fA%3D%3D",
    ],
  ];

  const singleBrand = {
    id: 1,
    company_log:
      "https://assets.mayoclinic.org/content/dam/mayoclinic/logos/mayo-clinic-logo.svg",
  };
  const generateBrandsArray = (item, count) => {
    return Array.from({ length: count }, (el, index) => ({
      ...item,
      id: index + 1,
    }));
  };
  const favouriteBrands = generateBrandsArray(singleBrand, 20);

  const buttonOptions = ["Yes", "No", "Sometimes"];

  const biggestMistakeButton = [
    "I don’t know my body & i can’t dress accordingly.",
    "I don’t know my style & i find it confusing.",
    "I am having trouble choosing shoes.",
  ];

  const looginClothsButton = [
    "Well Maintained, Clean, Simple",
    "Confused",
    "Self-Confident",
    "Striking",
  ];

  const wearTimeButton = ["Jeans", "Sneakers", "T-Shirts", "Dress", "Others"];

  const buttonWearColors = [
    "Black",
    "White",
    "Gray",
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Light Blue",
    "Dark Blue",
    "Purple",
    "Pink",
    "Brown",
  ];

  const changestylebutton = [
    "Clear up confusion",
    "Learning the rules I don’t know",
    "To be able to shop more conveniently ",
    "Harmony & balancing",
  ];

  return (
    <div className="questionnaire-update d-flex justify-content-center align-items-center">
      <div className="container w-75">
        {/* -------------------------Do you like minimal style------------------------ */}
        <h1 className="fw-bold fs-1 mt-2">{question}</h1>
        <div className="row g-2 mt-2">
          {allProfileImages.map((imageSet, index) => (
            <div key={index} className="col-12 col-md-4 mb-2 mb-md-0">
              {imageSet.map((src, imgIndex) => (
                <img
                  key={imgIndex}
                  src={src}
                  alt={`Closet ${imgIndex}`}
                  className={`img-fluid ${imgIndex > 0 ? "mt-2" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="row g-2 mt-2">
          {buttonOptions.map((option, index) => (
            <div
              key={index}
              className="col-12 col-md-4 d-flex justify-content-center mb-2 mb-md-0"
            >
              <button
                type="button"
                className="btn btn-outline-secondary p-2 fw-bold rounded-pill custom-button"
              >
                {option}
              </button>
            </div>
          ))}
        </div>

        {/* -------------------------Do you like feminine style------------------------ */}
        <div className="mt-5">
          <h1 className="fw-bold fs-1 mt-2">{question1}</h1>
          <div className="row g-2 mt-2">
            {allProfileImages1.map((imageSet, index) => (
              <div key={index} className="col-12 col-md-4 mb-2 mb-md-0">
                {imageSet.map((src, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={src}
                    alt={`Closet ${imgIndex}`}
                    className={`img-fluid ${imgIndex > 0 ? "mt-2" : ""}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="row g-2 mt-2">
            {buttonOptions.map((option, index) => (
              <div
                key={index}
                className="col-12 col-md-4 d-flex justify-content-center mb-2 mb-md-0"
              >
                <button
                  type="button"
                  className="btn btn-outline-secondary p-2 fw-bold rounded-pill custom-button"
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------Do you like boho style?------------------------ */}
        <div className="mt-5">
          <h1 className="fw-bold fs-1 mt-2">{question3}</h1>
          <div className="row g-2 mt-2">
            {allProfileImages3.map((imageSet, index) => (
              <div key={index} className="col-12 col-md-4 mb-2 mb-md-0">
                {imageSet.map((src, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={src}
                    alt={`Closet ${imgIndex}`}
                    className={`img-fluid ${imgIndex > 0 ? "mt-2" : ""}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="row g-2 mt-2">
            {buttonOptions.map((option, index) => (
              <div
                key={index}
                className="col-12 col-md-4 d-flex justify-content-center mb-2 mb-md-0"
              >
                <button
                  type="button"
                  className="btn btn-outline-secondary p-2 fw-bold rounded-pill custom-button"
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------Do you like classic style?------------------------ */}
        <div className="mt-5">
          <h1 className="fw-bold fs-1 mt-2">{question4}</h1>
          <div className="row g-2 mt-2">
            {allProfileImages4.map((imageSet, index) => (
              <div key={index} className="col-12 col-md-4 mb-2 mb-md-0">
                {imageSet.map((src, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={src}
                    alt={`Closet ${imgIndex}`}
                    className={`img-fluid ${imgIndex > 0 ? "mt-2" : ""}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="row g-2 mt-2">
            {buttonOptions.map((option, index) => (
              <div
                key={index}
                className="col-12 col-md-4 d-flex justify-content-center mb-2 mb-md-0"
              >
                <button
                  type="button"
                  className="btn btn-outline-secondary p-2 fw-bold rounded-pill custom-button"
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------Do you like classic style?------------------------ */}
        <div className="mt-5">
          <h1 className="fw-bold fs-1 mt-2">{question5}</h1>
          <div className="row g-2 mt-2">
            {allProfileImages5.map((imageSet, index) => (
              <div key={index} className="col-12 col-md-4 mb-2 mb-md-0">
                {imageSet.map((src, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={src}
                    alt={`Closet ${imgIndex}`}
                    className={`img-fluid ${imgIndex > 0 ? "mt-2" : ""}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="row g-2 mt-2">
            {buttonOptions.map((option, index) => (
              <div
                key={index}
                className="col-12 col-md-4 d-flex justify-content-center mb-2 mb-md-0"
              >
                <button
                  type="button"
                  className="btn btn-outline-secondary p-2 fw-bold rounded-pill custom-button"
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------What’s your favourotite brand?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">What’s your favourite brand?</h1>
          {favouriteBrands.map((item) => (
            <div className="col-12 col-sm-6 col-md-3" key={item.id}>
              <div className="p-3 border d-flex justify-content-center align-items-center custom-column">
                <img
                  src={item.company_log}
                  alt="Brand Logo"
                  className="img-fluid custom-img"
                />
              </div>
            </div>
          ))}
        </div>

        {/* -------------------------What kind of nighborhoods & places do you spend time in?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            What kind of nighborhoods & places do you spend time in?
          </h1>
          <div className="col-12 col-sm-6 col-md-6">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Chic
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Shabby
            </button>
          </div>
        </div>

        {/* -------------------------Do you do sports?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">Do you do sports?</h1>
          <div className="col-12 col-sm-6 col-md-4">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Yes
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              No
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Sometimes
            </button>
          </div>
        </div>

        {/* -------------------------Do you enjoy shopping?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">Do you enjoy shopping?</h1>
          <div className="col-12 col-sm-6 col-md-4">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Yes
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              No
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Sometimes
            </button>
          </div>
        </div>

        {/* -------------------------Do you feel the need to get approval from someone while shpping?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            Do you feel the need to get approval from someone while shpping?
          </h1>
          <div className="col-12 col-sm-6 col-md-4">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Yes
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              No
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Sometimes
            </button>
          </div>
        </div>

        {/* -------------------------What do you shop for?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">What do you shop for?</h1>
          <div className="col-12 col-sm-6 col-md-4">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Color
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Kumas
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Price
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Brand
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Style
            </button>
          </div>
        </div>

        {/* -------------------------What brand do you shop with?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">What brand do you shop with?</h1>
          <div className="col-12 col-sm-6 col-md-6">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Luxury Brands
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Eco-Friendly
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Inditex Brands
            </button>
          </div>
        </div>

        {/* -------------------------How do you describe your current style?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            How do you describe your current style?
          </h1>
          <div className="col-12 col-sm-6 col-md-6">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Classic
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Dramatic
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Elegant
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Modern
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Trendy
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Others
            </button>
          </div>
        </div>

        {/* -------------------------What is biggest mistake you make about clothing?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            What is biggest mistake you make about clothing?
          </h1>
          {biggestMistakeButton.map((label, index) => (
            <div
              key={index}
              className="col-12 d-flex justify-content-center align-items-center"
            >
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill w-100 custom-button p-2 fw-bold fs-5"
              >
                {label}
              </button>
            </div>
          ))}
        </div>

        {/* -------------------------How would someone describe you by looking at your cloths?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            How would someone describe you by looking at your cloths?
          </h1>
          {looginClothsButton.map((label, index) => (
            <div
              key={index}
              className="col-12 d-flex justify-content-center align-items-center"
            >
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
              >
                {label}
              </button>
            </div>
          ))}
        </div>

        {/* -------------------------Is there anything you wear all the time?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            Is there anything you wear all the time?
          </h1>
          {wearTimeButton.map((label, index) => (
            <div
              key={index}
              className="col-12 d-flex justify-content-center align-items-center"
            >
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
              >
                {label}
              </button>
            </div>
          ))}
        </div>

        {/* -------------------------Which colors you never wear?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">Which colors you never wear?</h1>
          {buttonWearColors.map((label, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-6">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
              >
                {label}
              </button>
            </div>
          ))}
        </div>

        {/* -------------------------What would you like to change about your style? what will happen when you change it? ------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            What would you like to change about your style? what will happen
            when you change it?
          </h1>
          {changestylebutton.map((label, index) => (
            <div
              key={index}
              className="col-12 d-flex justify-content-center align-items-center"
            >
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
              >
                {label}
              </button>
            </div>
          ))}
        </div>

        <div className="border-container mt-5">
          <div className="border-fade-left"></div>
          <div className="border-dark"></div>
          <div className="border-fade-right"></div>
        </div>

        {/* -------------------------Update profile------------------------ */}
        <div className="row gy-2 mt-4">
          <div className="col-12 col-sm-6 col-md-6">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Update
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireUpdate;
