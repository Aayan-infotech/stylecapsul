import React, { useEffect, useState } from "react";
import imagepreview from "../../assets/addclothes/add-photo-style.png";
import "../../styles/AddClothes.scss";
import { useDispatch, useSelector } from 'react-redux';
import { addClothes } from '../../reduxToolkit/addClothesSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from '../../../apiUtils';

const AddClothes = () => {
  const { user, status, error } = useSelector((state) => state.login);
  const [imagePreview, setImagePreview] = useState(imagepreview);
  const [formData, setFormData] = useState({
    category: '',
    color: '',
    typesOfCloths: '',
    season: '',
    brand: '',
    purchaseDate: '',
    description: '',
    image: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const updateNewCloth = location?.state?.updateCloth;

  useEffect(() => {
    if (updateNewCloth) {
      setFormData({
        category: updateNewCloth?.category ? updateNewCloth?.category.toLowerCase() : '',
        color: updateNewCloth.color || '',
        typesOfCloths: updateNewCloth.typesOfCloths || '',
        season: updateNewCloth.season || '',
        brand: updateNewCloth.brand || '',
        purchaseDate: updateNewCloth?.purchaseDate ? updateNewCloth?.purchaseDate.split('T')[0] : '',
        description: updateNewCloth.description || '',
        image: null,
      });
      setImagePreview(updateNewCloth.picture || '');
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
    document.getElementById('imageUpload').click();
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      const value = formData[key];
      if (key === 'image' && value === null && updateNewCloth) {
        data.append('picture', updateNewCloth.picture);
      } else {
        data.append(key === 'image' ? 'picture' : key, value);
      }
    }
    try {
      if (updateNewCloth) {
        data.append('user_id', updateNewCloth.user_id);
        const response = await axios.put(apiUrl(`api/cloths/update-cloths/${updateNewCloth._id}`), data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        toast.success(response.data.message, {
          autoClose: 1000,
          style: { backgroundColor: '#28a745', color: '#fff' },
        });
        setTimeout(() => {
          navigate("/all-clothes-list");
        }, 1000);
      } else {
        const userId = user?.data?._id;
        if (userId) {
          data.append('user_id', userId);
        }
        const addclothesresponse = await dispatch(addClothes(data)).unwrap();
        toast.success(addclothesresponse.message, {
          autoClose: 1000,
          style: { backgroundColor: '#28a745', color: '#fff' }
        });
        if (addclothesresponse.success && addclothesresponse.status === 200) {
          setTimeout(() => {
            navigate("/all-clothes-list");
          }, 1000);
        }
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
                        <option value="cloth">Cloth</option>
                        <option value="shoes">Shoes</option>
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
                        <option value="pink">Pink</option>
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="yellow">Yellow</option>
                        <option value="green">Green</option>
                        <option value="orange">Orange</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label text-white">
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
                        <option value="" disabled>Select</option>
                        <option value="jeans">Jeans</option>
                        <option value="shirt">Shirt</option>
                        <option value="pant">Pant</option>
                        <option value="t-shirt">T-shirt</option>
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
                  {updateNewCloth ? "Update" : "Add"}
                </button>
                <Link to="/all-clothes-list">List</Link>
              </form>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};
export default AddClothes;
