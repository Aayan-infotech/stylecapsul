import React, { useState, useEffect } from "react";
import "./OrderHistory.scss";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { getCookie } from "../../utils/cookieUtils";
import Loader from "../Loader/Loader";
import { Divider } from "@mui/material";

function OrderHistory() {
  const [loading, setLoading] = useState(true);
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [errors, setErrors] = useState("");

  const token = getCookie("authToken");

  const fetchOrderHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl("api/order/order-history"), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.data?.success) {
        setOrderHistory(response?.data?.data);
      } else {
        setErrors(response?.data?.message);
      }
      setLoading(false);
    } catch (error) {
      setErrors(
        error?.response?.data?.message ||
        "An error occurred while fetching the orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);


  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="order-history w-100">
            <div className="row gx-5 align-items-center my-4">
              <div className="col-12 col-md-6">
                <h5 className="fw-bold fs-1">Order History</h5>
              </div>
              <div className="col-12 col-md-6">
                <div className="search-box d-flex">
                  <i className="fa fa-search"></i>
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
            {errors ? (
              <div className="error-message text-center">
                <img src="https://cdn-icons-png.flaticon.com/512/5089/5089733.png" alt="No Order" className="mb-3" style={{ height: 200 }} />
                <h4>{errors}</h4>
                <p>Looks like you haven't made any purchases yet. Start shopping now!</p>
              </div>
            ) : (
              <div className="row justify-content-center">
                {orderHistory?.length > 0 ? (
                  orderHistory.map((product, index) => (
                    <div className="col-12" key={index}>
                      <div className="order-history-card d-flex justify-content-between align-items-center px-5 mb-2 rounded-pill">
                        <div className="product-img d-flex align-items-center">
                        <img src={product.items[0]?.image} alt="Product" height={80} width={80} className="product-img" />
                          <div>
                            <p className="mb-0 fw-bold">
                              {product.items[0]?.name || "Product Name"}
                            </p>
                            <p className="mb-0 text-black">
                              Order Date:{" "}
                              {new Date(product?.createdAt).toLocaleString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="second-text">
                          <button type="button" data-bs-toggle="modal" data-bs-target="#orderhistorydialogopenClick" className="btn btn-dark rounded-pill fw-bold" onClick={() => handleViewOrder(product)}>
                            View <i className="bx bx-show"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="no-orders text-center">
                      <p>Looks like you haven't made any purchases yet. Start shopping now!</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div
              className="modal fade modal-lg"
              id="orderhistorydialogopenClick"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">  {selectedOrder ? `Order Details (${selectedOrder._id})` : "Order Details"}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body text-start">
                    {selectedOrder ? (
                      <div>
                        <h6>Payment Details</h6>
                        <p className="mb-2 text-black">
                          Order Date:{" "}
                          {new Date(selectedOrder?.createdAt).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </p>
                        <p className="mb-0">Payment Method: {selectedOrder?.paymentDetails?.paymentMethod}</p>
                        <p className="mb-0 fw-bold text-success">Payment Status: {selectedOrder?.paymentDetails?.paymentStatus}</p>
                        <Divider className="my-3" />
                        <h6>Order Items</h6>
                        {selectedOrder?.items?.map((item, index) => (
                          <div className="d-flex justify-content-between align-items-center">
                            <img src={item?.image} alt="Product" height={60} width={60} className="product-img" />
                            <div key={index} className="mb-2">
                              <p className="mb-0">Item ID: {item?._id}</p>
                              <p className="mb-0">Item Name: {item?.name}</p>
                              <p className="mb-0">Item Price: {item?.price}</p>
                              <p className="mb-0">Quantity: {item?.quantity}</p>
                            </div>
                          </div>
                        ))}
                        <Divider className="my-3" />
                        <p className="mb-0">Delivery Charges: ₹{selectedOrder?.deliveryCharges}</p>
                        <p className="mb-0">Discount: ₹{selectedOrder?.discount}</p>
                        <p className="mb-0 fw-bold">Total Price: ₹{selectedOrder?.totalPrice}</p>

                        <p className="mt-2 fw-bold text-success">Order Status: {selectedOrder?.orderStatus}</p>
                      </div>
                    ) : (
                      <p>No order details available.</p>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-dark rounded-pill" data-bs-dismiss="modal"  >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderHistory;