import React, { useEffect, useState } from "react";
import "../../styles/Cart.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCarts, updateCartQuantity } from "../../reduxToolkit/addcartSlice";
import { getCookie } from "../../utils/cookieUtils";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart); 
  const dispatch = useDispatch();
  const userId = getCookie('userId'); // Get user ID from cookies
  const [quantities, setQuantities] = useState({}); // State to hold quantities

  useEffect(() => {
    dispatch(getAllCarts()); // Fetch the cart data on component mount
  }, [dispatch]);

  useEffect(() => {
    // Initialize quantities state based on cartItems
    const initialQuantities = {};
    cartItems.forEach(cart => {
      cart.items.forEach(item => {
        initialQuantities[item.productId] = item.quantity;
      });
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleQuantityChange = (item, change) => {
    const newQuantity = quantities[item.productId] + change;
    if (newQuantity >= 0) { // Ensure quantity is not negative
      setQuantities(prev => ({ ...prev, [item.productId]: newQuantity })); // Update local state
      dispatch(updateCartQuantity({
        userId: userId,
        productId: item.productId,
        newQuantity,
      }));
    }
  };

  // Calculate subtotal, total quantity, and total price dynamically
  const subtotal = cartItems.reduce((total, cart) =>
    total + cart.items.reduce((sum, item) => sum + quantities[item.productId] * item.price, 0), 0
  );

  const totalQuantity = Object.values(quantities).reduce((total, quantity) => total + quantity, 0);

  const discount = 4; // Fixed discount value
  const deliveryCharges = 2; // Fixed delivery charges
  const total = subtotal - discount + deliveryCharges; // Final total calculation

  const handleRemove = (itemId) => {
    // Implement the functionality to remove item from cart if needed
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
                {cartItems.map((cart, cartIndex) =>
                  cart.items.map((item, itemIndex) => (
                    <div
                      key={`${cartIndex}-${itemIndex}`}
                      className="cart-item d-flex align-items-center mb-2 mt-3 rounded-pill px-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="item-image"
                      />
                      <div className="item-details ml-3">
                        <h5>{item.name}</h5>
                        <p className="text-black fw-bold">Order ID - {item.productId}</p>
                        <p>{item.date}</p>
                        <div className="d-flex align-items-center">
                          <p className="text-black fw-bold me-5">${item.price}</p>
                          <div className="quantity-controls d-flex align-items-center">
                            <button
                              type="button"
                              className="btn btn-dark rounded-pill"
                              onClick={() => handleQuantityChange(item, -1)}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <span className="quantity mx-3">
                              {quantities[item.productId] < 10 ? `0${quantities[item.productId]}` : quantities[item.productId]}
                            </span>
                            <button
                              type="button"
                              className="btn btn-dark rounded-pill"
                              onClick={() => handleQuantityChange(item, 1)}
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
                  ))
                )}
              </div>
              <div className="col-md-6">
                <div className="order-summary-container rounded">
                  <div className="order-summary-card">
                    <h3 className="order-summary-title fw-bold">Order Summary</h3>
                    <div className="order-summary-details">
                      <div className="summary-item">
                        <span>Total Items</span>
                        <span>{cartItems.length}</span>
                      </div>
                      <div className="summary-item">
                        <span>Total Quantity</span>
                        <span>{totalQuantity}</span>
                      </div>
                      <div className="summary-item">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="summary-item">
                        <span>Discount</span>
                        <span>${discount.toFixed(2)}</span>
                      </div>
                      <div className="summary-item">
                        <span>Delivery Charges</span>
                        <span>${deliveryCharges.toFixed(2)}</span>
                      </div>
                      <hr />
                      <div className="summary-item total">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="/address">
                  <button
                    type="button"
                    className="btn btn-dark w-100 mt-3 rounded-pill"
                  >
                    Proceed to Checkout
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
