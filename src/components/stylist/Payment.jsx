import React from "react";
import "../../styles/Payment.scss";
import creditcard from "../../assets/payment/credit.png";
import paypal from "../../assets/payment/paypal.png";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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
          <PayPalScriptProvider options={{ clientId: "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
          </PayPalScriptProvider>
          <div className="col-12 d-flex justify-content-center align-items-center mt-3">
            <button type="button" class="btn method btn-outline-secondary rounded-pill p-3 w-75 text-start fw-bold text-black fs-5 me-3">Credit Card</button>
            <img src={creditcard} height={30} alt="Credit Card" />
          </div>
          <div className="col-12 d-flex justify-content-center align-items-center mt-3">
            <button type="button" class="btn method btn-outline-secondary rounded-pill p-3 w-75 text-start fw-bold text-black fs-5 me-4">
              Pay Pal
            </button>
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
