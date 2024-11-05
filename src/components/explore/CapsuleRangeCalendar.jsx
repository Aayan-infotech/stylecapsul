import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import showimg4 from "../../assets/marketplace/showimg4.jpg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import day1formal from "../../assets/myCapsuleAddAvtar/for2-removebg-preview.png";
import day2formal from "../../assets/myCapsuleAddAvtar/for4-removebg-preview.png";
import day3formal from "../../assets/myCapsuleAddAvtar/for5-removebg-preview.png";
import day4formal from "../../assets/myCapsuleAddAvtar/for6.png";
import { Link } from "react-router-dom";

export const CapsuleRangeCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [clothesOnDates] = useState({
    "2024-10-11": { thumbnail: day4formal },
    "2024-10-14": { thumbnail: day1formal },
    "2024-10-15": { thumbnail: day2formal },
    "2024-10-17": { thumbnail: day3formal },
    "2024-11-11": { thumbnail: day4formal },
    "2024-11-14": { thumbnail: day1formal },
    "2024-11-15": { thumbnail: day2formal },
    "2024-11-17": { thumbnail: day3formal },
    "2024-12-05": { thumbnail: day1formal },
    "2024-12-10": { thumbnail: day2formal },
    "2024-12-15": { thumbnail: day3formal },
    "2024-12-20": { thumbnail: day4formal },
  });

  const tileContent = ({ date, view }) => {
    const formattedDate = date.toISOString().split("T")[0];
    if (view === "month" && clothesOnDates[formattedDate]) {
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
    const formattedDate = date.toISOString().split("T")[0];
    if (view === "month" && clothesOnDates[formattedDate]) {
      return "date-with-image";
    }
    return null;
  };

  return (
    <>
      <div className="mt-5 mb-4">
        <div className=" mb-5 d-flex justify-content-center align-items-center">
          <Avatar src={showimg4} alt="User Avatar" className="me-4" />
          <h1 className="fw-bold mt-3">Anshuman’s Style Capsule</h1>
        </div>

        <div className="container d-block">
          <div className="row gx-5 mt-4">
            {/* November Calendar */}
            <div className="col-12 col-md-6">
              <Calendar
                value={selectedDate}
                tileContent={tileContent}
                tileClassName={tileClassName}
                activeStartDate={new Date(2024, 10, 1)} // November 2024
              />
            </div>

            {/* December Calendar */}
            <div className="col-12 col-md-6">
              <Calendar
                value={selectedDate}
                tileContent={tileContent}
                tileClassName={tileClassName}
                activeStartDate={new Date(2024, 11, 1)} // December 2024
              />
            </div>
          </div>
          <Link to="/capsulerangecalendardetails">
            <Button variant="contained">Next Page</Button>
          </Link>
        </div>
      </div>
    </>
  );
};
