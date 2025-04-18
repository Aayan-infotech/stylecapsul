import React, { useState } from "react";
import "../../styles/Payment.scss";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";
import { apiUrl } from "../../../apiUtils";

const Payment = () => {
  const location = useLocation();
  const [btnLoader, setBtnLoader] = useState(false);
  const { paymentDetailsWithaddressId, buyNowDetails } = location.state || {};
  const navigate = useNavigate();
  const token = getCookie("authToken");
  const userId = getCookie("userId");

  const handleButtonClick = async (setBtnLoader, navigate) => {
    setBtnLoader(true);
    if (buyNowDetails) {
      await handleBuyNowPayment();
    } else if (paymentDetailsWithaddressId) {
      await makePayment(navigate);
    }
    setBtnLoader(false);
  };

  const handleBuyNowPayment = async () => {
    const product = buyNowDetails?.subcategoryDetails;
    const payload = {
      userId,
      selectedAddressId: buyNowDetails?.selectedAddressId,
      productDetails: {
        productId: product?.id,
        name: product?.name,
        price: Number(product?.price),
        quantity: Number(product?.quantity),
      },
    };
    try {
      const response = await axios.post("http://localhost:3555/api/payment-method/create-buynow-payment", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data?.session?.url) {
        window.location.href = response.data.session.url;
      } else {
        throw new Error("Failed to get session URL");
      }
    } catch (error) {
      console.error("Buy Now Payment Error:", error);
      alert("An error occurred during Buy Now payment.");
    }
  };

  const makePayment = async (navigate) => {
    const paymentDetails = {
      totalAmount: paymentDetailsWithaddressId?.paymentDetails?.totalAmount || 0,
      totalQuantity: paymentDetailsWithaddressId?.paymentDetails?.totalQuantity || 0,
      discount: paymentDetailsWithaddressId?.paymentDetails?.discount || 0,
      deliveryCharges: paymentDetailsWithaddressId?.paymentDetails?.deliveryCharges || 0,
      allCartDetails: paymentDetailsWithaddressId?.allCartDetails || [],
    };
    try {
      const response = await axios.post(
        apiUrl("api/payment-method/createpaymenttestofredirectonstripe"),
        { paymentDetails },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (response.data && response.data.session.url) {
        window.location.href = response.data.session.url;
      } else {
        throw new Error("Failed to get session URL");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("An error occurred, please try again.");
    }
  };

  return (
    <div className="payment-container">
      <div className="container w-75 text-center">
        <h1 className="fw-bold text-center fs-1 mb-4">Payment</h1>
        <div className="row gx-5">
          <div className="col-12">
            <button
              type="button"
              onClick={() => handleButtonClick(setBtnLoader, navigate)}
              className="btn btn-dark w-50 p-3 fw-bold fs-4 rounded-pill"
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
        </div>
      </div>
    </div>
  );
};

export default Payment;
