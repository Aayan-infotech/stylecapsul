// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./EmojiStyleCapsule.scss";
import addIcon from "./img/first-img.png";
import firstImg from "./img/cute-first.png";
import secondImg from "./img/Happy-second.png";
import thirdImg from "./img/sexy-third.png";
import fourthImg from "./img/confidant-fourth.png";
import fifthImg from "./img/classy-fifth.png";
import sixthImg from "./img/bloated-sixth.png";
import seventhImg from "./img/calm-seventh.png";
import eightImg from "./img/natural-eight.png";
import ninthImg from "./img/nervous-ninth.png";
import tenthImg from "./img/sad-tenth.png";
import elevenImg from "./img/tired-eleven.png";
import firstStyle from "./img/smart casual-1.png";
import secondStyle from "./img/casual-2.png";
import thirdStyle from "./img/virtual office-3.png";
import fourthStyle from "./img/street wear-4.png";
import fifthStyle from "./img/grunge-5.png";
import firstOccasion from "./img/work-6.png";
import secondOccasion from "./img/date-7.png";
import thirdOccasion from "./img/wedding-8.png";
import fourthOccasion from "./img/chill-9.png";
import { Link } from "react-router-dom";
import axios from "axios";
import blank_img from "../../assets/stylist/blank_img.jpg";

function EmojiStyleCapsule() {
  const [getStableMoods, setGetStableMoods] = useState([]);
  const [styles, setStyles] = useState([
    firstStyle,
    secondStyle,
    thirdStyle,
    fourthStyle,
    fifthStyle,
  ]);

  const [occasions, setOccasions] = useState([
    firstOccasion,
    secondOccasion,
    thirdOccasion,
    fourthOccasion,
    secondStyle,
  ]);

  const handleImageUpload = (e, setStateFunc, currentImages) => {
    if (currentImages.length < 18) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setStateFunc([...currentImages, reader.result]);
        };
        reader.readAsDataURL(file);
      }
    } else {
      alert("You cannot add more than 18 images.");
    }
  };

  const renderImages = (images) => {
    const rows = [];
    for (let i = 0; i < images.length; i += 6) {
      rows.push(images.slice(i, i + 6));
    }
    return rows.map((row, index) => (
      <div key={index} className="moods">
        {row.map((imgSrc, idx) => (
          <img
            key={idx}
            className="mood-img"
            src={imgSrc}
            alt={`Mood ${index * 6 + idx + 1}`}
          />
        ))}
      </div>
    ));
  };

  const fetchAllStylsMoods = async () => {
    try {
      const response = await axios.get("http://44.196.192.232:3555/api/entity/get");
      console.log(response?.data?.data);
      if (response?.data?.success) {
        setGetStableMoods(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllStylsMoods();
  }, []);


  return (
    <div className="emoji-style-capsule">
      <h1 className="main-heading">My Style Capsule</h1>

      <div class="container d-block">
        <div class="row m-0 g-2">
          <h2 className="fw-bold">Moods</h2>
          {getStableMoods?.mood?.map((item, index) => (
            <div class="col-12 col-md-2" key={index}>
              <div class="p-1 border border-1">
                <img src={item?.image || blank_img} className="w-100" style={{ maxHeight: "122px" }} />
              </div>
            </div>
          ))}
        </div>

        <div class="row m-0 g-2 mt-4">
          <h2 className="fw-bold">Style</h2>
          {getStableMoods?.style?.map((item, index) => (
            <div class="col-12 col-md-2" key={index}>
              <div class="p-1 border border-1">
                <img src={item?.image || blank_img} className="w-100" style={{ maxHeight: "122px" }} />
              </div>
            </div>
          ))}
        </div>

        <div class="row m-0 g-2 mt-4">
          <h2 className="fw-bold">Occassion</h2>
          {getStableMoods?.occassion?.map((item, index) => (
            <div class="col-12 col-md-2" key={index}>
              <div class="p-1 border border-1">
                <img src={item?.image || blank_img} className="w-100" style={{ maxHeight: "122px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link to="/myCapsuleAddAvtart">Next Page</Link>
      <div className="sub-heading">
        <button className="sub-button">Items</button>
        <button className="sub-button">Outfits</button>
      </div>

      <div className="moods-section section">
        <h2 className="moods-heading head">Moods</h2>
        <div className="first-mood moods">
          <img className="mood-img" src={firstImg} alt="" />
          <img className="mood-img" src={secondImg} alt="" />
          <img className="mood-img" src={thirdImg} alt="" />
          <img className="mood-img" src={fourthImg} alt="" />
          <img className="mood-img" src={fifthImg} alt="" />
        </div>
        <div className="second-mood moods">
          <img className="mood-img" src={sixthImg} alt="" />
          <img className="mood-img" src={seventhImg} alt="" />
          <img className="mood-img" src={eightImg} alt="" />
          <img className="mood-img" src={ninthImg} alt="" />
          <img className="mood-img" src={tenthImg} alt="" />
        </div>
        <div className="third-mood moods">
          <img className="mood-img" src={elevenImg} alt="" />
        </div>
      </div>

      <div className="styles-section section">
        <h2 className="styles-heading head">Styles</h2>
        {renderImages(styles)}
        <div className="moods">
          <label>
            <img className="mood-img" src={addIcon} alt="Add" />
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setStyles, styles)}
            />
          </label>
        </div>
      </div>

      <div className="occasions-section section">
        <h2 className="styles-heading head">Occasions</h2>
        {renderImages(occasions)}
        <div className="moods">
          <label>
            <img className="mood-img" src={addIcon} alt="Add" />
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setOccasions, occasions)}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default EmojiStyleCapsule;
