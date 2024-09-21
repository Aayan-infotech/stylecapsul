import React, { useState } from "react";
import "../../styles/Payment.scss";
import creditcard from "../../assets/payment/credit.png";
import paypal from "../../assets/payment/paypal.png";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigate = useNavigate();

  const months = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    name: (index + 1).toString(),
  }));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, index) => currentYear + index);

  const handlePaymentSuccess = () => {
    navigate("/thanku");
  };

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
    productName: "Casual Shirt", 
    productPrice: "100",
    userId:"2032049832054",
    productId:"549834795"        
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
        "YOUR_CREDIT_CARD_API_ENDPOINT",
        paymentInfo
      );
      showSuccessToast('error')
      if (response.data.success) {
        navigate("/thanku");
      }
    } catch (error) {
      console.error("Payment failed", error);
      showErrorToast('error')
    }
  };

  const openCreditCardModal = () => {
    setSelectedMethod("credit");
  };

  const openPayPalModal = () => {
    setSelectedMethod("paypal");
  };

  return (
    <div className="payment-container">
      <div className="container w-75 text-center">
        <h1 className="fw-bold text-center fs-1">Payment</h1>
        {/* Credit Card Button */}
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

      {/* Credit Card Modal */}
      {selectedMethod === "credit" && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          aria-labelledby="creditCardModalLabel"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="creditCardModalLabel">
                  Credit Card Payment
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedMethod(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="text-start" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={handleCardNumberChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cardHolder" className="form-label">
                      Card Holder's Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardHolder"
                      name="cardHolder"
                      placeholder="Holder name"
                      value={paymentInfo.cardHolder}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="me-3 w-100">
                      <label htmlFor="expirationMonth" className="form-label">
                        Month
                      </label>
                      <select
                        className="form-select"
                        id="expirationMonth"
                        name="expirationMonth"
                        onChange={handleInputChange}
                      >
                        <option selected disabled>
                          Month
                        </option>
                        {months.map((month) => (
                          <option key={month.value} value={month.value}>
                            {month.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="me-3 w-100">
                      <label htmlFor="expirationYear" className="form-label">
                        Year
                      </label>
                      <select
                        className="form-select"
                        id="expirationYear"
                        name="expirationYear"
                        onChange={handleInputChange}
                      >
                        <option selected disabled>
                          Year
                        </option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-100">
                      <label htmlFor="cvv" className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="cvv"
                        placeholder="CVV"
                        maxLength="4"
                        value={paymentInfo.cvv}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="text-center"></div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn rounded-pill text-white"
                      style={{ backgroundColor: "black" }}
                    >
                      Pay with Credit Card
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

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
