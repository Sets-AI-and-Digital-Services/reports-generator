// AnimatedFlowMap.tsx
import React, { useEffect, useMemo, useState } from "react";
import { DeckGL } from "@deck.gl/react";
import StaticMap from "react-map-gl";
import { PathLayer, ScatterplotLayer } from "@deck.gl/layers";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

type Station = {
  id: string;
  name: string;
  lat: number;
  lon: number;
};

type Flow = {
  source: string;
  target: string;
  value: number;
};

const AnimatedFlowMap: React.FC = () => {
  const initialViewState = {
    latitude: 21.3891,
    longitude: 39.8579,
    zoom: 11,
    bearing: 0,
    pitch: 30,
  };

  const stations: Station[] = [
    { id: "A", name: "Station A", lat: 21.42, lon: 39.83 },
    { id: "B", name: "Station B", lat: 21.39, lon: 39.85 },
    { id: "C", name: "Station C", lat: 21.4, lon: 39.88 },
  ];

  const flows: Flow[] = [
    { source: "A", target: "B", value: 70 },
    { source: "B", target: "C", value: 120 },
    { source: "C", target: "A", value: 30 },
  ];

  const [flowProgress, setFlowProgress] = useState<{ [key: string]: number }>({});
  const [hoverInfo, setHoverInfo] = useState<any>(null);

  useEffect(() => {
    let frameId: number;
    const animate = () => {
      setFlowProgress((prev) => {
        const updated: { [key: string]: number } = {};
        for (const flow of flows) {
          const key = `${flow.source}-${flow.target}`;
          const current = prev[key] ?? Math.random(); // randomize initial offset
          const next = current + 0.005; // adjust speed here
          updated[key] = next > 1 ? 0 : next; // loop when complete
        }
        return updated;
      });

      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  const stationMap = useMemo(() => {
    const map = new Map<string, Station>();
    stations.forEach((s) => map.set(s.id, s));
    return map;
  }, []);

  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const r = (hash & 0xff0000) >> 16;
    const g = (hash & 0x00ff00) >> 8;
    const b = hash & 0x0000ff;
    return [128 + (r % 128), 128 + (g % 128), 128 + (b % 128)];
  };

  const pathData = flows
    .map((f) => {
      const source = stationMap.get(f.source);
      const target = stationMap.get(f.target);
      if (!source || !target) return null;

      // Cubic Bezier (simple approximation for now)
      const cx = (source.lon + target.lon) / 2 + 0.02;
      const cy = (source.lat + target.lat) / 2 + 0.02;
      const path = [
        [source.lon, source.lat],
        [cx, cy],
        [target.lon, target.lat],
      ];

      return {
        ...f,
        path,
        color: stringToColor(`${f.source}-${f.target}`),
      };
    })
    .filter(Boolean) as (Flow & {
    path: [number, number][];
    color: number[];
  })[];

  const trailData = useMemo(() => {
    const segments = 10;
    const data: { position: [number, number]; color: number[]; opacity: number }[] = [];

    for (const flow of pathData) {
      const progress = flowProgress[`${flow.source}-${flow.target}`] ?? 0;
      const [x1, y1] = flow.path[0];
      const [x2, y2] = flow.path[2];

      for (let i = 0; i < segments; i++) {
        const t = Math.max(0, progress - i * 0.02); // tail lag
        if (t < 0 || t > 1) continue;

        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;
        data.push({
          position: [x, y],
          color: flow.color,
          opacity: 255 * (1 - i / segments),
        });
      }
    }

    return data;
  }, [flowProgress, pathData]);

  const trailLayer = new ScatterplotLayer({
    id: "trail-layer",
    data: trailData,
    getPosition: (d) => d.position,
    getFillColor: (d) => [...d.color, d.opacity],
    getRadius: 80,
    radiusUnits: "meters",
    pickable: false,
  });

  const stationLayer = new ScatterplotLayer<Station>({
    id: "stations-layer",
    data: stations,
    getPosition: (d) => [d.lon, d.lat],
    getFillColor: [0, 60, 120, 180],
    getRadius: (d) => {
      const t = performance.now() / 1000; // seconds
      return 80 + 20 * Math.sin((t + d.id.charCodeAt(0)) * 2); // control speed via multiplier
    },

    radiusUnits: "meters",
    stroked: true,
    getLineColor: [255, 255, 255],
    lineWidthMinPixels: 2,
    pickable: true,
    onHover: setHoverInfo,
    updateTriggers: {
      getRadius: performance.now(), // forces re-evaluation each frame
    },
  });

  return (
    <>
      <DeckGL initialViewState={initialViewState} controller={true} layers={[trailLayer, stationLayer]}>
        <StaticMap mapboxAccessToken={MAPBOX_TOKEN} mapStyle="mapbox://styles/mapbox/dark-v10" style={{ width: "100%", height: "100%" }} />

        {hoverInfo?.object && (
          <div
            style={{
              position: "absolute",
              zIndex: 10,
              pointerEvents: "none",
              left: hoverInfo.x,
              top: hoverInfo.y,
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "6px 10px",
              borderRadius: "4px",
              fontSize: "14px",
              maxWidth: 200,
            }}
          >
            {"path" in hoverInfo.object ? (
              <>
                <strong>Flow</strong>
                <div>
                  {stationMap.get(hoverInfo.object.source)?.name} →{stationMap.get(hoverInfo.object.target)?.name}
                </div>
                <div>Trips: {hoverInfo.object.value}</div>
              </>
            ) : (
              <>
                <strong>Station</strong>
                <div>{hoverInfo.object.name}</div>
              </>
            )}
          </div>
        )}
      </DeckGL>
    </>
  );
};

export default AnimatedFlowMap;
