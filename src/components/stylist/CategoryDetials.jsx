import React, { useState } from 'react';
import '../../styles/CategoryDetails.scss';
import { useLocation } from 'react-router-dom';
import blank_image from '../../assets/stylist/blank_img.jpg';

const CategoryDetails = () => {
  const [quantity, setQuantity] = useState(2);
  const location = useLocation();
  const cat_Details = location?.state?.product;

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className='category-details-container container'>
      <div className='row justify-content-center align-items-center'>
        <div className='col-12 col-md-3 d-flex justify-content-center align-items-center'>
          <div className='image-container rounded-top-pill rounded-bottom-pill'>
            <img
              src={cat_Details?.image || blank_image}
              alt={cat_Details?.name || 'Product'}
              className='product-image'
            />
          </div>
        </div>
        <div className='col-12 col-md-9'>
          <h2>{cat_Details?.name || 'Product Name'}</h2>
          <p className='description-title'>Description</p>
          <p className='description'>
            {cat_Details?.description || 'No description available.'}
          </p>
          <div className='quantity-selector'>
            <button className='quantity-btn' onClick={decrement}>-</button>
            <span className='quantity-display'>{quantity < 10 ? `0${quantity}` : quantity}</span>
            <button className='quantity-btn' onClick={increment}>+</button>
          </div>
          <div className='button-group'>
            <button className='btn add-to-cart'>Add to cart</button>
            <button className='btn buy-now'>Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
