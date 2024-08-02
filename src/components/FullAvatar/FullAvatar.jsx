import React from 'react'
import './FullAvatar.scss'
import {Link} from 'react-router-dom'

import one from './img/one.png'
import one1 from './img/one1.png'
import two from './img/two.png'
import three from './img/three.png'

function FullAvatar() {
  return (
    <>
    <div className='full-avatar'>
      <div className='left'>
        <div className='top'>
        <img src={one} alt="" />
        </div>
        <div className='bottom'>
          <img src={one1} alt="" />
        </div>
      </div>
      
      <div className='right'>
        <Link to='/body'>
        <button>
          <img src={two} alt="" />
          Edit Avatar
        </button>
        </Link>
        <button>
          <img src={three} alt="" />
        </button>
      </div>
    </div>
    </>
  )
}

export default FullAvatar
