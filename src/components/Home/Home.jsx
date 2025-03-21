import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import profile from "./img/profile.png";
import vector from "./img/Vector.png";
// import marketrate from "./img/market-rate.png";
// import trendingUpIcon from "@mui/icons-material/TrendingUp";
import closet from "./img/closet.png";
import style from "./img/style.png";
import stylist from "./img/stylist.png";
import analysis from "./img/analysis.png";
import Loader from "../Loader/Loader";
import blank_img from "../../assets/stylist/blank_img.jpg";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const itemsLeft = [
    { link: "/profile", imgSrc: profile, text: "Profile" },
    { link: "/market-place", imgSrc: vector, text: "Market Place" },
    { link: "/closet-management", imgSrc: closet, text: "Closet Management" },
    { link: "/my-style-capsule", imgSrc: style, text: "My Style Capsule" },
    { link: "/stylist", imgSrc: stylist, text: "Stylist" },
    {
      link: "/analytics-insights",
      imgSrc: analysis,
      text: "Analysis & Insights",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    // <>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    //     <div className="home-container-title">
    //       <div className="container text-center">
    //         <div className="row gy-4">
    //           <h3 className="fw-bold text-decoration-underline">Home</h3>
    //           {itemsLeft?.map((item, index) => (
    //             <div className="col-12 col-md-6">
    //               <Link to={item.link} className="text-decoration-none">
    //                 <div className="closet-management">
    //                   <div className="image">
    //                     <img
    //                       src={item.imgSrc || blank_img}
    //                       className="img-fluid"
    //                     />
    //                   </div>
    //                   <div className="home-title-content fw-bold">
    //                     {item?.text}
    //                   </div>
    //                 </div>
    //               </Link>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </>
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home-container-title">
          <div className="container text-center" style={{ maxWidth: "1025px" }}>
            <div className="row gy-4">
              <h3 className="fw-bold text-decoration-underline">Home</h3>
              {itemsLeft.map((item, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4">
                  <Link to={item.link} className="text-decoration-none">
                    <div className="closet-management">
                      <div className="image">
                        <img
                          src={item.imgSrc}
                          alt={`${item.text} Icon`}
                          className="img-fluid"
                        />
                      </div>
                      <div className="home-title-content fw-bold">
                        {item.text}
                      </div>
                    </div>
                  </Link>
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
