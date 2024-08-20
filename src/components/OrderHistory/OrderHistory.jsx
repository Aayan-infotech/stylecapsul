// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./OrderHistory.scss";
import productleather from "./img/leather.png";
import productleather2 from "./img/leather1.png";
import productleather3 from "./img/leather2.png";

function OrderHistory() {
    const initialProducts = [
        { id: 1, name: 'Jacket 1', date: '12--2-2-23', orderId: '12232', img: productleather },
        { id: 2, name: 'Jacket 2', date: '12--2-2-23', orderId: '12233', img: productleather2 },
        { id: 3, name: 'Jacket 3', date: '12--2-2-23', orderId: '12234', img: productleather3 }
      ];

    // const[products, setProducts] = useState(initialProducts);


  return (
    <div className="order-history">
      <div className="products-heading">
        <h1>Order History</h1>
        <div className="search-box">
          <i className="fa fa-search"></i>
          <input type="text" placeholder="Search" />
          <i className="fa-solid fa-sliders"></i>
        </div>
      </div>

      <div className="products-container">
        {initialProducts.map(product => (
          <div className="products-added" key={product.id}>
            <div className="product-img">
              <img src={product.img} alt="" />
            </div>
            <div className="product-text">
              <div className="first-text">
                <h3>{product.name}</h3>
                <p>{product.date}</p>
              </div>
              <div className="second-text">
                <p>Order ID - {product.orderId}</p>
                <button>Reorder <i className='bx bx-rotate-right'></i></button>
              </div>
            </div>
            {/* <i className="fa-solid fa-circle-xmark close-icon" onClick={() => removeProduct(product.id)}></i> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
