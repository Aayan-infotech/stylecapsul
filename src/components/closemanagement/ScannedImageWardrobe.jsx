import React from 'react';
import '../../styles/UploadScanImage.scss';
import wardrobe from '../../assets/closetmanagement/wardrobe.jfif';
import { useLocation } from 'react-router-dom';
import notimageavailable from "../../assets/closetmanagement/no-image.png";

const ScannedImageWardrobe = () => {
    const location = useLocation();
    const { imageUrl, title } = location.state || {};

    return (
        <div className="upload-image-scanner-container">
            <div className="container d-flex justify-content-center align-items-center mt-2">
                <div className="row gx-5 w-100">
                    <h1 className="fw-bold fs-1">Style Scan</h1>
                    <div className="wardrobe-item text-center">
                        <h2 className="title">Item in the wardrobe</h2>
                        <div className="image-wrapper mx-auto">
                            <img 
                                src={imageUrl || notimageavailable} 
                                alt="Scanned Item" 
                                className="img-fluid" 
                            />
                            <div className="overlay">
                                <p className="item-name">{title || 'No Title'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScannedImageWardrobe;
