import React, { useEffect, useState } from "react";
import "../../styles/QuestionnaireUpdate.css";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const QuestionnaireUpdate = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    minimal_style: null,
    feminine_style: null,
    boho_style: null,
    classic_style: null,
    sexy_style: null,
    neighborhoods: null,
    sports: null,
    enjoyshopping: null,
    shoppingApprov: null,
    shop_color: null,
    shop_brand: null,
    current_style: null,
    cloth_mistake: null,
    cloth_describe: null,
    wear_time: null,
    never_wear_time: null,
  });

  const token = getCookie('authToken')
  const userId = getCookie('userId')

  const profile = useSelector((state) => state.profile?.data);
  const questionnaire = profile?.style_capsule_json?.[1]?.questions_profile;
  const brandQuestion = questionnaire?.find((question) => question?.brand);
  const favouriteBrandss = brandQuestion?.brand?.images;

  const neighborhoodsplaces = questionnaire?.find((item) => item?.nighborhoods);
  const sportsdata = questionnaire?.find((sp) => sp?.sports);
  const enjoyShopping = questionnaire?.find((shop) => shop?.shopping);
  const shoppingApproval = questionnaire?.find((approv) => approv?.approval);
  const shopColor = questionnaire?.find((spcolor) => spcolor?.["shop-for"]);
  const shoppingBrand = questionnaire?.find(
    (spbrand) => spbrand?.["shopping-brand"]
  );
  const currentStyle = questionnaire?.find((sty) => sty?.style);
  const clothMistake = questionnaire?.find((mistake) => mistake?.clothing);
  const clothDescribe = questionnaire?.find((cd) => cd?.describe);
  const wearTime = questionnaire?.find((wer) => wer?.wear);
  const neverChooseWear = questionnaire?.find((nwear) => nwear?.["never-wear"]);

  const handleChooseQuestionnair = (type, option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [type]: option,
    }));
  };

  const handleClick = (id) => {
    setSelectedBrand((prevSelected) => (prevSelected === id ? null : id));
  };

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

  const buttonOptions = ["Yes", "No", "Sometimes"];
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(apiUrl(`api/user/questionnaire/${userId}`), selectedOptions, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response?.data?.success) {
        showSuccessToast(response?.data?.message);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      showErrorToast(errorMessage)
    }
  };

  useEffect(() => {
    const fetchDataAndMatchUser = async () => {
      const token = getCookie('authToken');
      try {
        const response = await axios.get(apiUrl('api/user/all_quest'), {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const allQuest = response?.data?.data;
        if (allQuest && userId) {
          const findQues = allQuest.find((qs) => qs?.user_id === userId);
          if (findQues) {
            setSelectedOptions((prevState) => ({
              ...prevState,
              minimal_style: findQues.minimal_style || prevState.minimal_style,
              feminine_style: findQues.feminine_style || prevState.feminine_style,
              boho_style: findQues.boho_style || prevState.boho_style,
              classic_style: findQues.classic_style || prevState.classic_style,
              sexy_style: findQues.sexy_style || prevState.sexy_style,
              neighborhoods: findQues.neighborhoods || prevState.neighborhoods,
              sports: findQues.sports || prevState.sports,
              enjoyshopping: findQues.enjoyshopping || prevState.enjoyshopping,
              shoppingApprov: findQues.shoppingApprov || prevState.shoppingApprov,
              shop_color: findQues.shop_color || prevState.shop_color,
              shop_brand: findQues.shop_brand || prevState.shop_brand,
              current_style: findQues.current_style || prevState.current_style,
              cloth_mistake: findQues.cloth_mistake || prevState.cloth_mistake,
              cloth_describe: findQues.cloth_describe || prevState.cloth_describe,
              wear_time: findQues.wear_time || prevState.wear_time,
              never_wear_time: findQues.never_wear_time || prevState.never_wear_time,
            }));
          }
        }
      } catch (error) {
        console.log(error, 'something went wrong');
      }
    };
    fetchDataAndMatchUser();
  }, []);

  return (
    <div className="questionnaire-update d-flex justify-content-center align-items-center">
      <div className="container w-75">
        {/* -------------------------Do you like minimal style------------------------ */}
        <div className="mt-2">
          <h1 className="fw-bold fs-1 mt-2">Do you like minimal style?</h1>
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
                  onClick={() =>
                    handleChooseQuestionnair("minimal_style", option)
                  }
                  className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.minimal_style === option ? "selected" : ""
                    }`}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------Do you like feminine style------------------------ */}
        <div className="mt-5">
          <h1 className="fw-bold fs-1 mt-2">Do you like feminine style?</h1>
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
                  onClick={() =>
                    handleChooseQuestionnair("feminine_style", option)
                  }
                  className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.feminine_style === option ? "selected" : ""
                    }`}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------Do you like boho style?------------------------ */}
        <div className="mt-5">
          <h1 className="fw-bold fs-1 mt-2">Do you like boho style?</h1>
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
                  onClick={() => handleChooseQuestionnair("boho_style", option)}
                  className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.boho_style === option ? "selected" : ""
                    }`}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------Do you like classic style?------------------------ */}
        <div className="mt-5">
          <h1 className="fw-bold fs-1 mt-2">Do you like classic style?</h1>
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
                  onClick={() =>
                    handleChooseQuestionnair("classic_style", option)
                  }
                  className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.classic_style === option ? "selected" : ""
                    }`}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------Do you like classic style?------------------------ */}
        <div className="mt-5">
          <h1 className="fw-bold fs-1 mt-2">Do you like sexy style?</h1>
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
                  onClick={() => handleChooseQuestionnair("sexy_style", option)}
                  className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.sexy_style === option ? "selected" : ""
                    }`}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------What’s your favourotite brand?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            {brandQuestion?.brand?.question || "What’s your favourite brand?"}
          </h1>
          {favouriteBrandss?.map((image, index) => (
            <div
              className={`col-12 col-sm-6 col-md-3 ${selectedBrand === index ? "selected" : ""
                }`}
              key={index}
              onClick={() => handleClick(index)}
            >
              <div
                className={`p-3 border d-flex justify-content-center align-items-center custom-column ${selectedBrand === index ? "selected-bg" : ""
                  }`}
              >
                <img
                  src={image}
                  alt={`Brand Logo ${index + 1}`}
                  className="img-fluid custom-img"
                />
                {selectedBrand === index && (
                  <FaCheck className="check-icon text-white" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* -------------------------What kind of neighborhoods & places do you spend time in?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            {neighborhoodsplaces?.nighborhoods?.question}
          </h1>
          {neighborhoodsplaces?.nighborhoods?.options.map((option, index) => (
            <div className="col-12 col-sm-6 col-md-6" key={index}>
              <button
                type="button"
                onClick={() =>
                  handleChooseQuestionnair("neighborhoods", option)
                }
                className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.neighborhoods === option ? "selected" : ""
                  }`}
              >
                {option}
              </button>
            </div>
          ))}
        </div>

        {/* -------------------------Do you do sports?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">{sportsdata?.sports?.question}</h1>
          {sportsdata?.sports?.options?.map((option, index) => (
            <div className="col-12 col-sm-4 col-md-4" key={index}>
              <button
                type="button"
                onClick={() => handleChooseQuestionnair("sports", option)}
                className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.sports === option ? "selected" : ""
                  }`}
              >
                {option}
              </button>
            </div>
          ))}
        </div>

        {/* -------------------------Do you enjoy shopping?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            {enjoyShopping?.shopping?.question}
          </h1>
          {enjoyShopping?.shopping?.options?.map((option, index) => (
            <div className="col-12 col-sm-4 col-md-4" key={index}>
              <button
                type="button"
                onClick={() =>
                  handleChooseQuestionnair("enjoyshopping", option)
                }
                className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.enjoyshopping === option ? "selected" : ""
                  }`}
              >
                {option}
              </button>
            </div>
          ))}
        </div>

        {/* -------------------------Do you feel the need to get approval from someone while shpping?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            {shoppingApproval?.approval?.question}
          </h1>
          {shoppingApproval?.approval?.options?.map((option, index) => (
            <div className="col-12 col-sm-4 col-md-4" key={index}>
              <button
                type="button"
                onClick={() =>
                  handleChooseQuestionnair("shoppingApprov", option)
                }
                className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.shoppingApprov === option ? "selected" : ""
                  }`}
              >
                {option}
              </button>
            </div>
          ))}
        </div>

        {/* -------------------------What do you shop for?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            {shopColor?.["shop-for"]?.question}
          </h1>
          {shopColor?.["shop-for"]?.options?.map((option, index) => (
            <div className="col-12 col-sm-4 col-md-4" key={index}>
              <button
                type="button"
                onClick={() => handleChooseQuestionnair("shop_color", option)}
                className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.shop_color === option ? "selected" : ""
                  }`}
              >
                {option}
              </button>
            </div>
          ))}
        </div>

        {/* ------------------------What brand do you shop with?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            {shoppingBrand?.["shopping-brand"]?.question}
          </h1>
          {shoppingBrand?.["shopping-brand"]?.options?.map((option, index) => (
            <div className="col-12 col-sm-4 col-md-4" key={index}>
              <button
                type="button"
                onClick={() => handleChooseQuestionnair("shop_brand", option)}
                className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.shop_brand === option ? "selected" : ""
                  }`}
              >
                {option}
              </button>
            </div>
          ))}
        </div>

        {/* -------------------------How do you describe your current style?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">{currentStyle?.style?.question}</h1>
          {currentStyle?.style?.options?.map((option, index) => (
            <div className="col-12 col-sm-4 col-md-4" key={index}>
              <button
                type="button"
                onClick={() =>
                  handleChooseQuestionnair("current_style", option)
                }
                className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.current_style === option ? "selected" : ""
                  }`}
              >
                {option}
              </button>
            </div>
          ))}
        </div>

        {/* -------------------------What is biggest mistake you make about clothing?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            {clothMistake?.clothing?.question}
          </h1>
          {clothMistake?.clothing?.options?.map((option, index) => (
            <div
              className="col-12 d-flex justify-content-center align-items-center"
              key={index}
            >
              <button
                type="button"
                onClick={() =>
                  handleChooseQuestionnair("cloth_mistake", option)
                }
                className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.cloth_mistake === option ? "selected" : ""
                  }`}
              >
                {option}
              </button>
            </div>
          ))}
        </div>

        {/* -------------------------How would someone describe you by looking at your cloths?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            {clothDescribe?.describe?.question}
          </h1>
          {clothDescribe?.describe?.options?.map((option, index) => (
            <div
              className="col-12 d-flex justify-content-center align-items-center"
              key={index}
            >
              <button
                type="button"
                onClick={() =>
                  handleChooseQuestionnair("cloth_describe", option)
                }
                className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.cloth_describe === option ? "selected" : ""
                  }`}
              >
                {option}
              </button>
            </div>
          ))}
        </div>

        {/* -------------------------Is there anything you wear all the time?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">{wearTime?.wear?.question}</h1>
          {wearTime?.wear?.options?.map((option, index) => (
            <div
              className="col-12 d-flex justify-content-center align-items-center"
              key={index}
            >
              <button
                type="button"
                onClick={() => handleChooseQuestionnair("wear_time", option)}
                className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.wear_time === option ? "selected" : ""
                  }`}
              >
                {option}
              </button>
            </div>
          ))}
        </div>

        {/* -------------------------Which colors you never wear?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            {neverChooseWear?.["never-wear"]?.question}
          </h1>
          {neverChooseWear?.["never-wear"]?.options?.map((option, index) => (
            <div className="col-12 col-sm-4 col-md-4" key={index}>
              <button
                type="button"
                onClick={() =>
                  handleChooseQuestionnair("never_wear_time", option)
                }
                className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.never_wear_time === option ? "selected" : ""
                  }`}
              >
                {option}
              </button>
            </div>
          ))}
        </div>

        {/* -------------------------What kind of neighborhoods & places do you spend time in?------------------------ */}
        <div className="row gy-2 mt-4">
          <h1 className="fw-bold fs-1 mt-2">
            {neighborhoodsplaces?.nighborhoods?.question}
          </h1>
          {neighborhoodsplaces?.nighborhoods?.options.map((option, index) => (
            <div className="col-12 col-sm-4 col-md-4" key={index}>
              <button
                type="button"
                onClick={() =>
                  handleChooseQuestionnair("neighborhoods", option)
                }
                className={`btn btn-outline-secondary rounded-pill w-75 custom-button p-2 fw-bold fs-5 ${selectedOptions.neighborhoods === option ? "selected" : ""
                  }`}
              >
                {option}
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
          <div className="col-12 col-sm-6 col-md-6 d-flex justify-content-center align-items-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-outline-secondary rounded-pill w-50 custom-button p-2 fw-bold fs-5"
            >
              Update
            </button>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill w-50 custom-button p-2 fw-bold fs-5"
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
