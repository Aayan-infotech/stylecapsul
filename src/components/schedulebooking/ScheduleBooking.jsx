import React, { useState } from 'react';
import '../../styles/ScheduleBooking.scss';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { apiUrl } from '../../../apiUtils';
import axios from 'axios';

const ScheduleBooking = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    // const [selectedDate, setSelectedDate] = useState('');

    const { user } = useSelector((state) => state.login);
    const location = useLocation();
    const { garment } = location.state || {};

    const navigate = useNavigate();

    const timeRanges = [
        "6:00 AM to 7:00 AM",
        "7:00 AM to 8:00 AM",
        "8:00 AM to 9:00 AM",
        "9:00 AM to 10:00 AM",
        "10:00 AM to 11:00 AM",
        "11:00 AM to 12:00 PM",
        "12:00 PM to 1:00 PM",
        "1:00 PM to 2:00 PM",
        "2:00 PM to 3:00 PM",
        "3:00 PM to 4:00 PM",
        "4:00 PM to 5:00 PM",
        "5:00 PM to 6:00 PM",
        "6:00 PM to 7:00 PM",
        "7:00 PM to 8:00 PM",
        "8:00 PM to 9:00 PM",
        "9:00 PM to 10:00 PM"
    ];

    const handleTimeRangeChange = (event) => {
        setSelectedTimeRange(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const currentDate = new Date().toISOString().split('T')[0];

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const schedueResponse = await axios.post(apiUrl('api/book/schedule'), {
                date: selectedDate,
                time: selectedTimeRange,
                user: user?.data?._id,
                serviceProvider: garment?._id
            });
            console.log(schedueResponse?.data?.booking, 'schedueResponse')
            if (schedueResponse) {
                toast.success(schedueResponse?.message || 'Schedule Booking is Successfully..!', {
                    autoClose: 1000,
                    style: { backgroundColor: '#28a745', color: '#fff' }
                });
                setTimeout(() => {
                    // if (schedueResponse?.success === true && schedueResponse?.status === 200) {
                    navigate("/scheduled-appointment");
                    // }
                }, 1000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage, {
                autoClose: 2000,
                style: { backgroundColor: '#dc3545', color: '#fff' }
            });
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="d-flex justify-content-center align-items-center schedule-booking-sections">
                <div className="container d-flex justify-content-center align-items-center p-4">
                    <div className="row m-0 gx-2">
                        <h1 className="fw-bold text-center fs-1">Schedule Booking</h1>
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            <div className='border w-50 p-3'>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="bookingdate" className="form-label">Enter Date</label>
                                        <input
                                            type="date"
                                            className="form-control rounded-pill"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            required
                                            min={currentDate}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="bookingtime" className="form-label">Select Time Range</label>
                                        <select
                                            className="form-control rounded-pill"
                                            value={selectedTimeRange}
                                            onChange={handleTimeRangeChange}
                                            required
                                        >
                                            <option value="" disabled>Select Time Range</option>
                                            {timeRanges.map((range, index) => (
                                                <option key={index} value={range}>{range}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div align="center" className="mt-4">
                                        <button type="submit" className="btn schedue-custom-btn w-50 rounded-pill p-2">Schedule</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ScheduleBooking;
