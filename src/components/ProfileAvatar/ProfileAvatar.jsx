import React from 'react'
import './ProfileAvatar.scss'
import {Link} from 'react-router-dom'

import girl from './img/girl.png'
import fullAvatar from './img/full-avatar.png'
import arrow from './img/arrow.png'

function ProfileAvatar() {
  return (
    <>
      <div className='avatar'>

        <div className='avatar1'>
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

        <div className='avatar2'>
          <div className='one'>Basic</div>
          <div className='two'>Questionnaire</div>
        </div>

        <div className='avatar3'>

          <div className="input-container">
            <label htmlFor="name-input" className="name-label">Name</label>
            <input
              type="text"
              id="name-input"
              className="name-input"
              placeholder="Enter Your Name"
            />
          </div>

          <div className="input-container">
            <label htmlFor="name-input" className="name-label">Bio</label>
            <input
              type="text"
              id="name-input"
              className="name-input"
              placeholder="Enter Bio"
            />
          </div>

          <div className="input-container">
            <label htmlFor="name-input" className="name-label">Email</label>
            <input
              type="text"
              id="name-input"
              className="name-input"
              placeholder="Enter Email"
            />
          </div>

          <div className="input-container">
            <label htmlFor="name-input" className="name-label">Mobile Number</label>
            <input
              type="text"
              id="name-input"
              className="name-input"
              placeholder="Enter Mobile Number"
            />
          </div>

        </div>

        <div className='avatar4'>
          <div className='one'>
            <h2>Height, Weight & Shoes</h2>
            <div className='buttons'>
              <div className='button'>
                <h5 className='text'><span>170</span>cm</h5>
                <button className='counter'>
                  <div className='minus'>-</div>
                  <div className='plus'>+</div>
                </button>
              </div>

              <div className='button'>
                <h5 className='text'><span>70</span>kg</h5>
                <button className='counter'>
                  <div className='minus'>-</div>
                  <div className='plus'>+</div>
                </button>
              </div>

              <div className='button'>
                <h5 className='text'><span>40</span></h5>
                <button className='counter'>
                  <div className='minus'>-</div>
                  <div className='plus'>+</div>
                </button>
              </div>
            </div>
          </div>

          <div className='one'>
            <h2>Shoulders</h2>
            <div className='buttons'>
              <div className='button'>
                <h5 className='text'><span>90</span>cm</h5>
                <button className='counter'>
                  <div className='minus'>-</div>
                  <div className='plus'>+</div>
                </button>
              </div>

            </div>
          </div>

          <div className='one'>
            <h2>Chest & Waist</h2>
            <div className='buttons'>
              <div className='button'>
                <h5 className='text'><span>90</span>cm</h5>
                <button className='counter'>
                  <div className='minus'>-</div>
                  <div className='plus'>+</div>
                </button>
              </div>

              <div className='button'>
                <h5 className='text'><span>90</span>cm</h5>
                <button className='counter'>
                  <div className='minus'>-</div>
                  <div className='plus'>+</div>
                </button>
              </div>


            </div>
          </div>

          <div className='one'>
            <h2>Hips & High Hips</h2>
            <div className='buttons'>
              <div className='button'>
                <h5 className='text'><span>90</span>cm</h5>
                <button className='counter'>
                  <div className='minus'>-</div>
                  <div className='plus'>+</div>
                </button>
              </div>

              <div className='button'>
                <h5 className='text'><span>90</span>cm</h5>
                <button className='counter'>
                  <div className='minus'>-</div>
                  <div className='plus'>+</div>
                </button>
              </div>

              <div className='button'>
                <h5 className='text'><span>40</span></h5>
                <button className='counter'>
                  <div className='minus'>-</div>
                  <div className='plus'>+</div>
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className='avatar5'>

          <div className='section'>
            <h2>Gender</h2>
            <div className='buttons'>
              <div className='button colored'>
                <p>Male</p>
              </div>
              <div className='button '>
                <p>Female</p>
              </div>
              <div className='button '>
                <p>Gender-Inc.</p>
              </div>
            </div>
          </div>

          <div className='section'>
            <h2>Body Size</h2>
            <div className='buttons'>
              <div className='button colored'>
                <p>XS</p>
              </div>
              <div className='button '>
                <p>S</p>
              </div>
              <div className='button '>
                <p>M</p>
              </div>
              <div className='button '>
                <p>L</p>
              </div>
              <div className='button '>
                <p>XL</p>
              </div>
              <div className='button '>
                <p>XXL</p>
              </div>
              <div className='button '>
                <p>XXXL</p>
              </div>

            </div>
          </div>

          <div className='section'>
            <h2>Eye Color</h2>
            <div className='buttons'>
              <div className='button colored'>
                <p>Amber</p>
              </div>
              <div className='button '>
                <p>Blue</p>
              </div>
              <div className='button '>
                <p>Brown</p>
              </div>
              <div className='button '>
                <p>Gray</p>
              </div>
              <div className='button '>
                <p>Hazal</p>
              </div>
              <div className='button '>
                <p>Green</p>
              </div>
              <div className='button '>
                <p>Others</p>
              </div>

            </div>
          </div>

          <div className='section'>
            <h2>Hair Color</h2>
            <div className='buttons'>
              <div className='button colored'>
                <p>Black</p>
              </div>
              <div className='button '>
                <p>Blond</p>
              </div>
              <div className='button '>
                <p>Brown</p>
              </div>
              <div className='button '>
                <p>Auburn</p>
              </div>
              <div className='button '>
                <p>Red</p>
              </div>
              <div className='button '>
                <p>Gray</p>
              </div>
              <div className='button '>
                <p>Others</p>
              </div>

            </div>
          </div>

          <div className='section'>
            <h2>What age range you're in?</h2>
            <div className='buttons'>
              <div className='button colored'>
                <p>18-22</p>
              </div>
              <div className='button '>
                <p>23-27</p>
              </div>
              <div className='button '>
                <p>28-32</p>
              </div>
              <div className='button '>
                <p>33-37</p>
              </div>
              <div className='button '>
                <p>38-42</p>
              </div>
              <div className='button '>
                <p>43-46</p>
              </div>
              <div className='button '>
                <p>47-50</p>
              </div>
              <div className='button '>
                <p>51-54</p>
              </div>
              <div className='button '>
                <p>55+</p>
              </div>


            </div>
          </div>

          <div className='section'>
            <h2>Marital Status</h2>
            <div className='buttons'>
              <div className='button colored'>
                <p>Single</p>
              </div>
              <div className='button '>
                <p>Married</p>
              </div>


            </div>
          </div>

        </div>

        <div className="border-container">
        <div className="border-fade-left"></div>
        <div className="border-dark"></div>
        <div className="border-fade-right"></div>
      </div>

        <div className='avatar6'>
          <div className='section'>
            {/* <h2>Marital Status</h2> */}
            <div className='buttons'>
              <div className='button colored'>
                <p>Update</p>
              </div>
              <div className='button '>
                <p>Cancel</p>
              </div>


            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default ProfileAvatar
