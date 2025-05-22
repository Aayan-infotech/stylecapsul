import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "../../styles/ShowClothesDetails.scss";
import { format } from "date-fns";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { getCookie } from "../../utils/cookieUtils";
import Loader from "../Loader/Loader.jsx";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast.jsx";
import CategoryIcon from '@mui/icons-material/Category';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import StyleIcon from '@mui/icons-material/Style';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const ShowClothesDetails = () => {
  const [showClothesDetails, setShowClothesDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [showMarketplaceDialog, setShowMarketplaceDialog] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [marketplaceData, setMarketplaceData] = useState({
    name: "",
    price: "",
    discount: "",
  });

  const { clothid } = useParams();
  const token = getCookie("authToken");
  const location = useLocation();
  const { category_name } = location.state || {};

  const fetchClothDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl(`api/cloths/getClothById/${clothid}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
      );
      if (response.data.status === 200 && response.data.success === true) {
        setShowClothesDetails(response.data.data);
        setLoading(false);
      } else {
        showErrorToast(response?.data?.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        showErrorToast(error.response.data.message);
      } else {
        console.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clothid) {
      fetchClothDetails(clothid);
    }
  }, [clothid]);

  const handleOpenMarketPlaceDialog = (edit = false) => {
    if (edit && showClothesDetails?.marketplaceInfo) {
      setMarketplaceData({
        name: showClothesDetails.marketplaceInfo.name,
        price: showClothesDetails.marketplaceInfo.price,
        discount: showClothesDetails.marketplaceInfo.discount,
      });
      setIsEditMode(true);
    } else {
      setMarketplaceData({ name: "", price: "", discount: "" });
      setIsEditMode(false);
    }

    setShowMarketplaceDialog(true);
  };


  const handleCloseDialog = () => {
    setShowMarketplaceDialog(false);
    setIsEditMode(false);
  };


  const handleAddToMarketplace = async () => {
    setBtnLoading(true);
    try {
      const payload = {
        name: marketplaceData.name,
        price: parseFloat(marketplaceData.price),
        discount: parseFloat(marketplaceData.discount),
        productId: clothid,
      };

      const endpoint = isEditMode
        ? `api/cloths/add-to-market/${clothid}`
        : `api/cloths/add-to-market/${clothid}`;

      const response = await axios.post(apiUrl(endpoint), payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        showSuccessToast(isEditMode ? "Marketplace details updated!" : "Cloth added to marketplace!");
        setShowMarketplaceDialog(false);
        fetchClothDetails(clothid);
      } else {
        showErrorToast(response.data.message || "Failed to submit.");
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message || "Something went wrong.");
      console.error(error);
    } finally {
      setBtnLoading(false);
    }
  };

  const removeFromMarketplace = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        apiUrl(`api/cloths/remove-from-market/${productId}`),
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, 'response');
      showSuccessToast(response.data.data?.message || "Removed from marketplace successfully");
      await fetchClothDetails(); 
    } catch (error) {
      showErrorToast(error?.response?.data?.message || "Error removing item");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="d-flex justify-content-center align-items-center clothes-main-container-sections">
          <div className="container d-block p-4">
            <div className="row m-0 gx-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h1 className="fw-bold fs-3">View Clothes</h1>
                  <p className="fs-6">{showClothesDetails?.description || "N/A"}</p>
                </div>
                <Button variant="outlined" className="rounded-pill fw-bold" sx={{
                  color: 'black',
                  borderColor: 'black',
                  textDecoration: 'none',
                  '&:hover': { backgroundColor: 'black', color: 'white', textDecoration: 'none', borderColor: 'black', },
                }}
                  onClick={handleOpenMarketPlaceDialog}
                >
                  Add To Marketplace
                </Button>

              </div>
              <div className="col-12 col-md-6 mb-2 mb-md-0">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {showClothesDetails?.pictures?.map((image, index) => (
                      <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                        <img src={image} className="d-block w-100 clothes-carousel-image" alt={`Image ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                  <div className="carousel-indicators clothes-custom-indicators">
                    {showClothesDetails?.pictures?.map((_, index) => (
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : undefined}
                        aria-label={`Slide ${index + 1}`}
                        key={index}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 p-3 clothes-service-details">
                <div>
                  <h5 className="fw-bold">Basic Info</h5>
                  <div className="border-line"></div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p><CategoryIcon fontSize="small" className="me-2" />Category</p>
                    <p>{category_name || "N/A"}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p><SubtitlesIcon fontSize="small" className="me-2" />Sub Category</p>
                    <p>{showClothesDetails?.subcategory || "N/A"}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p><ViewModuleIcon fontSize="small" className="me-2" />Part</p>
                    <p>{showClothesDetails?.part || "N/A"}</p>
                  </div>
                  <h5 className="fw-bold">Style Details</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <p><StyleIcon fontSize="small" className="me-2" />Type</p>
                    <p>{showClothesDetails?.typeOfFashion || "N/A"}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p><WbSunnyIcon fontSize="small" className="me-2" />Season</p>
                    <p>{showClothesDetails?.season || "N/A"}</p>
                  </div>
                  <h5 className="fw-bold">Additional Info</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <p><CalendarTodayIcon fontSize="small" className="me-2" />Purchase Date</p>
                    <p>{showClothesDetails?.purchaseDate ? format(new Date(showClothesDetails?.purchaseDate), "dd MMM yyyy") : "N/A"}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p><AccessTimeIcon fontSize="small" className="me-2" />Created At</p>
                    <p>{showClothesDetails?.createdAt ? format(new Date(showClothesDetails?.createdAt), "dd MMM yyyy HH:mm:ss") : "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="fw-bold fs-3">For Marketplace</h1>
              <div className="row m-0">
                <div className="col-12">
                  <div className="p-3 border border-1 rounded-4">
                    {showClothesDetails?.marketplaceInfo?.name ? (
                      <div className="row gx-2 gy-3 align-items-center">
                        <div className="col-auto">
                          <img src={showClothesDetails?.marketplaceInfo?.image} alt={showClothesDetails?.marketplaceInfo?.name} className="rounded" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        </div>
                        <div className="col d-flex justify-content-between">
                          <div>
                            <p className="mb-0 text-muted text-break">
                              <small>  <strong>Product ID:</strong> {showClothesDetails?.marketplaceInfo?.productId}</small>
                            </p>
                            <h5 className="mb-1 text-capitalize">
                              {showClothesDetails?.marketplaceInfo?.name}
                            </h5>
                            <p className="mb-1">
                              <strong>Price:</strong> ${showClothesDetails?.marketplaceInfo?.price}
                            </p>
                            <p className="mb-1">
                              <strong>Discount:</strong> {showClothesDetails?.marketplaceInfo?.discount}%
                            </p>
                          </div>
                          <div>
                            <Link to="/market-place" state={{ defaultTab: "closet" }}>
                              <button type="button" className="btn btn-outline-dark me-2 rouded-pill">
                                <RemoveRedEyeIcon />
                              </button>
                            </Link>
                            <button type="button" className="btn btn-outline-dark me-2">
                              <EditIcon onClick={() => handleOpenMarketPlaceDialog(true)} sx={{ cursor: 'pointer' }} />
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-danger rounded-pill"
                              onClick={() => removeFromMarketplace(showClothesDetails?.marketplaceInfo?.productId)}
                            >
                              Remove from Marketplace
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-muted">
                        <p className="fw-semibold mb-2">
                          This cloth item is currently part of your personal wardrobe only.
                        </p>
                        <p className="mb-2">
                          If you'd like to sell this product, please list it on the marketplace so others can view and purchase it.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showMarketplaceDialog && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add to Marketplace</h5>
                    <button type="button" className="btn-close" onClick={() => handleCloseDialog()}></button>
                  </div>
                  <div className="modal-body text-start">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="productname" className="form-label">Enter Product Name</label>
                        <input type="text" className="form-control" value={marketplaceData.name} onChange={(e) => setMarketplaceData({ ...marketplaceData, name: e.target.value })} placeholder="Enter Product Name" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="price" className="form-label">Enter price ($)</label>
                        <input type="number" className="form-control" value={marketplaceData.price} onChange={(e) => setMarketplaceData({ ...marketplaceData, price: e.target.value })} placeholder="Enter price" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="discount" className="form-label">Product Discount (%)</label>
                        <input type="number" className="form-control" value={marketplaceData.discount} onChange={(e) => setMarketplaceData({ ...marketplaceData, discount: e.target.value })} placeholder="Product Discount" />
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                        <button type="button" className="btn btn-outline-dark rounded-pill me-2" onClick={() => handleCloseDialog()}>
                          Cancel
                        </button>
                        <button type="button" disabled={btnLoading} className="btn btn-dark rounded-pill" onClick={handleAddToMarketplace}>
                          {btnLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              {isEditMode ? "Updating..." : "Adding..."}
                            </>
                          ) : (
                            isEditMode ? "Update" : "Add"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShowClothesDetails;
