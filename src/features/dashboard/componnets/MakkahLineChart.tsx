import React from "react";
import ReactECharts from "echarts-for-react";

const makkahLineChartOption = {
  backgroundColor: "#000",
  title: {
    text: "Makkah Operations - Weekly Trends",
    left: "center",
    textStyle: {
      color: "#fff",
      fontSize: 18,
    },
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    top: "10%",
    data: [
      "Bus Trips",
      "Pilgrims Arrived",
      "Incidents",
      "Cleaning Ops",
      "Security Alerts",
    ],
    textStyle: {
      color: "#ccc",
    },
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    top: "20%",
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisLine: { lineStyle: { color: "#888" } },
    axisLabel: { color: "#ccc" },
  },
  yAxis: {
    type: "value",
    axisLine: { lineStyle: { color: "#888" } },
    axisLabel: { color: "#ccc" },
  },
  series: [
    {
      name: "Bus Trips",
      type: "line",
      stack: "Total",
      data: [1300, 1350, 2320, 3400, 4420, 5500, 6450],
    },
    {
      name: "Pilgrims Arrived",
      type: "line",
      stack: "Total",
      data: [1200, 1350, 1500, 1600, 1700, 2100, 2000],
    },
    {
      name: "Incidents",
      type: "line",
      stack: "Total",
      data: [115, 217, 124, 806, 553, 998, 116],
    },
    {
      name: "Cleaning Ops",
      type: "line",
      stack: "Total",
      data: [990, 100, 110, 2105, 120, 130, 3125],
    },
    {
      name: "Security Alerts",
      type: "line",
      stack: "Total",
      data: [2212, 313, 412, 514, 163, 851, 2401],
    },
  ],
};

const MakkahLineChart = () => {
  return (
    <div className="w-full h-full bg-black p-4 rounded-xl shadow-lg">
      <ReactECharts
        option={makkahLineChartOption}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default MakkahLineChart;
