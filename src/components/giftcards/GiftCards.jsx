import React from "react";
import giftcard1 from "../../assets/giftcards/giftcard1.png";
import giftcard2 from "../../assets/giftcards/giftcard2.png";
import giftcard3 from "../../assets/giftcards/giftcard3.png";
import giftcard4 from "../../assets/giftcards/giftcard4.png";
import giftcard5 from "../../assets/giftcards/giftcard5.png";
import "../../styles/Giftcards.css";

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
  return (
    <div className="d-flex justify-content-center align-items-center add-clothes-card">
      <div className="container p-4">
        <div className="row gx-5 ">
          <div className="col-12 col-md-6">
            <h1 className="fw-bold fs-1">Gift Cards</h1>
          </div>
          <div className="col-12 col-md-6">
            <div className="order-history">
              <div className="search-box">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="rounded-pill"
                  placeholder="Search"
                />
                <i className="fa-solid fa-sliders"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="row gy-5 mt-1">
          {giftCardData.map((card) => (
            <div key={card.id} className="col-12 col-md-4 position-relative">
              <img
                src={card.imageUrl}
                className="giftcard-1 img-fluid"
                alt={card.altText}
              />
              <div className="giftcard-content">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text mt-3 w-75">{card.description}</p>
                <button type="button" className="btn btn-dark mt-4">
                  {card.buttonText} <i className={card.iconClass}></i>
                </button>
              </div>
            </div>
          ))}
          <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
            <div>
              <div className="outline-border">
                <button type="button" className="btn btn-dark gitcard-btn">
                  <i className="fs-1 fa-solid fa-chevron-right"></i>
                </button>
              </div>
              <h4 className="mt-2">View More</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCards;
