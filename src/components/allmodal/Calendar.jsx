import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CalendarStyles.css';
import day1formal from '../../assets/myCapsuleAddAvtar/for2-removebg-preview.png';
import day2formal from '../../assets/myCapsuleAddAvtar/for4-removebg-preview.png';
import day3formal from '../../assets/myCapsuleAddAvtar/for5-removebg-preview.png';
import day4formal from '../../assets/myCapsuleAddAvtar/for6.png';

const ClothesCalendar = ({ onSave }) => {
    const [openCalendarDialog, setOpenCalendarDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeStartDate, setActiveStartDate] = useState(new Date());

    const [clothesOnDates] = useState([
        {
            id: 1, date: '2024-11-09', thumbnail: [day1formal, day2formal, day3formal]
        },
        {
            id: 2, date: '2024-11-15', thumbnail: [day1formal, day2formal, day3formal]
        },
        {
            id: 3, date: '2024-11-20', thumbnail: [day1formal, day2formal, day3formal]
        },
    ]);

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
            const dateEntry = clothesOnDates.find((item) => item.date === formattedDate);
            if (dateEntry) {
                return (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        flex: '0 0 14.2857%',
                        overflow: 'hidden',
                        marginInlineEnd: '0px'
                    }}>
                        {dateEntry.thumbnail.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Outfit ${index + 1}`}
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
        const dateEntry = clothesOnDates.find((item) => item.date === formattedDate);
        if (dateEntry) {
            onSave(dateEntry.thumbnail, formattedDate);  // Passing the selected image to the parent component
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
