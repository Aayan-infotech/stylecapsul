// src/components/cart/Cart.jsx

import React from "react";
import "../../styles/Cart.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from "../../reduxToolkit/addcartSlice"; // Import Redux actions

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (total, item) => total + item?.price * item?.quantity,
    0
  );
  const discount = 4;
  const deliveryCharges = 2;
  const total = subtotal - discount + deliveryCharges;

  const handleIncrease = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.id));
    }
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div className="cart-container">
      <div className="container" style={{ display: "block" }}>
        <div className="row">
          <h1 className="text-center fw-bold fs-1 mb-4">Cart</h1>
          {cartItems.length === 0 ? (
            <div className="text-center mt-5">
              <h3>No cart available</h3>
            </div>
          ) : (
            <>
              <div className="col-md-6 buy-cart-list mt-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item d-flex align-items-center mb-2 mt-3 rounded-pill px-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-details ml-3">
                      <h5>{item.name}</h5>
                      <p className="text-black fw-bold">
                        Order ID - {item.orderId}
                      </p>
                      <p>{item.date}</p>
                      <div className="d-flex align-items-center">
                        <p className="text-black fw-bold me-5">
                          ${item?.price}
                        </p>
                        <div className="quantity-controls d-flex align-items-center">
                          <button
                            type="button"
                            className="btn btn-dark rounded-pill"
                            onClick={() => handleDecrease(item)}
                            style={{
                              fontSize: "10px",
                              backgroundColor: "black",
                            }}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <span className="quantity mx-3">
                            {item.quantity < 10
                              ? `0${item.quantity}`
                              : item.quantity}
                          </span>
                          <button
                            type="button"
                            className="btn btn-dark rounded-pill"
                            onClick={() => handleIncrease(item)}
                            style={{
                              fontSize: "10px",
                              backgroundColor: "black",
                            }}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-dark rounded-pill remove-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <div className="order-summary-container rounded">
                  <div className="order-summary-card">
                    <h3 className="order-summary-title">Order Summary</h3>
                    <div className="order-summary-details">
                      <div className="summary-item">
                        <span>Items</span>
                        <span>{cartItems?.length}</span>
                      </div>
                      <div className="summary-item">
                        <span>Subtotal</span>
                        <span>${subtotal}</span>
                      </div>
                      <div className="summary-item">
                        <span>Discount</span>
                        <span>${discount}</span>
                      </div>
                      <div className="summary-item">
                        <span>Delivery Charges</span>
                        <span>${deliveryCharges}</span>
                      </div>
                      <hr />
                      <div className="summary-item total">
                        <span>Total</span>
                        <span>${total}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="/address">
                  <button
                    type="button"
                    className="btn btn-dark w-100 rounded-pill p-3 mt-3"
                    style={{ backgroundColor: "black" }}
                  >
                    Check Out
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
