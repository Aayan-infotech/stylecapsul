import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CalendarStyles.css';
import day1formal from '../../assets/myCapsuleAddAvtar/for2-removebg-preview.png';
import day2formal from '../../assets/myCapsuleAddAvtar/for4-removebg-preview.png';
import day3formal from '../../assets/myCapsuleAddAvtar/for5-removebg-preview.png';
import day4formal from '../../assets/myCapsuleAddAvtar/for6.png';
import axios from 'axios';

const ClothesCalendar = ({ onSave }) => {
    const [openCalendarDialog, setOpenCalendarDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // const fetchDayByCloths = async () => {
    //     try {
    //         // const response = await axios.post(apiUrl(`/api/myStyleCapsule/getStyle/${67063c8d075869029d823a17}`))
    //   const response = await axios.get('http://44.196.192.232:3555/api/myStyleCapsule/getStyle/67063c8d075869029d823a17');
    //         console.log(response, 'response'); 
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchDayByCloths();
    // }, []);

    const [clothesOnDates] = useState({
        '2024-11-09': { thumbnail: day4formal },
        '2024-11-18': { thumbnail: day1formal },
        '2024-11-14': { thumbnail: day2formal },
        '2024-11-120': { thumbnail: day3formal },
    });

    const handleModalToggle = () => {
        setOpenCalendarDialog(!openCalendarDialog);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const tileContent = ({ date, view }) => {
        const formattedDate = date.toISOString().split('T')[0];
        if (view === 'month' && clothesOnDates[formattedDate]) {
            return (
                <div className="thumbnail">
                    <img
                        src={clothesOnDates[formattedDate].thumbnail}
                        alt="outfit"
                        className="outfit-thumbnail"
                    />
                </div>
            );
        }
        return null;
    };

    const tileClassName = ({ date, view }) => {
        const formattedDate = date.toISOString().split('T')[0];
        if (view === 'month' && clothesOnDates[formattedDate]) {
            return 'date-with-image';
        }
        return null;
    };

    const handleSave = () => {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        if (clothesOnDates[formattedDate]) {
            onSave(clothesOnDates[formattedDate].thumbnail, formattedDate);
        }
        const modalElement = document.getElementById('openCalendarDialogCurrent');
        if (modalElement) {
            const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
            modalInstance && modalInstance.hide();
        }
        setOpenCalendarDialog(false);
    };

    return (
        <div>
            <div
                className={`modal fade ${openCalendarDialog ? 'show' : ''}`}
                id="openCalendarDialogCurrent"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: openCalendarDialog ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Select a Date
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleModalToggle}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <Calendar
                                onChange={handleDateChange}
                                value={selectedDate}
                                tileContent={tileContent}
                                tileClassName={tileClassName}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary rounded-pill"
                                data-bs-dismiss="modal"
                                onClick={handleModalToggle}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-dark rounded-pill"
                                onClick={handleSave}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClothesCalendar;
