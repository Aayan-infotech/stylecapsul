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

const stripePromise = loadStripe(
  "pk_test_51PqTR903ec58RCFWng6UUUnIZ8R0PmQZL1xVE5Wv6jUIAiS9dxzWobfK6oysU86LJmkvd9I2Adcbbv0jYqLkNcAp00hFGx4UKj"
);

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const location = useLocation();
  const userId = getCookie("userId");
  const { paymentDetailsWithaddressId } = location.state || {};
  console.log(paymentDetailsWithaddressId?.paymentDetails?.cartId, "");
  const token = getCookie("authToken");

  const handleStripePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      showErrorToast("Card Element is not available");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: "Customer Name",
      },
    });

    if (error) {
      showErrorToast("Payment failed: " + error.message);
      setPaymentStatus("Payment failed: " + error.message);
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        apiUrl("api/payment-method/create-payment"),
        {
          cartId: paymentDetailsWithaddressId?.paymentDetails?.cartId,
          user: userId,
          paymentDetails: {
            paymentMethodId: paymentMethod.id,
            totalAmount:
              paymentDetailsWithaddressId?.paymentDetails?.totalAmount,
            cartItems:
              paymentDetailsWithaddressId?.paymentDetails?.cartItems || [],
          },
          selectedAddressId: paymentDetailsWithaddressId?.selectedAddressId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const clientSecret = data.clientSecret;
      const { paymentIntent, error: stripeError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });
      if (stripeError) {
        showErrorToast("Payment failed: " + stripeError.message);
        setPaymentStatus("Payment failed: " + stripeError.message);
      } else if (paymentIntent.status === "succeeded") {
        showSuccessToast("Payment successful!");
        setPaymentStatus("Payment successful!");
        navigate("/thanku", { state: { paymentIntent } });
      }
    } catch (error) {
      showErrorToast("An error occurred during payment.");
      console.error("Error creating payment intent:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleStripePayment} className="mt-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-success mt-4"
      >
        {loading ? "Processing..." : "Pay with Card"}
      </button>
      {paymentStatus && <p className="mt-2">{paymentStatus}</p>}
    </form>
  );
};

const Payment = () => {
  const location = useLocation();
  const { paymentDetailsWithaddressId } = location.state || {};

  return (
    <div className="payment-container">
      <div className="container w-75 text-center">
        <h1 className="fw-bold text-center fs-1">Payment</h1>
        <Elements stripe={stripePromise}>
          <PaymentForm
            paymentDetailsWithaddressId={paymentDetailsWithaddressId}
          />
        </Elements>
        {/* PayPal Payment Button */}
        <div className="mt-3">
          <button
            type="button"
            className="btn method btn-outline-secondary rounded-pill p-3 w-75 text-start fw-bold text-black fs-5 me-4"
          >
            PayPal
          </button>
          <img src={paypal} height={30} alt="PayPal" />
        </div>
      </div>
    </div>
  );
};

export default Payment;
