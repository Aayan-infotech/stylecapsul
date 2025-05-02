import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import profile from "./img/profile.png";
import vector from "./img/Vector.png";
import closet from "./img/closet.png";
import style from "./img/style.png";
import stylist from "./img/stylist.png";
import analysis from "./img/analysis.png";
import Loader from "../Loader/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const itemsLeft = [
    { link: "/profile", imgSrc: profile, text: "Profile" },
    { link: "/market-place", imgSrc: vector, text: "Market Place" },
    { link: "/closet-management", imgSrc: closet, text: "Closet Management" },
    { link: "/my-style-capsule", imgSrc: style, text: "My Style Capsule" },
    { link: "/stylist", imgSrc: stylist, text: "Stylist" },
    { link: "/analytics-insights", imgSrc: analysis, text: "Analysis & Insights", },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home-container-title">
          <div className="container text-center" style={{ maxWidth: "1025px" }}>
            <div className="row gy-4">
              <h2 className="fw-bold text-decoration-none">Home</h2>
              {itemsLeft.map((item, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4">
                  <div key={index} className="">
                    <Link to={item.link} className="text-decoration-none">
                      <div className="closet-management">
                        <div className="image">
                          <img src={item.imgSrc} alt={`${item.text} Icon`} className="img-fluid" />
                        </div>
                        <div className="home-title-content fw-bold">
                          {item.text}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
