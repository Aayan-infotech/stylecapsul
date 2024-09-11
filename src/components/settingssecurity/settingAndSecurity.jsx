import React from "react";
import notification from "../../assets/images/notification.png";
import address from "../../assets/images/address.png";
import password from "../../assets/images/password.png";
import global from "../../assets/images/globe.png";
import { Link } from "react-router-dom";

const securityData = [
  {
    id: 1,
    image: notification,
    title: "Notification",
    imageAlt: "Notification",
    imageStyle: { width: "50px", height: "45px" },
    url: "#",
  },
  {
    id: 2,
    icon: null,
    title: "Address",
    image: address,
    imageAlt: "address",
    imageStyle: { width: "50px", height: "45px" },
    url: "#",
  },
  {
    id: 3,
    image: global,
    title: "Language",
    imageAlt: "global",
    imageStyle: { width: "50px", height: "45px" },
    url: "#",
  },
  {
    id: 4,
    image: password,
    title: "Password",
    imageAlt: "Password",
    imageStyle: { width: "50px", height: "45px" },
    url: "/change-password",
  },
];

const SettingAndSecurity = () => {
  return (
    <div className="align-items-center" style={{ paddingTop: "6rem" }}>
      <div className="container w-50" style={{ display: "block" }}>
        <div className="row m-0 g-2">
          <h1 className="text-center fw-bold fs-1">Settings & Security</h1>
          {securityData?.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-6" key={index}>
              <Link to={item?.url} className="text-decoration-none text-white w-100">
                <div className="card" style={{ height: "150px", backgroundColor: "#4C4C4C", }}>
                  <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    {item?.icon && (
                      <i
                        className={`fs-2 fa-solid fa-regular ${item?.icon} mb-2`}
                      ></i>
                    )}
                    {item?.image && (
                      <img
                        src={item?.image}
                        alt={item?.imageAlt}
                        className="mb-2"
                        style={item?.imageStyle}
                      />
                    )}
                    <h4 className="card-title fw-bold text-white">{item?.title}</h4>
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

export default SettingAndSecurity;
