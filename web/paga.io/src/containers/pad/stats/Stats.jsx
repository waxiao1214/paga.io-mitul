import React from "react";
import { Bar } from "react-chartjs-2";
import { userImage, rightDetail } from "helper/constant";
import { Line } from "react-chartjs-2";
import { leftState, rightState, battery } from "helper/constant";

const lineOptions = {
  maintainAspectRatio: false,
  scaleShowLabels: false,
  legend: false,
  elements: {
    point: {
      radius: 0,
    },
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.3,
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: "#CCC",
        },
        gridLines: {
          color: "#0058FF",
        },
      },
    ],
  },
};

const onAnimationComplete = (self) => {
  let chartInstance = self.chart,
    ctx = chartInstance.ctx;
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.font = "bold 13px roboto-regular";
  ctx.textBaseline = "bottom";
  const alldata = self.data.datasets;

  self.data.datasets.forEach(function (dataset, i) {
    var meta = chartInstance.controller.getDatasetMeta(i);
    meta.data.forEach(function (bar, index) {
      var data = dataset.data[index];
      if (dataset.label === "Previous Training") {
        const currentTraining = alldata[0].data[index];
        const previousTraining = alldata[1].data[index];
        const result = (currentTraining / previousTraining) * 100;
        data = result && result > 0 ? Math.floor(result) + "%" : 0;
      } else {
        if (index === 0) {
          data = data + " m";
        } else if (index === 1) {
          data = data + " kj";
        } else if (index === 2) {
          data = data + " kj";
        } else if (index === 3) {
          data = data + " km";
        }
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

const Stats = () => {
  const obj = {
    currentTraining: {
      paddleAdvancementMeters: 5.1,
      energyKj: 12,
      bpm: 15,
      distanceKm: 12,
      averagePowerLeftW: 50,
      averagePowerRightW: 70,
    },
    previousTrainings: {
      paddleAdvancementMeters: 1.0,
      energyKj: 8,
      bpm: 5,
      distanceKm: 10,
      averagePowerLeftW: 30,
      averagePowerRightW: 20,
    },
  };

  const getBarData = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(1, 10, 10, 300);
    gradient.addColorStop(0, "#00FFFF");
    gradient.addColorStop(0.5, "#00FFFF");
    gradient.addColorStop(1, "#0058FF");
    return {
      labels: ["AVANZAMENTO", "LAVORO", "BPM", "DISTANZA"],
      datasets: [
        {
          label: "Current Training",
          data: [
            obj.currentTraining.paddleAdvancementMeters,
            obj.currentTraining.energyKj,
            obj.currentTraining.bpm,
            obj.currentTraining.distanceKm,
          ],
          backgroundColor: gradient,
          borderColor: "transparent",
          borderWidth: 1,
          fill: false,
        },
      ],
    };
  };

  const sxData = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 180);
    gradient.addColorStop(0, "#00FFFF");
    gradient.addColorStop(0.5, "#0058FF");
    gradient.addColorStop(1, "#0058FF");

    return {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "SX",
          backgroundColor: gradient,
          borderColor: "#0058FF",
          borderWidth: 0,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "#0058FF",
          data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56, 90, 71],
        },
      ],
    };
  };

  const dxData = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 180);
    gradient.addColorStop(0, "#00FFFF");
    gradient.addColorStop(0.5, "#0058FF");
    gradient.addColorStop(1, "#0058FF");

    return {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "DX",
          backgroundColor: gradient,
          borderColor: "#0058FF",
          borderWidth: 0,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "#0058FF",
          data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56, 90, 71],
        },
      ],
    };
  };

  return (
    <div className="pwa-pad-container">
      <div className="Ipad-container">
        <div className="stats-profile">
          <div className="profile-photo state-profile">
            <img src={userImage} alt="" />
          </div>
          <div className="an-22 bold-text light--text text-center">
            Antonio C
          </div>
        </div>
        <div className="pad-stats-bar">
          <Bar data={getBarData} height={200} options={options} />
          <div className="hor-line"></div>
        </div>
        <div className="right-title">
          <div className="an-24 bold-text light--text text-right">
            Statistiche
          </div>
          <div className="an-36 bold-text light--text">SIMULATION</div>
          <div className="an-18 regular-text sky--text">
            Allenamento Completato <img src={rightDetail} alt="rightDetail" />
          </div>
          <div className="text-right pt20 pos-relative">
            <div className="battery-number an-18 bold-text light--text">
              100%
            </div>
            <img src={battery} alt="battery" />
            <div className="an-10 bold-text light--text pt10">
              LIVELLO BATTERIA MACCHINA
            </div>
          </div>
        </div>
        <div>
          <div className="sx-dx-block flex-x py25 px80">
            <div className="sx-block flex-1 pa20 an-14 bold-text light--text">
              <div className="an-18 bold-text">SX</div>
              <div className="sx-image">
                <div className="an-14 regular-text sx-text">
                  <span>300w</span>
                </div>
                <img src={leftState} alt="" />
              </div>
            </div>
            <div className="dx-block flex-1 pa20 an-14 bold-text light--text text-right">
              <div className="an-18 bold-text">DX</div>
              <div className="dx-image">
                <div className="an-14 regular-text dx-text">
                  <span>400w</span>
                </div>
                <img src={rightState} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-x center pl30 pr80">
          <div className="an-24 bold-text light--text">SX</div>
          <div className="pl10 flex-1">
            <Line data={sxData} height={120} options={lineOptions} />
          </div>
        </div>
        <div className="flex-x center pl30 pr80 pb30">
          <div className="an-24 bold-text light--text">DX</div>
          <div className="pl10 pt20 flex-1">
            <Line data={dxData} height={120} options={lineOptions} />
          </div>
        </div>
      </div>
      <div className="land-scap-alert alert-modal">
        <div>
          <div className="modal-custom-header an-32 bold-text flex-x center">
            <img src={alert} alt="" /> ATTENZIONE
          </div>
          <div className="body-text text-center an-28 regular-text">
            Per favore, ruoto lo schermo
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
