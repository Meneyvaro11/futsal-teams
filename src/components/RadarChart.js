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
import { BsDisplay } from "react-icons/bs";

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

  const getPerformanceColor = (performance) => {
    if (performance >= 0 && performance <= 4.5) {
      return "red";
    } else if (performance >= 5.5 && performance <= 6.9) {
      return "orange";
    } else if (performance >= 7 && performance <= 10) {
      return "green";
    }
    return "black"; // colore di default se il voto non rientra in nessuno degli intervalli specificati
  };

  return (
    <div>
      <div style={{ maxWidth: "300px", margin: "0 auto" }}>
        <Radar data={data} options={options} />
      </div>
      <div className="performances">
        <h4>Prestazioni Recenti</h4>
        <div className="ultime-prestazioni">
          <ul style={{ display: "flex", overflowX: "auto" }}>
            {playerData.performances.map((performance, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: getPerformanceColor(performance),
                  opacity: 0.8,
                  color: "white",
                  margin: "0 5px",
                  width: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "20px",
                }}
              >
                <b>{performance || "NV"}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RadarChart;
