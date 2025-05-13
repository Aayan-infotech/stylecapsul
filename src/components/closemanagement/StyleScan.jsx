import React, { useRef, useState } from "react";
import "../../styles/closetManagement.scss";
import imagefocus from "../../assets/closetmanagement/image-focus.png";
import image3 from "../../assets/stylist/img5.png";
import { apiUrl } from "../../../apiUtils";
import axios from "axios";
import { getCookie } from "../../utils/cookieUtils";
import { Button } from "@mui/material";
import { showSuccessToast } from "../toastMessage/Toast";

const StyleScan = () => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const fileInputRefs = useRef({});
  const [filteredImages, setFilteredImages] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const auth_token = getCookie("authToken");

  const cardData = [{ id: 1, title: "Select Dress", imageScanIcon: imagefocus, backimageUrl: image3 }];

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
    setUploadingId(id);
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(apiUrl("api/stylescan/style-scan"), formData, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      });
      const result = response?.data;
      showSuccessToast(response?.data.message || "Showing closest match.");
      setStatusMessage(result?.message || "No response message provided.");
      if (result?.success && result?.match) {
        const matchImages = result.match.pictures?.map((pic) => ({ ...result.match, picture: pic })) || [];
        setFilteredImages(matchImages);
      } else if (result?.bestMatch) {
        const bestMatchImage = {
          ...result.bestMatch,
          picture: result.bestMatch.pictures?.[0],
        };
        setFilteredImages([bestMatchImage]);
        showInfoToast(result.message || "Showing closest match.");
      } else {
        setFilteredImages([]);
      }
    } catch (error) {
      setStatusMessage(error?.response?.data?.message || "Something went wrong");
      setFilteredImages([]);
    } finally {
      setUploadingId(null);
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setFilteredImages(null);
    setSelectedFiles({});
    setStatusMessage("");
    setUploadingId(null);
    setLoading(false);
    Object.keys(fileInputRefs.current).forEach((key) => {
      const input = fileInputRefs.current[key];
      if (input && input.value) {
        input.value = null;
      }
    });
  };


  return (
    <div className="closet-management-container">
      <h1 className="text-center fw-bold fs-1">Style Scan</h1>
      {filteredImages !== null && (
        <div className="text-center mt-4">
          <Button variant="outlined" className="mb-4" sx={{ bgcolor: "black", borderRadius: "50px", color: "white", textTransform: "none" }} onClick={resetSearch}>Reset Search</Button>
        </div>
      )}
      <div className="container text-center">
        <div className="row gy-2 w750">
          {filteredImages && filteredImages.length > 0 ? (
            <>
              <div className="col-12 text-center">
                <p className="main-message">{statusMessage || "Suggested item from your wardrobe"}</p>
              </div>
              <div className="col-12 d-flex justify-content-center flex-wrap gap-3">
                {filteredImages.map((item, index) => (
                  <div key={index} className="image_scanner_card">
                    <img
                      src={item?.picture || item?.pictures?.[0]}
                      alt="Matched Item"
                      className="img-fluid rounded"
                      style={{ width: '200px', height: '200px' }}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            cardData.map((item) => (
              <div className="col-12 d-flex justify-content-center align-items-center" key={item.id}>
                <div className="image_scanner_card position-relative">
                  <div className="black">
                    <img src={selectedFiles[item.id] || item.backimageUrl} className="show_back_image" alt={item.title} />
                    {uploadingId === item.id && (
                      <div className="image-loader-overlay">
                        <div className="spinner-border text-light" role="status"></div>
                        <div className="text-white mt-2">Searching...</div>
                      </div>
                    )}
                  </div>
                  <div className="text-white card_title">
                    <h4 className="fw-bold mt-3">{item.title}</h4>
                  </div>
                  <div className="pos-icon" onClick={() => fileInputRefs.current[item.id].click()}>
                    <img src={item.imageScanIcon} className="scanner_icon" alt="Scan Icon" style={{ cursor: "pointer" }} />
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
            ))
          )}
        </div>
      </div>

    </div>
  );
};


export default StyleScan;

