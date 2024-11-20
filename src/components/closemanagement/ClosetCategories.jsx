import React from "react";
import notification from "../../assets/closetmanagement/Group 1806.png";
import closet from "../../assets/closetmanagement/closet.png";
import coinhand from "../../assets/closetmanagement/coin-hand.png";
import imagefocus from "../../assets/closetmanagement/image-focus.png";
import { Link } from "react-router-dom";

const cardData = [
  {
    id: 1,
    image: notification,
    title: "Clothes",
    imageAlt: "Notification",
    imageStyle: { width: "50px", height: "45px" },
    url: "/all-clothes-list/clothes",
  },
  {
    id: 2,
    image: closet,
    title: "Shoes",
    imageAlt: "closet",
    imageStyle: { width: "50px", height: "45px" },
    url: "/all-clothes-list/shoes",
  },
  {
    id: 3,
    image: coinhand,
    title: "Accessories",
    imageAlt: "coinhand",
    imageStyle: { width: "50px", height: "45px" },
    url: "/all-clothes-list/accessories",
  },
  {
    id: 4,
    image: imagefocus,
    title: "Miscellaneous",
    imageAlt: "imagefocus",
    imageStyle: { width: "50px", height: "45px" },
    url: "/all-clothes-list/miscellaneous",
  },
];
  
const ClosetCategories = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ paddingTop: "6rem" }}
    >
      <div className="container d-block w-50">
        <h1 className="text-center fw-bold fs-1">Details</h1>
        <div className="row g-3 m-0">
          {cardData.map((item, index) => (
            <div className="col-md-6" key={index}>
              <Link to={item.url} className="text-decoration-none">
                <div className="p-4 bg-secondary text-white text-center rounded">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="mb-4"
                      style={item.imageStyle}
                    />
                  )}
                  <h4 className="card-title fw-bold">{item.title}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClosetCategories;
