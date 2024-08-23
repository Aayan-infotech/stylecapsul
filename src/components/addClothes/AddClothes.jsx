import React, { useState } from "react";
import imagepreview from "../../assets/addclothes/add-photo-style.png";
import "../../styles/AddClothes.scss";
import { useDispatch, useSelector } from 'react-redux';
import { addClothes } from '../../reduxToolkit/addClothesSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddClothes = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(imagepreview);

  const [formData, setFormData] = useState({
    category: '',
    color: '',
    typeOfCloths: '',
    season: '',
    brand: '',
    purchaseDate: '',
    description: '',
    image: null,
  });

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
    document.getElementById('imageUpload').click();
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const addclothesresponse = dispatch(addClothes(data));
      if (addclothesresponse) {
        toast.success(addclothesresponse?.message, {
          autoClose: 1000,
          style: { backgroundColor: '#28a745', color: '#fff' }
        });
        // setTimeout(() => {
        //   if (addclothesresponse?.success === true && addclothesresponse?.status === 200) {
        //     navigate("/home");
        //   }
        // }, 1000);
        // setFormData({
        //   category: '',
        //   color: '',
        //   typeOfCloths: '',
        //   season: '',
        //   brand: '',
        //   purchaseDate: '',
        //   description: '',
        //   image: null,
        // });
        setImagePreview(imagepreview);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage, {
        autoClose: 2000,
        style: { backgroundColor: '#dc3545', color: '#fff' }
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center add-clothes-card">
        <div className="container">
          <h1 className="text-center fw-bold fs-1">Add Clothes</h1>
          <div className="card card-btn">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-2">
                  <div className="col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label text-white">
                        Category
                      </label>
                      <select
                        className="form-select rounded-pill"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        aria-label="category"
                      >
                        <option value="" disabled>Select</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Paint">Paint</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label htmlFor="color" className="form-label text-white">
                        Color
                      </label>
                      <select
                        className="form-select rounded-pill"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        aria-label="color"
                      >
                        <option value="" disabled>Select</option>
                        <option value="Jeans">Pink</option>
                        <option value="Shirt">Blue</option>
                        <option value="Paint">Red</option>
                        <option value="Jeans">Yellow</option>
                        <option value="Shirt">Green</option>
                        <option value="Paint">Orange</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label htmlFor="typeof-clothes" className="form-label text-white">
                        Type of Clothes
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="typeof-clothes"
                        name="typeOfCloths"
                        value={formData.typeOfCloths}
                        onChange={handleChange}
                        aria-describedby="Type of Clothes"
                      />
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
                      <label htmlFor="purchaseDate" className="form-label text-white">
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
                      <label htmlFor="description" className="form-label text-white">
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
                    <div className="col-12 col-md-2 d-flex justify-content-center align-items-center">
                      <div className="text-center">
                        <div className="mt-4">
                          <img
                            src={imagePreview}
                            height={100}
                            alt="Preview"
                            onClick={handleImageClick}
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                        <label htmlFor="purchaseDate" className="form-label text-white fw-bold">Add Images</label>
                        <input
                          type="file"
                          id="imageUpload"
                          name="image"
                          accept="image/*"
                          onChange={handleChange}
                          style={{ display: 'none' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-pill fs-5 fw-bold btn btn-light add-btn">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};

export default AddClothes;
