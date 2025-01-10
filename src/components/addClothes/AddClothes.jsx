import React, { useEffect, useState } from "react";
import imagepreview from "../../assets/addclothes/add-photo-style.png";
import "../../styles/AddClothes.scss";
import { useDispatch, useSelector } from "react-redux";
import { addClothes } from "../../reduxToolkit/addClothesSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { getCookie } from "../../utils/cookieUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const AddClothes = () => {
  const clothingTypes = [
    { value: "", label: "Select", disabled: true },
    { value: "jeans", label: "Jeans" },
    { value: "shirt", label: "Shirt" },
    { value: "pant", label: "Pant" },
    { value: "watch", label: "Watch" },
    { value: "t-shirt", label: "T-shirt" },
    { value: "dress", label: "Dress" },
    { value: "skirt", label: "Skirt" },
    { value: "shorts", label: "Shorts" },
    { value: "jacket", label: "Jacket" },
    { value: "sweater", label: "Sweater" },
    { value: "hoodie", label: "Hoodie" },
    { value: "blouse", label: "Blouse" },
    { value: "suit", label: "Suit" },
    { value: "coat", label: "Coat" },
    { value: "leggings", label: "Leggings" },
    { value: "cardigan", label: "Cardigan" },
    { value: "vest", label: "Vest" },
    { value: "romper", label: "Romper" },
    { value: "jumpsuit", label: "Jumpsuit" },
    { value: "activewear", label: "Activewear" },
    { value: "swimwear", label: "Swimwear" },
    { value: "pajamas", label: "Pajamas" },
    { value: "robe", label: "Robe" },
    { value: "scarf", label: "Scarf" },
    { value: "hat", label: "Hat" },
    { value: "gloves", label: "Gloves" },
    { value: "belt", label: "Belt" },
    { value: "jewelry", label: "Jewelry" },
    { value: "costume", label: "Costume" },
    { value: "top", label: "Top" },
    { value: "leggings", label: "Leggings" },
  ];

  const { user, status, error } = useSelector((state) => state.login);
  const [imagePreview, setImagePreview] = useState(imagepreview);
  const [btnLoader, setBtnLoader] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    part: "",
    typesOfCloths: "",
    season: "",
    brand: "",
    purchaseDate: "",
    description: "",
    image: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = getCookie("authToken");
  console.log(token);
  const updateNewCloth = location?.state?.updateCloth;
  const currentCategory = location.state?.currentCategory;

  useEffect(() => {
    if (updateNewCloth) {
      setFormData({
        category: updateNewCloth?.category
          ? updateNewCloth?.category.toLowerCase()
          : "",
        part: updateNewCloth.part || "",
        typesOfCloths: updateNewCloth.typesOfCloths || "",
        season: updateNewCloth.season || "",
        brand: updateNewCloth.brand || "",
        purchaseDate: updateNewCloth?.purchaseDate
          ? updateNewCloth?.purchaseDate.split("T")[0]
          : "",
        description: updateNewCloth.description || "",
        image: null,
      });
      setImagePreview(updateNewCloth.picture || "");
    }
  }, [updateNewCloth]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setFormData({
        ...formData,
        image: files[0],
      });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageClick = () => {
    document.getElementById("imageUpload").click();
  };
  const currentDate = new Date().toISOString().split("T")[0]
  const validateForm = () => {
    const {
      category,
      part,
      typesOfCloths,
      season,
      brand,
      purchaseDate,
      description,
    } = formData;
    return (
      category &&
      part &&
      typesOfCloths &&
      season &&
      brand &&
      purchaseDate &&
      description
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showErrorToast("All fields are required!");
      return;
    }
    setBtnLoader(true);
    const data = new FormData();
    for (let key in formData) {
      const value = formData[key];
      if (key === "image" && value === null && updateNewCloth) {
        data.append("picture", updateNewCloth.picture);
      } else {
        data.append(key === "image" ? "picture" : key, value);
      }
    }
    try {
      if (updateNewCloth) {
        data.append("user_id", updateNewCloth.user_id);
        const response = await axios.put(
          apiUrl(`api/cloths/update-cloths/${updateNewCloth._id}`),
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        showSuccessToast(response?.data?.message);
        setTimeout(() => {
          navigate(`/all-clothes-list/${location.state?.currentCategory}`);
        }, 1000);
      } else {
        const userId = user?.payload?._id;
        if (userId) {
          data.append("user_id", userId);
        }
        const addclothesresponse = await dispatch(addClothes(data)).unwrap();
        showSuccessToast(addclothesresponse?.message);
        if (addclothesresponse.success && addclothesresponse.status === 200) {
          setTimeout(() => {
            navigate("/closet-categories");
          }, 1000);
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage, {
        autoClose: 2000,
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
    } finally {
      setBtnLoader(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="add-clothes-card">
        <h1 className="text-center fw-bold fs-1">Add Clothes</h1>
        <div className="container">
          <div className="card card-btn">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="w-100">
                <div className="row g-2 w-100 m-0">
                  <div className="col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label
                        htmlFor="category"
                        className="form-label text-white"
                      >
                        Category
                      </label>
                      <select
                        className="form-select rounded-pill"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        aria-label="category"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="clothes">Clothe</option>
                        <option value="shoes">Shoes</option>
                        <option value="accessories">Accessories</option>
                        <option value="miscellaneous">Miscellaneous</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label htmlFor="part" className="form-label text-white">
                        Select Out Fit
                      </label>
                      <select
                        className="form-select rounded-pill"
                        name="part"
                        value={formData.part}
                        onChange={handleChange}
                        aria-label="part"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="outfitTop">Out Fit Top</option>
                        <option value="outfitBottom">Out Fit Bottom</option>
                        <option value="outfitFootwear">Out Fit Footwear</option>
                        {/* <option value="yellow">Yellow</option>
                        <option value="green">Green</option>
                        <option value="orange">Orange</option> */}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label
                        htmlFor="category"
                        className="form-label text-white"
                      >
                        Type of Clothes
                      </label>
                      <select
                        className="form-select rounded-pill"
                        id="typeof-clothes"
                        name="typesOfCloths"
                        value={formData.typesOfCloths}
                        onChange={handleChange}
                        aria-label="category"
                      >
                        {clothingTypes.map((type) => (
                          <option
                            key={type.value}
                            value={type.value}
                            disabled={type.disabled}
                          >
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label htmlFor="season" className="form-label text-white">
                        Season
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="season"
                        name="season"
                        value={formData.season}
                        onChange={handleChange}
                        aria-describedby="season"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label htmlFor="brand" className="form-label text-white">
                        Brand
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        aria-describedby="brand"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label
                        htmlFor="purchaseDate"
                        className="form-label text-white"
                      >
                        Purchase Date
                      </label>
                      <input
                        type="date"
                        className="form-control rounded-pill"
                        id="purchaseDate"
                        name="purchaseDate"
                        value={formData.purchaseDate}
                        onChange={handleChange}
                        aria-describedby="purchaseDate"
                        min={currentDate}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-10">
                    <div className="mb-3">
                      <label
                        htmlFor="description"
                        className="form-label text-white"
                      >
                        Description
                      </label>
                      <textarea
                        style={{ height: "100px" }}
                        className="form-control"
                        placeholder="Description"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-12 col-md-2 d-flex justify-content-center align-items-center">
                    <div className="text-center mb-4 mb-lg-0">
                      <div className="mt-lg-4 ">
                        <img
                          src={imagePreview}
                          height={100}
                          alt="Preview"
                          onClick={handleImageClick}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <label
                        htmlFor="purchaseDate"
                        className="form-label text-white fw-bold"
                      >
                        Add Images
                      </label>
                      <input
                        type="file"
                        id="imageUpload"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-pill fs-5 fw-bold btn btn-light add-btn"
                >
                  {/* {updateNewCloth ? "Update" : "Add"} */}
                  {btnLoader ? (
                    <span>
                      <i className="fa-solid fa-spinner fa-spin me-2"></i>{" "}
                      Adding...
                    </span>
                  ) : updateNewCloth ? (
                    "Update"
                  ) : (
                    "Add"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddClothes;
