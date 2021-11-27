import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "utils/axios";
import Cookie from "js-cookie";

import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "utils/axios";
import Cookie from "js-cookie";

const Chart = () => {
  const id = Cookie.get("id");
  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const getChartData = await axios.get(`/dashboard/${id}`);
        setIncome(getChartData.data.data.listIncome.map((e) => e.total));
        setExpense(getChartData.data.data.listExpense.map((e) => e.total));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "income",
        data: income,
        fill: true,
        backgroundColor: "#6379F4",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "expense",
        data: expense,
        fill: false,
        backgroundColor: "#9DA6B5",
        borderColor: "#742774",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,

    responsive: true,
  };

  return (
    <Bar data={chartData} options={options} width={"200px"} height={"200px"} />
  );
};

export default Chart;
