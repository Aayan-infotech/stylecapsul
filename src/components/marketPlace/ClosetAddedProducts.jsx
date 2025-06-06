import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import blank_img from "../../assets/stylist/no_image.png";
import Loader from "../Loader/Loader";
import logo from "../../assets/images/LOGOSC.png";
import VisibilityIcon from '@mui/icons-material/Visibility';

const truncateText = (text, length) => {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "..." : text;
};
const cartStyle = {
    card: {
        position: "relative",
        height: "480px",
        cursor: "pointer",
        overflow: "hidden",
        transition: "background-color 0.3s ease",
    },
    hoverOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(99, 102, 105, 0.8)", // dark gray
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "2rem",
        opacity: 0,
        transition: "opacity 0.3s ease",
        zIndex: 1,
    },
    imageContainer: {
        position: "relative",
        zIndex: 0,
    },
};


const ClosetAddedProducts = () => {
    const [closetAddedProducts, setClosetAddedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const token = getCookie("authToken");

    const fetchAllCategoriesType = async () => {
        setLoading(true);
        try {
            const response = await axios.get(apiUrl("api/marketplaces/get/my-added-products"), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setClosetAddedProducts(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchAllCategoriesType();
    }, [token]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleShowProductDetails = (product) => {
        console.log(product, 'product')
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
    };


    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="categories-type-container">
                    <div className="container mt-2 stylist-content d-block">
                        <div className="row m-0 w-100">
                            <div className="col-12 mb-4 d-flex justify-content-between align-items-center">
                                {!token && (
                                    <Link to="/">
                                        <img src={logo} alt="logo" style={{ width: "300px", height: "60px" }} />
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div id="productCarousel" className="carousel slide d-block d-md-none" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {closetAddedProducts?.length > 0 ? (
                                        closetAddedProducts.map((product, index) => {
                                            const { name, price, image, discount } = product.marketplaceInfo || {};
                                            return (
                                                <div
                                                    key={index}
                                                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                                                >
                                                    <div
                                                        className="product-card rounded-pill text-center mx-auto"
                                                        style={{ ...cartStyle.card, width: "90vw", maxWidth: 350 }}
                                                        onMouseEnter={() => setHoveredIndex(index)}
                                                        onMouseLeave={() => setHoveredIndex(null)}
                                                        onClick={() => handleShowProductDetails(product)}
                                                    >
                                                        <div
                                                            style={{
                                                                ...cartStyle.hoverOverlay,
                                                                opacity: hoveredIndex === index ? 1 : 0,
                                                            }}
                                                        >
                                                            <VisibilityIcon fontSize="large" />
                                                        </div>
                                                        <div className="image-container" style={cartStyle.imageContainer}>
                                                            <img
                                                                src={image || blank_img}
                                                                alt={name}
                                                                className="img-fluid rounded-top"
                                                                style={{ objectFit: "contain", maxHeight: "250px", width: "100%" }}
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = blank_img;
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="product-details p-3">
                                                            <h3 className="product-name fw-bold">
                                                                {name?.length > 10 ? `${name.slice(0, 10)}...` : name}
                                                            </h3>
                                                            <p className="product-description text-muted mb-0">
                                                                {truncateText(product.description, 30)}
                                                            </p>
                                                            <h3 className="product-price fw-bold">
                                                                ₹{price}{" "}
                                                                {discount ? (
                                                                    <small className="text-success fs-6">({discount}% off)</small>
                                                                ) : null}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center w-100">
                                            <img src={blank_img} height="200" alt="no product" />
                                            <p>No products available in your closet.</p>
                                        </div>
                                    )}
                                </div>
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#productCarousel"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#productCarousel"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>

                            {/* Grid for desktop */}
                            <div className="row gx-2 d-none d-md-flex">
                                {closetAddedProducts?.length > 0 ? (
                                    closetAddedProducts.map((product, index) => {
                                        const { name, price, image, discount } = product.marketplaceInfo || {};
                                        return (
                                            <div key={index} className="col-12 col-md-4 p-3">
                                                <div
                                                    className="product-card rounded-pill text-center"
                                                    style={cartStyle.card}
                                                    onMouseEnter={() => setHoveredIndex(index)}
                                                    onMouseLeave={() => setHoveredIndex(null)}
                                                    onClick={() => handleShowProductDetails(product)}
                                                >
                                                    {/* Hover Overlay */}
                                                    <div
                                                        style={{
                                                            ...cartStyle.hoverOverlay,
                                                            opacity: hoveredIndex === index ? 1 : 0,
                                                        }}
                                                    >
                                                        <VisibilityIcon fontSize="large" />
                                                    </div>
                                                    <div className="image-container" style={cartStyle.imageContainer}>
                                                        <img
                                                            src={image || blank_img}
                                                            alt={name}
                                                            className="img-fluid rounded-top"
                                                            style={{ objectFit: "contain", maxHeight: "250px", width: "100%" }}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = blank_img;
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="product-details p-3">
                                                        <h3 className="product-name fw-bold">
                                                            {name?.length > 10 ? `${name.slice(0, 10)}...` : name}
                                                        </h3>
                                                        <p className="product-description text-muted mb-0">
                                                            {truncateText(product.description, 30)}
                                                        </p>
                                                        <h3 className="product-price fw-bold">
                                                            ₹{price}{" "}
                                                            {discount ? (
                                                                <small className="text-success fs-6">({discount}% off)</small>
                                                            ) : null}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center w-100">
                                        <img src={blank_img} height="200" alt="no product" />
                                        <p>No products available in your closet.</p>
                                    </div>
                                )}
                            </div>

                        </div>

                        {showModal && selectedProduct && (
                            <div
                                className="modal fade show d-block"
                                tabIndex="-1"
                                role="dialog"
                                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                            >
                                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">{selectedProduct.marketplaceInfo?.name}</h5>
                                            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                                        </div>
                                        <div className="modal-body row text-start">
                                            {/* Carousel */}
                                            <div className="col-md-6">
                                                <div id={`carousel-${selectedProduct._id}`} className="carousel slide" data-bs-ride="carousel">
                                                    <div className="carousel-inner">
                                                        {selectedProduct.pictures?.length > 0 ? (
                                                            selectedProduct.pictures.map((img, idx) => (
                                                                <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
                                                                    <img src={img} className="d-block w-100 rounded" alt={`Slide ${idx}`} style={{ maxHeight: "350px", objectFit: "contain" }} />
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="carousel-item active">
                                                                <img src={blank_img} className="d-block w-100" alt="No Image" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {selectedProduct.pictures?.length > 1 && (
                                                        <>
                                                            <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${selectedProduct._id}`} data-bs-slide="prev">
                                                                <span
                                                                    className="carousel-control-prev-icon"
                                                                    aria-hidden="true"
                                                                    style={{
                                                                        filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)"
                                                                    }}
                                                                ></span>
                                                                <span className="visually-hidden">Previous</span>
                                                            </button>
                                                            <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${selectedProduct._id}`} data-bs-slide="next">
                                                                <span
                                                                    className="carousel-control-next-icon"
                                                                    aria-hidden="true"
                                                                    style={{
                                                                        filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)"
                                                                    }}
                                                                ></span>
                                                                <span className="visually-hidden">Next</span>
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Product Info */}
                                            <div className="col-md-6">
                                                <p><strong>Type:</strong> {selectedProduct.typeOfFashion}</p>
                                                <p><strong>Season:</strong> {selectedProduct.season}</p>
                                                <p><strong>Category:</strong> {selectedProduct.subcategory}</p>
                                                <p><strong>Description:</strong> {selectedProduct.description}</p>
                                                <p><strong>Price:</strong> ${selectedProduct.marketplaceInfo?.price}</p>
                                                <p><strong>Discount:</strong> {selectedProduct.marketplaceInfo?.discount}%</p>
                                                <p><strong>In Stock:</strong> {selectedProduct.marketplaceInfo?.stockQuantity}</p>
                                                <p><strong>Purchased On:</strong> {new Date(selectedProduct.purchaseDate).toDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ClosetAddedProducts;
