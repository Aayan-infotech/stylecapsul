import React, { useState } from "react";
import "../../styles/Payment.scss";
import creditcard from "../../assets/payment/credit.png";
import paypal from "../../assets/payment/paypal.png";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";
import StripeCheckout from "react-stripe-checkout";


const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigate = useNavigate();

  const months = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    name: (index + 1).toString(),
  }));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, index) => currentYear + index);

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
    productName: "Casual Shirt",
    productPrice: "100",
    userId: "2032049832054",
    productId: "549834795"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value
      .replace(/\s/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      cardNumber: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://your-backend-domain.com/api/payment/credit-card",
        paymentInfo
      );
      if (response.data.success) {
        showSuccessToast('Payment successful!');
        navigate("/thanku");
      } else {
        showErrorToast(response.data.message || 'Payment failed.');
      }
    } catch (error) {
      console.error("Payment failed", error);
      showErrorToast(error.response?.data?.message || 'Payment failed.');
    }
  };

  const openCreditCardModal = () => {
    setSelectedMethod("credit");
  };

  const openPayPalModal = () => {
    setSelectedMethod("paypal");
  };

  const onToken = async (token) => {
    try {
      const response = await axios.post('/save-stripe-token', {
        token: token
      });
      const data = response.data;
      console.log(`We are in business, ${data.email}`);

    } catch (error) {
      console.log(error, 'Something went wrong');
    }
  };

  return (
    <div className="payment-container">
      <div className="container w-75 text-center">
        <h1 className="fw-bold text-center fs-1">Payment</h1>
        <StripeCheckout
          token={onToken}
          stripeKey="pk_test_51Q1PseGRhtXSqN5r6gIVupZtgmP6FK0qRafVle9JXGmAVmtGYbAhUhGY4Xgl3vhvuMTB8y9IvUA6HlevjftLCuCJ00ulU282LE"
          amount={5000} 
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
