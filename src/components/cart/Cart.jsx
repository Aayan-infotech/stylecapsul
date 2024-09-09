import React, { useState } from "react";
import "../../styles/Cart.scss";
import shirt from "../../assets/cart/shirt.png";
import shirt2 from "../../assets/cart/shirt2.png";
import { Link } from "react-router-dom";
const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Watch",
      quantity: 2,
      price: 200,
      image: shirt,
      orderId: "32456",
      date: "11/23/24",
    },
    {
      id: 2,
      name: "Airpods",
      quantity: 2,
      price: 100,
      image: shirt2,
      orderId: "32456",
      date: "11/23/24",
    },
    {
      id: 3,
      name: "Hoodie",
      quantity: 2,
      price: 123,
      image: shirt2,
      orderId: "32456",
      date: "11/23/24",
    },
  ]);

  const handleIncrease = (id) => {
    setItems(
      items.map((item) =>
        item?.id === id ? { ...item, quantity: item?.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setItems(
      items.map((item) =>
        item?.id === id && item?.quantity > 1
          ? { ...item, quantity: item?.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (total, item) => total + item?.price * item?.quantity,
    0
  );
  const discount = 4;
  const deliveryCharges = 2;
  const total = subtotal - discount + deliveryCharges;

  return (
    <div className="cart-container">
      <div className="container" style={{display:"block"}}>
        <div className="row">
          <h1 className="text-center fw-bold fs-1 mb-4">Cart</h1>
          <div className="col-md-6 buy-cart-list mt-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="cart-item d-flex align-items-center mb-2 mt-3 rounded-pill px-4"
              >
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details ml-3">
                  <h5>{item.name}</h5>
                  <p className="text-black fw-bold">
                    Order ID - {item.orderId}
                  </p>
                  <p>{item.date}</p>
                  <div className="d-flex align-items-center">
                    <p className="text-black fw-bold me-5">${item?.price}</p>
                    <div className="quantity-controls d-flex align-items-center">
                      <button
                        type="button"
                        class="btn btn-dark rounded-pill"
                        onClick={() => handleDecrease(item.id)}
                        style={{ fontSize: "10px", backgroundColor: "black" }}
                      >
                        <i class="fa-solid fa-minus"></i>
                      </button>
                      <span className="quantity mx-3">
                        {item.quantity < 10
                          ? `0${item.quantity}`
                          : item.quantity}
                      </span>
                      <button
                        type="button"
                        class="btn btn-dark rounded-pill"
                        onClick={() => handleIncrease(item.id)}
                        style={{ fontSize: "10px", backgroundColor: "black" }}
                      >
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-dark rounded-pill remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            ))}
          </div>
          <div className="col-md-6">
            <div class="order-summary-container rounded">
              <div class="order-summary-card">
                <h3 class="order-summary-title">Order Summary</h3>
                <div class="order-summary-details">
                  <div class="summary-item">
                    <span>Items</span>
                    <span>{items?.length}</span>
                  </div>
                  <div class="summary-item">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div class="summary-item">
                    <span>Discount</span>
                    <span>${discount}</span>
                  </div>
                  <div class="summary-item">
                    <span>Delivery Charges</span>
                    <span>${deliveryCharges}</span>
                  </div>
                  <hr />
                  <div class="summary-item total">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/address">
              <button
                type="button"
                class="btn btn-dark w-100 rounded-pill p-3 mt-3"
                style={{ backgroundColor: "black" }}
              >
                Check Out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
