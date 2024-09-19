import React, { useState } from "react";
import "../../styles/StylistCategories.scss";
import showimg2 from "../../assets/marketplace/showimg2.jpg";
import showimg3 from "../../assets/marketplace/showimg3.jpg";
import cat_image from "../../assets/marketplace/showimg7.jpg";
import cat_image1 from "../../assets/marketplace/showimg6.jpg";
import cat_image3 from "../../assets/marketplace/showimg8.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reduxToolkit/addcartSlice";
import { getCookie } from "../../utils/cookieUtils";

const StylistCategories = () => {
  const shopebystyles = [
    {
      id: 1,
      name: "Shirt",
      imgSrc: "path/to/shopeimage1",
      subcategories: [
        {
          id: 1,
          name: "Casual Shirts",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
          price: 28,
          category: "Buy",
          image: cat_image,
          price: "200"
        },
        {
          id: 2,
          name: "Casual Shirts",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
          price: 28,
          category: "Rent",
          image: cat_image1,
          price: "200"
        },
        {
          id: 3,
          name: "Formal Shirts",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
          price: 28,
          category: "Swap",
          image: cat_image3,
          price: "250"
        },
        {
          id: 4,
          name: "Skart Dress",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
          price: 28,
          category: "Rent",
          image: showimg3,
          price: "800"
        },
        {
          id: 5,
          name: "Skart Dress",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
          price: 28,
          category: "Swap",
          image: showimg2,
          price: "2200"
        },
      ],
    },
  ];
  
  const [selectedCategory, setSelectedCategory] = useState("Buy");
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = getCookie("userId");
  const { categoryId } = useParams();

  const category = shopebystyles.find(
    (cat) => cat.id === parseInt(categoryId, 10)
  );

  const getFilteredProducts = () => {
    return category?.subcategories.filter(
      (product) => product?.category === selectedCategory
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
        quantity: quantity // Pass the quantity here
      }
    });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      userId,
      productId: product?.id,
      quantity: quantity // Use the quantity from state
    }));
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
          {getFilteredProducts()?.map((product, index) => (
            <div key={index} className="col-12 col-md-4 p-3">
              <div className="product-card rounded-pill text-center">
                <div className="image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid rounded-top"
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
          ))}
        </div>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary rounded-pill w-25 p-2"
            style={{ backgroundColor: "black" }}
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default StylistCategories;
