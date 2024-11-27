import React from "react";

const ThankuPage = () => {
  return (
    <div className="thanku-container-page mb-5">
      <div
        className="container text-center"
        style={{ paddingTop: "6rem", display: "block" }}
      >
        <h1 className="display-4 fw-bold mt-2">Successful</h1>
        <div className="my-5">
          <i
            className="fa-solid fa-circle-check"
            style={{ fontSize: "6rem", color: "green" }}
          ></i>
        </div>
        <h2 className="fw-bold">Order Placed successfully!</h2>
        <p className="text-muted">You can track your order anytime.</p>
      </div>
    </div>
  );
};

export default ThankuPage;
