import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reduxToolkit/addcartSlice";
import "../../styles/CategoryDetails.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import blank_image from "../../assets/stylist/blank_img.jpg";
import { getCookie } from "../../utils/cookieUtils";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";

const CategoryDetails = () => {
  const [subcategoryDetails, setSubcategoryDetails] = useState({});
  const location = useLocation();
  const cat_Details = location?.state?.product;
  const { subcatid } = useParams();
  const initialQuantity = location?.state?.quantity || 1;
  const [quantity, setQuantity] = useState(initialQuantity);
  const dispatch = useDispatch();

  const token = getCookie("authToken");

  const fetchSubCategoryDetials = async () => {
    try {
      const response = await axios.get(apiUrl(`api/marketPlaceSubcat/get-details/${subcatid}`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      console.log(response?.data?.data, 'response?.data?.data')
      if (response?.data?.success) {
        setSubcategoryDetails(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching clothes data:", error);
    }
  };

  useEffect(() => {
    if (subcatid) {
      fetchSubCategoryDetials();
    }
  }, [subcatid]);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const userId = getCookie("userId");
    const productId = cat_Details?.id;
    dispatch(addToCart({ userId, productId, quantity }));
  };

  return (
    <div className="category-details-container">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-3 d-flex justify-content-center align-items-center">
            <div className="image-container rounded-top-pill rounded-bottom-pill">
              <img
                src={subcategoryDetails?.image || blank_image}
                alt={subcategoryDetails?.name || "Product"}
                className="product-image"
              />
            </div>
          </div>
          <div className="col-12 col-md-9">
            <h2>{subcategoryDetails?.name || "Product Name"}</h2>
            <p className="description-title">Description</p>
            <p className="m-0">
              {subcategoryDetails?.description || "No description available."}
            </p>
            <p className="m-0">
              Price:&nbsp;&nbsp;&nbsp;${subcategoryDetails?.price || "N/A"}
            </p>
            <p className="m-0">
              Category:&nbsp;&nbsp;&nbsp;{subcategoryDetails?.category || "No category"}
            </p>
            <p className="">
              Category Type:&nbsp;&nbsp;&nbsp;{subcategoryDetails?.sellType || "No type available."}
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
