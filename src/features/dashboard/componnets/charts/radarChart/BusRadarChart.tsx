import ReactECharts from "echarts-for-react";

interface DataPoint {
  Station: string;
  Time: number;
  Value: number;
}

interface BusRadarChartProps {
  stationName: string;
  data: { [key: string]: DataPoint[] };
  colorMap?: { [key: string]: string };
}

const BusRadarChart: React.FC<BusRadarChartProps> = ({
  stationName,
  data,
  colorMap,
}) => {
  // 1. Compute values array per dataset
  const allValues: number[][] = Object.entries(data).map(([_, dataset]) => {
    const filtered = dataset.filter((row) => row.Station === stationName);
    return Array.from({ length: 24 }, (_, hour) => {
      const entry = filtered.find((r) => r.Time === hour);
      return entry ? entry.Value : 0;
    });
  });

  // Flatten all values from all datasets into a single array
  const flatValues = allValues.flat();

  // Get the global max
  const globalMax = Math.ceil(Math.max(...flatValues)); // rounded up for visuals

  // Create indicators with the same max for all hours
  const indicators = Array.from({ length: 24 }, (_, hour) => ({
    name: `${hour}`,
    max: globalMax,
  }));

  console.log(indicators);

  // 3. Map series using the precomputed value arrays
  const series = Object.entries(data).map(([label], idx) => ({
    type: "radar",
    name: label,
    symbol: "none", // 🔹 Remove dots
    lineStyle: {
      width: 2, // 🔹 Adjust line width
      type: "solid", // 🔹 You could use "dashed" or "dotted" if desired
    },
    data: [
      {
        value: allValues[idx],
        name: label,
      },
    ],
    color: colorMap?.[label] || "#00ff00",
  }));

  const option = {
    backgroundColor: "#000",
    tooltip: {},
    legend: {
      show: true,
      textStyle: { color: "#fff" },
    },
    radar: {
      indicator: indicators,
      startAngle: 90, // 🔁 Start from the right
      clockwise: false, // ⏩ Go clockwise
      splitLine: { lineStyle: { color: "#333" } },
      axisLine: { lineStyle: { color: "#555" } },
      splitArea: { areaStyle: { color: ["#111", "#222"] } },
      name: {
        textStyle: { color: "#ccc", fontSize: 10 },
      },
    },
    series,
  };

  return <ReactECharts option={option} style={{ height: 450 }} />;
};

export default BusRadarChart;
