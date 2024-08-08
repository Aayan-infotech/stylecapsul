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
    title: "Add Clothes",
    imageAlt: "Notification",
    imageStyle: { width: "50px", height: "45px" },
    url: "/add-clothes",
  },
  {
    id: 2,
    icon: null,
    title: "Closet",
    image: closet,
    imageAlt: "closet",
    imageStyle: { width: "50px", height: "45px" },
    url: "/closet",
  },
  {
    id: 3,
    icon: null,
    title: "Garment Care",
    image: coinhand,
    imageAlt: "coinhand",
    imageStyle: { width: "50px", height: "45px" },
    url: "#",
  },
  {
    id: 4,
    image: imagefocus,
    title: "StyleScan",
    imageAlt: "imagefocus",
    imageStyle: { width: "50px", height: "45px" },
    url: "#",
  },
];

const ClosetManagement = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ paddingTop: "6rem" }}
    >
      <div className="container" style={{ width: "700px" }}>
        <h1 className="text-center fw-bold fs-1">Closet Management</h1>
        <div className="row mt-4">
          {cardData.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-6 mb-4 d-flex justify-content-center">
              <Link to={item.url} style={{ textDecoration: "none" }}>
                <div className="card" style={{ width: "300px", backgroundColor: "#4C4C4C", color: "white", }}>
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                    {item.image && (
                      <img src={item.image} alt={item.imageAlt} className="mb-4" style={item.imageStyle} />)}
                    <h4 className="card-title fw-bold">{item.title}</h4>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClosetManagement;
