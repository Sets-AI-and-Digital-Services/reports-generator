import React, { useEffect, useMemo, useState, useRef } from "react";
import { DeckGL } from "@deck.gl/react";
import StaticMap from "react-map-gl";
import { ScatterplotLayer } from "@deck.gl/layers";
import Papa from "papaparse";
import light_bulb from "../../../public/assets/light_bulb.svg";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface RawBusRecord {
  Operator: string;
  "Bus Id": string;
  Time: string;
  "Transition Type": string;
  "Geofence Name": string;
  Latitude: string;
  Longitude: string;
  Speed: string;
  Timestamp: string;
}

interface FlowPath {
  busId: string;
  path: [number, number][];
  speed: number;
  color: number[];
  operator: string;
  timestamps: number[];
  times: string[];
}

const getInterpolatedPosition = (path: [number, number][], progress: number) => {
  if (!path || path.length < 2) return null;
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

const interpolateBetween = (a: [number, number], b: [number, number], steps: number): [number, number][] =>
  Array.from({ length: steps }, (_, i) => [a[0] + ((b[0] - a[0]) * (i + 1)) / (steps + 1), a[1] + ((b[1] - a[1]) * (i + 1)) / (steps + 1)]);

const AnimatedFlowMap: React.FC = () => {
  const initialViewState = {
    latitude: 24.4709,
    longitude: 39.6122,
    zoom: 11,
    bearing: 0,
    pitch: 30,
  };

  // --- File Caching Setup ---
  // Cache ref to store parsed file data by filename.
  const fileCacheRef = useRef<{ [fileName: string]: FlowPath[] }>({});

  // --- Frame Optimization Setup ---
  // Use a ref to hold fast-changing animation values without triggering re-renders.
  const flowProgressRef = useRef<{ [key: string]: number }>({});
  // A secondary state updated less frequently to trigger recalculation of derived layer data.
  const [animationTrigger, setAnimationTrigger] = useState<number>(0);

  // --- Component State ---
  const [hoverInfo, setHoverInfo] = useState<any>(null);
  const [busFlows, setBusFlows] = useState<FlowPath[]>([]);
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [operators, setOperators] = useState<string[]>([]);
  const [simSpeed, setSimSpeed] = useState<number>(60);
  const [fileList, setFileList] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>("2025-03-06.csv");

  const colorPalette = [
    [255, 99, 132],
    [54, 162, 235],
    [255, 206, 86],
    [75, 192, 192],
    [153, 102, 255],
    [255, 159, 64],
    [100, 255, 100],
    [255, 100, 255],
  ];
  const operatorColorMap = new Map<string, number[]>();
  const getOperatorColor = (operator: string): number[] => {
    if (!operatorColorMap.has(operator)) {
      const color = colorPalette[operatorColorMap.size % colorPalette.length];
      operatorColorMap.set(operator, color);
    }
    return operatorColorMap.get(operator)!;
  };

  // --- File List Loading ---
  useEffect(() => {
    fetch("/data/output/file_names.json")
      .then((res) => res.json())
      .then(setFileList);
  }, []);

  // --- File Caching and Parsing ---
  useEffect(() => {
    // If the file data is already cached, use it.
    if (fileCacheRef.current[selectedFile]) {
      const cachedData = fileCacheRef.current[selectedFile];
      setBusFlows(cachedData);
      const uniqueOperators = [...new Set(cachedData.map((flow) => flow.operator))].filter((op) => op && op !== "Unknown");
      setOperators(uniqueOperators);
      return;
    }

    // Otherwise, fetch and parse the CSV file.
    fetch(`/data/output/${selectedFile}`)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse<RawBusRecord>(csvText, {
          header: true,
          skipEmptyLines: true,
          // You can add worker and chunk options as needed for large files.
          complete: ({ data }) => {
            const groupedByDay: Record<string, RawBusRecord[]> = {};
            data.forEach((record) => {
              const dateKey = record.Time?.split(" ")[0];
              if (!dateKey || !record["Bus Id"]) return;
              if (!groupedByDay[dateKey]) groupedByDay[dateKey] = [];
              groupedByDay[dateKey].push(record);
            });

            const firstDate = Object.keys(groupedByDay)[0];
            if (!firstDate) return;

            const groupedByBus: Record<string, RawBusRecord[]> = {};
            groupedByDay[firstDate].forEach((record) => {
              const id = record["Bus Id"];
              if (!groupedByBus[id]) groupedByBus[id] = [];
              groupedByBus[id].push(record);
            });

            const result: FlowPath[] = Object.entries(groupedByBus)
              .map(([busId, records]) => {
                const sorted = records
                  .filter((r) => r.Latitude && r.Longitude && !isNaN(+r.Latitude) && !isNaN(+r.Longitude))
                  .sort((a, b) => +a.Timestamp - +b.Timestamp);

                const operator = sorted[0].Operator;
                if (!operator || operator === "Unknown") return null;
                let path: [number, number][] = [];
                let timestamps: number[] = [];
                let times: string[] = [];
                for (let i = 0; i < sorted.length - 1; i++) {
                  const a: [number, number] = [parseFloat(sorted[i].Longitude), parseFloat(sorted[i].Latitude)];
                  const b: [number, number] = [parseFloat(sorted[i + 1].Longitude), parseFloat(sorted[i + 1].Latitude)];
                  path.push(a, ...interpolateBetween(a, b, 6));
                  timestamps.push(...Array(7).fill(+sorted[i].Timestamp));
                  times.push(...Array(7).fill(sorted[i].Time));
                }
                if (path.length < 2) return null;
                const avgSpeed = sorted.reduce((acc, r) => acc + parseFloat(r.Speed || "0"), 0) / (sorted.length || 1);
                return {
                  busId,
                  path,
                  speed: avgSpeed,
                  color: getOperatorColor(sorted[0].Operator),
                  operator: sorted[0].Operator,
                  timestamps,
                  times,
                };
              })
              .filter(Boolean) as FlowPath[];

            const uniqueOperators = [...new Set(result.map((r) => r.operator))].filter((op) => op && op !== "Unknown");
            setOperators(uniqueOperators);
            setBusFlows(result);
            // Cache the parsed result so it can be reused later.
            fileCacheRef.current[selectedFile] = result;
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
          },
        });
      });
  }, [selectedFile]);

  const filteredFlows = useMemo(() => {
    return selectedOperator ? busFlows.filter((f) => f.operator === selectedOperator) : busFlows;
  }, [busFlows, selectedOperator]);

  const displayedBusCount = filteredFlows.length;

  // --- Optimized Animation Loop ---
  useEffect(() => {
    if (filteredFlows.length === 0) return;
    let frameId: number;
    const framesPerSecond = 60;
    // The number of simulation frames (more simulation speed → fewer frames per simulation minute)
    const simFrames = (60 / simSpeed) * framesPerSecond;
    const increment = 1 / (simFrames * 60);

    const animate = () => {
      // Update the ref without triggering a re-render
      filteredFlows.forEach((flow) => {
        let current = flowProgressRef.current[flow.busId];
        if (current === undefined) current = Math.random();
        flowProgressRef.current[flow.busId] = (current + increment) % 1;
      });
      // Throttle re-rendering by updating the animation trigger.
      setAnimationTrigger((prev) => prev + 1);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [filteredFlows, simSpeed]);

  // --- Derived Data for Layers (using ref and the trigger state) ---
  const trailData = useMemo(() => {
    const segments = 3;
    return filteredFlows.flatMap((flow) => {
      const progress = flowProgressRef.current[flow.busId] ?? 0;
      return Array.from({ length: segments }, (_, i) => {
        const p1 = getInterpolatedPosition(flow.path, progress - i * 0.005);
        const p2 = getInterpolatedPosition(flow.path, progress - (i + 1) * 0.005);
        if (!p1 || !p2) return null;
        return {
          path: [p2, p1],
          color: flow.color,
          opacity: 255 * (1 - i / segments),
        };
      }).filter(Boolean);
    });
  }, [filteredFlows, animationTrigger]);

  const flowHeadsLayer = new ScatterplotLayer({
    id: "flow-heads",
    data: filteredFlows
      .map((flow) => {
        const progress = flowProgressRef.current[flow.busId] ?? 0;
        const position = getInterpolatedPosition(flow.path, progress);
        return position ? { position, color: flow.color } : null;
      })
      .filter(Boolean),
    getPosition: (d) => d.position,
    getFillColor: (d) => [...d.color, 255],
    getRadius: 10,
    radiusUnits: "meters",
    pickable: false,
  });

  return (
    <>
      <div className="absolute flex flex-col z-10 text-left overflow-y-auto text-sm top-8 right-8 w-80 h-32 rounded-[11.76px] p-4 gap-2 border border-[#939598] bg-transparent backdrop-blur-[12px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-white">
        <h2 className="text-lg font-semibold">Insights</h2>
        <div className="flex items-start gap-2">
          <img src={light_bulb} className="" />
          <span>
            The animation displays the movement of buses across the city, showcasing 68 Madinah Buses and 34,000 Syndicate Buses. The total distance
            traveled reached 1.7 million kilometers.
          </span>
        </div>
        <div className="flex items-start gap-2">
          <img src={light_bulb} className="" />
          <span>Madinah Bus Operators - 68</span>
        </div>
        <div className="flex items-start gap-2">
          <img src={light_bulb} className="" />
          <span>GSC Buses - 34K</span>
        </div>
        <div className="flex items-start gap-2">
          <img src={light_bulb} className="" />
          <span>Distance Covered 1.7M kilometers</span>
        </div>
      </div>

      <div className="absolute top-8 left-8 text-left text-white z-10 w-40">
        <div style={{ marginBottom: "1rem" }}>
          <select
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
            className="w-full text-white bg-gray-700 rounded-[11.76px] px-2 py-2 gap-1 border border-[#939598] bg-transparent backdrop-blur-[12px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          >
            <option>Select Date</option>
            {fileList.map((file) => (
              <option key={file} value={file}>
                {file.replace(".csv", "")}
              </option>
            ))}
          </select>
        </div>
        <select
          value={selectedOperator ?? ""}
          onChange={(e) => setSelectedOperator(e.target.value || null)}
          className="w-full text-white bg-gray-700 rounded-[11.76px] px-2 py-2 gap-1 border border-[#939598] bg-transparent backdrop-blur-[12px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
        >
          <option value="">Operator Name</option>
          {operators.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
        {/* <label style={{ display: "block", marginTop: 8 }}>Simulated Minutes per Real Minute:</label>
        <input
          type="number"
          min={1}
          max={1440}
          value={simSpeed}
          onChange={(e) => setSimSpeed(Number(e.target.value))}
          style={{ backgroundColor: "#fff", color: "#000", paddingInline: "0.5rem" }}
        />
        <div style={{ marginTop: 8 }}>
          <strong>Buses Displayed:</strong> {displayedBusCount}
        </div> */}
      </div>

      <DeckGL initialViewState={initialViewState} controller={true} layers={[...(filteredFlows.length > 0 ? [flowHeadsLayer] : [])]}>
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
            <strong>Station</strong>
            <div>{hoverInfo.object.name}</div>
          </div>
        )}
      </DeckGL>
    </>
  );
};

export default AnimatedFlowMap;
