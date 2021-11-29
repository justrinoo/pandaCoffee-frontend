import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { useEffect, useState } from "react";
import axios from "utils/axios";
import Cookie from "js-cookie";

const Chart = () => {
  const id = Cookie.get("id");
  const [income, setIncome] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const getChartData = await axios.get(`/dashboard/DAY`);
        console.log(getChartData);
        setIncome(getChartData.data.data.result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(income.map((item) => item.DAY));
  const chartData = {
    labels: [
      "day-1",
      "day-2",
      "day-3",
      "day-4",
      "day-5",
      "day-6",
      "day-7",
      "day-8",
      "day-9",
      "day-10",
      "day-11",
      "day-12",
      "day-13",
      "day-14",
      "day-15",
      "day-16",
      "day-17",
      "day-18",
      "day-19",
      "day-20",
      "day-21",
      "day-22",
      "day-23",
      "day-24",
      "day-25",
      "day-26",
      "day-27",
      "day-28",
      "day-29",
      "day-30",
      "day-31",
    ],
    datasets: [
      {
        label: "income",
        data: income.map((item) => {
          return item.total;
        }),
        backgroundColor: "#FFC312",
        borderColor: "#FFC312",
        barThickness: 12,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <>
      <div>
        <Bar data={chartData} options={options} />
      </div>
    </>
  );
};

export default Chart;
