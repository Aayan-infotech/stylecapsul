import React, { useEffect, useState } from "react";
import "../../styles/Cart.scss";
import blank_img from "../../assets/stylist/blank_img.jpg";
import no_cart_found from "../../assets/blankcart.gif"
import logo from "../../assets/images/LOGOSC.png";
import { Link, useNavigate } from "react-router-dom";

const MyAddedProducts = () => {
  const [quantities, setQuantities] = useState({});
  const [addedProducts, setAddedProducts] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [subtotal, setSubtotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();
  const discount = 4;
  const deliveryCharges = 2;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setAddedProducts(storedCart);
    calculateSummary(storedCart);
  }, []);


  useEffect(() => {
    calculateSummary();
  }, [addedProducts]);

  const calculateSummary = (cartItems = addedProducts) => {
    let total = 0;
    let quantity = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
      quantity += item.quantity;
    });
    setSubtotal(total);
    setTotalQuantity(quantity);
  };

  const total = subtotal - discount + deliveryCharges;

  const handleQuantityUpdate = (product, operation) => {
    const updatedCart = addedProducts.map((item) => {
      if (item._id === product._id) {
        const newQuantity = operation === "increment" ? item.quantity + 1 : item.quantity - 1;
        return {
          ...item,
          quantity: newQuantity > 0 ? newQuantity : 1,
        };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setAddedProducts(updatedCart);
  };

  const handleRemove = (productId) => {
    const updatedCart = addedProducts.filter((item) => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setAddedProducts(updatedCart);
    calculateSummary(updatedCart);
  };

  const handleProceedToCheckout = () => {
    navigate("/login", { state: { fromCheckout: true } });
  };

  return (
    <div className="container d-block mt-5">
      <div className="row">
        <div className="col-12">
          <Link to="/">
            <img src={logo} alt="logo" style={{ width: "300px", height: "60px" }} />
          </Link>
        </div>
      </div>
      <div className="cart-container">
        <div className="container" style={{ display: "block" }}>
          <div className="row">
            {addedProducts?.length > 0 ? (
              <>
                <div className="col-md-6 buy-cart-list mt-2">
                  {addedProducts?.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <div className="cart-item mb-2 mt-3 rounded-pill px-4 w-100">
                        <img
                          src={item.image || blank_img}
                          alt={item.name}
                          className="item-image w-100"
                          onError={(e) => (e.target.src = blank_img)}
                        />
                        <div className="item-details ml-3">
                          <div className="d-flex">
                            <div>
                              <p className="text-black text-muted">
                                Order ID - {item._id || "N/A"}
                              </p>
                              <h6 className="text-black fw-bold m-0">
                                {item.name}
                              </h6>
                              <p className="m-0">Quantity: {item.quantity}</p>
                              <div className="d-flex align-items-center justify-content-between">
                                <p className="text-black fw-bold me-5">
                                  ${item.price * item.quantity}
                                </p>
                              </div>
                              <p className="fw-bold">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="quantity-controls d-flex align-items-center">
                              <button
                                type="button"
                                className="btn btn-dark rounded-pill quantity-change-btn small fs-6"
                                onClick={() => handleQuantityUpdate(item, "decrement")}
                              >
                                <i className="fa-solid fa-minus small"></i>
                              </button>
                              <span className="quantity mx-3">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                className="btn btn-dark rounded-pill quantity-change-btn small fs-6"
                                onClick={() => handleQuantityUpdate(item, "increment")}
                              >
                                <i className="fa-solid fa-plus small"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-dark rounded-pill remove-btn"
                          onClick={() => handleRemove(item?._id)}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-md-6">
                  <h1 className="text-start fw-bold fs-1 mb-1">Cart</h1>
                  <div className="order-summary-container rounded">
                    <div className="order-summary-card">
                      <h3 className="order-summary-title fw-bold">
                        Order Summary
                      </h3>
                      <div className="order-summary-details">
                        <div className="summary-item">
                          <span>Total Items</span>
                          <span>{addedProducts.length}</span>
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
                  <button type="button" className="btn btn-dark w-100 mt-3 rounded-pill" onClick={handleProceedToCheckout}>
                    Proceed to Checkout
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h3>Your cart is empty</h3>
                <img src={no_cart_found} height={400} alt="No cart found" />
                <p>It seems like you haven't added any items to your cart yet. Explore our products and start shopping!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};


export default MyAddedProducts;
