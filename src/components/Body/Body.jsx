import React from 'react'
import './Body.scss'
import { Link } from 'react-router-dom'
import withtight from './img/camera-01.png'

function Body() {
  return (
    <>
      <div className="body-image-container">
        <div className="container w-75">
          <div className="row g-3">
            <div className="col-6 col-md-6 col-lg-3">
              <div className="p-3 border border-black image-box">
                <img src={withtight} alt="With Tights" className="image-icon" />
                <p>Face</p>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-3">
              <div className="p-3 border border-black image-box">
                <img src={withtight} alt="With Tights" className="image-icon" />
                <p>With Tights</p>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-3">
              <div className="p-3 border border-black image-box">
                <img src={withtight} alt="Full Body 1" className="image-icon" />
                <p>Full Body 1</p>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-3">
              <div className="p-3 border border-black image-box">
                <img src={withtight} alt="Full Body 2" className="image-icon" />
                <p>Full Body 2</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link to='/home' className='text-decoration-none w-100'>
            <button className="btn btn-dark w-25 rounded-pill p-3 mt-2">Generate</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Body
