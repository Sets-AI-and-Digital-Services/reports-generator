import React, { FC, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

interface SankeyNode {
  name: string;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

const mockData: SankeyData = {
  nodes: [
    { name: "Crowd" },
    { name: "Bus Station A" },
    { name: "Bus Station B" },
    { name: "Haram Area" },
    { name: "Mina" },
    { name: "Haram Gate 1" },
    { name: "Haram Gate 2" },
    { name: "Mina Sector 1" },
    { name: "Mina Sector 2" },
  ],
  links: [
    { source: "Crowd", target: "Bus Station A", value: 30 },
    { source: "Crowd", target: "Bus Station B", value: 20 },

    { source: "Bus Station A", target: "Haram Area", value: 25 },
    { source: "Bus Station B", target: "Mina", value: 15 },

    // Sub-targets
    { source: "Haram Area", target: "Haram Gate 1", value: 12 },
    { source: "Haram Area", target: "Haram Gate 2", value: 13 },
    { source: "Mina", target: "Mina Sector 1", value: 7 },
    { source: "Mina", target: "Mina Sector 2", value: 8 },
  ],
};

const SankeyChart: FC = () => {
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState({});

  useEffect(() => {
    // Simulate fetching JSON (you can replace this with real API call)
    setTimeout(() => {
      const { nodes, links } = mockData;

      setOption({
        title: {
          text: "Sankey Diagram - Passenger Flow",
          left: "center",
          textStyle: { color: "#fff" },
        },
        backgroundColor: "#111",
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
        },
        series: [
          {
            type: "sankey",
            data: nodes,
            links,
            emphasis: {
              focus: "adjacency",
            },
            levels: [
              {
                depth: 0,
                itemStyle: { color: "#fbb4ae" },
                lineStyle: { color: "source", opacity: 0.6 },
              },
              {
                depth: 1,
                itemStyle: { color: "#b3cde3" },
                lineStyle: { color: "source", opacity: 0.6 },
              },
              {
                depth: 2,
                itemStyle: { color: "#ccebc5" },
                lineStyle: { color: "source", opacity: 0.6 },
              },
              {
                depth: 3,
                itemStyle: { color: "#decbe4" },
                lineStyle: { color: "source", opacity: 0.6 },
              },
            ],
            lineStyle: { curveness: 0.5 },
          },
        ],
      });

      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="w-full h-full p-4 bg-black rounded-xl">
      {loading ? (
        <p className="text-center text-white">Loading Sankey...</p>
      ) : (
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
        />
      )}
    </div>
  );
};

export default SankeyChart;
