// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./OrderHistory.scss";
import productleather from "./img/leather.png";
import productleather2 from "./img/leather1.png";
import productleather3 from "./img/leather2.png";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { getCookie } from "../../utils/cookieUtils";
import blank_img from "../../assets/stylist/blank_img.jpg";
import Loader from "../Loader/Loader";

function OrderHistory() {
  const [loading, setLoading] = useState(true);
  const [orderHistory, setOrderHistory] = useState([]);

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
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);


  const handleClickReOrder = (reorderid) => {
    console.log(reorderid, 'reorderid')
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="order-history d-flex justify-content-center align-items-center w-100">
            <div className="w-100 mx-750">
              <div className="products-heading">
                <h1>Order History</h1>
                <div className="search-box">
                  <i className="fa fa-search"></i>
                  <input type="text" placeholder="Search" />
                  <i className="fa-solid fa-sliders"></i>
                </div>
              </div>

              <div className="products-container">
                {orderHistory?.map((product, index) => (
                  <div className="products-added" key={index}>
                    <div className="product-img">
                      <img src={blank_img} alt="" className="w-100" />
                    </div>
                    <div className="product-text">
                      <div className="first-text">
                        <h3>{product.name}</h3>
                        <p>
                          {new Date(product?.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="second-text">
                        <p>Order ID - {product?._id}</p>
                        <button onClick={() => handleClickReOrder(product)}>
                          Reorder <i className="bx bx-rotate-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderHistory;
