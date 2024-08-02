import React from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'

import profile from './img/profile.png'
import market from './img/market.png'
import closet from './img/closet.png'
import style from './img/style.png'
import stylist from './img/stylist.png'
import analysis from './img/analysis.png'

function Home() {
  return (
    <>

      <div className='home'>
        {/* <h3>Services</h3> */}
        <div className='center'>
          <p>Home</p>
        </div>
        <div className='home-row'>
          <div className='left'>
            <Link to='/profile'  style={{ textDecoration: 'none' }}>
              <div className="closet-management" >
                <div className="image">
                  <img src={profile} alt="Closet Icon" />
                </div>
                <div className="text">
                  Profile
                </div>
              </div>
            </Link>

            <div className="closet-management">
              <div className="image">
                <img src={closet} alt="Closet Icon" />
              </div>
              <div className="text">
                Closet Management
              </div>
            </div>

            <div className="closet-management">
              <div className="image">
                <img src={stylist} alt="Closet Icon" />
              </div>
              <div className="text">
                Stylist
              </div>
            </div>

          </div>
          <div className='right'>

            <div className="closet-management">
              <div className="image">
                <img src={market} alt="Closet Icon" />
              </div>
              <div className="text">
                Market Place
              </div>
            </div>

            <div className="closet-management">
              <div className="image">
                <img src={style} alt="Closet Icon" />
              </div>
              <div className="text">
                My Style Capsule
              </div>
            </div>

            <div className="closet-management">
              <div className="image">
                <img src={analysis} alt="Closet Icon" />
              </div>
              <div className="text">
                Analysis & Insights
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Home