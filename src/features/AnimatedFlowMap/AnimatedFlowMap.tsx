// AnimatedFlowMap.tsx
import React, { useEffect, useMemo, useState } from "react";
import { DeckGL } from "@deck.gl/react";
import StaticMap from "react-map-gl";
import { PathLayer, ScatterplotLayer } from "@deck.gl/layers";

import stations from "../../assets/data/stations.json"
import flows from "../../assets/data/flows.json"

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
  path?: [number, number][];
};

const getInterpolatedPosition = (path: [number, number][], progress: number) => {
  const totalSegments = path.length - 1;
  const clampedProgress = Math.min(progress, 0.999);
  const exact = clampedProgress * totalSegments;
  const index = Math.floor(exact);
  const t = exact - index;

  if (index < 0 || index >= totalSegments || !path[index + 1]) return null;

  const start = path[index];
  const end = path[index + 1];

  const x = start[0] + (end[0] - start[0]) * t;
  const y = start[1] + (end[1] - start[1]) * t;

  return [x, y];
};

const AnimatedFlowMap: React.FC = () => {
  const initialViewState = {
    latitude: 21.3891,
    longitude: 39.8579,
    zoom: 11,
    bearing: 0,
    pitch: 30,
  };

  const [flowProgress, setFlowProgress] = useState<{ [key: string]: number }>({});
  const [hoverInfo, setHoverInfo] = useState<any>(null);

  useEffect(() => {
    let frameId: number;
    const animate = () => {
      setFlowProgress((prev) => {
        const updated: { [key: string]: number } = {};
        for (const flow of flows) {
          const key = `${flow.source}-${flow.target}`;
          const current = prev[key] ?? Math.random();
          const next = current + 0.001;
          updated[key] = next > 1 ? 0 : next;
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
      hash = str.charCodeAt(i) + ((hash << 4) - hash);
    }
    const r = (hash & 0xff0000) >> 16;
    const g = (hash & 0x00ff00) >> 8;
    const b = hash & 0x0000ff;
    return [128 + (r % 128), 128 + (g % 128), 128 + (b % 128)];
  };

  const pathData = flows.map((f) => {
    const source = stationMap.get(f.source);
    const target = stationMap.get(f.target);

    let path = f.path;
    if (path) {
      path = path.map(([lat, lon]) => [lon, lat]);
    }

    if (!path) {
      path = [
        [source.lon, source.lat],
        [target.lon, target.lat],
      ];
    }

    return {
      ...f,
      path,
      color: stringToColor(`${f.source}-${f.target}`),
    };
  }).filter(Boolean);

  const trailData = useMemo(() => {
    const trailSegments = 5;
    const data: { path: [number, number][]; color: number[]; opacity: number }[] = [];

    for (const flow of pathData) {
      const progress = flowProgress[`${flow.source}-${flow.target}`] ?? 0;

      for (let i = 0; i < trailSegments; i++) {
        const p1 = getInterpolatedPosition(flow.path, progress - i * 0.02);
        const p2 = getInterpolatedPosition(flow.path, progress - (i + 1) * 0.02);

        if (!p1 || !p2) continue;

        data.push({
          path: [p2, p1],
          color: flow.color,
          opacity: 255 * (1 - i / trailSegments),
        });
      }
    }
    return data;
  }, [flowProgress, pathData]);

  const trailLayer = new PathLayer({
    id: "trail-layer",
    data: trailData,
    getPath: (d) => d.path,
    getColor: (d) => [...d.color, d.opacity],
    getWidth: 6,
    widthUnits: "pixels",
    pickable: false,
    capRounded: true,
    jointRounded: true,
  });

  const stationLayer = new ScatterplotLayer<Station>({
    id: "stations-layer",
    data: stations,
    getPosition: (d) => [d.lon, d.lat],
    getFillColor: [0, 60, 120, 180],
    getRadius: (d) => {
      const t = performance.now() / 1000;
      return 25 + 10 * Math.sin((t + d.id.charCodeAt(0)) * 2);
    },
    radiusUnits: "meters",
    stroked: true,
    getLineColor: [255, 255, 255],
    lineWidthMinPixels: 2,
    pickable: true,
    onHover: setHoverInfo,
    updateTriggers: {
      getRadius: performance.now(),
    },
  });

  const flowHeadsLayer = new ScatterplotLayer({
    id: "flow-heads",
    data: pathData.map((flow) => {
      const progress = flowProgress[`${flow.source}-${flow.target}`] ?? 0;
      const position = getInterpolatedPosition(flow.path, progress);
      if (!position) return null;

      return {
        position,
        color: flow.color,
      };
    }).filter(Boolean),
    getPosition: (d) => d.position,
    getFillColor: (d) => [...d.color, 255],
    getRadius: 25,
    radiusUnits: "meters",
    pickable: false,
  });

  const debugPathsLayer = new PathLayer({
    id: "debug-paths",
    data: pathData,
    getPath: (d) => d.path,
    getColor: [255, 255, 0, 80],
    getWidth: 3,
    widthUnits: "pixels",
    pickable: false,
  });

  return (
    <>
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={[debugPathsLayer, trailLayer, flowHeadsLayer, stationLayer]}
      >
        <StaticMap
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          style={{ width: "100%", height: "100%" }}
        />

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
                  {stationMap.get(hoverInfo.object.source)?.name} →
                  {stationMap.get(hoverInfo.object.target)?.name}
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
0