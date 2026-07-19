import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const LineGraph = ({ priceArray }) => {
  const chartData = {
    labels: priceArray ? new Array(priceArray.length).fill("") : [],
    datasets: [
      {
        label: "Price of 7 d",
        data: priceArray,
        borderColor: "rgb(21, 109, 109)",
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: true },
    },
    plugins: {
      legend: { display: true },
    },
  };

  return <Line options={options} data={chartData} />;
};
