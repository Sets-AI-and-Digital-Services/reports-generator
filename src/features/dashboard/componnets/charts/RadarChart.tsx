import ReactECharts from "echarts-for-react";

const RadarChart = () => {
  const option = {
    backgroundColor: "transparent",
    tooltip: {},
    legend: {
      data: ["Allocated Budget", "Actual Spending"],
      textStyle: { color: "#fff" },
    },
    radar: {
      indicator: [
        { name: "Sales", max: 6500 },
        { name: "Administration", max: 16000 },
        { name: "Information Tech", max: 30000 },
        { name: "Customer Support", max: 38000 },
        { name: "Development", max: 52000 },
        { name: "Marketing", max: 25000 },
      ],
      name: {
        textStyle: {
          color: "#fff",
        },
      },
      axisLine: { lineStyle: { color: "#666" } },
      splitLine: { lineStyle: { color: "#444" } },
      splitArea: { areaStyle: { color: ["#111", "#222"] } },
    },
    series: [
      {
        name: "Budget vs Spending",
        type: "radar",
        data: [
          {
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: "Allocated Budget",
          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: "Actual Spending",
          },
        ],
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "100%", width: "100%", padding: "10px" }}
      className="echarts-dark"
    />
  );
};

export default RadarChart;
