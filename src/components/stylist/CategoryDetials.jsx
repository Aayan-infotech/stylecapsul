import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { addToCart } from "../../reduxToolkit/addcartSlice"; // Import addToCart action
import "../../styles/CategoryDetails.scss";
import { Link, useLocation } from "react-router-dom";
import blank_image from "../../assets/stylist/blank_img.jpg";
import { getCookie } from "../../utils/cookieUtils";

const CategoryDetails = () => {
  const location = useLocation();
  const cat_Details = location?.state?.product;
  const initialQuantity = location?.state?.quantity || 1; 
  const [quantity, setQuantity] = useState(initialQuantity);
  const dispatch = useDispatch(); // Initialize dispatch

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const userId = getCookie("userId"); // Replace with actual user ID
    const productId = cat_Details?.id; // Assuming `id` is the product identifier
    dispatch(addToCart({ userId, productId, quantity })); // Dispatch the action
  };

  return (
    <div className="category-details-container">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">
            <div className="image-container rounded-top-pill rounded-bottom-pill">
              <img
                src={cat_Details?.image || blank_image}
                alt={cat_Details?.name || "Product"}
                className="product-image"
              />
            </div>
          </div>
          <div className="col-12 col-md-9">
            <h2>{cat_Details?.name || "Product Name"}</h2>
            <p className="description-title">Description</p>
            <p className="description">
              {cat_Details?.description || "No description available."}
            </p>
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={decrement}>-</button>
              <span className="quantity-display">
                {quantity < 10 ? `0${quantity}` : quantity}
              </span>
              <button className="quantity-btn" onClick={increment}>+</button>
            </div>
            <div className="button-group">
              <button className="btn add-to-cart" onClick={handleAddToCart}>
                Add to cart
              </button>
              <Link to="/cart">
                <button className="btn buy-now">Buy</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
