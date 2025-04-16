import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";

const formatUtil = echarts.format;

const makkahCrowdData = [
  {
    name: "Makkah",
    children: [
      {
        name: "Al Haram",
        value: 15000,
        itemStyle: { color: "#0077be" }, // Blue
        children: [
          { name: "Gate 1", value: 3000 },
          { name: "Gate 2", value: 4000 },
          { name: "Tawaf Area", value: 8000 },
        ],
      },
      {
        name: "Mina",
        value: 10000,
        itemStyle: { color: "#33a02c" }, // Green
        children: [
          { name: "Tent Area", value: 6000 },
          { name: "Jamarat", value: 4000 },
        ],
      },
      {
        name: "Arafat",
        value: 7000,
        itemStyle: { color: "#fb9a99" }, // Soft Red
        children: [
          { name: "Namira Mosque", value: 3000 },
          { name: "Main Plains", value: 4000 },
        ],
      },
      {
        name: "Muzdalifah",
        value: 5000,
        itemStyle: { color: "#fdbf6f" }, // Orange
      },
      {
        name: "Bus Stations",
        value: 4000,
        itemStyle: { color: "#cab2d6" }, // Purple
        children: [
          { name: "Station A", value: 2000 },
          { name: "Station B", value: 2000 },
        ],
      },
    ],
  },
];

const getLevelOption = () => [
  {
    itemStyle: {
      borderWidth: 0,
      gapWidth: 5,
    },
  },
  {
    itemStyle: {
      gapWidth: 1,
    },
  },
  {
    colorSaturation: [0.35, 0.5],
    itemStyle: {
      gapWidth: 1,
      borderColorSaturation: 0.6,
    },
  },
];

const DiskTreemapChart = () => {
  const option = {
    backgroundColor: "#0e0e0e",
    title: {
      text: "Disk Usage",
      left: "center",
      padding: [20, 0, 0, 0],
      textStyle: {
        color: "#ffffff",
      },
    },
    tooltip: {
      backgroundColor: "#333",
      borderColor: "#666",
      textStyle: {
        color: "#fff",
      },
      formatter: function (info: any) {
        const value = info.value;
        const treePathInfo = info.treePathInfo;
        const treePath = [];
        for (let i = 1; i < treePathInfo.length; i++) {
          treePath.push(treePathInfo[i].name);
        }
        return `
          <div style="font-size: 13px; font-weight: bold; margin-bottom: 4px;">${formatUtil.encodeHTML(
            treePath.join(" / ")
          )}</div>
          <div>Disk Usage: ${formatUtil.addCommas(value)} KB</div>
        `;
      },
    },
    series: [
      {
        name: "Disk Usage",
        type: "treemap",
        visibleMin: 300,
        label: {
          show: true,
          color: "#fff",
          formatter: "{b}",
        },
        itemStyle: {
          borderColor: "#222",
          borderWidth: 1,
        },
        levels: getLevelOption(),
        data: makkahCrowdData,
      },
    ],
  };

  return (
    <div className="w-full h-full p-5">
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default DiskTreemapChart;
