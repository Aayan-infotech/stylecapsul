import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../styles/UploadScanImage.scss';
import imagepreview from "../../assets/addclothes/add-photo-style.png";

const UploadScanImage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const scannedImageDetails = location.state?.item;
    console.log(scannedImageDetails, 'scannedImageDetails');

    const [formData, setFormData] = useState({
        image: null,
        preview: imagepreview,
    });

    const fileInputRef = useRef(null);

    const handleChange = async (e) => {
        const { name, files } = e.target;
        if (name === "image" && files && files[0]) {
            const file = files[0];
            setFormData({
                ...formData,
                image: file,
                preview: URL.createObjectURL(file),
            });
            // const formDataToSend = new FormData();
            // formDataToSend.append('image', file);
            // try {
            //     const response = await axios.post('YOUR_API_ENDPOINT_HERE', formDataToSend, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //         },
            //     });

            //     console.log('Image uploaded successfully:', response.data);
            //     navigate('/scanned-image-wardrobe', {
            //         state: {
            //             imageUrl: response.data.imageUrl,
            //             title: scannedImageDetails?.title,
            //         }
            //     });
            // } catch (error) {
            //     console.error('Error uploading image:', error);
            // }
            navigate('/scanned-image-wardrobe', {
                state: {
                    imageUrl: URL.createObjectURL(file),
                    title: scannedImageDetails?.title || 'No Title',
                }
            });
        }
    };

    const handleScanImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="upload-image-scanner-container">
            <div className="container d-flex justify-content-center align-items-center">
                <div className="row gx-5 w-100">
                    <h1 className="text-center fw-bold fs-1">Style Scan</h1>
                    <div className="col-12 col-md-8 col-lg-6 d-flex justify-content-center align-items-center mx-auto">
                        <div className="p-3 border bg-secondary text-center w-100">
                            <p>Name: {scannedImageDetails?.title}</p>
                            <div className="mt-4">
                                <img
                                    src={formData.preview}
                                    height={100}
                                    alt="Preview"
                                    onClick={handleScanImageClick}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                            <label htmlFor="purchaseDate" className="form-label text-white fw-bold w-50">
                                Upload image by tapping on it & scan your item
                            </label>
                            <input
                                type="file"
                                id="imageUpload"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadScanImage;
