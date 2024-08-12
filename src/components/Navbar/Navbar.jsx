// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Navbar.scss'
// import {Link} from 'react-router-dom';


function Navbar() {
  return (
    <>
      <div className='top'>
        <div className='top1'>
          <div className='left'>
            <p>Style Capsule</p>
          </div>
          <div className='right'>
            <div className='icons'>
            <i className="fa-regular fa-user"></i>
            <i className="fa-solid fa-magnifying-glass"></i>
            <i className="fa-solid fa-cart-shopping"></i>
            </div>

            <div className='hamburger'>
            <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar