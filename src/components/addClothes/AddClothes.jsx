import React, { useEffect, useState } from "react";
import imagepreview from "../../assets/addclothes/add-photo-style.png";
import "../../styles/AddClothes.scss";
import { useDispatch } from "react-redux";
import { addClothes } from "../../reduxToolkit/addClothesSlice";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { getCookie } from "../../utils/cookieUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const AddClothes = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [eventSeasons, setEventSeasons] = useState([]);
  const [allTypeFromSubCategory, setAllTypeFromSubCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedTypeCategory, setSelectedTypeCategory] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [removedExistingImages, setRemovedExistingImages] = useState([]);

  const [btnLoader, setBtnLoader] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    part: "",
    typeOfFashion: "",
    season: "",
    purchaseDate: "",
    description: "",
    image: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = getCookie("authToken");
  const loggedInUserId = getCookie("userId");
  const updateNewCloth = location?.state?.updateCloth;

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(apiUrl("api/closet/get-closet"));
      if (response?.data?.status === 200 && response?.data?.success === true) {
        setCategories(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(
        apiUrl(`api/closet/closet-subcategory/get?categoryId=${categoryId}`)
      );
      if (response?.data?.status === 200 && response?.data?.success === true) {
        setSubCategories(response?.data?.data[0]?.subcategory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    fetchAllSubCategories(categoryId);
  };

  const handleSubCategoryChange = (e) => {
    const subCategoryType = e.target.value;
    const selectedSubCategoryObj = subCategories.find(
      (sub) => sub.name === subCategoryType
    );
    setSelectedSubCategory(
      selectedSubCategoryObj ? selectedSubCategoryObj.name : ""
    );
    fetchAllTypeFromSubCategory(subCategoryType);
  };

  const fetchAllTypeFromSubCategory = async (subCategoryType) => {
    try {
      const response = await axios.get(
        apiUrl(
          `api/closet/closet-subcategory/type/get?subcategoryName=${subCategoryType}`
        )
      );
      if (response?.data?.status === 200 && response?.data?.success === true) {
        setAllTypeFromSubCategory(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllSeasons = async (categoryId) => {
    try {
      const response = await axios.get(apiUrl("api/entity/getEntity?type=season"));
      if (response?.data?.status === 200 && response?.data?.success === true) {
        setEventSeasons(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllSeasons();
  }, []);

  useEffect(() => {
    if (updateNewCloth) {
      setFormData({
        category: updateNewCloth.category?._id || "",
        part: updateNewCloth.part || "",
        typeOfFashion: updateNewCloth.typeOfFashion || "",
        season: updateNewCloth.season || "",
        purchaseDate: updateNewCloth.purchaseDate?.split("T")[0] || "",
        description: updateNewCloth.description || "",
        image: null,
      });
      setImagePreview(updateNewCloth.pictures || "");
      setSelectedCategory(updateNewCloth.category?._id || "");
      const categoryId = updateNewCloth.category?._id;
      fetchAllSubCategories(categoryId);
      setSelectedSubCategory(updateNewCloth.subcategory || "");
      fetchAllTypeFromSubCategory(updateNewCloth.subcategory);
    }
  }, [updateNewCloth]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      const imageFiles = Array.from(files);
      if (formData?.image?.length + imageFiles?.length > 3) {
        showErrorToast("You can upload a maximum of 3 images.");
        return;
      }
      const previewUrls = imageFiles.map((file) => URL.createObjectURL(file));
      setFormData((prevData) => ({
        ...prevData,
        image: prevData.image ? [...prevData.image, ...imageFiles] : imageFiles,
      }));

      setImagePreview((prevPreviews) => [...prevPreviews, ...previewUrls]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = (index) => {
    const isExistingImage = typeof imagePreview[index] === "string";

    if (isExistingImage) {
      setRemovedExistingImages((prev) => [...prev, imagePreview[index]]);
    }

    setImagePreview((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );

    setFormData((prevData) => {
      const updatedImages = [...prevData.image || []];
      updatedImages.splice(index, 1);
      return {
        ...prevData,
        image: updatedImages,
      };
    })
    // setFormData((prevData) => ({
    //   ...prevData,
    //   image: Array.isArray(prevData.image)
    //     ? prevData.image.filter((_, i) => i !== index || typeof imagePreview[i] === "string")
    //     : [],
    // }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoader(true);
    const data = new FormData();
    data.append("category", selectedCategory);
    data.append("subcategory", selectedSubCategory);
    data.append("part", formData.part);
    data.append("type", selectedTypeCategory);
    data.append("season", formData.season);
    data.append("purchaseDate", formData.purchaseDate);
    data.append("description", formData.description);
    if (!loggedInUserId) {
      showErrorToast("User ID is missing. Please log in again.");
      setBtnLoader(false);
      return;
    }
    data.append("loggedInUserId", loggedInUserId);
    if (formData.image && formData.image.length > 0) {
      formData.image.forEach((image) => {
        data.append("pictures", image);
      });
    }
    const existingImagesToSend = (updateNewCloth?.pictures || []).filter(
      (img) => !removedExistingImages.includes(img)
    );
    existingImagesToSend.forEach((picUrl) => {
      data.append("existingPictures", picUrl);
    });


    try {
      let response;
      if (updateNewCloth) {
        response = await axios.put(apiUrl(`api/cloths/update-cloths/${updateNewCloth._id}`), data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
        );
        showSuccessToast(response?.data?.message);
        setTimeout(() => {
          navigate("/closet-categories")
        });
      } else {
        response = await dispatch(addClothes(data)).unwrap();
        showSuccessToast("Cloth added successfully..!");
        if (response.success && response.status === 200) {
          showSuccessToast(response?.data?.message);
          setTimeout(() => {
            navigate("/closet-management");
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

  const todayDate = new Date().toISOString().split("T")[0];

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
                  <select className="form-select rounded-pill p-2" onChange={handleCategoryChange} name="category" value={selectedCategory || updateNewCloth?.category?._id || ""}>
                    <option value="">Select Category</option>
                    {categories?.map((cat) => (
                      <option key={cat?._id} value={cat?._id}>
                        {cat?.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCategory && (
                  <div className="col-md-4">
                    <label className="form-label">SubCategory</label>
                    <select className="form-select rounded-pill p-2" onChange={handleSubCategoryChange} name="subcategory" value={selectedSubCategory || updateNewCloth?.subCategories?.name || ""}>
                      <option value="">Select SubCategory</option>
                      {subCategories?.map((sub, idx) => (
                        <option key={sub?._id || `sub-${idx}`} value={sub?._id}>
                          {sub?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedSubCategory && (
                  <div className="col-md-4">
                    <label className="form-label">Type</label>
                    <select className="form-select rounded-pill p-2" value={selectedTypeCategory || updateNewCloth?.typeOfFashion || ""} onChange={(e) => setSelectedTypeCategory(e.target.value)}>
                      <option value="">Select Type Category</option>
                      {allTypeFromSubCategory?.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="col-md-4">
                  <label className="form-label">Event & Season</label>
                  <select className="form-select rounded-pill p-2" name="season" onChange={handleChange} value={formData.season || updateNewCloth?.season || ""}>
                    <option value="">Select Event & Season</option>
                    {eventSeasons.map((event, index) => (
                      <option key={index} value={event?.name}>
                        {event?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 col-sm-12">
                  <div className="mb-3">
                    <label htmlFor="part" className="form-label text-white">  Select Out Fit</label>
                    <select className="form-select rounded-pill p-2" name="part" onChange={handleChange} value={formData.part} aria-label="part">
                      <option value="" disabled>  Select</option>
                      <option value="outfitTop">Out Fit Top</option>
                      <option value="outfitBottom">Out Fit Bottom</option>
                      <option value="outfitFootwear">Out Fit Footwear</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-4 col-sm-12">
                  <div className="mb-3">
                    <label htmlFor="purchaseDate" className="form-label text-white">  Purchase Date</label>
                    <input type="date" className="form-control rounded-pill" id="purchaseDate" name="purchaseDate" onChange={handleChange} value={formData.purchaseDate} min={todayDate} aria-describedby="purchaseDate" />
                  </div>
                </div>

                <div className="col-12 col-md-10">
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label text-white">  Description</label>
                    <textarea style={{ height: "100px" }} className="form-control" placeholder="Description" id="description" maxLength={250} name="description" value={formData.description} onChange={handleChange}></textarea>
                    <small className={`d-block mt-1 ${formData.description.length === 250 ? "text-danger" : "text-white"}`} style={{ fontSize: "0.85rem" }}>
                      {formData.description.length}/250 characters used
                    </small>
                  </div>
                </div>

                <div className="col-12 col-md-2 d-flex justify-content-center align-items-center">
                  <div className="text-center mb-4 mb-lg-0">
                    <div className="mt-lg-4">
                      <label htmlFor="imageUpload" className="form-label text-white fw-bold" style={{ cursor: "pointer" }}>
                        <i className="fa-solid fa-upload fa-2x"></i>
                      </label>
                      <input type="file" id="imageUpload" name="image" accept="image/*" multiple onChange={handleChange} style={{ display: "none" }} />
                    </div>
                  </div>
                </div>

                {Array.isArray(imagePreview) && imagePreview.length > 0 && (
                  <div className="col-12 mt-3">
                    <h5 className="text-white">Uploaded Images</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {imagePreview?.map((src, index) => (
                        <div key={index} className="position-relative" style={{ display: "inline-block" }}>
                          <img src={src} height={100} alt={`Preview ${index + 1}`} style={{ margin: "5px", borderRadius: "8px" }} />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="btn btn-danger btn-sm position-absolute bottom-0 end-0"
                            style={{
                              borderRadius: "50%",
                              padding: "6px 10px",
                              width: "35px",
                              height: "35px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "1rem",
                              zIndex: 2,
                            }}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button type="submit" className="rounded-pill fs-5 fw-bold btn btn-light add-btn" disabled={btnLoader}>
                  {btnLoader ? (
                    <span>
                      <i className="fa-solid fa-spinner fa-spin me-2"></i>{" "}
                      {updateNewCloth ? "Updating..." : "Adding..."}
                    </span>
                  ) : updateNewCloth ? (
                    "Update"
                  ) : (
                    "Add Clothes"
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
