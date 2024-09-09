import React, { useState } from "react";
import "../../styles/Analyticsinsights.scss";
import ReactApexChart from "react-apexcharts";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import logo from "../../assets/analytics/Group 26948.png";
import { Link } from "react-router-dom";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const AnalyticsInsights = () => {
  const [options, setOptions] = React.useState({
    chart: {
      type: "bar",
      height: 400,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    yaxis: {
      min: 0,
      max: 1000,
      tickAmount: 10,
      labels: {
        formatter: function (value) {
          return value.toString();
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
    colors: ["#B1916FB5", "#997AB2BA"],
    legend: {
      position: "top",
      horizontalAlign: "center",
      floating: true,
      offsetY: 0,
      offsetX: 0,
      markers: {
        width: 12,
        height: 12,
      },
    },
  });

  const [series, setSeries] = React.useState([
    {
      name: "Dataset 1",
      data: [444, 455, 857, 456, 461, 558, 363],
    },
    {
      name: "Dataset 2",
      data: [676, 285, 301, 298, 487, 505, 391],
    },
  ]);
  // -----------------------------------------------------
  const data = {
    labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 30, 40, 50],
        backgroundColor: [
          "#A9F4D0B2",
          "#DBAEFF",
          "#FDD09F",
          "#FED0EE",
          "#D0E8FF",
          "#FBE38E",
        ],
        borderColor: [
          "#A9F4D0B2",
          "#DBAEFF",
          "#FDD09F",
          "#FED0EE",
          "#D0E8FF",
          "#FBE38E",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";

            if (context.parsed !== null) {
              label += ": " + context.parsed + "%";
            }
            return label;
          },
        },
      },
    },
  };
  return (
    <div className="d-flex justify-content-center align-items-center analytics-insights">
      <div className="container w-75">
        <div className="row gy-3">
          <div className="col-12 col-md-6">
            <div className="p-3">
              <h2 className="fw-bold fs-2 fs-md-1">Analytics Insights</h2>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-3">
              <Link to="/closet-overview" className="text-decoration-none">
                <button
                  type="button"
                  className="btn btn-secondary d-flex justify-content-center align-items-center fs-6 fs-md-5 fw-bold p-3 rounded-pill w-100 w-md-75"
                >
                  <img src={logo} height={25} className="me-1" alt="Logo" />
                  <span>Closet Overview</span>
                </button>
              </Link>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-3">
              <button
                type="button"
                className="btn btn-secondary fs-6 fs-md-5 fw-bold p-3 rounded-pill w-100 w-md-75"
              >
                Wardrobe Analytics
              </button>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-3">
              <button
                type="button"
                className="btn btn-outline-secondary fs-6 fs-md-5 fw-bold p-3 rounded-pill w-100 w-md-75"
              >
                My Style Capsule
              </button>
            </div>
          </div>
        </div>
        {/* -------------------------------------Most Wore Items----------------------chart */}
        <div className="row mt-5">
          <h1 className="fw-bold fs-1">Most Wore Items</h1>
          <div className="col-12">
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={400}
            />
          </div>
        </div>
        {/* -------------------------------------Least Wore Items----------------------chart */}
        <div className="row mt-5">
          <h1 className="fw-bold fs-1">Least Wore Items</h1>
          <div className="col-12">
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={400}
            />
          </div>
        </div>

        {/* -------------------------------------Types of Clothes----------------------chart */}
        <div className="row mt-5">
          <h1 className="fw-bold fs-1">Types of Clothes</h1>
          <div className="col-12">
            <div className="chart-container d-flex justify-content-center align-items-center">
              <Pie data={data} options={pieChartoptions} />
            </div>
          </div>
        </div>

        {/* -------------------------------------Types of Item in Wardrobe----------------------chart */}
        <div className="row mt-5">
          <h1 className="fw-bold fs-1">Types of Item in Wardrobe</h1>
          <div className="col-12">
            <div className="chart-container d-flex justify-content-center align-items-center">
              <Pie data={data} options={pieChartoptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsInsights;
