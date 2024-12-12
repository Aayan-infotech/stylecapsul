import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CalendarStyles.css';
import axios from 'axios';
import { getCookie } from '../../utils/cookieUtils';
import { apiUrl } from "../../../apiUtils";

const ClothesCalendar = ({ onSave }) => {
    const [openCalendarDialog, setOpenCalendarDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [clothesOnDates, setClothesOnDates] = useState([]);
    const token = getCookie("authToken");
    const fetchDayByCloths = async () => {
        try {
            const response = await axios.get(apiUrl('api/myStyleCapsule/getStyle'), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            const data = response?.data?.data?.styleOfTheDay || [];
            const formattedData = data.map(item => ({
                date: item.date,
                thumbnail: item.picture.map(picture => apiUrl(`uploads/${picture}`)),
                id: response?.data?.data?._id || null
            }));
            setClothesOnDates(formattedData);
        } catch (error) {
            console.error("Error fetching clothes data:", error);
        }
    };

    useEffect(() => {
        fetchDayByCloths();
    }, []);

    const handleModalToggle = () => {
        setOpenCalendarDialog(!openCalendarDialog);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const tileContent = ({ date, view }) => {
        const formattedDate = formatDate(date);

        if (view === 'month') {
            const dateEntry = clothesOnDates.find(item => item.date === formattedDate);
            if (dateEntry) {
                return (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        overflow: 'hidden',
                    }}>
                        {dateEntry.thumbnail.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                style={{
                                    width: '15px',
                                    height: 'auto',
                                    objectFit: 'cover',
                                    borderRadius: '4px'
                                }}
                            />
                        ))}
                    </div>
                );
            }
        }
        return null;
    };

    const handleSave = () => {
        const formattedDate = formatDate(selectedDate);
        const dateEntry = clothesOnDates.find(item => item.date === formattedDate);
        if (dateEntry) {
            onSave(dateEntry.thumbnail, formattedDate, dateEntry.id);
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
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Select a Date</h1>
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
