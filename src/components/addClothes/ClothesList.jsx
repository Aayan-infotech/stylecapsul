import React, { useEffect, useState } from "react";
import "../../styles/ClothesList.scss";
import { apiUrl } from "../../../apiUtils";
import axios from "axios";
import { format } from "date-fns";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import blank_img from "../../assets/stylist/blank_img.jpg";
import { getCookie } from "../../utils/cookieUtils";
import { useDispatch } from "react-redux";
import { allAddedClothList } from "../../reduxToolkit/addClothesSlice";
import Loader from "../Loader/Loader.jsx";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast.jsx";
import blank_cart from "../../assets/blankcart.gif";

function ClothesList() {
  const [loading, setLoading] = useState(true);
  const [categoryCloth, setCategoryCloth] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category } = useParams();
  const location = useLocation();
  const { category_name } = location.state || {};
  const token = getCookie("authToken");
  if (!token) {
    showErrorToast("token not found");
  }

  useEffect(() => {
    dispatch(allAddedClothList());
  }, [dispatch]);

  const fetchClothesByCategory = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    try {
      const response = await axios.get(
        apiUrl(`api/cloths/get-by-category/${category}`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, 'response')
      if (response.data.status === 200 && response.data.success === true) {
        console.log(response?.data, 'response')
        setCategoryCloth(response.data.cloths || []);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching clothes by category:", error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    if(token){
      fetchClothesByCategory();
    };
  }, [token]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const deleteCloth = async (cloth_id) => {
    try {
      const response = await axios.delete(
        apiUrl(`api/cloths/delete-cloth-item/${cloth_id}`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setCategoryCloth((prevClothes) =>
          prevClothes.filter((cloth) => cloth._id !== cloth_id)
        );
        showSuccessToast(response?.data?.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      showErrorToast(errorMessage);
    }
  };

  const updateCloth = (cloth) => {
    navigate("/add-clothes", {
      state: { updateCloth: cloth, currentCategory: category },
    });
  };

  const handleClothDetails = (cloth) => {
    navigate(`/clothes-details/${cloth?._id}`, {
      state: { category_name: category_name },
    });
  };

  const filteredClothes = categoryCloth.filter((cloth) =>
    cloth?.category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cloth?.typeOfFashion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="clothes-list-main-container">
          <div className="container w-75 clothes-list-container">
            <div className="row align-items-center mt-4">
              <div className="col-12 d-flex justify-content-between align-items-center flex-wrap">
                <h1 className="text-center fw-bold fs-1 mb-0">
                  {category_name || "N/A"}
                </h1>
                <div className="search-box ">
                  <i className="fa fa-search"></i>
                  <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
                </div>
              </div>
              {loading ? (
                <div className="col-12 text-center">
                  <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden text-black">
                      Loading...
                    </span>
                  </div>
                </div>
              ) : filteredClothes?.length > 0 ? (
                filteredClothes?.map((product, index) => (
                  <div className="col-12" key={index}>
                    <div className="products-container">
                      <div className="products-added rounded-pill" onClick={() => handleClothDetails(product)}>
                        <div className="product-img">
                          <img src={product?.pictures?.[0] || blank_img} alt="cloth" className="product-image" onError={(e) => (e.target.src = blank_img)} />
                        </div>
                        <div className="product-text">
                          <div className="first-text">
                            <h3 className="fw-bold fs-3">
                              {product?.category?.name}
                            </h3>
                            <p className="m-0">{product?.typeOfFashion}</p>
                            <p className="mt-0 m-0 p-0">  {format(new Date(product?.purchaseDate), "MM-dd-yyyy")}</p>
                          </div>
                          <button
                            type="button"
                            className="btn btn-outline-dark"
                            onClick={(e) => { e.stopPropagation(); updateCloth(product); }}>
                            <i className="fa-regular fa-pen-to-square"></i>
                          </button>
                        </div>
                      </div>
                      <i
                        className="fa-solid fa-circle-xmark close-icon"
                        onClick={() => deleteCloth(product._id)}
                      ></i>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <div className="no-clothes-message text-center mt-4">
                    <p>
                      <strong>Looks like your {category_name} wardrobe is waiting for its first masterpiece!</strong><br />
                      Start adding your favorite formal outfits to complete your collection. Whether it's a sharp suit, a classy dress, or your go-to business casual look, your perfect formal wardrobe is just a few clicks away.
                    </p>
                    <img src={blank_cart} alt="blank cart" height={300} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ClothesList;
