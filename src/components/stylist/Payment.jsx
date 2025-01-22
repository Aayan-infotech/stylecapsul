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
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51PqTR903ec58RCFWng6UUUnIZ8R0PmQZL1xVE5Wv6jUIAiS9dxzWobfK6oysU86LJmkvd9I2Adcbbv0jYqLkNcAp00hFGx4UKj"
);

// const PaymentForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState("");

//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const location = useLocation();
//   const userId = getCookie("userId");
//   const { paymentDetailsWithaddressId } = location.state || {};
//   const token = getCookie("authToken");

//   const handleStripePayment = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     if (!cardElement) {
//       showErrorToast("Card Element is not available");
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//       billing_details: {
//         name: "Customer Name",
//       },
//     });

//     if (error) {
//       showErrorToast("Payment failed: " + error.message);
//       setPaymentStatus("Payment failed: " + error.message);
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data } = await axios.post(
//         apiUrl("api/payment-method/create-payment"),
//         {
//           cartId: paymentDetailsWithaddressId?.paymentDetails?.cartId,
//           user: userId,
//           paymentDetails: {
//             paymentMethodId: paymentMethod.id,
//             totalAmount:
//               paymentDetailsWithaddressId?.paymentDetails?.totalAmount,
//             cartItems:
//               paymentDetailsWithaddressId?.paymentDetails?.cartItems || [],
//           },
//           selectedAddressId: paymentDetailsWithaddressId?.selectedAddressId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const clientSecret = data.clientSecret;
//       const { paymentIntent, error: stripeError } =
//         await stripe.confirmCardPayment(clientSecret, {
//           payment_method: paymentMethod.id,
//         });
//       if (stripeError) {
//         showErrorToast("Payment failed: " + stripeError.message);
//         setPaymentStatus("Payment failed: " + stripeError.message);
//       } else if (paymentIntent.status === "succeeded") {
//         showSuccessToast("Payment successful!");
//         setPaymentStatus("Payment successful!");
//         navigate("/thanku", { state: { paymentIntent } });
//       }
//     } catch (error) {
//       showErrorToast("An error occurred during payment.");
//       console.error("Error creating payment intent:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleStripePayment} className="mt-4">
//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: "16px",
//               color: "#424770",
//               "::placeholder": { color: "#aab7c4" },
//             },
//             invalid: { color: "#9e2146" },
//           },
//         }}
//       />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="btn btn-success mt-4"
//       >
//         {loading ? "Processing..." : "Pay with Card"}
//       </button>
//       {paymentStatus && <p className="mt-2">{paymentStatus}</p>}
//     </form>
//   );
// };

const Payment = () => {
  const location = useLocation();
  const [btnLoader, setBtnLoader] = useState(false);
  const { paymentDetailsWithaddressId } = location.state || {};
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
