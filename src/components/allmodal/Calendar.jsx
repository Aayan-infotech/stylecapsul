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
    const [activeStartDate, setActiveStartDate] = useState(new Date());

    const [clothesOnDates] = useState([
        {
            id: 1, date: '2024-11-09', thumbnail: [
                "data:image/webp;base64,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",
                "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRTTXMhPRzN486_007iMhHIc9ZnM_SvJRIVFUQHp09GxMYLRvYDlE0LHJJqzMURlvKLV_wspJMqWYo_o9zwffqJwZGSykpzM19yxKTAFpNw8x-8p7QrwvXuf6R3YFDkZoNQW2TzNEEHcA&usqp=CAc",
                "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSkvGpGbYVKhDZFFqIC10J1n2_f5RXa3zB-xcGkRAiYTHP2u0r_k2Tx69ryYYg0nkRMFVJNpbt6yEcfxlCkgUohVZmPdTtJNjkJEqk9mKDpAnhsLWRvbSy4yw&usqp=CAE"]
        },
        {
            id: 1, date: '2024-11-15', thumbnail: [
                "data:image/webp;base64,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",
                "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRTTXMhPRzN486_007iMhHIc9ZnM_SvJRIVFUQHp09GxMYLRvYDlE0LHJJqzMURlvKLV_wspJMqWYo_o9zwffqJwZGSykpzM19yxKTAFpNw8x-8p7QrwvXuf6R3YFDkZoNQW2TzNEEHcA&usqp=CAc",
                "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSkvGpGbYVKhDZFFqIC10J1n2_f5RXa3zB-xcGkRAiYTHP2u0r_k2Tx69ryYYg0nkRMFVJNpbt6yEcfxlCkgUohVZmPdTtJNjkJEqk9mKDpAnhsLWRvbSy4yw&usqp=CAE"]
        },
        {
            id: 1, date: '2024-11-20', thumbnail: [
                "data:image/webp;base64,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",
                "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRTTXMhPRzN486_007iMhHIc9ZnM_SvJRIVFUQHp09GxMYLRvYDlE0LHJJqzMURlvKLV_wspJMqWYo_o9zwffqJwZGSykpzM19yxKTAFpNw8x-8p7QrwvXuf6R3YFDkZoNQW2TzNEEHcA&usqp=CAc",
                "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSkvGpGbYVKhDZFFqIC10J1n2_f5RXa3zB-xcGkRAiYTHP2u0r_k2Tx69ryYYg0nkRMFVJNpbt6yEcfxlCkgUohVZmPdTtJNjkJEqk9mKDpAnhsLWRvbSy4yw&usqp=CAE"]
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
                {/* modal-lg */}
                <div className="modal-dialog modal-dialog-centered">
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
                                activeStartDate={activeStartDate}
                                onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
                                prev2Label={null}
                                next2Label={null}
                                onClickNext={handleNextMonth}
                                onClickPrev={handlePrevMonth}
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
