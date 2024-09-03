import React, { useEffect, useState } from 'react';
import "../../styles/ClothesList.scss";
import { apiUrl } from '../../../apiUtils';
import axios from 'axios';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image22 from '../../assets/closetmanagement/image-22.jfif';

function ClothesList() {
    const [allClothes, setAllClothes] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl('api/cloths/all-cloths'));
                const allclothes = response.data.cloths;
                setAllClothes(allclothes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const deleteCloth = async (cloth_id) => {
        try {
            const response = await axios.delete(apiUrl(`api/cloths/delete-cloth-item/${cloth_id}`));
            if (response.status === 200) {
                setAllClothes(prevClothes => prevClothes.filter(cloth => cloth._id !== cloth_id));
                toast.success(response?.data?.message, {
                    autoClose: 1000,
                    style: { backgroundColor: '#28a745', color: '#fff' }
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
        navigate('/add-clothes', { state: { updateCloth: cloth } });
    }

    const fetchData = async (keyword = '') => {
        const url = keyword ? apiUrl(`api/cloths/search-by-keyword?keyword=${keyword}`) : apiUrl('api/cloths/all-cloths');
        console.log('Fetching data from:', url);
        try {
            const response = await axios.get(url);
            console.log('Response data:', response.data);
            const allclothes = response.data.cloths;
            setAllClothes(allclothes);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    useEffect(() => {
        fetchData(searchKeyword);
    }, [searchKeyword]);

    return (
        <>
            <ToastContainer />
            <div className="clothes-list-main-container">
                <div className="container w-75 clothes-list-container mt-4">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between align-items-center flex-wrap">
                            <h1 className="text-center fw-bold fs-1 mb-3 mb-md-0">Clothes</h1>
                            <div className="search-box mt-3 mt-md-0">
                                <i className="fa fa-search"></i>
                                <input type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Search" />
                                <i className="fa-solid fa-sliders"></i>
                            </div>
                        </div>
                        {allClothes?.map(product => (
                            <div className="col-12" key={product._id}>
                                <div className="products-container">
                                    <div className="products-added rounded-pill">
                                        <Link to="/clothes-details" className="text-decoration-none text-black" state={{ product }}>
                                            <div className="product-img">
                                                {product.picture ? (
                                                    <img src={product.picture} alt="cloth" />
                                                ) : (
                                                    <img
                                                        src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                                                        alt="No Image Available"
                                                    />
                                                )}
                                            </div>
                                        </Link>
                                        <div className="product-text">
                                            <Link to="/clothes-details" className="text-decoration-none text-black" state={{ product }}>
                                                <div className="first-text">
                                                    <h3 className='fw-bold fs-3'>{product.category}</h3>
                                                    <p>{format(new Date(product.purchaseDate), 'MM-dd-yyyy')}</p>
                                                </div>
                                            </Link>
                                            <button type="button" class="btn btn-outline-dark" onClick={() => updateCloth(product)}>
                                                <i className="fa-regular fa-pen-to-square"></i>
                                            </button>
                                        </div>
                                        <i className="fa-solid fa-circle-xmark close-icon" onClick={() => deleteCloth(product._id)}></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
export default ClothesList;
