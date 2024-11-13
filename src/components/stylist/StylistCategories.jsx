import React, { useEffect, useState } from "react";
import "../../styles/StylistCategories.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, getAllCarts } from "../../reduxToolkit/addcartSlice";
import { getCookie } from "../../utils/cookieUtils";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import blank_img from '../../assets/stylist/no_image.png'

const StylistCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("Buy");
  const [marketPlaceCategoryType, setMarketPlaceCategoryType] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = getCookie("userId");
  const { categoryId } = useParams();

  const fetchAllCategoriesType = async () => {
    setLoading(true);
    setErrorMessage(""); 
    try {
      // const response = await axios.get(apiUrl(`api/marketplaces/subcategory/get/${categoryId}?sellType=${selectedCategory.toLocaleLowerCase()}`));
      // const url = `http://44.196.192.232:3555/api/marketplaces/subcategory/get/${categoryId}?sellType=${selectedCategory.toLocaleLowerCase()}`;
      const response = await axios.get(apiUrl(`api/marketplaces/subcategory/get/${categoryId}?sellType=${selectedCategory.toLocaleLowerCase()}`));
      if (response?.data?.data) {
        setMarketPlaceCategoryType(response?.data?.data);
      } else {
        setErrorMessage("No subcategories found for the selected category.");
      }
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : "Error fetching data.");
    } finally {
      setLoading(false); 
    }
  };
  useEffect(() => {
    fetchAllCategoriesType(selectedCategory);
  }, [selectedCategory]);


  const getFilteredProducts = () => {
    return marketPlaceCategoryType.filter(
      (product) => product?.sellType.toLowerCase() === selectedCategory.toLowerCase()
    );
  };

  const truncateText = (text, wordLimit) => {
    const wordsArray = text.split(" ");
    if (wordsArray.length > wordLimit) {
      return wordsArray.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const handleBuyClick = (prod) => {
    navigate("/category-details", {
      state: {
        product: prod,
        quantity: quantity
      }
    });
  };

  const handleAddToCart = async (product) => {
    await dispatch(addToCart({
      userId,
      productId: product?.id,
      quantity: quantity
    }));
    await dispatch(getAllCarts());
  };

  return (
    <div className="categories-type-container">
      <div className="container w-75 mt-2 stylist-content" style={{ display: "block" }}>
        <div className="row gx-2">
          {["Buy", "Rent", "Swap"].map((cat) => (
            <div key={cat} className="col-12 col-md-4 mt-3" style={{ margin: "auto", textAlign: "center" }}>
              <button
                type="button"
                className={`btn ${selectedCategory === cat ? "btn-dark" : "btn-outline-dark"} rounded-pill w-50 p-2`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            </div>
          ))}
        </div>


        <div className="row gx-2 ms-1">
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
                      src={product.images || blank_img}
                      alt={product.name}
                      className="img-fluid rounded-top"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="product-details p-3">
                    <div onClick={() => handleBuyClick(product)} style={{ cursor: "pointer" }}>
                      <h3 className="product-name fw-bold">{product.name}</h3>
                      <p className="product-description text-muted">
                        {truncateText(product.description, 10)}
                      </p>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                      <button
                        type="button"
                        className="btn btn-outline-dark rounded-pill me-2"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to cart
                      </button>
                    </div>
                    <h3 className="product-price fw-bold">${product.price}</h3>
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
  );
};

export default StylistCategories;
