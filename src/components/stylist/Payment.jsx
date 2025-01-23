import React, { useState } from "react";
import "../../styles/Payment.scss";
import paypal from "../../assets/payment/paypal.png";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";
import { apiUrl } from "../../../apiUtils";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const location = useLocation();
  const [btnLoader, setBtnLoader] = useState(false);
  const { paymentDetailsWithaddressId } = location.state || {};
  console.log(paymentDetailsWithaddressId, 'paymentDetailsWithaddressId')
  const navigate = useNavigate();
  const token = getCookie("authToken");

  const handleButtonClick = async (setBtnLoader, navigate) => {
    setBtnLoader(true);
    await makePayment(navigate);
    setBtnLoader(false);
  };

  const makePayment = async (navigate) => {
    const stripe = await loadStripe(
      "pk_test_51PqTR903ec58RCFWng6UUUnIZ8R0PmQZL1xVE5Wv6jUIAiS9dxzWobfK6oysU86LJmkvd9I2Adcbbv0jYqLkNcAp00hFGx4UKj"
    );
  
    const paymentDetails = {
      totalAmount: paymentDetailsWithaddressId?.paymentDetails?.totalAmount || 0,
      totalQuantity: paymentDetailsWithaddressId?.paymentDetails?.totalQuantity || 0,
      discount: paymentDetailsWithaddressId?.paymentDetails?.discount || 0,
      deliveryCharges: paymentDetailsWithaddressId?.paymentDetails?.deliveryCharges || 0,
      allCartDetails: paymentDetailsWithaddressId?.allCartDetails || [], // Include allCartDetails to match backend structure
    };
  
    try {
      const response = await axios.post(
        apiUrl("api/payment-method/createpaymenttestofredirectonstripe"),
        { paymentDetails }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      const { id: sessionId } = response.data;
      const result = await stripe.redirectToCheckout({
        sessionId,
      });
      if (result.error) {
        console.error(result.error.message);
      } else {
        navigate("/thanku", { state: { sessionId } });
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };
  

  return (
    <div className="payment-container">
      <div className="container w-75 text-center">
        <h1 className="fw-bold text-center fs-1 mb-4">Payment</h1>
        <div className="row gx-5">
          <div className="col">
            <button
              type="button"
              onClick={() => handleButtonClick(setBtnLoader, navigate)}
              className="btn btn-dark w-100 p-3 fw-bold fs-4 rounded-pill"
            >
              {btnLoader ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin me-2"></i>{" "}
                  Waiting...
                </>
              ) : (
                "Checkout"
              )}
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-light w-100 p-3 fw-bold fs-4 rounded-pill"
            >
              By PayPal&nbsp;&nbsp;
              <img src={paypal} height={30} alt="PayPal" />
            </button>
          </div>
        </div>
        {/* <Elements stripe={stripePromise}>
          <PaymentForm
            paymentDetailsWithaddressId={paymentDetailsWithaddressId}
          />
        </Elements> */}
      </div>
    </div>
  );
};

export default Payment;
