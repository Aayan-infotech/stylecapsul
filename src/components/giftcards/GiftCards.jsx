import React, { useEffect, useState } from "react";
import giftcard1 from "../../assets/giftcards/giftcard1.png";
import giftcard2 from "../../assets/giftcards/giftcard2.png";
import giftcard3 from "../../assets/giftcards/giftcard3.png";
import giftcard4 from "../../assets/giftcards/giftcard4.png";
import giftcard5 from "../../assets/giftcards/giftcard5.png";
import "../../styles/Giftcards.scss";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../../apiUtils";
import axios from "axios";

const giftCardData = [
  {
    id: 1,
    title: "One Family, Big Saving",
    description:
      "Postpaid at just ₹260/connection with Vi Family $1299/plan 300GB data, Disney+ Mobile, Amazon Prime & more.",
    buttonText: "Claim Now",
    imageUrl: giftcard1,
    altText: "Gift Card",
    iconClass: "fa-solid fa-arrow-right-long",
  },
  {
    id: 2,
    title: (
      <>
        Get upto 100 cashback*
        <br />
        in your Paypal Wallet
      </>
    ),
    description: "on transaction of ₹99 and above using Paypal UPI or Wallet",
    buttonText: "Claim Now",
    imageUrl: giftcard1,
    altText: "Gift Card",
    iconClass: "fa-solid fa-angles-right",
  },
  {
    id: 3,
    title: (
      <>
        Get assured cashback*
        <br /> up to ₹100
      </>
    ),
    description: "Offer valid on unlimited daily data packs starting ₹100",
    buttonText: "Claim Now",
    imageUrl: giftcard4,
    altText: "Gift Card",
    iconClass: "fa-solid fa-angles-right",
  },
  {
    id: 4,
    title: (
      <>
        Unlock a better *<br /> tomorrow
      </>
    ),
    description: "Get exclusive solutions to help you get ahead in life",
    buttonText: "Claim Now",
    imageUrl: giftcard3,
    altText: "Gift Card",
    iconClass: "fa-solid fa-angles-right",
  },
  {
    id: 5,
    title: (
      <>
        Get ₹200 off on your*
        <br /> first order
      </>
    ),
    description: "on transaction of ₹99 and above using Paypal UPI or Wallet",
    buttonText: "Claim Now",
    imageUrl: giftcard1,
    altText: "Gift Card",
    iconClass: "fa-solid fa-arrow-right-long",
  },
];

const GiftCards = () => {
  const [allGifts, setAllGifts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllGifts();
  }, []);

  const fetchAllGifts = async () => {
    try {
      const response = await axios.get(apiUrl('api/gifts/all'));
      setAllGifts(response?.data?.data)
    } catch (error) {
      console.log(error, 'sometning went wrong..!');
    }
  };
  
  const handleGiftCard = (giftId) => {
    navigate(`/gift-card-details/${giftId}`);
  }

  return (
    <div className="add-gift-cards">
      <div className="container">
        <div className="row g-2">
          <div className="col-12 d-flex justify-content-between align-items-center mt-4">
            <h1 className="fw-bold fs-1">Gift Cards</h1>
            <div className="search-history">
              <div className="search-box">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="rounded-pill"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          {allGifts?.map((card, index) => (
            <div key={index} className="col-12 col-md-4 position-relative" onClick={() => handleGiftCard(card?._id)}>
              {/* <Link to={`/gift-card-details/${card.id}`}> */}
              <img
                src={giftcard1}
                className="giftcard-1 img-fluid"
                alt={card.altText}
              />
              <div className="giftcard-content">
                <h5 className="card-title">{card?.giftTitle}</h5>
                <p className="card-text mt-3 w-75">{card?.giftDescription}</p>
                <button type="button" className="btn btn-dark">
                  Claim Now <i className="fa-solid fa-arrow-right-long"></i>
                </button>
              </div>
              {/* </Link> */}
            </div>
          ))}
          <div className="col-12 col-md-4 mx-lg-auto d-flex justify-content-center align-items-center">
            <div>
              <div className="outline-border">
                <button type="button" className="btn btn-dark gitcard-btn">
                  <i className="fs-1 fa-solid fa-chevron-right"></i>
                </button>
              </div>
              <h4 className="fw-bold">View More</h4>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default GiftCards;
