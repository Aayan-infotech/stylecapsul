import React from 'react';
import '../../styles/closetManagement.scss';
import imagefocus from "../../assets/closetmanagement/image-focus.png";
import image2 from "../../assets/stylist/img2.png"
import image3 from "../../assets/stylist/img5.png"
import shirt from "../../assets/closetmanagement/shirts.jfif";
import { Link } from 'react-router-dom';

const StyleScan = () => {

    const cardData = [
        {
            id: 1,
            title: "Dress",
            imageScanIcon: imagefocus,
            backimageUrl: image3,
        },
        {
            id: 2,
            title: "Shoes",
            imageScanIcon: imagefocus,
            backimageUrl: image2
        },
        {
            id: 3,
            title: "Shirt",
            imageScanIcon: imagefocus,
            backimageUrl: shirt
        },
        {
            id: 4,
            title: "Pant",
            imageScanIcon: imagefocus,
            backimageUrl: image2
        },
        {
            id: 1,
            title: "Shirt",
            imageScanIcon: imagefocus,
            backimageUrl: shirt,
        },
        {
            id: 2,
            title: "Shirt",
            imageScanIcon: imagefocus,
            backimageUrl: image3
        },
        {
            id: 3,
            title: "Shirt",
            imageScanIcon: imagefocus,
            backimageUrl: image2
        },
        {
            id: 4,
            title: "Shirt",
            imageScanIcon: imagefocus,
            backimageUrl: shirt
        },
    ];

    return (
        <div className="close-management-container">
            <div className="container text-center">
                <div className="row g-2">
                    <h1 className="text-center fw-bold fs-1">Style Scan</h1>
                    {cardData.map((item, index) => (
                        <div className="col-12 col-md-3 d-flex justify-content-center align-items-center" key={index}>
                            <Link to={{ pathname: `/upload-image-scan`, }} state={{ item }} className="text-decoration-none w-100">
                                <div className="image_scanner_card">
                                    <img src={item.backimageUrl} height={120} className="position-relative show_back_image" alt={item.title} />
                                    <div className="text-white card_title">
                                        <h4 className="fw-bold">{item.title}</h4>
                                    </div>
                                    <img src={item.imageScanIcon} className="position-absolute scanner_icon" alt="Scan Icon" />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StyleScan;
