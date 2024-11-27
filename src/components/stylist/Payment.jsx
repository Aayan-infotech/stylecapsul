import React, { useState } from "react";
import "../../styles/Payment.scss";
import creditcard from "../../assets/payment/credit.png";
import paypal from "../../assets/payment/paypal.png";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";
import StripeCheckout from "react-stripe-checkout";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";


const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const location = useLocation();
  const { paymentDetailsWithaddressId } = location.state || {};
  const userId = getCookie("userId");
  const navigate = useNavigate();
  console.log(paymentDetailsWithaddressId, userId, 'paymentDetailsWithaddressId')

  const openCreditCardModal = () => {
    setSelectedMethod("credit");
  };

  const openPayPalModal = () => {
    setSelectedMethod("paypal");
  };

  const onToken = async (token) => {
    try {
      const response = await axios.post("http://localhost:3000/api/payment-method/create-payment", {
        token,
        paymentDetails: paymentDetailsWithaddressId?.paymentDetails,
        selectedAddressId: paymentDetailsWithaddressId?.selectedAddressId,
      });
  
      if (response.data.success) {
        showSuccessToast("Payment successful!");
        navigate("/success", { state: { charge: response.data.charge } });
      } else {
        showErrorToast("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      showErrorToast("An error occurred. Please try again.");
    }
  };

  return (
    <div className="payment-container">
      <div className="container w-75 text-center">
        <h1 className="fw-bold text-center fs-1">Payment</h1>
        <StripeCheckout
          token={onToken}
          stripeKey="pk_test_51PqTR903ec58RCFWng6UUUnIZ8R0PmQZL1xVE5Wv6jUIAiS9dxzWobfK6oysU86LJmkvd9I2Adcbbv0jYqLkNcAp00hFGx4UKj"
          amount={paymentDetailsWithaddressId?.paymentDetails?.totalAmount} 
          name="Style Capsule"
          ComponentClass="div"
          image="https://www.shutterstock.com/image-vector/nature-capsule-vector-logo-template-600nw-2381326435.jpg"
          currency="USD"
        >
          <div className="mt-3">
            <button
              type="button"
              className="btn method btn-outline-secondary rounded-pill p-3 w-75 text-start fw-bold text-black fs-5 me-3"
              onClick={openCreditCardModal}
            >
              Credit Card
            </button>
            <img src={creditcard} height={30} alt="Credit Card" />
          </div>
        </StripeCheckout>

        {/* PayPal Button */}
        <div className="mt-3">
          <button
            type="button"
            className="btn method btn-outline-secondary rounded-pill p-3 w-75 text-start fw-bold text-black fs-5 me-4"
            onClick={openPayPalModal}
          >
            PayPal
          </button>
          <img src={paypal} height={30} alt="PayPal" />
        </div>
      </div>

      {/* PayPal Modal */}
      {selectedMethod === "paypal" && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          aria-labelledby="paypalModalLabel"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="paypalModalLabel">
                  PayPal Payment
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedMethod(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <PayPalScriptProvider options={{ clientId: "test" }}>
                  <PayPalButtons style={{ layout: "horizontal" }} />
                </PayPalScriptProvider>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Payment;
