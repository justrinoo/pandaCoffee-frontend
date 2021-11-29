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
        const getChartData = await axios.get(`/dashboard/MONTH`);
        console.log(getChartData);
        setIncome(getChartData.data.data.allData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(income.map((item) => item.total));
  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Agust",
      "September",
      "October",
      "November",
      "Desember",
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
