// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import profile from "./img/profile.png";
import market from "./img/market.png";
import closet from "./img/closet.png";
import style from "./img/style.png";
import stylist from "./img/stylist.png";
import analysis from "./img/analysis.png";

const Home = () => {

  const itemsLeft = [
    { link: "/profile", imgSrc: profile, text: "Profile" },
    { link: "/closet-management", imgSrc: closet, text: "Closet Management" },
    { link: "/stylist", imgSrc: stylist, text: "Stylist" },
    { link: "/market-place", imgSrc: market, text: "Market Place" },
    { link: "/my-style-capsule", imgSrc: style, text: "My Style Capsule" },
    { link: "/analytics-insights", imgSrc: analysis, text: "Analysis & Insights" },
  ];

  return (
    <>
      <div className="home-container-title">
        <div className="container text-center">
          <h4 className="fw-bold text-decoration-underline">Home</h4>
          <div className="row gx-5">
            {itemsLeft.map((item, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <Link to={item.link} className="text-decoration-none">
                  <div className="closet-management">
                    <div className="image">
                      <img src={item.imgSrc} alt={`${item.text} Icon`} className="img-fluid" />
                    </div>
                    <div className="home-title-content fw-bold">{item.text}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="home">
        <div className="center">
          <p>Home</p>
        </div>
        <div className="home-row">
          <div className="left">
            {itemsLeft.map((item, index) => (
              <Link key={index} to={item.link} className="text-decoration-none">
                <div className="closet-management">
                  <div className="image">
                    <img src={item.imgSrc} alt={`${item.text} Icon`} />
                  </div>
                  <div className="text fw-bold">{item.text}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="right">
            {itemsRight.map((item, index) => (
              <Link key={index} to={item.link} className="text-decoration-none">
                <div className="closet-management">
                  <div className="image">
                    <img src={item.imgSrc} alt={`${item.text} Icon`} />
                  </div>
                  <div className="text fw-bold">{item.text}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Home;
