import React, { useState } from 'react';
import '../../styles/StylistCategories.scss';
import showimg1 from '../../assets/marketplace/showimg1.jpg'
import showimg2 from '../../assets/marketplace/showimg2.jpg'
import showimg3 from '../../assets/marketplace/showimg3.jpg'
import cat_image from '../../assets/marketplace/showimg7.jpg'
import cat_image1 from '../../assets/marketplace/showimg6.jpg'
import cat_image3 from '../../assets/marketplace/showimg8.jpg'
import { useNavigate, useParams } from 'react-router-dom';

const shopebystyles = [
    {
        id: 1,
        name: "Shirt",
        imgSrc: 'path/to/shopeimage1',
        subcategories: [
            {
                id: 1, name: "Casual Shirts", imgSrc: 'path/to/casualShirtImage1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
                price: 28,
                category: 'Buy',
                image: cat_image
            },
            {
                id: 2, name: "Formal Shirts", imgSrc: 'path/to/casualShirtImage2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
                price: 28,
                category: 'Buy',
                image: cat_image
            }
        ]
    },
    {
        id: 2,
        name: "Dress",
        imgSrc: 'path/to/shopeimage2',
        subcategories: [
            {
                id: 1, name: "Casual Dresses", imgSrc: 'path/to/casualShirtImage1', description: 'Elegant red dress for any occasion.',
                price: 45,
                category: 'Rent',
                image: cat_image1
            },
            {
                id: 2, name: "Evening Dresses", imgSrc: 'path/to/casualShirtImage3',  description: 'Elegant red dress for any occasion.',
                price: 45,
                category: 'Rent',
                image: cat_image1
            }
        ]
    },
    {
        id: 3,
        name: "Shoes",
        imgSrc: 'path/to/shopeimage3',
        subcategories: [
            {
                id: 1, name: "Sneakers", imgSrc: 'path/to/casualShirtImage1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
                price: 28,
                category: 'Swap',
                image: cat_image
            },
            {
                id: 2, name: "Formal Shoes", imgSrc: 'path/to/casualShirtImage3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
                price: 28,
                category: 'Swap',
                image: cat_image
            }
        ]
    }
];

const StylistCategories = () => {
    const [selectedCategory, setSelectedCategory] = useState('Buy');
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const category = shopebystyles.find(style => style.id === parseInt(categoryId, 10));
    console.log(category?.subcategories, 'category')

    const getFilteredProducts = () => {
        return category?.subcategories.filter(product => product.category === selectedCategory);
    };

    const handleBuyClick = (prod) => {
        navigate("/category-details", { state: { product: prod } });
    }

    const truncateText = (text, wordLimit) => {
        const wordsArray = text.split(' ');
        if (wordsArray.length > wordLimit) {
            return wordsArray.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    return (
        <div className='categories-type-container'>
            <div className="container w-75 mt-2 stylist-content" style={{ display: "block" }}>
                <div className="row gx-2">
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className="fw-bold fs-1">Categories</div>
                        <div className="search-box">
                            <i className="fa fa-search"></i>
                            <input
                                type="text"
                                className="rounded-pill text-white"
                                placeholder="Search"
                            />
                            <i className="fa-solid fa-sliders"></i>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mt-3" style={{ margin: "auto", textAlign: "center" }}>
                        <button
                            type="button"
                            className={`btn btn-dark rounded-pill w-50 p-2 ${selectedCategory === 'Buy' ? 'active' : ''}`}
                            style={{ backgroundColor: "black" }}
                            onClick={() => setSelectedCategory('Buy')}
                        >
                            Buy
                        </button>
                    </div>
                    <div className="col-12 col-md-4" style={{ margin: "auto", textAlign: "center" }}>
                        <button
                            type="button"
                            className={`btn btn-dark rounded-pill w-50 p-2 ${selectedCategory === 'Rent' ? 'active' : ''}`}
                            style={{ backgroundColor: "black" }}
                            onClick={() => setSelectedCategory('Rent')}
                        >
                            Rent
                        </button>
                    </div>
                    <div className="col-12 col-md-4" style={{ margin: "auto", textAlign: "center" }}>
                        <button
                            type="button"
                            className={`btn btn-dark rounded-pill w-50 p-2 ${selectedCategory === 'Swap' ? 'active' : ''}`}
                            style={{ backgroundColor: "black" }}
                            onClick={() => setSelectedCategory('Swap')}
                        >
                            Swap
                        </button>
                    </div>
                </div>

                <div className="row gx-2 ms-1">
                    {getFilteredProducts()?.map((product, index) => (
                        <div key={index} className="col-12 col-md-4 p-3">
                            <div className="product-card rounded-pill text-center">
                                <div className="image-container">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="img-fluid rounded-top"
                                    />
                                </div>
                                <div className="product-details p-3">
                                    <h3 className="product-name fw-bold">{product.name}</h3>
                                    <p className="product-description text-muted">
                                        {truncateText(product.description, 10)}
                                    </p>
                                    <div className="d-flex justify-content-center mb-3">
                                        <button type="button" className="btn btn-primary rounded-pill w-25 me-2" onClick={() => handleBuyClick(product)} style={{ backgroundColor: "black" }}>Buy
                                        </button>
                                        <button type="button" className="btn btn-outline-dark rounded-pill me-2" style={{ borderColor: "black" }}>Add to cart</button>
                                    </div>
                                    <h3 className="product-price fw-bold">${product.price}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='text-center'>
                    <button type="button" className="btn btn-primary rounded-pill w-25 p-2" style={{ backgroundColor: "black" }}> View All
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StylistCategories;
