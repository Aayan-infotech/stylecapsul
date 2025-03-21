import React, { useRef, useState } from "react";
import "../../styles/closetManagement.scss";
import imagefocus from "../../assets/closetmanagement/image-focus.png";
import image2 from "../../assets/stylist/img2.png";
import image3 from "../../assets/stylist/img5.png";
import shirt from "../../assets/closetmanagement/shirts.jfif";
import { apiUrl } from "../../../apiUtils";
import axios from "axios";
import { getCookie } from "../../utils/cookieUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";
import Loader from "../Loader/Loader";
import blank_image from "../../assets/stylist/blank_img.jpg";
import { Button } from "@mui/material";

const StyleScan = () => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const fileInputRefs = useRef({});
  const [filteredImages, setFilteredImages] = useState(null);
  const auth_token = getCookie("authToken");

  const cardData = [
    { id: 1, title: "Dress", imageScanIcon: imagefocus, backimageUrl: image3 },
    { id: 2, title: "Shoes", imageScanIcon: imagefocus, backimageUrl: image2 },
    { id: 3, title: "Shirt", imageScanIcon: imagefocus, backimageUrl: shirt },
    { id: 4, title: "T-shirt", imageScanIcon: imagefocus, backimageUrl: shirt },
  ];

  const handleFileChange = (event, item) => {
    const file = event.target.files[0];
    if (file) {
      const newPreviewUrl = URL.createObjectURL(file);
      setSelectedFiles((prev) => ({ ...prev, [item.id]: newPreviewUrl }));
      uploadImage(file, item.id);
    }
  };

  const uploadImage = async (file, id) => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("picture", file);
    try {
      const response = await axios.post(
        apiUrl("api/cloths/styleScan"),
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        }
      );
      if (response?.status === 200 && response?.data?.success === true) {
        setFilteredImages(response?.data?.data);
        showSuccessToast(response?.data?.message);
      }
    } catch (error) {
      showErrorToast(response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setFilteredImages(null);
    setSelectedFiles({});
    fileInputRefs.current = {};
  };

  return (
    <div className="closet-management-container">
      <h1 className="text-center fw-bold fs-1">Style Scan</h1>
      {filteredImages !== null && (
        <div className="text-center mt-4">
          <Button variant="outlined" className="mb-4" onClick={resetSearch}>Reset Search</Button>
        </div>
      )}
      <div className="container text-center">
        <div className="row gy-2 w750">
          {cardData.map((item) => (
            <div
              className="col-12 col-md-3 d-flex justify-content-center align-items-center"
              key={item.id}
            >
              <div className="image_scanner_card">
                <div className="black">
                  <img
                    src={selectedFiles[item.id] || item.backimageUrl}
                    className="show_back_image"
                    alt={item.title}
                  />
                </div>
                <div className="text-white card_title">
                  <h4 className="fw-bold">{item.title}</h4>
                </div>
                <div
                  className="pos-icon"
                  onClick={() => fileInputRefs.current[item.id].click()}
                >
                  <img
                    src={item.imageScanIcon}
                    className="scanner_icon"
                    alt="Scan Icon"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => (fileInputRefs.current[item.id] = el)}
                  style={{ display: "none" }}
                  onChange={(event) => handleFileChange(event, item)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredImages !== null && filteredImages.length > 0 && (
        <div className="row mt-5 mb-5 d-flex justify-content-center align-items-center">
          {filteredImages.map((item, index) => (
            <div
              key={index}
              className="col-12 col-md-3 filtered-item rounded-3"
            >
              <img
                src={item?.picture}
                alt="Uploaded Item"
                className="img-fluid rounded"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StyleScan;
