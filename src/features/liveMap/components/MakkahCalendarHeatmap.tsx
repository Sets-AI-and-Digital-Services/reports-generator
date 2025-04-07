import { useRef } from "react";
import ReactECharts from "echarts-for-react";

const MakkahCalendarHeatmap = () => {
  const chartRef = useRef(null);

  const getVirtualData = (year: string) => {
    const date = +new Date(`${year}-01-01`);
    const end = +new Date(`${+year + 1}-01-01`);
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    for (let time = date; time < end; time += dayTime) {
      data.push([
        new Date(time).toISOString().split("T")[0],
        Math.floor(Math.random() * 10000),
      ]);
    }
    return data;
  };

  const option = {
    backgroundColor: "#111",
    title: {
      top: 30,
      left: "center",
      text: "Makkah Daily Passenger Count",
      textStyle: { color: "#fff" },
    },
    tooltip: {},
    visualMap: {
      min: 0,
      max: 10000,
      type: "piecewise",
      orient: "horizontal",
      left: "center",
      top: 65,
      textStyle: { color: "#fff" },
    },
    calendar: {
      top: 220,
      left: 50,
      right: 50,
      cellSize: ["auto", 13],
      range: "2025",
      itemStyle: {
        borderWidth: 0.5,
        borderColor: "#ccc",
      },
      yearLabel: { show: false },
      dayLabel: { color: "#999" },
      monthLabel: { color: "#ccc" },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: getVirtualData("2025"),
    },
  };

  return (
    <div>
      <ReactECharts ref={chartRef} option={option} style={{ height: 500 }} />
    </div>
  );
};

export default MakkahCalendarHeatmap;
