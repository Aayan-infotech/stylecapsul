import React, { useEffect, useState } from "react";
import imagepreview from "../../assets/addclothes/add-photo-style.png";
import "../../styles/AddClothes.scss";
import { useDispatch, useSelector } from "react-redux";
import { addClothes } from "../../reduxToolkit/addClothesSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { getCookie } from "../../utils/cookieUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const AddClothes = () => {
  const clothingTypes = [
    { value: "", label: "Select", disabled: true },
    { value: "Boots & Booties", label: "Boots & Booties" },
    { value: "Pumps & Heels", label: "Pumps & Heels" },
    { value: "Sandals", label: "Sandals" },
    { value: "Sneakers", label: "Sneakers" },
    { value: "Loafers", label: "Loafers" },
    { value: "Flats", label: "Flats" },
    { value: "Mules & Slides", label: "Mules & Slides" },
    { value: "Slippers", label: "Slippers" },

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

  const categories = ["Clothing", "Handbags", "Shoes", "Jewelry & Accessories"];
  const subCategories = {
    Clothing: [
      "Tops", "Bottoms", "Dresses", "Matching Sets", "Tailored Suiting",
      "Sleepwear", "Activewear", "Lingerie & Shapewear", "Swimwear & Cover Ups",
      "Jackets & Blazers", "Sweaters", "Skirts", "Coats", "Jeans",
      "Pants & Shorts", "Belts", "Scarves", "Hats"
    ],
    Handbags: ["Handbags"],
    Shoes: ["Shoes"],
    "Jewelry & Accessories": ["Jewelry", "Accessories"]
  };

  const types = {
    Shoes: {
      Women: ["Boots & Booties", "Pumps & Heels", "Sandals", "Sneakers", "Loafers", "Flats", "Mules & Slides", "Slippers"],
      Men: ["Sneakers", "Loafers & Slip-Ons", "Oxfords & Derby's", "Dress Shoes", "Sandals & Slides", "Boots", "Slippers"]
    }
  };

  const eventSeasons = [
    "Fall", "Winter", "Spring", "Summer", "Evening", "Daytime", "Casual", "Work", "Special Occasion"
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedTypeCategory, setSelectedTypeCategory] = useState("");

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
  const loggedInUserId = getCookie("userId");
  const updateNewCloth = location?.state?.updateCloth;

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
      if (key === "image" && formData[key] === null && updateNewCloth) {
        data.append("picture", updateNewCloth.picture);
      } else {
        data.append(key === "image" ? "picture" : key, formData[key]);
      }
    }
    if (!loggedInUserId) {
      showErrorToast("User ID is missing. Please log in again.");
      setBtnLoader(false);
      return;
    }
    data.append("loggedInUserId", loggedInUserId);
    try {
      if (updateNewCloth) {
        data.append("loggedInUserId", updateNewCloth.loggedInUserId);
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
        if (loggedInUserId) {
          data.append("loggedInUserId", loggedInUserId);
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
      showErrorToast(errorMessage);
    } finally {
      setBtnLoader(false);
    }
  };

  return (
    <>
      <div className="add-clothes-card">
        <h1 className="text-center fw-bold fs-1">Add Clothes</h1>
        <div className="container">
          <div className="card card-btn">
            <div className="card-body">
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-4">
                  <label className="form-label">Category</label>
                  <select className="form-select rounded-pill"
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      handleChange(e);
                    }}
                    name="category"
                    value={formData.category}>
                    <option value="">Select Category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {selectedCategory && subCategories[selectedCategory] && (
                  <div className="col-md-4">
                    <label className="form-label">SubCategory</label>
                    <select className="form-select rounded-pill" onChange={(e) => setSelectedSubCategory(e.target.value)}>
                      <option value="">Select SubCategory</option>
                      {subCategories[selectedCategory].map((sub, index) => (
                        <option key={index} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedSubCategory === "Shoes" && (
                  <div className="col-md-4">
                    <label className="form-label">Type</label>
                    <select className="form-select rounded-pill" onChange={(e) => setSelectedTypeCategory(e.target.value)}>
                      <option value="">Select Type Category</option>
                      <option value="Women">For Women</option>
                      <option value="Men">For Men</option>
                    </select>
                  </div>
                )}

                {selectedTypeCategory && types.Shoes[selectedTypeCategory] && (
                  <div className="col-md-4">
                    <label className="form-label">Type</label>
                    <select className="form-select rounded-pill">
                      <option value="">Select Type</option>
                      {types.Shoes[selectedTypeCategory].map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="col-md-4">
                  <label className="form-label">Event & Season</label>
                  <select className="form-select rounded-pill"
                    name="season"
                    value={formData.season}
                    onChange={handleChange}>
                    <option value="">Select Event & Season</option>
                    {eventSeasons.map((event, index) => (
                      <option key={index} value={event}>{event}</option>
                    ))}
                  </select>
                </div>
              </form>
              {/* ------------------------------------------------------------------------------------------ */}
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
                        <option value="" disabled>Select Category</option>
                        {categories.map((cat, index) => (
                          <option key={index} value={cat}>{cat}</option>
                        ))}
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
                        onChange={handleChange}
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
