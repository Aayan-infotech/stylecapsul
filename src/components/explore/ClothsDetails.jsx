import React from "react";
import Avatar from "@mui/material/Avatar";
import ShareIcon from "@mui/icons-material/Share";
import Typography from "@mui/material/Typography";
import showimg4 from "../../assets/myCapsuleAddAvtar/for4.png";
import showimg5 from "../../assets/myCapsuleAddAvtar/previewImage4.jpg";
import girls from "../../assets/myCapsuleAddAvtar/girls.png";
import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/material";

export const ClothsDetails = () => {
  const { id } = useParams();

  const categories = [
    {
      _id: 1,
      name: "Top Jeans",
      date: "24 Nov 2024",
      image: [showimg4, showimg5, girls],
      brand: "Killer",
      price: "4500",
      size: "34",
    },
    {
      _id: 2,
      name: "Shoes",
      date: "14 Nov 2024",
      image: [showimg4, showimg5, girls],
      brand: "Puma",
      price: "3000",
      size: 7,
    },
  ];

  const category = categories.find((item) => item._id === parseInt(id));

  return (
    <div className="container my-4">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-3 text-center">
          <div
            id="imageCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            style={{ width: "200px", margin: "0 auto" }}
          >
            <div className="carousel-inner">
              {category?.image.map((img, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={img}
                    alt={`Image ${index + 1}`}
                    className="d-block"
                    style={{
                      borderRadius: "100px",
                      width: "200px",
                      height: "350px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="carousel-indicators" style={{ bottom: "-20px" }}>
              {category?.image.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#imageCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: index === 0 ? "#000" : "#000",
                    opacity: index === 0 ? "1" : "0.5",
                    margin: "0 5px",
                  }}
                ></button>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#imageCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
                style={{ backgroundColor: "#000" }}
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#imageCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
                style={{ backgroundColor: "#000" }}
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="col-12 col-md-9">
          <Typography variant="h4" component="h2" className="fw-bold">
            {category?.name || "Jacket"}
          </Typography>
          <Typography variant="subtitle1" className="fw-bold mt-2">
            Description
          </Typography>
          <Typography variant="body2" className="text-black fw-bold mb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet.
          </Typography>

          <div className="row">
            <div className="col-12 col-md-8 d-flex justify-content-between align-items-center">
              <Box>
                <p variant="h6" className="text-black fw-bold">
                  Category
                </p>
                <p variant="h6" className="text-black fw-bold">
                  Color
                </p>
                <p variant="h6" className="text-black fw-bold">
                  Type
                </p>
                <p variant="h6" className="text-black fw-bold">
                  Brand
                </p>
                <p variant="h6" className="text-black fw-bold">
                  Purchase Date
                </p>
              </Box>
              <Box>
                <p variant="h6" className="text-muted">
                  Cloth
                </p>
                <p variant="h6" className="text-muted">
                  White
                </p>
                <p variant="h6" className="text-muted">
                  Casual
                </p>
                <p variant="h6" className="text-muted">
                  ABC
                </p>
                <p variant="h6" className="text-muted">
                  23 Jan 2024
                </p>
              </Box>
            </div>
            <div className="col-12 col-md-4 d-flex justify-content-end align-items-end">
              <Link to="/capsulerangecalendar" className="text-decoration-none w-100">
                <button
                  className="btn btn-dark mt-4 d-flex align-items-center"
                  style={{
                    padding: "10px 20px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Share
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
