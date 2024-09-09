import React, { useEffect, useState } from 'react';
import './Appointment.scss';
import { Link } from 'react-router-dom';
import Schedule from './img/Schedule.png';
import { apiUrl } from '../../../apiUtils';
import axios from 'axios';
import { format } from 'date-fns';

function Container({ service }) {
  const formattedDate = format(new Date(service.startTime), 'dd-MM-yyyy hh:mm a');

  return (
    <>
      <div className='appointment'>
        <div className='one'>
          <div>
            <img src={Schedule} alt="" />
          </div>
          <div>
            <p>{service.service}</p>
          </div>
        </div>
        <div className='two'>
          <div>
            <p>{formattedDate.split(' ')[0]}</p>
          </div>
          <div>
            <p>{formattedDate.split(' ')[1]} {formattedDate.split(' ')[2]}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Appointment() {
  const [allGarmentsServices, setAllGarmentsServices] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(apiUrl('api/garment/garment-care'));
        setAllGarmentsServices(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);
  

  return (
    <>
      <div className='sa'>
        {allGarmentsServices.map(service => (
          <Container key={service._id} service={service} />
        ))}
      </div>
    </>
  );
}

export default Appointment;
