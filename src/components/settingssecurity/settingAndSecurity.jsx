import React from "react";
import notification from "../../assets/images/notification.png";
import address from "../../assets/images/address.png";
import password from "../../assets/images/password.png";
import global from "../../assets/images/globe.png"

const cardData = [
  {
    id: 1,
    image: notification,
    title: "Notification",
    imageAlt: "Notification",
    imageStyle: { width: "50px", height: "45px" },
  },
  {
    id: 2,
    icon: null,
    title: "Address",
    image: address,
    imageAlt: "address",
    imageStyle: { width: "50px", height: "45px" },
  },
  {
    id: 3,
    image: global,
    title: "Language",
    imageAlt: "global",
    imageStyle: { width: "50px", height: "45px" },
  },
  {
    id: 4,
    image: password,
    title: "Password",
    imageAlt: "Password",
    imageStyle: { width: "50px", height: "45px" },
  },
];

const SettingAndSecurity = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{paddingTop:'6rem'}}>
      <div className="container" style={{ width: "700px" }}>
        <h1 className="text-center fw-bold fs-1">Settings & Security</h1>
        <div className="row mt-4">
          {cardData.map(({ id, icon, title, image, imageAlt, imageStyle }) => (
            <div
              key={id}
              className="col-md-6 col-lg-6 mb-4 d-flex justify-content-center"
            >
              <div
                className="card"
                style={{
                  width: "300px",
                  backgroundColor: "#4C4C4C",
                  color: "white",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                  {icon && (
                    <i className={`fs-2 fa-solid fa-regular ${icon} mb-4`}></i>
                  )}
                  {image && (
                    <img
                      src={image}
                      alt={imageAlt}
                      className="mb-4"
                      style={imageStyle}
                    />
                  )}
                  <h4 className="card-title fw-bold">{title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingAndSecurity;
