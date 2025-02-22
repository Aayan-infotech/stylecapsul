import React, { useState } from 'react';
import '../../styles/ScheduleBooking.scss';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { apiUrl } from '../../../apiUtils';
import axios from 'axios';
import { getCookie } from '../../utils/cookieUtils';
import { showErrorToast } from '../toastMessage/Toast';

const ScheduleBooking = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    // const [selectedDate, setSelectedDate] = useState('');

    const { user } = useSelector((state) => state.login);
    const location = useLocation();
    const { serviceProviderData } = location.state || {};
    

    const navigate = useNavigate();
    const token = getCookie('authToken');

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
                user: user?.payload?._id,
                serviceProvider: serviceProviderData?._id
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(schedueResponse?.data?.booking, 'schedueResponse')
            if (schedueResponse) {
                showSuccessToast(schedueResponse?.message);
                setTimeout(() => {
                    // if (schedueResponse?.success === true && schedueResponse?.status === 200) {
                    navigate("/scheduled-appointment");
                    // }
                }, 1000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            showErrorToast(errorMessage);
        }
    };

    return (
        <>
            <div className="schedule-booking-sections">
                <div className="container">
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
