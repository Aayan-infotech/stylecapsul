import React, { useEffect, useState } from "react";
import "../../styles/Cart.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCarts, removeCart, updateCartQuantity } from "../../reduxToolkit/addcartSlice";
import { getCookie } from "../../utils/cookieUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";
import blank_img from '../../assets/stylist/blank_img.jpg'
import moment from "moment";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const cartItems = useSelector((state) => state.cart.cart);
  const cartId = cartItems.length > 0 ? cartItems[0]._id : null;
  const dispatch = useDispatch();
  const userId = getCookie('userId');
  const navigate = useNavigate();

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

  const handleQuantityChange = async (item, change) => {
    try {
      const newQuantity = quantities[item?.productId] + change;
      if (newQuantity >= 0) {
        const action = change > 0 ? "increase" : "decrease";
        setQuantities(prev => ({ ...prev, [item?.productId]: newQuantity }));
        const response = await dispatch(updateCartQuantity({
          userId: userId,
          productId: item.productId,
          action,
        })).unwrap();
        if (response?.success) {
          showSuccessToast(response?.message);
        } else {
          showErrorToast(response?.message);
        }
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
      showErrorToast('Failed to update quantity');
    }
  };


  const subtotal = cartItems.reduce((total, cart) =>
    total + cart.items.reduce((sum, item) => sum + quantities[item.productId] * item?.productDetails?.price, 0), 0
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

  const handleClick = () => {
    const paymentDetails = {
      totalAmount: total.toFixed(2),
      totalQuantity,
      cartId,
      cartItems: cartItems.map(cart =>
        cart.items.map(item => ({
          productId: item.productId,
          quantity: quantities[item.productId],
          price: item?.productDetails?.price,
        }))
      ).flat()
    };
    navigate("/address", { state: { paymentDetails } });
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
                        className=" d-flex align-items-center justify-content-center"
                      >
                        <div className="cart-item  mb-2 mt-3 rounded-pill px-4 w-100">
                          <img
                            src={item?.productDetails?.image || blank_img}
                            alt={item.name}
                            className="item-image w-100"
                          />
                          <div className="item-details ml-3">
                            <p className="text-black text-muted">Order ID - {item?.productId || 'N/A'}</p>
                            <h5 className="text-black fw-bold m-0">{item?.productDetails?.name || 'N/A'}</h5>
                            <p className="m-0">{item.date}</p>
                            <div className="d-flex align-items-center justify-content-between">
                              <p className="text-black fw-bold me-5">${quantities[item?.productId] * (item?.productDetails?.price || 0)}</p>
                              <div className="quantity-controls d-flex align-items-center">
                                <button
                                  type="button"
                                  className="btn btn-dark rounded-pill quantity-change-btn small fs-6"
                                  onClick={() => handleQuantityChange(item, -1)}
                                >
                                  <i className="fa-solid fa-minus small"></i>
                                </button>
                                <span className="quantity mx-3">
                                  {quantities[item?.productId] < 10 ? `0${quantities[item?.productId]}` : quantities[item?.productId]}
                                </span>
                                <button
                                  type="button"
                                  className="btn btn-dark rounded-pill quantity-change-btn small fs-6"
                                  style={{}}
                                  onClick={() => handleQuantityChange(item, 1)}
                                >
                                  <i className="fa-solid fa-plus small"></i>
                                </button>
                              </div>
                            </div>
                            <p className="fw-bold">{moment(item.createdAt).format('YYYY/MM/DD')}</p>
                          </div>
                          <button
                            type="button"
                            className="btn btn-dark rounded-pill remove-btn"
                            onClick={() => handleRemove(item?.productId)}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
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
                          <span>{cartItems.reduce((total, cart) => total + cart.items.length, 0)}</span>
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
                  {/* <Link to="/address"> */}
                  <button
                    type="button"
                    className="btn btn-dark w-100 mt-3 rounded-pill"
                    onClick={handleClick}
                  >
                    Proceed to Checkout
                  </button>
                  {/* </Link> */}
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
