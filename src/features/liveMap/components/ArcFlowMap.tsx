import React, { useMemo, useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import StaticMap from "react-map-gl";
import { ArcLayer, ScatterplotLayer } from "@deck.gl/layers";

type Location = {
  id: string;
  name: string;
  position: [number, number]; // [lon, lat]
};

type Flow = {
  origin: string;
  destination: string;
  count: number;
};

const locations: Location[] = [
  { id: "haram", name: "Al Masjid Al Haram", position: [39.8262, 21.4225] },
  { id: "mina", name: "Mina", position: [39.9016, 21.4172] },
  { id: "muzdalifah", name: "Muzdalifah", position: [39.9152, 21.3782] },
  { id: "arafat", name: "Arafat", position: [39.976, 21.3552] },
];

const flows: Flow[] = [
  { origin: "haram", destination: "mina", count: 500 },
  { origin: "mina", destination: "muzdalifah", count: 350 },
  { origin: "muzdalifah", destination: "arafat", count: 200 },
  { origin: "arafat", destination: "haram", count: 150 },
  { origin: "mina", destination: "haram", count: 300 },
];

const MeccaFlowMap = () => {
  const [hoveredFlow, setHoveredFlow] = useState<Flow | null>(null);
  const [time, setTime] = useState(0);

  // Animate the time variable for arc pulsing
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.05);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const initialViewState = {
    longitude: 39.8579,
    latitude: 21.3891,
    zoom: 11.2,
    pitch: 30,
    bearing: 0,
  };

  const nodeStats = useMemo(() => {
    const stats: Record<string, { incoming: number; outgoing: number }> = {};
    flows.forEach(({ origin, destination, count }) => {
      stats[origin] = stats[origin] || { incoming: 0, outgoing: 0 };
      stats[destination] = stats[destination] || { incoming: 0, outgoing: 0 };
      stats[origin].outgoing += count;
      stats[destination].incoming += count;
    });
    return stats;
  }, []);

  const arcLayer = new ArcLayer<Flow>({
    id: "arc-layer",
    data: flows,
    getSourcePosition: (d) =>
      locations.find((l) => l.id === d.origin)?.position,
    getTargetPosition: (d) =>
      locations.find((l) => l.id === d.destination)?.position,
    getSourceColor: (d) =>
      hoveredFlow &&
      d.origin === hoveredFlow.origin &&
      d.destination === hoveredFlow.destination
        ? [255, 255, 0, 255]
        : [255, 100, 100, 120],
    getTargetColor: (d) =>
      hoveredFlow &&
      d.origin === hoveredFlow.origin &&
      d.destination === hoveredFlow.destination
        ? [0, 200, 255, 255]
        : [100, 200, 255, 120],
    getWidth: (d) => {
      const base =
        hoveredFlow &&
        d.origin === hoveredFlow.origin &&
        d.destination === hoveredFlow.destination
          ? Math.max(3, d.count / 20)
          : Math.max(1, d.count / 80);
      return base * (1 + 0.3 * Math.sin(time + d.count)); // Pulsing
    },
    pickable: true,
    onHover: ({ object }) => setHoveredFlow(object || null),
    updateTriggers: {
      getWidth: [time, hoveredFlow],
    },
  });

  const scatterLayer = new ScatterplotLayer<Location>({
    id: "station-layer",
    data: locations,
    getPosition: (d) => d.position,
    getRadius: (d) => {
      const stat = nodeStats[d.id];
      const traffic = (stat?.incoming || 0) + (stat?.outgoing || 0);
      return Math.min(100, 6 + traffic / 10);
    },
    getFillColor: (d) => {
      const stat = nodeStats[d.id];
      if (!stat) return [180, 180, 180];
      return stat.incoming > stat.outgoing
        ? [30, 144, 255]
        : stat.outgoing > stat.incoming
        ? [255, 140, 0]
        : [200, 200, 200];
    },
    getLineColor: [0, 0, 0],
    lineWidthMinPixels: 1,
    radiusMinPixels: 5,
    radiusMaxPixels: 25,
    pickable: true,
  });

  return (
    <div className="relative w-full h-full">
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={[arcLayer, scatterLayer]}
        style={{ width: "100%", height: "100%" }}
        getTooltip={({ object }) => {
          if (!object) return null;

          if ("origin" in object && "destination" in object) {
            const source =
              locations.find((l) => l.id === object.origin)?.name ||
              object.origin;
            const target =
              locations.find((l) => l.id === object.destination)?.name ||
              object.destination;
            return {
              text: `📍 ${source} → ${target}\n🧭 Count: ${object.count}`,
            };
          }

          if ("name" in object && "position" in object) {
            const stats = nodeStats[object.id];
            return {
              text: `🏁 ${object.name}\n⬅️ Incoming: ${
                stats?.incoming || 0
              }\n➡️ Outgoing: ${stats?.outgoing || 0}`,
            };
          }

          return null;
        }}
      >
        <StaticMap
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          style={{ width: "100%", height: "100%" }}
        />
      </DeckGL>
    </div>
  );
};

export default MeccaFlowMap;
