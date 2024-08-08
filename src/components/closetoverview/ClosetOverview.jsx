import React from "react";

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
      style={{ paddingTop: "6rem" }}>
      <div className="container w-50">
        <h1 className="text-center fw-bold fs-1">Closet Overview</h1>
        <div className="row gy-5 mt-2">
          {cardData.map((item, index) => (
            <div key={index} className="col-6">
              <div
                className="card"
                style={{
                  width: "300px",
                  height: "150px",
                  backgroundColor: "#C8B199",
                  color: "white",
                }}
              >
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
  );
};

export default ClosetOverview;
