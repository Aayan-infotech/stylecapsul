import React, { useEffect, useState } from 'react';
import './Appointment.scss';
import { Link } from 'react-router-dom';
import Schedule from './img/Schedule.png';
import { apiUrl } from '../../../apiUtils';
import axios from 'axios';
import { format } from 'date-fns';

function Appointment() {
  const [allGarmentsServices, setAllGarmentsServices] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(apiUrl('api/garment/garment-care'));
        setAllGarmentsServices(response.data.data);
        console.log(response.data.data, 'Data fetched');
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
          <div className="row m-0">
            {allGarmentsServices.map((item, index) => {
              const formattedStartTime = format(new Date(item.startTime), 'dd-MM-yyyy hh:mm a');              
              return (
                <div className="col-12 mt-2 text-white" key={index}>
                  <div className="p-3 rounded-pill appointment-box d-flex justify-content-between align-items-center">
                    <div className='d-flex align-items-center'>
                      <img src={Schedule} height={40} className='me-4' alt="Schedule Icon" />
                      <h4>{item.service}</h4>
                    </div>
                    <div className='d-flex align-items-center'>
                      <div className='me-4'>
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
