import React from "react";
import "../../styles/ClosetOverview.scss";

const cardData = [
  {
    id: 1,
    noOfCloset: 100,
    title: "Total Items in closet",
  },
  {
    id: 2,
    noOfCloset: 100,
    title: "Total Items in closet",
  },
  {
    id: 3,
    noOfCloset: 100,
    title: "Total Items in closet",
  },
  {
    id: 4,
    noOfCloset: 100,
    title: "Total Items in closet",
  },
];

const ClosetOverview = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center closet-overview"
      style={{ padding: "12rem 0 6rem 0" }}
    >
      <div className="container w-50">
        <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center">
        <h1 className="text-center fw-bold fs-1">Closet Overview</h1>
        <div className="row g-4 mt-2">
          {cardData.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-6 d-flex justify-content-center align-items-center">
              <div className="card">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <div>
                    <h2>{item.noOfCloset}</h2>
                    <h5 className="card-title fw-bold mt-4">{item.title}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ClosetOverview;
