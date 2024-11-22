import React, { useEffect, useState } from 'react';
import './Appointment.scss';
import { Link } from 'react-router-dom';
import Schedule from './img/Schedule.png';
import { apiUrl } from '../../../apiUtils';
import axios from 'axios';
import { format } from 'date-fns';
import { getCookie } from '../../utils/cookieUtils';

function Appointment() {
  const [allGarmentsServices, setAllGarmentsServices] = useState([]);
  const token = getCookie('authToken');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(apiUrl('api/garment/garment-care'), {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setAllGarmentsServices(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <div className='scheduled-appointment-container'>
        <div className="container w-75" style={{ display: "block" }}>
          <h1 className="fw-bold fs-4 text-center text-md-start mt-2">All Appointments</h1>
          <div className="row m-0 gy-3">
            {allGarmentsServices.map((item, index) => {
              const formattedStartTime = format(new Date(item.startTime), 'dd-MM-yyyy - hh:mm a');
              return (
                <div className="col-12 mt-2 text-white" key={index}>
                  <div className="p-3 rounded-pill appointment-box d-flex gap-4 flex-wrap justify-content-center justify-content-lg-between align-items-center">
                    <div className='d-flex align-items-center gap-3 justify-content-between justify-content-lg-start'>
                      <img src={Schedule} height={40}  alt="Schedule Icon" />
                      <h4>{item.service || 'N/A'}</h4>
                    </div>
                    <div className='d-flex align-items-center'>
                      <div >
                        <h5>{formattedStartTime}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointment;
