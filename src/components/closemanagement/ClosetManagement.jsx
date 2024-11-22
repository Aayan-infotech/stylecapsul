import React from "react";
import notification from "../../assets/closetmanagement/Group 1806.png";
import closet from "../../assets/closetmanagement/closet.png";
import coinhand from "../../assets/closetmanagement/coin-hand.png";
import imagefocus from "../../assets/closetmanagement/image-focus.png";
import { Link } from "react-router-dom";
import "../../styles/closetManagement.scss";

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
    url: "/closet-categories",
  },
  {
    id: 3,
    icon: null,
    title: "Garment Care",
    image: coinhand,
    imageAlt: "coinhand",
    imageStyle: { width: "50px", height: "45px" },
    url: "/garment-care",
  },
  {
    id: 4,
    image: imagefocus,
    title: "StyleScan",
    imageAlt: "imagefocus",
    imageStyle: { width: "50px", height: "45px" },
    url: "/close-management_style_scan",
  },
];

const ClosetManagement = () => {
  return (
    <div className="closet-management-container">
      <div className="text-center">
        <h1 className="text-center fw-bold fs-1">Closet Management</h1>
        <div className="container p-3 text-center w-50 pt-0">
          <div className="row g-3 m-0">
            {cardData.map((item, index) => (
              <div key={index} className="col-12 col-md-6 col-md-4">
                <Link to={item.url} className="text-decoration-none text-white">
                  <div className="p-4 rounded-2" style={{ backgroundColor: "#4C4C4C" }}>
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
    </div>
  );
};

export default ClosetManagement;
