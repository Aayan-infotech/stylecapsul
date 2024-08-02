import React from 'react'
import './Navbar.scss'
import {Link} from 'react-router-dom'


function Navbar() {
  return (
    <>

      <div className='top'>
        <div className='top1'>
          <div className='left'>
            <p>Style Capsule</p>
          </div>
          {/* <div className='center'>
            <p>Home</p>
          </div> */}
          <div className='right'>
            <div className='icons'>
            <i class="fa-regular fa-user"></i>
            <i class="fa-solid fa-magnifying-glass"></i>
            <i class="fa-solid fa-cart-shopping"></i>
            </div>

            <div className='hamburger'>
            <i class="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Navbar