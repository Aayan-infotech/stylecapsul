import React from 'react'
import './PandQ.scss'
import {Link} from 'react-router-dom'

import girl from './img/girl.png'
import fullAvatar from './img/full-avatar.png'
import arrow from './img/arrow.png'

import one from './img/one.png'
import two from './img/two.png'
import three from './img/three.png'
import four from './img/four.png'
import five from './img/five.png'

import six from './img/six.png'

function Button(props) {
  const { text, style } = props;

  return (
    <>
      <button className={`pq-button ${style}`}>
        <p>{text}</p>
      </button>
    </>
  )
}

function BigButton(props) {
  const { text, style } = props;

  return (
    <>
      <button className={`pq-big-button ${style}`}>
        <p>{text}</p>
      </button>
    </>
  )
}


function PandQ() {
  return (
    <>
      <div className='pq'>

        <div className='pq1'>
          <div className='left'>
            <div className='girl'>

              <div className='up'><img src={girl} alt="" /></div>
              <div className='arrow'><img src={arrow} alt="" /></div>
            </div>

          </div>
          <Link to="/full-avatar">
          <div className='right'>
            <img src={fullAvatar} alt="" />
          </div>
          </Link>
        </div>

        <div className='pq2'>
          <div className='one'>Basic</div>
          <div className='two'>Questionnaire</div>
        </div>

        <div className='pq3 1'>
          <div className='one'>
            <p>Do you like minimal style?</p>
          </div>

          <div className='two'>
            <img src={one} alt="" />

          </div>

          <div className='three'>
            <Button text='Yes' />
            <Button text='No' />
            <Button text='Sometimes' style='colored' />
          </div>
        </div>

        <div className='pq3 2'>
          <div className='one'>
            <p>Do you like feminine style?</p>
          </div>

          <div className='two'>
            <img src={two} alt="" />

          </div>

          <div className='three'>
            <Button text='Yes' style='colored' />
            <Button text='No' />
            <Button text='Sometimes' />
          </div>
        </div>

        <div className='pq3 3'>
          <div className='one'>
            <p>Do you like boho style?</p>
          </div>

          <div className='two'>
            <img src={three} alt="" />

          </div>

          <div className='three'>
            <Button text='Yes' />
            <Button text='No' style='colored' />
            <Button text='Sometimes' />
          </div>
        </div>

        <div className='pq3 4'>
          <div className='one'>
            <p>Do you like classic style?</p>
          </div>

          <div className='two'>
            <img src={four} alt="" />

          </div>

          <div className='three'>
            <Button text='Yes' style='colored' />
            <Button text='No' />
            <Button text='Sometimes' />
          </div>
        </div>

        <div className='pq3 5'>
          <div className='one'>
            <p>Do you like sexy style?</p>
          </div>

          <div className='two'>
            <img src={five} alt="" />

          </div>

          <div className='three'>
            <Button text='Yes' />
            <Button text='No' />
            <Button text='Sometimes' style='colored' />
          </div>
        </div>

        <div className='pq4'>
          <div className='one'>
            <p>What’s your favourotite brand?</p>
          </div>

          <div className='two'>
            <img src={six} alt="" />

          </div>
        </div>

        <div className='pq5 1'>
          <div className='one'>
            <p>What kind of neighbourhood & places do you spend time in?</p>
          </div>


          <div className='three'>
            <Button text='Chic' style='colored' />
            <Button text='Shabby' />
          </div>
        </div>

        <div className='pq5 2'>
          <div className='one'>
            <p>Do you do sports?</p>
          </div>


          <div className='three'>
            <Button text='Yes' />
            <Button text='No' />
            <Button text='Sometimes' style='colored' />
          </div>
        </div>

        <div className='pq5 3'>
          <div className='one'>
            <p>Do you enjoy shopping?</p>
          </div>


          <div className='three'>
            <Button text='Yes' />
            <Button text='No' />
            <Button text='Sometimes' style='colored' />
          </div>
        </div>

        <div className='pq5 4'>
          <div className='one'>
            <p>Do you feel the need to get approval from someone while shpping?</p>
          </div>


          <div className='three'>
            <Button text='Yes' />
            <Button text='No' />
            <Button text='Sometimes' style='colored' />
          </div>
        </div>

        <div className='pq5 5'>
          <div className='one'>
            <p>What do you shop for?</p>
          </div>


          <div className='three'>
            <Button text='Color' />
            <Button text='Kumas' />
            <Button text='Price' style='colored' />
            <Button text='Brand' />
            <Button text='Style' />
          </div>
        </div>

        <div className='pq5 6'>
          <div className='one'>
            <p>What brand do you shop with?</p>
          </div>


          <div className='three'>
            <Button text='Luxury Brands' />
            <Button text='Eco-Friendly' />
            <Button text='Inditex-Brands' style='colored' />
          </div>
        </div>

        <div className='pq5 3'>
          <div className='one'>
            <p>How do you describe your current style?</p>
          </div>


          <div className='three'>
            <Button text='Classic' />
            <Button text='Dramatic' style='colored' />
            <Button text='Elegant' />
            <Button text='Modern' />
            <Button text='Trendy' />
            <Button text='Others' />

          </div>
        </div>

        <div className='pq6 1'>
          <div className='one'>
            <p>What is biggest mistake you make about clothing?</p>
          </div>


          <div className='three'>
            <BigButton text="I don't know my body & i can't dress accordingly." />
            <BigButton text='I don’t know my style & i find it confusing.' style='colored' />
            <BigButton text='I am having trouble choosing shoes.' />


          </div>
        </div>

        <div className='pq6 2'>
          <div className='one'>
            <p>How would someone describe you by looking at your cloths?</p>
          </div>


          <div className='three'>
            <BigButton text='Well Maintained, Clean, Simple' />
            <BigButton text='Confused' style='colored' />
            <BigButton text='Self-Confident' />
            <BigButton text='Striking' />

          </div>
        </div>

        <div className='pq6 3'>
          <div className='one'>
            <p>Is there anything you wear all the time?</p>
          </div>


          <div className='three'>
            <BigButton text='Jeans' />
            <BigButton text='Sneakers' style='colored' />
            <BigButton text='T-Shirts' />
            <BigButton text='Dress' />
            <BigButton text='Others' />

          </div>
        </div>

        <div className='pq6 4'>
          <div className='one'>
            <p>Which colors you never wear?</p>
          </div>


          <div className='three'>
            <Button text='Black' />
            <Button text='White' style='colored' />
            <Button text='Gray' />
            <Button text='Red' />
            <Button text='Orange' />
            <Button text='Yellow' />
            <Button text='Green' />
            <Button text='Light Blue' />
            <Button text='Dark Blue' />
            <Button text='Purple' />
            <Button text='Pink' />
            <Button text='Brown' />

          </div>
        </div>

        <div className='pq6 5'>
          <div className='one'>
            <p>What would you like to change about your style? what will happen when you change it? </p>
          </div>


          <div className='three'>
            <BigButton text='Clear up confusion' />
            <BigButton text='Learning the rules I don’t know' style='colored' />
            <BigButton text='To be able to shop more conveniently ' />
            <BigButton text='Harmony & balancing' />

          </div>
        </div>

        <div className="border-container">
          <div className="border-fade-left"></div>
          <div className="border-dark"></div>
          <div className="border-fade-right"></div>
        </div>

        <div className='pq7'>
          <div className='section'>

            <div className='buttons'>
              <Button text='Update' style='colored' />
              <Button text='Cancel' />




            </div>
          </div>
        </div>




      </div>

    </>
  )
}

export default PandQ

