import React, { useState, useEffect } from 'react';
import "../../styles/Address.scss";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addAddress, deleteAddress, fetchAddresses, updateAddress } from '../../reduxToolkit/AddressSlice';
import { useDispatch, useSelector } from 'react-redux';

const Address = () => {
    const dispatch = useDispatch();
    const addresses = useSelector((state) => state.addresses.addresses);
    console.log(addresses, 'addresses')
    const addressStatus = useSelector((state) => state.addresses.status);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [addressForm, setAddressForm] = useState({
        streetName: '',
        city: '',
        country: '',
        mobileNumber: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (addressStatus === 'idle') {
            dispatch(fetchAddresses());
        }
    }, [dispatch, addressStatus]);

    const handleSelectAddress = (id) => {
        setSelectedAddressId(id);
    };

    const handleDeleteAddress = async (id) => {
        try {
            await dispatch(deleteAddress(id)).unwrap();
            toast.success("Address deleted successfully", {
                autoClose: 1000,
                hideProgressBar: true,
                style: {
                    backgroundColor: 'black',
                    color: '#C8B199',
                    borderRadius: '50px',
                    padding: '10px 20px',
                }
            });
        } catch (error) {
            toast.error("Failed to delete address", {
                autoClose: 1000,
                hideProgressBar: true,
                style: {
                    backgroundColor: 'red',
                    color: '#C8B199',
                    borderRadius: '50px',
                    padding: '10px 20px',
                }
            });
        }
    };

    const handleEditAddress = (id) => {
        setIsEditing(true);
        const addressToEdit = addresses?.find(address => address._id === id);
        if (addressToEdit) {
            setAddressForm({
                streetName: addressToEdit.streetName,
                city: addressToEdit.city,
                country: addressToEdit.country,
                mobileNumber: addressToEdit.mobileNumber
            });
        }
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressForm({
            ...addressForm,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await dispatch(updateAddress({ id: selectedAddressId, updatedAddress: addressForm })).unwrap();
                toast.success("Address updated successfully", {
                    autoClose: 1000,
                    hideProgressBar: true,
                    style: {
                        backgroundColor: 'black',
                        color: '#C8B199',
                        borderRadius: '50px',
                        padding: '10px 20px',
                    }
                });
            } else {
                await dispatch(addAddress(addressForm)).unwrap();
                toast.success("Address added successfully", {
                    autoClose: 1000,
                    hideProgressBar: true,
                    style: {
                        backgroundColor: 'black',
                        color: '#C8B199',
                        borderRadius: '50px',
                        padding: '10px 20px',
                    }
                });
            }
            // Fetch updated addresses
            dispatch(fetchAddresses());
            setAddressForm({ streetName: '', city: '', country: '', mobileNumber: '' });
            setShowModal(false);
        } catch (error) {
            toast.error(error.message || "Failed to save address", {
                autoClose: 1000,
                hideProgressBar: true,
                style: {
                    backgroundColor: 'red',
                    color: '#C8B199',
                    borderRadius: '50px',
                    padding: '10px 20px',
                }
            });
        }
    };
    

    return (
        <>
            <ToastContainer />
            <div className='address-details-container'>
                {addresses?.length === 0 ? (
                    <div className="no-address-message">
                        <h4 className='fw-bold text-center mb-4'>No addresses available</h4>
                    </div>
                ) : (
                    addresses.map((address, index) => (
                        <label
                            key={index}
                            className={`address-card ${selectedAddressId === address._id ? 'selected' : ''}`}
                            onClick={() => handleSelectAddress(address._id)}
                        >
                            <div className='address-header'>
                                <div className="radio-btn">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="address"
                                        checked={selectedAddressId === address._id}
                                        onChange={() => handleSelectAddress(address._id)}
                                    />
                                </div>
                                <div className='address-info'>
                                    <h5 className='m-1'>{address.streetName}</h5>
                                    <p className="m-1 fw-bold text-black">{address.city}</p>
                                    <p className="m-1 fw-bold text-body-tertiary">{address.mobileNumber}</p>
                                </div>
                                <div className='delete-icon'>
                                    <i
                                        className="fa-solid fa-trash-can fs-5 fw-bold me-3"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteAddress(address._id);
                                        }}
                                    ></i>
                                    <i
                                        className="fa-solid fa-pen fs-5 fw-bold"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditAddress(address._id);
                                        }}
                                    ></i>
                                </div>
                            </div>
                        </label>
                    ))
                )}

                <div className="text-end">
                    <a href='#' className='text-black fw-bold text-decoration-none' onClick={() => setShowModal(true)}>
                        <i className="fa-solid fa-plus me-2"></i>
                        Add Address
                    </a>
                </div>
            </div>
            <div className="text-center mt-2">
                <Link to="/payment">
                    <button type="submit" className="btn btn-dark rounded-pill w-25" style={{ backgroundColor: "black" }}>Submit</button>
                </Link>
            </div>
            {/* Address Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="addressModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addressModalLabel">{isEditing ? 'Update Address' : 'Add Address'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                            </div>
                            <form onSubmit={handleFormSubmit}>
                                <div className="modal-body text-start">
                                    <div className="mb-3">
                                        <label htmlFor="streetName" className="form-label">Street Name</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-pill p-4"
                                            id="streetName"
                                            name="streetName"
                                            value={addressForm.streetName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-pill p-4"
                                            id="city"
                                            name="city"
                                            value={addressForm.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="country" className="form-label">Country</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-pill p-4"
                                            id="country"
                                            name="country"
                                            value={addressForm.country}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-pill p-4"
                                            id="mobileNumber"
                                            name="mobileNumber"
                                            value={addressForm.mobileNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-dark rounded-pill" style={{ backgroundColor: "black" }}>
                                        {isEditing ? 'Update Address' : 'Add Address'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Address;
