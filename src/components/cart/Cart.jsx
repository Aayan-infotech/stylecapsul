import React, { useEffect, useState } from "react";
import "../../styles/Cart.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCarts,
  removeCart,
  updateCartQuantity,
} from "../../reduxToolkit/addcartSlice";
import { getCookie } from "../../utils/cookieUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";
import blank_img from "../../assets/stylist/blank_img.jpg";
import moment from "moment";
import Loader from "../Loader/Loader";
import no_cart_found from "../../assets/blankcart.gif"

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [selectedGift, setSelectedGift] = useState(null);

  const cartItems = useSelector((state) => state.cart.cart);
  const gifts = useSelector((state) => state.cart.gifts);
  const cartId = cartItems.length > 0 ? cartItems[0]._id : null;
  const dispatch = useDispatch();
  const userId = getCookie("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddedAllCarts = async () => {
      setLoading(true);
      try {
        await dispatch(getAllCarts());
      } finally {
        setLoading(false);
      }
    };
    fetchAddedAllCarts();
  }, [dispatch]);

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((cart) => {
      cart.items.forEach((item) => {
        initialQuantities[item.productId] = item.quantity;
      });
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleQuantityChange = async (item, change) => {
    try {
      const newQuantity = quantities[item?.productId] + change;
      if (newQuantity >= 1) {
        const action = change > 0 ? "increase" : "decrease";
        setQuantities((prev) => ({ ...prev, [item?.productId]: newQuantity }));
        const response = await dispatch(
          updateCartQuantity({
            userId: userId,
            productId: item.productId,
            action,
          })
        ).unwrap();
        if (response?.success) {
          showSuccessToast(response?.message);
        } else {
          showErrorToast(response?.message);
        }
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
      showErrorToast("Failed to update quantity");
    }
  };

  const subtotal = cartItems.reduce(
    (total, cart) =>
      total +
      cart.items.reduce(
        (sum, item) =>
          sum + quantities[item.productId] * item?.productDetails?.price,
        0
      ),
    0
  );

  const totalQuantity = Object.values(quantities).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const cartSummary = cartItems.reduce(
    (summary, cart) => {
      cart.items.forEach((item) => {
        const quantity = quantities[item.productId] || 0;
        const originalPrice = item.originalPrice || item?.productDetails?.price || 0;
        const discountPercentage = item.discountPercentage || 0;

        const priceAfterDiscount = originalPrice * (1 - discountPercentage / 100);
        const itemSubtotal = quantity * originalPrice;
        const itemDiscount = quantity * (originalPrice - priceAfterDiscount);

        summary.subtotal += itemSubtotal;
        summary.discount += itemDiscount;
        summary.total += itemSubtotal - itemDiscount;
      });
      return summary;
    },
    { subtotal: 0, discount: 0, total: 0 }
  );

  const deliveryCharges = 2;
  const giftDiscount = selectedGift ? parseFloat(selectedGift.discountPrice) : 0;
  const finalTotal = cartSummary.total - giftDiscount + deliveryCharges;

  const handleRemove = async (productId) => {
    try {
      const response = await dispatch(
        removeCart({ userId: userId, productId })
      ).unwrap();
      showSuccessToast(response.message);
      dispatch(getAllCarts());
    } catch (error) {
      showErrorToast("Failed to remove item:", error.message || error);
    }
  };

  const handleClick = () => {
    const paymentDetails = {
      totalAmount: finalTotal.toFixed(2),
      totalQuantity,
      discount: cartSummary.discount + giftDiscount,
      deliveryCharges,
      cartId,
      cartItems: cartItems.flatMap((cart) =>
        cart?.items.map((item) => ({
          productId: item.productId,
          quantity: quantities[item.productId],
          price: item?.productDetails?.price,
        }))
      ),
    };
    navigate("/address", {
      state: { paymentDetails, allCartDetails: cartItems },
    });
  };

  console.log(cartItems, 'cartItems')

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="cart-container">
          <div className="container" style={{ display: "block" }}>
            <div className="row">
              {cartItems.length > 0 ? (
                <>
                  <div className="col-md-6 buy-cart-list mt-2">
                    {cartItems?.map((cart, cartIndex) =>
                      cart.items?.map((item, itemIndex) => (
                        <div key={`${cartIndex}-${itemIndex}`} className=" d-flex align-items-center justify-content-center">
                          <div className="cart-item  mb-2 mt-3 rounded-pill px-4 w-100">
                            <img src={item?.productDetails?.image || blank_img} alt={item.name} className="item-image w-100" />
                            <div className="item-details ml-3">
                              <p className="text-black text-muted">
                                Order ID - {item?.productId || "N/A"}
                              </p>
                              <h6 className="text-black fw-bold m-0">
                                {item?.productDetails?.name?.length > 30 ? item?.productDetails?.name.slice(3, 30) + "...." : item?.productDetails?.name || "N/A"}
                              </h6>
                              <p className="m-0">{item.date}</p>
                              <div className="d-flex align-items-center justify-content-between">
                                <p className="text-black fw-bold me-5">
                                  ${item?.productDetails?.price || 0}
                                </p>
                                {item.source !== "closet" && (
                                  <div className="quantity-controls d-flex align-items-center">
                                    <button type="button" className="btn btn-dark rounded-pill quantity-change-btn small fs-6" onClick={() => handleQuantityChange(item, -1)}>
                                      <i className="fa-solid fa-minus small"></i>
                                    </button>
                                    <span className="quantity mx-3">
                                      {quantities[item?.productId] < 10 ? `0${quantities[item?.productId]}` : quantities[item?.productId]}
                                    </span>
                                    <button type="button" className="btn btn-dark rounded-pill quantity-change-btn small fs-6" style={{}} onClick={() => handleQuantityChange(item, 1)}>
                                      <i className="fa-solid fa-plus small"></i>
                                    </button>
                                  </div>
                                )}
                              </div>
                              <p className="fw-bold">
                                {moment(item.createdAt).format("YYYY/MM/DD")}
                              </p>
                            </div>
                            <button type="button" className="btn btn-dark rounded-pill remove-btn" onClick={() => handleRemove(item?.productId)}>
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
                        <h3 className="order-summary-title fw-bold">
                          Order Summary
                        </h3>
                        <div className="order-summary-details">
                          <div className="summary-item">
                            <span>Subtotal</span>
                            <span>${cartSummary.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="summary-item">
                            <span>Discount</span>
                            <span>${cartSummary.discount.toFixed(2)}</span>
                          </div>
                          <div className="summary-item">
                            <span>Gift Discount</span>
                            <span>${giftDiscount.toFixed(2)}</span>
                          </div>
                          <div className="summary-item">
                            <span>Delivery Charges</span>
                            <span>${deliveryCharges.toFixed(2)}</span>
                          </div>
                          <hr />
                          <div className="summary-item total">
                            <span>Total</span>
                            <span>${finalTotal.toFixed(2)}</span>
                          </div>
                          {gifts?.length > 0 && (
                            <div className="gift-section mt-3">
                              <h5 className="fw-bold">Available Gift Coupons</h5>
                              {gifts.map((gift) => (
                                <div key={gift._id} className="d-flex flex-column border rounded p-2 mb-2" style={{ backgroundColor: selectedGift?._id === gift._id ? "#f5f5f5" : "white", }}>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <strong>{gift.giftPromoCode}</strong> - ${gift.discountPrice}
                                    </div>
                                    <button className="btn btn-sm btn-outline-dark rounded-pill" disabled={selectedGift?._id === gift._id} onClick={() => setSelectedGift(gift)}>
                                      {selectedGift?._id === gift._id ? "Applied" : "Apply"}
                                    </button>
                                  </div>
                                  <small className="text-muted">
                                    Expiry: {moment(gift.offerValidity).format("YYYY-MM-DD")}
                                  </small>
                                </div>
                              ))}
                            </div>
                          )}
                          <hr />
                          <div className="summary-item total">
                            <span>Total</span>
                            <span>${finalTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="button" className="btn btn-dark w-100 mt-3 rounded-pill" onClick={handleClick}>  Proceed to Checkout
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
      )}
    </>
  );
};

export default Cart;
