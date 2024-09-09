import React from "react";
import "../../styles/Payment.scss";
import creditcard from "../../assets/payment/credit.png";
import paypal from "../../assets/payment/paypal.png";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate("/thanku");
  };

  return (
    <div className="payment-container">
      <div className="container w-75 text-center">
        <div className="row gx-5">
          <h1 className="fw-bold text-center fs-1">Payment</h1>

          <div className="col-12 d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 border method rounded-pill w-75 w-md-50 w-lg-50 me-3">
              <h5 className="fw-bold m-0">Credit Card</h5>
            </div>
            <img src={creditcard} height={30} alt="Credit Card" />
          </div>

          <div className="col-12 d-flex justify-content-center align-items-center mt-2">
            <div className="p-3 border method rounded-pill w-75 w-md-50 w-lg-50 fw-bold me-4">
              <h5 className="fw-bold m-0">Pay Pal</h5>
            </div>
            <img src={paypal} height={30} alt="PayPal" />
          </div>
        </div>
        <button onClick={handlePayment} className="pay-button mt-4">
          Pay
        </button>
      </div>
    </div>
  );
};

export default Payment;
