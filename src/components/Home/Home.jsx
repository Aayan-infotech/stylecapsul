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
    { link: "/closetManagement", imgSrc: closet, text: "Closet Management" },
    { link: "#", imgSrc: stylist, text: "Stylist" },
  ];

  const itemsRight = [
    { link: "/market-place", imgSrc: market, text: "Market Place" },
    { link: "/myStyle-capsule", imgSrc: style, text: "My Style Capsule" },
    { link: "#", imgSrc: analysis, text: "Analysis & Insights"},
  ];

  return (
    <div className="home">
      <div className="center">
        <p>Home</p>
      </div>
      <div className="home-row">
        <div className="left">
          {itemsLeft.map((item, index) => (
            <Link key={index} to={item.link} style={{ textDecoration: "none" }}>
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
            <Link key={index} to={item.link} style={{ textDecoration: "none" }}>
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
    </div>
  );
};

export default Home;
