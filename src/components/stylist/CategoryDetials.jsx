// Corrected: src/components/stylist/CategoryDetials.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCartQuantity,
  getAllCarts,
} from "../../reduxToolkit/addcartSlice";
import "../../styles/CategoryDetails.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import blank_image from "../../assets/stylist/blank_img.jpg";
import { getCookie } from "../../utils/cookieUtils";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import LoadingButton from "@mui/lab/LoadingButton";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";
import Loader from "../Loader/Loader";

const CategoryDetails = () => {
  const [subcategoryDetails, setSubcategoryDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { subcatid } = useParams();
  const initialQuantity = location?.state?.quantity;
  console.log(initialQuantity, 'initialQuantity');
  const [quantity, setQuantity] = useState(initialQuantity);
  const [quantities, setQuantities] = useState({});
  const [loadingProductId, setLoadingProductId] = useState(null);
  const dispatch = useDispatch();

  const token = getCookie("authToken");
  const userId = getCookie("userId");

  const fetchSubCategoryDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        apiUrl(`api/marketPlaceSubcat/get-details/${subcatid}`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.success) {
        const data = response?.data?.data;
        setSubcategoryDetails({
          id: data._id,
          name: data.name,
          description: data.description,
          price: data.price,
          sellType: data.sellType,
          image: data.image,
          brand: data.brand,
          viewCount: data.viewCount,
          lastViewed: data.lastViewed,
          discount: data.discount,
          quantity: data?.quantity
        });
      }
    } catch (error) {
      console.error("Error fetching category details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subcatid) {
      fetchSubCategoryDetails();
    }
  }, [subcatid]);

  const handleAddToCart = async () => {
    setLoadingProductId(subcategoryDetails?.id);
    try {
      const response = await dispatch(
        addToCart({
          userId,
          productId: subcategoryDetails?.id,
          quantity,
        })
      ).unwrap();
      showSuccessToast(response?.message || "Item added to cart successfully.");
      await dispatch(getAllCarts());
    } catch (error) {
      showErrorToast(error?.message || "Failed to add item to cart.");
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleQuantityChange = async (item, change) => {
    setLoadingProductId(subcategoryDetails?.id);
    try {
      const currentQuantity = quantities[item.id] || item.quantity || 1;
      const newQuantity = currentQuantity + change;
      if (newQuantity >= 0) {
        const action = change > 0 ? "increase" : "decrease";
        const response = await dispatch(
          updateCartQuantity({
            userId,
            productId: subcategoryDetails?.id,
            action,
          })
        ).unwrap();
        if (response.success) {
          setQuantities((prev) => ({
            ...prev,
            [item.id]: response.newQuantity || newQuantity,
          }));
          showSuccessToast(
            response.message || "Quantity updated successfully."
          );
        } else {
          showErrorToast(response.message || "Failed to update quantity.");
        }
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
      showErrorToast(
        error?.message || "Error occurred while updating quantity."
      );
    } finally {
      setLoadingProductId(null);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                  {subcategoryDetails?.description ||
                    "No description available."}
                </p>
                <p className="m-0">
                  Price: &nbsp;&nbsp; ${subcategoryDetails?.price || "N/A"}
                </p>
                <p className="m-0">
                  Brand: &nbsp;&nbsp; {subcategoryDetails?.brand || "No brand"}
                </p>
                <p>
                  Category Type: &nbsp;&nbsp;
                  <span className="fw-bold">
                    {subcategoryDetails?.sellType
                      ? subcategoryDetails.sellType.charAt(0).toUpperCase() +
                        subcategoryDetails.sellType.slice(1)
                      : "No type available."}
                  </span>
                </p>
                <div className="quantity-selector">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(subcategoryDetails, -1)}
                  >
                    -
                  </button>
                  <span className="quantity-display">
                    {subcategoryDetails?.quantity < 10 ? `0${subcategoryDetails?.quantity}` : subcategoryDetails?.quantity}
                  </span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(subcategoryDetails, 1)}
                  >
                    +
                  </button>
                </div>
                <div className="button-group">
                  <LoadingButton
                    variant="outlined"
                    loading={loadingProductId === subcategoryDetails?.id}
                    disabled={loadingProductId === subcategoryDetails?.id}
                    onClick={handleAddToCart}
                    className="rounded-pill text-black fw-bold border border-black"
                  >
                    Add to Cart
                  </LoadingButton>
                  <Link to="/payment">
                    <button className="btn buy-now">Buy</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryDetails;
