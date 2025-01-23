import React, { useState } from "react";
// import "./Checkout.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

function CheckoutForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const cardElementStyle = {
    base: {
      color: "#000",
      fontSize: "16px",
      padding: "8px 12px",
      border: "1px solid #444",
      "::placeholder": {
        color: "#aaa",
      },
    },
    invalid: {
      color: "#FF0000",
    },
    focus: {
      borderColor: "#007bff",
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setSuccess(false);

    const cardNumber = elements.getElement(CardNumberElement);

    if (!cardNumber) {
      showErrorToast("Please fill out all fields")
      setLoading(false);
      return;
    }

    try {
      const { token, error } = await stripe.createToken(cardNumber);
      console.log(token, 'abinsh')
    //   if (error) {
    //     toast.error(error.message);
    //     setLoading(false);
    //   } else {
    //     // const totalAmount = bookingData.totalAmount.replace("$", "");
    //     // const amount = parseFloat(totalAmount);
    //     const response = await axios.post(
    //       "http://44.196.64.110:8000/booking/payment",
    //       {
    //         token: token.id,
    //         amount: 2000,
    //         // userId: bookingData.userId,
    //         // bookingId: bookingData._id,
    //         // vendorId: bookingData.vendorId,
    //       }
    //     );

    //     if (response.data.status === 200) {
    //       showSuccessToast(response.data.message);
    //       setSuccess(true);
    //       setTimeout(() => {
    //         navigate("/success");
    //       }, 2000);
    //     } else {
    //       showErrorToast(response.data.message);
    //       setLoading(false);
    //     }
    //   }
    } catch (error) {
      showErrorToast(error.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="checkout">
      <div className="checkout-container container mt-5">
        <form onSubmit={handleSubmit} className="w-50 mx-auto text-center">
          {/* Card Number */}
          <div className="form-group text-start">
            <label htmlFor="cardNumber" className="mb-2">
              Card Number
            </label>
            <div className="input-field p-2 border rounded">
              <CardNumberElement id="cardNumber" options={cardElementStyle} />
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <div className="form-group w-50 me-2 text-start">
              <label htmlFor="cardExpiry" className="mb-2">
                Expiry
              </label>
              <div className="input-field p-2 border rounded">
                <CardExpiryElement id="cardExpiry" options={cardElementStyle} />
              </div>
            </div>
            <div className="form-group w-50 ms-2 text-start">
              <label htmlFor="cardCvc" className="mb-2">
                CVC
              </label>
              <div className="input-field p-2 border rounded">
                <CardCvcElement id="cardCvc" options={cardElementStyle} />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-4 w-100"
            disabled={loading || !stripe}
          >
            {loading ? "Processing..." : "Submit $2000"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
