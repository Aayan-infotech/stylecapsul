import React from "react";
import image1 from "../../assets/stylist/img1.png";
import image2 from "../../assets/stylist/img2.png";
import image3 from "../../assets/stylist/img3.png";
import image4 from "../../assets/stylist/img4.png";
import image5 from "../../assets/stylist/img5.png";
import image6 from "../../assets/stylist/img6.png";
import "../../styles/Stylist.scss";

const stylists = [
  { name: "John", experience: "5+ Years of experience", image: image1 },
  { name: "Doe", experience: "3+ Years of experience", image: image2 },
  { name: "Abinash", experience: "5+ Years of experience", image: image3 },
  { name: "Atul", experience: "3+ Years of experience", image: image4 },
  { name: "Ujjwal", experience: "5+ Years of experience", image: image5 },
  { name: "Abhishek", experience: "3+ Years of experience", image: image6 },
];

const Stylist = () => {
  return (
    <div className="d-flex justify-content-center align-items-center add-clothes-card">
      <div className="container w-75 p-4">
        <div className="row gx-5">
          <div className="col-12 col-md-6">
            <h1 className="fw-bold fs-1">Stylist</h1>
          </div>
          <div className="col-12 col-md-6">
            <div className="styliset-search">
              <div className="search-box">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="rounded-pill"
                  placeholder="Search"
                />
                <i className="fa-solid fa-sliders"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          {stylists.map((stylist, index) => (
            <div className="col-12 mt-3" key={index}>
              <div
                className="d-flex rounded-pill"
                style={{ backgroundColor: "#4C4C4C" }}
              >
                <div className="me-2">
                  <img
                    className="image-rounded"
                    src={stylist.image}
                    height={120}
                    width={150}
                    alt="Stylist"
                  />
                </div>
                <div className="p-2 text-white">
                  <h6>{stylist.name}</h6>
                  <h6>Outfit Planning</h6>
                  <h6 className="mt-4">{stylist.experience}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stylist;
