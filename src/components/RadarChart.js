import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ playerData }) => {
  const data = {
    labels: [
      "Fisico",
      "Velocità",
      "Fiato",
      "Skills",
      "Tiro",
      "Passaggio",
      "Visione",
      "Parata",
      "Visione",
    ],
    datasets: [
      {
        label: playerData.player,
        data: [
          playerData.e,
          playerData.f,
          playerData.g,
          playerData.h,
          playerData.i,
          playerData.j,
          playerData.k,
          playerData.l,
          playerData.m,
        ],
        backgroundColor: "rgba(34, 202, 236, .2)",
        borderColor: "rgba(34, 202, 236, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;
