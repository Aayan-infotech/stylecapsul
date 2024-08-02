import React from 'react'
import './Body.scss'
import { Link } from 'react-router-dom'
import one from './img/one.png'
import two from './img/two.png'
import three from './img/three.png'
import four from './img/four.png'

function Body() {
  return (
    <>
      <div className='boxes'>
        <div className='box'>
          <img src={one} alt="" />
        </div>

        <div className='box'>
          <img src={two} alt="" />
        </div>

        <div className='box'>
          <img src={three} alt="" />
        </div>

        <div className='box'>
          <img src={four} alt="" />
        </div>
      </div>

      <Link to='/home' style={{textDecoration: "none"}}>
        <div className='outer colored'>
          <p>Generate</p>
        </div>
      </Link>

    </>
  )
}

export default Body
