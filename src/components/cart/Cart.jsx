import React, { useEffect, useState } from "react";
import "../../styles/Cart.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCarts, removeCart, updateCartQuantity } from "../../reduxToolkit/addcartSlice";
import { getCookie } from "../../utils/cookieUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const userId = getCookie('userId');
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(getAllCarts());
  }, [dispatch]);

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach(cart => {
      cart.items.forEach(item => {
        initialQuantities[item.productId] = item.quantity;
      });
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleQuantityChange = (item, change) => {
    const newQuantity = quantities[item?.productId] + change;
    if (newQuantity >= 0) {
      setQuantities(prev => ({ ...prev, [item?.productId]: newQuantity }));
      dispatch(updateCartQuantity({
        userId: userId,
        productId: item.productId,
        newQuantity,
      }))
        .unwrap()
        .catch((error) => {
          console.error('Failed to update quantity:', error);
        });
    }
  };


  const subtotal = cartItems.reduce((total, cart) =>
    total + cart.items.reduce((sum, item) => sum + quantities[item.productId] * item.price, 0), 0
  );

  const totalQuantity = Object.values(quantities).reduce((total, quantity) => total + quantity, 0);

  const discount = 4;
  const deliveryCharges = 2;
  const total = subtotal - discount + deliveryCharges;

  const handleRemove = async (productId) => {
    try {
      const response = await dispatch(removeCart({ userId: userId, productId })).unwrap();
      showSuccessToast(response.message);
      dispatch(getAllCarts());
    } catch (error) {
      showErrorToast('Failed to remove item:', error.message || error);
    }
  };

  return (
    <>
      {/* <Toast /> */}
      <div className="cart-container">
        <div className="container" style={{ display: "block" }}>
          <div className="row">
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
                          <p className="text-black fw-bold">Order ID - {item?.productId || 'N/A'}</p>
                          <p>{item.date}</p>
                          <div className="d-flex align-items-center">
                            <p className="text-black fw-bold me-5">${item?.price || 'N/A'}</p>
                            <div className="quantity-controls d-flex align-items-center">
                              <button
                                type="button"
                                className="btn btn-dark rounded-pill"
                                onClick={() => handleQuantityChange(item, -1)}
                              >
                                <i className="fa-solid fa-minus"></i>
                              </button>
                              <span className="quantity mx-3">
                                {quantities[item?.productId] < 10 ? `0${quantities[item?.productId]}` : quantities[item?.productId]}
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
                          onClick={() => handleRemove(item?.productId)}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <div className="col-md-6">
                  <h1 className="text-start fw-bold fs-1 mb-1">Cart</h1>
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
                          <span>{totalQuantity || 'N/A'}</span>
                        </div>
                        <div className="summary-item">
                          <span>Subtotal</span>
                          <span>${subtotal.toFixed(2) || 'N/A'}</span>
                        </div>
                        <div className="summary-item">
                          <span>Discount</span>
                          <span>${discount.toFixed(2) || 'N/A'}</span>
                        </div>
                        <div className="summary-item">
                          <span>Delivery Charges</span>
                          <span>${deliveryCharges.toFixed(2) || 'N/A'}</span>
                        </div>
                        <hr />
                        <div className="summary-item total">
                          <span>Total</span>
                          <span>${total.toFixed(2) || 'N/A'}</span>
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
    </>
  );
};

export default Cart;
