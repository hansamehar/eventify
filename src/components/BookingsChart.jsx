import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getBookingsByCategoryAPI } from "../services/allAPI";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BookingsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const fetchData = async () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (token && user.role === "admin") {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getBookingsByCategoryAPI(reqHeader);
        if (result.status === 200) {
          const data = result.data;
          const categories = data.map((item) => item.category);
          const totalBookings = data.map((item) => item.TotalBookings);
          setChartData({
            labels: categories,
            datasets: [
              {
                label: "Total Bookings",
                data: totalBookings,
                backgroundColor: "#6B98C4",
                borderColor: "#1E4A75",
                borderWidth: 1,
              },
            ],
          });
          console.log(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("admin access only");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Bookings by Event Category",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Total Bookings: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Event Category",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Bookings",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Bar data={chartData} options={options} />
    </>
  );
};

export default BookingsChart;
