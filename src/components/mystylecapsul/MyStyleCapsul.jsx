// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import capsulimg from "../../assets/mystylecapsule/capsulimg1.png";
import shirttop from "../../assets/mystylecapsule/shirt1.png";
import paintimag from "../../assets/mystylecapsule/paintimag.png";
import shoose from "../../assets/mystylecapsule/shoose.png";
import blankimage from "../../assets/mystylecapsule/Group26992.png";
import "../../styles/Mystylecapsule.scss";
import { Link } from "react-router-dom";

const MyStyleCapsul = () => {
  const columnsData = [
    [],
    [
      // myCapsuleAddAvtart
      { url: "/calendarstylecapsule", src: shirttop, top: "5%", right: "70%" },
      { url: "#", src: paintimag, top: "32%", right: "70%" },
      { url: "#", src: shoose, top: "60%", right: "70%" },
    ],
    [],
  ];
  const [selectedDate, setSelectedDate] = useState("");

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="my-style-capsule-container">
      <div className="container">
        <h1 className="text-center fw-bold fs-1">My Style Capsule</h1>
        <div className="d-flex justify-content-end align-items-center">
          <label htmlFor="datePicker">
            <button type="button" className="btn btn-dark rounded-pill">
              <i className="fa-solid fa-calendar-days"></i>{" "}
              {selectedDate ? selectedDate : "Calendar"}
            </button>
          </label>
          <input
            type="date"
            id="datePicker"
            value={selectedDate}
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </div>
        <div className="text-center mt-4">
          <h5 className="fw-bold">Sunday</h5>
          <h5 className="fw-bold">30 June 2024</h5>
        </div>
        <div className="mt-5">
          <div className="row gx-5">
            {columnsData.map((column, columnIndex) => (
              <div key={columnIndex} className="col inner-img">
                <img
                  src={capsulimg}
                  style={{ position: "relative" }}
                  alt={`Capsule ${columnIndex}`}
                />
                {column.length === 0 ? (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div>
                      <img
                        style={{ marginLeft: "4rem" }}
                        src={blankimage}
                        height={50}
                        width={50}
                        alt="No Image"
                      />
                      <br />
                      <br />
                      <h6
                        style={{ marginLeft: "2rem" }}
                        className="fs-6 text-center mt-2"
                      >
                        What is your outfit for today is going to be?
                      </h6>
                    </div>
                  </div>
                ) : (
                  column.map((image, imageIndex) => (
                    <Link key={imageIndex} to={image.url}>
                      <div
                        key={imageIndex}
                        style={{
                          position: "absolute",
                          top: image.top,
                          left: image.left,
                          right: image.right,
                        }}
                      >
                        <img
                          src={image.src}
                          height={200}
                          width={200}
                          alt={`Image ${imageIndex}`}
                        />
                      </div>
                    </Link>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStyleCapsul;
