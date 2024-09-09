// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CalendarStyleCapsule.scss';
import { Link } from 'react-router-dom';

function CalendarStyleCapsule() {
  const [startDate, setStartDate] = useState(new Date());
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);

  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="custom-header">
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="nav-button nav-left">{"<"}</button>
      <span className="month-year" onClick={() => setShowMonthYearPicker(!showMonthYearPicker)}>
        {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
      </span>
      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="nav-button nav-right">{">"}</button>
    </div>
  );

  const renderMonthYearPicker = (date) => (
    <div className="month-year-picker">
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="month-option"
          onClick={() => {
            const newDate = new Date(date.getFullYear(), i, 1);
            setStartDate(newDate);
            setShowMonthYearPicker(false);
          }}>
          {new Date(date.getFullYear(), i).toLocaleString('default', { month: 'long' })}
        </div>
      ))}
    </div>
  );

  return (
    <div className="calendar-style-capsule">
      <header className="calendar-header">
        <h1 className="main-heading">My Style Capsule</h1>
        <Link to="/emojistylecapsule">Next Page</Link>
      </header>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        inline
        renderCustomHeader={renderCustomHeader}
        calendarContainer={({ children }) => (
          <CalendarContainer className="custom-calendar-container">
            {showMonthYearPicker ? renderMonthYearPicker(startDate) : children}
          </CalendarContainer>
        )}
      />
    </div>
  );
}

export default CalendarStyleCapsule;
