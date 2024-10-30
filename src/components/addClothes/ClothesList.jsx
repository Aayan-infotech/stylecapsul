import React, { useEffect, useState } from 'react';
import "../../styles/ClothesList.scss";
import { apiUrl } from '../../../apiUtils';
import axios from 'axios';
import { format } from 'date-fns';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import blank_img from '../../assets/stylist/blank_img.jpg';
import { getCookie } from '../../utils/cookieUtils';
import { useDispatch } from 'react-redux';
import { allAddedClothList } from '../../reduxToolkit/addClothesSlice';

function ClothesList() {
    const [loading, setLoading] = useState(true);
    const [categoryCloth, setCategoryCloth] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category } = useParams();
    const token = getCookie('authToken');

    useEffect(() => {
        dispatch(allAddedClothList());
    }, [dispatch]);

    const fetchClothesByCategory = async () => {
        try {
            const response = await axios.get(apiUrl(`api/cloths/get-by-category/${category}`), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setCategoryCloth(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching clothes by category:", error);
            setLoading(false);
        }
    };

    const fetchClothesByCategoryAndSearch = async () => {
        try {
            const response = await axios.get(apiUrl(`api/cloths/${category}/search/${searchTerm}`), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setCategoryCloth(Array.isArray(response.data.cloths) ? response.data.cloths : []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching clothes with search term:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            fetchClothesByCategoryAndSearch();
        } else {
            fetchClothesByCategory();
        }
    }, [searchTerm, category]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const deleteCloth = async (cloth_id) => {
        try {
            const response = await axios.delete(apiUrl(`api/cloths/delete-cloth-item/${cloth_id}`), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setCategoryCloth(prevClothes => prevClothes.filter(cloth => cloth._id !== cloth_id));
                toast.success(response?.data?.message, {
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
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage, {
                autoClose: 2000,
                style: { backgroundColor: '#dc3545', color: '#fff' }
            });
        }
    };

    const updateCloth = (cloth) => {
        navigate('/add-clothes', { state: { updateCloth: cloth, currentCategory: category } });
    }

    return (
        <>
            <ToastContainer />
            <div className="clothes-list-main-container">
                <div className="container w-75 clothes-list-container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between align-items-center flex-wrap">
                            <h1 className="text-center fw-bold fs-1 mb-3 mb-md-0">{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</h1>
                            <div className="search-box mt-3 mt-md-0">
                                <i className="fa fa-search"></i>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <i className="fa-solid fa-sliders"></i>
                            </div>
                        </div>
                        {loading ? (
                            <div className="col-12 text-center">
                                <div className="spinner-border text-secondary" role="status">
                                    <span className="visually-hidden text-black">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            categoryCloth.length > 0 ? (
                                categoryCloth.map((product, index) => (
                                    <div className="col-12" key={index}>
                                        <div className="products-container">
                                            <div className="products-added rounded-pill">
                                                <Link to="/clothes-details" className="text-decoration-none text-black" state={{ product }}>
                                                    <div className="product-img">
                                                        <img src={product?.picture || blank_img} alt="cloth" />
                                                    </div>
                                                </Link>
                                                <div className="product-text">
                                                    <Link to="/clothes-details" className="text-decoration-none text-black" state={{ product }}>
                                                        <div className="first-text">
                                                            <h3 className='fw-bold fs-3'>{product?.category}</h3>
                                                            <p className="m-0">{product?.typesOfCloths}</p>
                                                            <p className="mt-0 m-0 p-0">{format(new Date(product?.purchaseDate), 'MM-dd-yyyy')}</p>
                                                        </div>
                                                    </Link>
                                                    <button type="button" className="btn btn-outline-dark" onClick={() => updateCloth(product)}>
                                                        <i className="fa-regular fa-pen-to-square"></i>
                                                    </button>
                                                </div>
                                                <i className="fa-solid fa-circle-xmark close-icon" onClick={() => deleteCloth(product._id)}></i>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center">
                                    <h3 className='text-dark'>No clothes found</h3>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClothesList;
