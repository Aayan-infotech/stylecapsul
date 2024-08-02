import React from 'react'
import './Appointment.scss'
import {Link} from 'react-router-dom'

import Schedule from './img/Schedule.png'

function Container(){
  return(
    <>
    <div className='appointment'>
      <div className='one'>

        <div>
        <img src={Schedule} alt="" />
        </div>

        <div>
        <p>Garment Pickup</p>
        </div>
        
      </div>

      <div className='two'>
        <div>
          <p>09-02-2024</p>
        </div>
        <div>
          <p>07:01 PM</p>
        </div>
      </div>
    </div>
    </>
  )
}

function Appointment() {
  return (
    <>
    <div className='sa'>
    <Container/>
    <Container/>
    <Container/>
    <Container/>
    <Container/>
    </div>
    </>
  )
}

export default Appointment
