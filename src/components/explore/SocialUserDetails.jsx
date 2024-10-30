import React from "react";
import { Avatar, IconButton } from "@mui/material";
import showimg4 from "../../assets/marketplace/showimg4.jpg";
import { Edit, Delete, Share } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Explore from "./Explore";

export const SocialUserDetails = () => {
  const categories = [
    {
      title: "Clothes",
      date: "23 Jan 2024",
      image: showimg4,
    },
    {
      title: "Shoes",
      date: "23 Jan 2024",
      image: showimg4,
    },
    {
      title: "Accessories",
      date: "25 Mar 2024",
      image: showimg4,
    },
    {
      title: "Other",
      date: "23 Jan 2024",
      image: showimg4,
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="text-center w-100">
          <div className="profile-section mb-5 text-center">
            <Avatar
              src={showimg4}
              alt="User Avatar"
              sx={{
                width: { xs: 100, sm: 150 },
                height: { xs: 100, sm: 150 },
                margin: "0 auto",
              }}
            />
            <h1 className="fw-bold mt-3">Anshuman</h1>
            <p className="text-muted">Elizabeth@gmail.com</p>
            <div className="d-flex justify-content-center align-items-center flex-wrap">
              <blockquote className="fw-bold me-3 mb-2 text-center">
                "Fashions fade, style is eternal."
              </blockquote>
              <IconButton
                className="btn-dark rounded-circle text-white"
                sx={{ bgcolor: "black", mt: { xs: 2, md: 0 } }}
                aria-label="share"
              >
                <Share />
              </IconButton>
            </div>
          </div>

          <div className="container d-block">
            <div className="row">
              {categories?.map((item, index) => (
                <div className="col-12 col-md-6 mt-4" key={index}>
                  <div
                    className="rounded-pill mb-3"
                    style={{ backgroundColor: "#333" }}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="profile-image rounded-start-pill"
                        style={{ width: "100%", maxWidth: "200px" }}
                      />
                      <div className="text-start p-3 d-flex flex-column justify-content-center text-white w-100">
                        <h4 className="fw-bold mb-0">{item?.title}</h4>
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-4">{item?.date}</h6>
                          <h6 className="edit-text text-decoration-underline">
                            Edit
                          </h6>
                        </div>
                        <button
                          type="button"
                          className="btn btn-dark rounded-pill w-50 mt-2 d-flex justify-content-center align-items-center px-2 py-1"
                          style={{ fontSize: "0.8rem" }}
                        >
                          Delete <Delete className="ms-2" fontSize="x-small" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row gx-5">
              <div className="col-12 col-md-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar/>
                </LocalizationProvider>
              </div>
              <div className="col-12 col-md-6">
                {/* <Explore /> */}
                working mode
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
