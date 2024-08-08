import React from "react";
import imagepreview from "../../assets/addclothes/add-photo-style.png";
import "../../styles/AddClothes.css";

const AddClothes = () => {
  return (
    <div className="d-flex justify-content-center align-items-center add-clothes-card">
      <div className="container w-75">
        <h1 className="text-center fw-bold fs-1">Add Clothes</h1>
        <div className="card card-btn">
          <div className="card-body">
            <div className="row g-2">
              <div className="col-md-4 col-sm-12">
                <div className="p-3">
                  <label htmlFor="category" className="form-label text-white">
                    Category
                  </label>
                  <select className="form-select rounded-pill" aria-label="category">
                    <option selected>Select</option>
                    <option value="1">Jeans</option>
                    <option value="2">Shirt</option>
                    <option value="3">Paint</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="p-3">
                  <label htmlFor="color" className="form-label text-white">
                    Color
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="color"
                    aria-describedby="color"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="p-3">
                  <label htmlFor="typeof-clothes" className="form-label text-white">
                    Type of Clothes
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="typeof-clothes"
                    aria-describedby="Type of Clothes"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="p-3">
                  <label htmlFor="season" className="form-label text-white">
                    Season
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="season"
                    aria-describedby="season"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="p-3">
                  <label htmlFor="brand" className="form-label text-white">
                    Brand
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="brand"
                    aria-describedby="brand"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="p-3">
                  <label htmlFor="purchaseDate" className="form-label text-white">
                    Purchase Date
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="purchaseDate"
                    aria-describedby="purchaseDate"
                  />
                </div>
              </div>
              <div className="col-12 col-md-10">
                <div className="p-3">
                  <label htmlFor="description" className="form-label text-white">
                    Description
                  </label>
                  <textarea
                    style={{ height: "100px" }}
                    className="form-control"
                    placeholder="Description"
                    id="description"
                  ></textarea>
                </div>
              </div>
              <div className="col-12 col-md-2 d-flex justify-content-center align-items-center">
                <div className="p-3 text-center">
                  <div className="mt-4">
                    <img src={imagepreview} height={100} alt="Preview" />
                  </div>
                  <label htmlFor="purchaseDate" className="form-label text-white">
                    Add Images
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="rounded-pill fs-5 fw-bold btn btn-light add-btn"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClothes;
