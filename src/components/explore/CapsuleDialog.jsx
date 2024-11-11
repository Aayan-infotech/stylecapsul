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

    const [clothesOnDates] = useState({
        '2024-11-09': { thumbnail: day4formal },
        '2024-11-18': { thumbnail: day1formal },
        '2024-11-14': { thumbnail: day2formal },
        '2024-11-20': { thumbnail: day3formal },
        '2024-12-09': { thumbnail: day4formal },
        '2024-12-18': { thumbnail: day1formal },
    });

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
        const formattedDate = formatDate(date);
        if (view === 'month' && clothesOnDates[formattedDate]) {
            return 'date-with-image';
        }
        return null;
    };

    const handleSave = () => {
        const formattedDate = formatDate(selectedDate);
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

    const handleNextMonth = () => {
        const newDate = new Date(activeStartDate);
        newDate.setMonth(activeStartDate.getMonth() + 2);
        setActiveStartDate(newDate);
    };

    const handlePrevMonth = () => {
        const newDate = new Date(activeStartDate);
        newDate.setMonth(activeStartDate.getMonth() - 2);
        setActiveStartDate(newDate);
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
                <div className="modal-dialog modal-dialog-centered modal-xl">
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
                            <div className="row gx-5">
                                {/* First Calendar */}
                                <div className="col-12 col-md-6 calendar-left">
                                    <Calendar
                                        onChange={handleDateChange}
                                        value={selectedDate}
                                        tileContent={tileContent}
                                        tileClassName={tileClassName}
                                        activeStartDate={activeStartDate}
                                        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
                                        prev2Label={null}
                                        next2Label={null}
                                        onClickNext={handleNextMonth}
                                        onClickPrev={handlePrevMonth}
                                    />
                                </div>
                                {/* Second Calendar */}
                                <div className="col-12 col-md-6 calendar-right">
                                    <Calendar
                                        onChange={handleDateChange}
                                        value={selectedDate}
                                        tileContent={tileContent}
                                        tileClassName={tileClassName}
                                        activeStartDate={new Date(
                                            activeStartDate.getFullYear(),
                                            activeStartDate.getMonth() + 1
                                        )}
                                        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
                                        prev2Label={null}
                                        next2Label={null}
                                        onClickNext={handleNextMonth}
                                        onClickPrev={handlePrevMonth}
                                    />
                                </div>
                            </div>
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
            <style jsx>{`
                /* Hide next button in the first calendar */
                .calendar-left .react-calendar__navigation__next-button {
                    visibility: hidden;
                }
                /* Hide previous button in the second calendar */
                .calendar-right .react-calendar__navigation__prev-button {
                    visibility: hidden;
                }
            `}</style>
        </div>
    );
};

export default ClothesCalendar;
