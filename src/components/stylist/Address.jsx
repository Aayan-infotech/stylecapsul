import React, { useState } from 'react';
import "../../styles/Address.scss";
import { Link } from 'react-router-dom';

const Address = () => {
    // Dynamic list of addresses
    const [addresses, setAddresses] = useState([
        { id: 1, name: 'Wilson', location: 'New York', phone: '+173883772242' },
        { id: 2, name: 'Stark', location: 'New Jersey', phone: '+173883792882' }
    ]);

    const [selectedAddressId, setSelectedAddressId] = useState(null);

    // State to store new address form data
    const [newAddress, setNewAddress] = useState({
        name: '',
        location: '',
        phone: ''
    });

    // Handle selecting an address
    const handleSelectAddress = (id) => {
        setSelectedAddressId(id);
    };

    // Handle deleting an address
    const handleDeleteAddress = (id) => {
        setAddresses(addresses.filter(address => address.id !== id));
    };

    // Handle input change for new address
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({
            ...newAddress,
            [name]: value
        });
    };

    // Handle adding a new address
    const handleAddAddress = (e) => {
        e.preventDefault();
        const newId = addresses.length + 1;
        const newAddressData = {
            id: newId,
            ...newAddress
        };
        setAddresses([...addresses, newAddressData]);
        setNewAddress({ name: '', location: '', phone: '' });
        setSelectedAddressId(newId);
        document.getElementById("modalCloseButton").click();
    };

    return (
        <div className='address-details-container'>
            {addresses.map((address) => (
                <label
                    key={address.id}
                    className={`address-card ${selectedAddressId === address.id ? 'selected' : ''}`}
                    onClick={() => handleSelectAddress(address.id)}
                >
                    <div className='address-header'>
                        <div className="radio-btn">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="address"
                                checked={selectedAddressId === address.id}
                                onChange={() => handleSelectAddress(address.id)}
                            />
                        </div>
                        <div className='address-info'>
                            <h5 className='m-1'>{address.name}</h5>
                            <p className="m-1 fw-bold text-black">{address.location}</p>
                            <p className="m-1 fw-bold text-body-tertiary">{address.phone}</p>
                        </div>
                        <div className='delete-icon'>
                            <i
                                className="fa-solid fa-trash-can fs-5 fw-bold"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteAddress(address.id);
                                }}
                            ></i>
                        </div>
                    </div>
                </label>
            ))}

            <div className="text-end">
                <a href='#' className='text-black fw-bold text-decoration-none' data-bs-toggle="modal" data-bs-target="#addressDialog">+ Add New Address</a>
            </div>
            <div className="text-center mt-2">
                <Link to="/payment">
                    <button type="submit" className="btn btn-dark rounded-pill w-75" style={{ backgroundColor: "black" }}>Submit</button>
                </Link>
            </div>
            <div className="modal fade" id="addressDialog" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Address</h1>
                            <button type="button" id="modalCloseButton" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-start">
                            <form onSubmit={handleAddAddress}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newAddress.name}
                                        onChange={handleInputChange}
                                        className="form-control rounded-pill p-4"
                                        placeholder='Enter name'
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={newAddress.location}
                                        onChange={handleInputChange}
                                        className="form-control rounded-pill p-4"
                                        placeholder='Enter location'
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={newAddress.phone}
                                        onChange={handleInputChange}
                                        className="form-control rounded-pill p-4"
                                        placeholder='Enter phone number'
                                        required
                                    />
                                </div>
                                <div className='text-center'>
                                    <button type="button" className="btn btn-dark w-50 rounded-pill" style={{ backgroundColor: "black" }}>
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Address;
