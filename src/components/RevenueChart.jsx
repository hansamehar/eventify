import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  DoughnutController,
} from "chart.js";
import { getRevenueAPI } from "../services/allAPI";

ChartJS.register(ArcElement, Tooltip, Legend, Title, DoughnutController);

const RevenueChart = () => {
  const [revenueData, setRevenueData] = useState([]);

  const fetchRevenueData = async () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (token && user.role === "admin") {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getRevenueAPI(reqHeader);
        if (result.status === 200) {
          setRevenueData(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("admin access only");
    }
  };

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const blueShades = [
    "#A2C2E1",
    "#6B98C4",
    "#4176B2",
    "#305D91",
    "#1E4A75",
    "#0A3A58",
  ];

  const chartData = {
    labels: revenueData.map((item) => item.category),
    datasets: [
      {
        label: "Total Revenue",
        data: revenueData.map((item) => item.totalRevenue),
        backgroundColor: blueShades,
        borderColor: "#FFFFFF",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 9,
          boxHeight: 9,
          padding: 10,
        },
      },
      title: {
        display: true,
        text: "Revenue Generated per Category",
        padding: {
          bottom: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `Revenue: $${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <>
      <Doughnut data={chartData} options={chartOptions} />
    </>
  );
};

export default RevenueChart;
