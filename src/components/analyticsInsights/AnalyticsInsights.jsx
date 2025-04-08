import React, { useEffect, useState } from "react";
import "../../styles/Analyticsinsights.scss";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { apiUrl } from "../../../apiUtils";
import { getCookie } from "../../utils/cookieUtils";
import axios from "axios";
import { showErrorToast, showSuccessToast } from '../toastMessage/Toast';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const AnalyticsInsights = () => {
  const auth_token = getCookie('authToken');
  const [chartData, setChartData] = useState(null);
  const [closetChartData, setClosetChartData] = useState(null);

  const colors = [
    "#A9F4D0B2",
    "#DBAEFF",
    "#FDD09F",
    "#FED0EE",
    "#D0E8FF",
    "#FBE38E",
  ];

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
              label += ": " + context.parsed;
            }
            return label;
          },
        },
      },
    },
  };

  const fetchChart = async () => {
    try {
      const response = await axios.get(apiUrl('api/cloths/graph'), {
        headers: {
          'Authorization': `Bearer ${auth_token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response?.data.success === false) {
        showErrorToast(response?.data?.message);
      } else {
        const responseData = response?.data?.data;
        const labels = responseData.map(item => item._id);
        const data = responseData.map(item => item.count);
        setChartData({
          labels,
          datasets: [
            {
              label: "Clothing Types",
              data,
              backgroundColor: colors.slice(0, labels.length),
              borderColor: colors.slice(0, labels.length),
              borderWidth: 1,
            },
          ],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClosetChart = async () => {
    try {
      const response = await axios.get(apiUrl('api/closet/closet-graph'), {
        headers: {
          'Authorization': `Bearer ${auth_token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response?.data.success === false) {
        showErrorToast(response?.data?.message);
      } else {
        const responseData = response?.data?.data;
        const labels = responseData.map(item => item.name);
        const data = responseData.map(item => item.count);
        setClosetChartData({
          labels,
          datasets: [
            {
              label: "Clothing Types",
              data,
              backgroundColor: colors.slice(0, labels.length),
              borderColor: colors.slice(0, labels.length),
              borderWidth: 1,
            },
          ],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChart();
    fetchClosetChart();
  }, []);

  return (
    <div className="analytics-insights">
      <div className="container">
        <div className="row gx-5 mt-4 justify-content-center">
          <div className="col-12 col-md-6 d-flex flex-column align-items-center">
            <h1 className="fw-bold fs-3 mb-4">Clothes Chart</h1>
            <div className="chart-container">
              {chartData ? (
                <Pie data={chartData} options={pieChartoptions} />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex flex-column align-items-center">
            <h1 className="fw-bold fs-3 mb-4">Closet Wardrobe Chart</h1>
            <div className="closet-chart-container">
              {closetChartData ? (
                <Pie data={closetChartData} options={pieChartoptions} />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsInsights;
