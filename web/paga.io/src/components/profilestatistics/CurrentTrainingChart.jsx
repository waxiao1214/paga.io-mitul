import React from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

const onAnimationComplete = (self) => {
  var chartInstance = self.chart,
    ctx = chartInstance.ctx;
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.font = "bold 13px roboto-regular";
  ctx.textBaseline = "bottom";

  self.data.datasets.forEach(function (dataset, i) {
    var meta = chartInstance.controller.getDatasetMeta(i);
    meta.data.forEach(function (bar, index) {
      var data = dataset.data[index];
      if (index === 0) {
        data = data + " m";
      } else if (index === 1) {
        data = data + " kj";
      } else if (index === 2) {
        data = data + " kj";
      } else if (index === 3) {
        data = data + " km";
      }
      ctx.fillText(data, bar._model.x, bar._model.y - 5);
    });
  });
};

const options = {
  tooltips: {
    enabled: false,
  },
  hover: {
    animationDuration: 1,
  },
  animation: {
    duration: 1,
    onComplete: function () {
      onAnimationComplete(this);
    },
  },
  scales: {
    xAxes: [
      {
        stacked: true,
        barPercentage: 0.7,
        position: "bottom",
        display: true,
        gridLines: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          display: true, //this will remove only the label
          fontColor: "#fff",
          fontSize: 10,
          padding: 10,
          fontStyle: "bold",
        },
      },
    ],
    yAxes: [
      {
        stacked: false,
        display: false,
        gridLines: {
          drawBorder: true,
          display: false,
          color: "#eef0fa",
          drawTicks: false,
          zeroLineColor: "rgba(90, 113, 208, 0)",
        },
        ticks: {
          display: true,
          beginAtZero: true,
          stepSize: 200,
          fontColor: "#fff",
          fontSize: 10,
          fontStyle: "bold",
        },
      },
    ],
  },
  legend: {
    display: false,
  },
  plugins: {
    datalabels: {
      display: false,
      align: "center",
      anchor: "center",
    },
  },
};

const CurrentTrainingChart = ({ userInfo }) => {
  const getData = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "#00FFFF");
    gradient.addColorStop(1, "#0058FF");
    return {
      labels: ["AVANZAMENTO", "LAVORO", "BPM", "DISTANZA"],
      datasets: [
        {
          label: "Current Training",
          data: [
            userInfo.paddleAdvancementMeters,
            userInfo.energyKj,
            userInfo.bpm,
            userInfo.distanceKm,
          ],
          backgroundColor: gradient,
          borderColor: "transparent",
          borderWidth: 1,
          fill: false,
        },
      ],
    };
  };
  return (
    <div>
      <Bar data={getData} height={200} options={options} />
      <div className="hor-line"></div>
    </div>
  );
};
CurrentTrainingChart.propTypes = {
  userInfo: PropTypes.object,
};
export default CurrentTrainingChart;
