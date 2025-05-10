import React, { useEffect, useState } from "react";
import notification from "../../assets/images/notification.png";
import address from "../../assets/images/address.png";
import password from "../../assets/images/password.png";
import global from "../../assets/images/globe.png";
import { Link } from "react-router-dom";
import { addAddress, deleteAddress, fetchAddresses, updateAddress } from "../../reduxToolkit/AddressSlice";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const SettingAndSecurity = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [activeTab, setActiveTab] = useState("addresslist");
  const [addressForm, setAddressForm] = useState({
    streetName: "",
    city: "",
    country: "",
    mobileNumber: "",
    customerName: ""
  });

  const dispatch = useDispatch();
  const { addresses, status } = useSelector((state) => state.addresses);

  useEffect(() => {
    if (showModal) {
      dispatch(fetchAddresses());
      setEditMode(false);
      setSelectedAddressId(null);
    }
  }, [showModal, dispatch]);

  const handleAddressClick = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal) {
      dispatch(fetchAddresses());
    }
  }, [showModal, dispatch]);

  const securityData = [
    {
      id: 2,
      icon: null,
      title: "Address",
      image: address,
      imageAlt: "address",
      imageStyle: { width: "50px", height: "45px" },
      url: "#",
      onClick: handleAddressClick,
    },
    {
      id: 4,
      image: password,
      title: "Password",
      imageAlt: "Password",
      imageStyle: { width: "50px", height: "45px" },
      url: "/change-password",
    },
  ];

  const handleEditAddress = (id) => {
    const addressToEdit = addresses?.find((address) => address._id === id);
    if (addressToEdit) {
      setAddressForm({
        streetName: addressToEdit.streetName,
        city: addressToEdit.city,
        country: addressToEdit.country,
        mobileNumber: addressToEdit.mobileNumber,
        customerName: addressToEdit.customerName
      });
      setSelectedAddressId(id);
      setEditMode(true);
    }
  };

  const handleUpdateAddress = async () => {
    setLoading(true);
    await dispatch(updateAddress({ id: selectedAddressId, updatedAddress: addressForm }));
    await dispatch(fetchAddresses());
    setLoading(false);
    setEditMode(false);
    setSelectedAddressId(null);
  };

  const handleDeleteAddress = async (id) => {
    try {
      await dispatch(deleteAddress(id)).unwrap();
      showSuccessToast("Address deleted successfully");
      await dispatch(fetchAddresses());
    } catch (error) {
      showErrorToast("Failed to delete address");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await dispatch(addAddress(addressForm));
      if (response?.type === "addresses/addAddress/fulfilled") {
        const message = response?.payload?.message || "Address added successfully";
        showSuccessToast(message);
      } else {
        showErrorToast("Failed to add address");
      }
      await dispatch(fetchAddresses());
      setAddressForm({
        streetName: "",
        city: "",
        country: "",
        mobileNumber: "",
        customerName: ""
      });
  
      setActiveTab("addresslist");
    } catch (error) {
      showErrorToast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="align-items-center" style={{ paddingTop: "6rem" }}>
      <div className="container d-block w-75">
        <h1 className="text-center fw-bold fs-1">Settings & Security</h1>
        <div className="row g-3 m-0">
          {securityData?.map((item, index) => (
            <div className="col-md-6" key={index}>
              <Link to={item?.url} className="text-decoration-none" onClick={item?.onClick}>
                <div className="p-4 text-white text-center rounded" style={{ height: "150px", backgroundColor: "rgb(76, 76, 76)" }}>
                  {item?.icon && (
                    <i
                      className={`fs-2 fa-solid fa-regular ${item?.icon} mb-2`}
                    ></i>
                  )}
                  {item?.image && (
                    <img
                      src={item?.image}
                      alt={item?.imageAlt}
                      className="mb-2"
                      style={item?.imageStyle}
                    />
                  )}
                  <h4 className="card-title fw-bold text-white">{item?.title}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Saved Addresses</h1>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body" style={{ height: "400px", overflowY: "auto" }}>
                <div className="d-flex border-bottom mb-3">
                  <button type="button" className="btn btn-dark rounded-pill me-3" onClick={() => setActiveTab("addresslist")}>
                    Add New Address
                  </button>
                  <button type="button" className="btn btn-dark rounded-pill" onClick={() => setActiveTab("add_new_address")}>
                    Address List
                  </button>
                </div>

                {activeTab === "addresslist" && <div>
                  <form onSubmit={handleFormSubmit}>
                    <div className="modal-body text-start">
                      <div className="mb-2">
                        <input type="text" className="form-control rounded-pill" id="customerName" name="customerName" value={addressForm.customerName} onChange={handleInputChange} required placeholder="Customer Name" />
                      </div>
                      <div className="mb-2">
                        <input type="text" className="form-control rounded-pill" id="streetName" name="streetName" value={addressForm.streetName} onChange={handleInputChange} required placeholder="Street Name" />
                      </div>
                      <div className="mb-2">
                        <input type="text" className="form-control rounded-pill" id="city" name="city" value={addressForm.city} onChange={handleInputChange} required placeholder=" City" />
                      </div>
                      <div className="mb-2">
                        <input type="text" className="form-control rounded-pill" id="country" name="country" value={addressForm.country} onChange={handleInputChange} required placeholder=" Country" />
                      </div>
                      <div className="">
                        <input type="number" className="form-control rounded-pill" id="mobileNumber" name="mobileNumber" value={addressForm.mobileNumber} onChange={handleInputChange} required placeholder="Mobile Number" />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-dark rounded-pill" style={{ backgroundColor: "black" }} disabled={loading}>
                        {loading ? (
                          <span>
                            <i className="fa-solid fa-spinner fa-spin me-2"></i> Adding...
                          </span>
                        ) : (
                          "Add Address"
                        )}
                      </button>
                    </div>
                  </form>
                </div>}

                {activeTab === "add_new_address" && <div>
                  {loading && <p className="text-center">Loading...</p>}
                  {editMode ? (
                    <div>
                      <input type="text" className="form-control mb-2 rounded-pill" placeholder="Customer Name" value={addressForm.customerName} onChange={(e) => setAddressForm({ ...addressForm, customerName: e.target.value })} />
                      <input type="text" className="form-control mb-2 rounded-pill" placeholder="Street Name" value={addressForm.streetName} onChange={(e) => setAddressForm({ ...addressForm, streetName: e.target.value })} />
                      <input type="text" className="form-control mb-2 rounded-pill" placeholder="City" value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} />
                      <input type="text" className="form-control mb-2 rounded-pill" placeholder="Country" value={addressForm.country} onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })} />
                      <input type="number" className="form-control mb-2 rounded-pill" placeholder="Mobile Number" value={addressForm.mobileNumber} onChange={(e) => setAddressForm({ ...addressForm, mobileNumber: e.target.value })} />
                      <button className="btn btn-dark rounded-pill mt-2" onClick={handleUpdateAddress} disabled={loading}>{loading ? 'Updating...' : 'Update Address'}</button>
                      <button className="btn btn-danger rounded-pill mt-2 ms-2" onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                  ) : (
                    addresses?.length === 0 ? (
                      <div className="no-address-message">
                        <h5 className="fw-bold text-center mb-4">No addresses available</h5>
                      </div>
                    ) : (
                      addresses.map((address) => (
                        <div className="border border-1 p-3 mb-2 text-start rounded-3 d-flex justify-content-between" key={address._id}>
                          <div>
                            <h5 className="m-1">{address.streetName}</h5>
                            <h5 className="m-1">{address.customerName}</h5>
                            <p className="m-1 fw-bold text-black">{address.city}</p>
                            <p className="m-1 fw-bold text-body-tertiary">{address.mobileNumber}</p>
                          </div>
                          <div>
                            <i className="fa-solid fa-trash-can fs-5 fw-bold me-3" onClick={(e) => { e.stopPropagation(); handleDeleteAddress(address._id); }} style={{ cursor: "pointer" }}></i>
                            <i className="fa-solid fa-pen fs-5 fw-bold" onClick={(e) => { e.stopPropagation(); handleEditAddress(address._id); }} style={{ cursor: "pointer" }}></i>
                          </div>
                        </div>
                      ))
                    )
                  )}
                </div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-dark rounded-pill w-25 p-2" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingAndSecurity;
