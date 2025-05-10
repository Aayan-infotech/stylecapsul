import React, { useEffect, useState } from "react";
import "../../styles/StylistCategories.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getAllCarts } from "../../reduxToolkit/addcartSlice";
import { getCookie } from "../../utils/cookieUtils";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import blank_img from "../../assets/stylist/no_image.png";
import { showSuccessToast, showErrorToast } from "../toastMessage/Toast";
import LoadingButton from "@mui/lab/LoadingButton";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Loader from "../Loader/Loader";
import no_cart_found from "../../assets/not-cart_found.png"
import logo from "../../assets/images/LOGOSC.png";

const StylistCategories = () => {
  const [marketPlaceCategoryType, setMarketPlaceCategoryType] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [loadingProductId, setLoadingProductId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = getCookie("userId");
  const token = getCookie("authToken");
  const { categoryId } = useParams();
  const cartItems = useSelector((state) => state.cart.cart);

  const fetchAllCategoriesType = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.get(apiUrl(`api/marketplaces/subcategory/get/${categoryId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.data?.success === false) {
        setErrorMessage("No subcategories found for the selected category.");
      } else {
        setMarketPlaceCategoryType(response?.data?.data);
      }
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Error fetching data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategoriesType();
  }, [categoryId]);

  const truncateText = (text, wordLimit) => {
    const wordsArray = text.split(" ");
    if (wordsArray.length > wordLimit) {
      return wordsArray.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const isProductInCart = (productId) => {
    if (cartItems && Array.isArray(cartItems)) {
      return cartItems.some((cart) =>
        cart.items.some((item) => item.productId === productId)
      );
    }
    return false;
  };

  const handleBuyClick = (prod) => {
    if (token) {
      navigate(`/category-details/${prod._id}`, {
        state: {
          product: prod,
          quantity: quantity,
        },
      });
    } else {
      showErrorToast("Please log in to view product details.");
      navigate('/login');
    }
  };

  const handleAddToCart = async (product) => {
    setLoadingProductId(product._id);
    if (!userId || !token) {
      try {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const productIndex = existingCart.findIndex(
          (item) => item._id === product._id && item.name === product.name
        );
        if (productIndex !== -1) {
          existingCart[productIndex].quantity += quantity;
          showSuccessToast("Product quantity updated successfully!");
        } else {
          existingCart.push({ ...product, quantity });
          showSuccessToast("Product added to cart!");
        }
        localStorage.setItem("cart", JSON.stringify(existingCart));
        navigate("/myaddedproducts")
        // showSuccessToast("Product added to cart!");
      } catch (error) {
        console.error("Local cart error:", error);
      } finally {
        setLoadingProductId(null);
      }
    } else {
      setTimeout(async () => {
        try {
          const response = await dispatch(addToCart({ userId, productId: product?._id, quantity: quantity, }));
          console.log(response?.payload, 'existingCart')
          if (response?.payload?.message) {
            showSuccessToast(response.payload.message);
            await dispatch(getAllCarts());
          }
        } catch (error) {
          showErrorToast(error?.message);
        } finally {
          setLoadingProductId(null);
        }
      }, 2000);
    }
  };


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="categories-type-container">
          <div className="container w-75 mt-2 stylist-content d-block">
            <div className="row m-0 w-100">
              <div className="col-12 mb-4 d-flex justify-content-between align-items-center">
                {!token && (
                  <Link to="/">
                    <img src={logo} alt="logo" style={{ width: "300px", height: "60px" }} />
                  </Link>
                )}
              </div>
            </div>
            <div className="container-fluid">
              <div className="row gx-2">
                {loading ? (
                  <div className="text-center text-muted w-100 mt-4">
                    <p>Loading...</p>
                  </div>
                ) : errorMessage ? (
                  <div className="text-center text-danger w-100">
                    <div>
                      <img src={no_cart_found} height="200" alt="not product" />
                      <p> {errorMessage}</p>
                    </div>
                  </div>
                ) : marketPlaceCategoryType?.length > 0 ? (
                  marketPlaceCategoryType?.map((product, index) => (
                    <div key={index} className="col-12 col-md-4 p-3">
                      <div className="product-card rounded-pill text-center">
                        <div className="image-container">
                          <img
                            src={product.image || blank_img}
                            alt={product.name}
                            className="img-fluid rounded-top"
                            style={{ objectFit: "contain" }}
                            onError={(e) => { e.target.onerror = null; e.target.src = blank_img; }}
                          />
                        </div>
                        <div className="product-details p-3">
                          <div onClick={() => handleBuyClick(product)} style={{ cursor: "pointer" }}>
                            <h3 className="product-name fw-bold">
                              {product.name}
                            </h3>
                            <p className="product-description text-muted">
                              {truncateText(product.description, 10)}
                            </p>
                            <h3 className="product-price fw-bold">
                              {" "}
                              ${product.price}
                            </h3>
                          </div>
                          <div className="d-flex justify-content-center mb-3">
                            <LoadingButton
                              variant="outlined"
                              loading={loadingProductId === product._id}
                              disabled={loadingProductId === product._id}
                              onClick={() => handleAddToCart(product)}
                              style={{
                                maxWidth: "150px",
                                width: "100%",
                                backgroundColor:
                                  loadingProductId === product._id
                                    ? "#e0e0e0"
                                    : "white",
                                color:
                                  loadingProductId === product._id
                                    ? "#a0a0a0"
                                    : "black",
                                cursor:
                                  loadingProductId === product._id
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                              className="rounded-pill text-black fw-bold border border-black"
                            >
                              {isProductInCart(product._id) ? (
                                <span style={{ textTransform: "none" }}>
                                  <AddTaskIcon color="success" disabled={isProductInCart} style={{ position: "absolute", bottom: "5px", left: "5px", fontSize: "20px", fontWeight: "bold", }} />
                                  Added
                                </span>
                              ) : (
                                "Add to Cart"
                              )}
                            </LoadingButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center w-100">
                    <p>No products available for the selected category.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StylistCategories;
