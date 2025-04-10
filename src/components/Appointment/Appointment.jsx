import React, { useEffect, useState } from 'react';
import './Appointment.scss';
import { Link } from 'react-router-dom';
import Schedule from './img/Schedule.png';
import { apiUrl } from '../../../apiUtils';
import { getCookie } from '../../utils/cookieUtils';
import axios from 'axios';
import { format } from 'date-fns';
import { showErrorToast } from '../toastMessage/Toast';
import { Box, Modal, Typography, Button } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'white',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

function Appointment() {
  const [allGarmentsServices, setAllGarmentsServices] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const token = getCookie('authToken');
  const userId = getCookie('userId');

  const fetchUserData = async () => {
    try {
      const response = await axios.get(apiUrl(`api/appointment/get-appointment/${userId}`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response?.data?.data, 'abinash');
      if (response?.data?.success && Array.isArray(response.data.data)) {
        setAllGarmentsServices(response.data.data);
      } else {
        showErrorToast(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAppointment(null);
  };

  return (
    <>
      <div className='scheduled-appointment-container'>
        <div className="container w-75" style={{ display: "block" }}>
          <h1 className="fw-bold fs-4 text-center text-md-start mt-2">All Appointments</h1>
          <div className="row m-0 gy-3">
            {allGarmentsServices?.length > 0 ? (
              allGarmentsServices.map((item, index) => (
                <div className="col-12 mt-2 text-white" key={index}>
                  <div className="p-3 rounded-pill appointment-box d-flex gap-4 px-4 flex-wrap justify-content-center justify-content-lg-between align-items-center">
                    <div className='d-flex align-items-center gap-5 justify-content-between justify-content-lg-start'>
                      <img src={Schedule} height={40} alt="Schedule Icon" />
                      <h4>{item?.stylist?.name || 'Stylist'}</h4>
                    </div>
                    <div className='d-flex align-items-center gap-4'>
                      <div className='d-flex flex-column align-items-end'>
                        <h5 className="mb-0">{item?.time}</h5>
                        <span className=" small">{new Date(item?.date).toDateString()}</span>
                      </div>
                      <button type="button" onClick={() => handleViewAppointment(item)} className="btn btn-dark rounded-pill fw-bold">
                        View <i className="bx bx-show"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center'>
                <p>No appointments found</p>
              </div>
            )}
          </div>
        </div>

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2" gutterBottom>
              Appointment Details
            </Typography>
            {selectedAppointment && (
              <>
                <Typography><strong>Stylist:</strong> {selectedAppointment?.stylist?.name}</Typography>
                <Typography><strong>User:</strong> {selectedAppointment?.user?.firstName}</Typography>
                <Typography><strong>Date:</strong> {new Date(selectedAppointment.date).toDateString()}</Typography>
                <Typography><strong>Time:</strong> {selectedAppointment.time}</Typography>
                <Typography>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      color:
                        selectedAppointment.approvedByStylist === "approved"
                          ? "#4caf50"
                          : selectedAppointment.approvedByStylist === "decline"
                            ? "#f44336"
                            : "#ff9800",
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}
                  >
                    {selectedAppointment.approvedByStylist}
                  </span>
                </Typography>
                <Box mt={3} display="flex" justifyContent="flex-end">
                  <Button onClick={handleCloseModal} sx={{ textTransform: "none" }} variant="contained" color="error">Close</Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Appointment;
