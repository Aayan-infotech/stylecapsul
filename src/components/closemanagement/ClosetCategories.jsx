import React from "react";
import notification from "../../assets/closetmanagement/Group 1806.png";
import closet from "../../assets/closetmanagement/closet.png";
import coinhand from "../../assets/closetmanagement/coin-hand.png";
import imagefocus from "../../assets/closetmanagement/image-focus.png";
import { Link } from "react-router-dom";
import '../../styles/closetManagement.scss'
import { useSelector } from "react-redux";

const cardData = [
  {
    id: 1,
    image: notification,
    title: "Clothes",
    imageAlt: "Notification",
    imageStyle: { width: "50px", height: "45px" },
    url: "/all-clothes-list",
    // url: "/clothes-list/clothes",
  },
  {
    id: 2,
    icon: null,
    title: "Shoes",
    image: closet,
    imageAlt: "closet",
    imageStyle: { width: "50px", height: "45px" },
    url: "#",
  },
  {
    id: 3,
    icon: null,
    title: "Accessories",
    image: coinhand,
    imageAlt: "coinhand",
    imageStyle: { width: "50px", height: "45px" },
    url: "/accessories",
  },
  {
    id: 4,
    image: imagefocus,
    title: "Miscellaneous",
    imageAlt: "imagefocus",
    imageStyle: { width: "50px", height: "45px" },
    url: "#",
  },
];

const ClosetCategories = () => {
  const { clothes, status } = useSelector((state) => state.clothes);
  console.log(clothes, 'clothes')

  const handleSelectCategoryType = (item) => {
    console.log(item, 'item')
  }
  
  return (
    <div className="d-flex justify-content-center align-items-center close-management-container">
      <div className="container w-50">
        <div className="row g-4">
          <h1 className="text-center fw-bold fs-1">Closet</h1>
          {cardData.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-6" onClick={() => handleSelectCategoryType(item)}>
              <Link to={item.url} className="text-decoration-none">
                <div className="card text-white w-100" style={{ backgroundColor: "#4C4C4C" }}>
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                    {item.image && (
                      <img src={item.image} alt={item.imageAlt} className="mb-4" style={item.imageStyle} />
                    )}
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

export default ClosetCategories;
