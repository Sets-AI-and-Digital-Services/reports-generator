import ReactECharts from "echarts-for-react";

const BusTrafficChart = () => {
  const option = {
    title: {
      text: "Bus Traffic per District",
      left: "center",
      textStyle: { color: "#fff", fontSize: 20 },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      textStyle: { color: "#fff" },
      top: 30,
    },
    grid: {
      top: "10%",
      left: "10%",
      right: "10%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      axisLine: { lineStyle: { color: "#888" } },
      axisLabel: { color: "#fff" },
    },
    yAxis: {
      type: "category",
      data: ["Al Haram", "Jamarat", "Mina", "Arafat", "Muzdalifah", "Total"],
      axisLine: { lineStyle: { color: "#888" } },
      axisLabel: { color: "#fff" },
    },
    series: [
      {
        name: "Morning Shift",
        type: "bar",
        data: [320, 450, 370, 290, 150, 1580],
      },
      {
        name: "Evening Shift",
        type: "bar",
        data: [300, 480, 390, 310, 180, 1660],
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

export default BusTrafficChart;
