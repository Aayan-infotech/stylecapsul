import React, { useEffect, useState } from "react";
import "../../styles/StylistCategories.scss";
import { useNavigate, useParams } from "react-router-dom";
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

const StylistCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("Buy");
  const [marketPlaceCategoryType, setMarketPlaceCategoryType] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loadingProductId, setLoadingProductId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = getCookie("userId");
  const token = getCookie("authToken");
  const { categoryId } = useParams();
  const cartItems = useSelector((state) => state.cart.cart);
  console.log(cartItems, "cartItems");

  const fetchAllCategoriesType = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.get(
        apiUrl(
          `api/marketplaces/subcategory/get/${categoryId}?sellType=${selectedCategory.toLocaleLowerCase()}`
        ),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response?.data?.data, "response?.data?.data");
      if (response?.data?.data) {
        setMarketPlaceCategoryType(response?.data?.data);
      } else {
        setErrorMessage("No subcategories found for the selected category.");
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
    if (categoryId) {
      fetchAllCategoriesType(selectedCategory);
    }
  }, [categoryId, selectedCategory]);

  const getFilteredProducts = () => {
    return marketPlaceCategoryType.filter(
      (product) =>
        product?.sellType.toLowerCase() === selectedCategory.toLowerCase()
    );
  };

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
    navigate(`/category-details/${prod._id}`, {
      state: {
        product: prod,
        quantity: quantity,
      },
    });
  };

  const handleAddToCart = async (product) => {
    setLoadingProductId(product._id);
    setTimeout(async () => {
      try {
        const response = await dispatch(
          addToCart({
            userId,
            productId: product?._id,
            quantity: quantity,
          })
        );
        showSuccessToast(response.message);
        await dispatch(getAllCarts());
      } catch (error) {
        showErrorToast(error?.message);
      } finally {
        setLoadingProductId(null);
      }
    }, 2000);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="categories-type-container">
          <div
            className="container w-75 mt-2 stylist-content"
            style={{ display: "block" }}
          >
            <div className="row gap-0 gx-2 flex-row flex-wrap m-auto">
              {["Buy", "Rent", "Swap"].map((cat) => (
                <div
                  key={cat}
                  className="col-4 mt-3"
                  style={{ textAlign: "center" }}
                >
                  <button
                    type="button"
                    className={`btn ${
                      selectedCategory === cat ? "btn-dark" : "btn-outline-dark"
                    } rounded-pill w-100 p-2`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                </div>
              ))}
            </div>

            <div className="container-fluid">
              <div className="row gx-2">
                {loading ? (
                  <div className="text-center text-muted w-100 mt-4">
                    <p>Loading...</p>
                  </div>
                ) : errorMessage ? (
                  <div className="text-center text-danger w-100">
                    <p>{errorMessage}</p>
                  </div>
                ) : getFilteredProducts()?.length > 0 ? (
                  getFilteredProducts().map((product, index) => (
                    <div key={index} className="col-12 col-md-4 p-3">
                      <div className="product-card rounded-pill text-center">
                        <div className="image-container">
                          <img
                            src={product.image || blank_img}
                            alt={product.name}
                            className="img-fluid rounded-top"
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div className="product-details p-3">
                          <div
                            onClick={() => handleBuyClick(product)}
                            style={{ cursor: "pointer" }}
                          >
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
                                  <AddTaskIcon
                                    color="success"
                                    style={{
                                      position: "absolute",
                                      bottom: "5px",
                                      left: "5px",
                                      fontSize: "20px",
                                      fontWeight: "bold",
                                    }}
                                  />
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
            {!loading && !errorMessage && getFilteredProducts()?.length > 0 && (
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary rounded-pill w-25 p-2"
                  style={{ backgroundColor: "black" }}
                >
                  View All
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StylistCategories;
