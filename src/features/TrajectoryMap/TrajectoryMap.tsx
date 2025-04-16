// AnimatedFlowMap.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { DeckGL } from "@deck.gl/react";
import StaticMap from "react-map-gl";
import { PathLayer, ScatterplotLayer } from "@deck.gl/layers";
import Papa from "papaparse";
// import stations from "../../assets/data/stations.json";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
// Set the API base URL so that it is a complete URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

interface Station {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

interface FlowPath {
  path: [number, number][];
  totalBusses: number;
  operator: string;
  color: number[];
}

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

const TrajectoryMap: React.FC = () => {
  const initialViewState = {
    latitude: 24.4709,
    longitude: 39.6122,
    zoom: 10,
    bearing: 0,
    pitch: 30,
  };

  const fileCacheRef = useRef<{ [fileName: string]: FlowPath[] }>({});
  const [hoverInfo, setHoverInfo] = useState<any>(null);
  const [busFlows, setBusFlows] = useState<FlowPath[]>([]);
  const [isAllDataMode, setIsAllDataMode] = useState(false);
  const [originalBusFlows, setOriginalBusFlows] = useState<FlowPath[]>([]);
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [operators, setOperators] = useState<string[]>([]);
  const [simSpeed, setSimSpeed] = useState<number>(60);
  const [fileList, setFileList] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>("2025-03-06.csv");

  // Load the list of available files from your backend/static location.
  useEffect(() => {
    // Here we assume file_names.json is still served locally or via your API.
    fetch(`/data/output/file_names.json`)
      .then((res) => res.json())
      .then(setFileList)
      .catch((error) => console.error("Error fetching file list:", error));
  }, []);

  // Fetch aggregated data from backend using a complete API URL.
  useEffect(() => {
    // Build a full file path for the CSV file.
    const filePath = `${API_BASE_URL}/data/output/${selectedFile}`;
    fetch(`${API_BASE_URL}/aggregated-transitions?file_path=data/${selectedFile}&resolution=0.05`)
      .then((res) => res.json())
      .then((data) => {
        // Map each aggregated record to a two-point line.
        const aggregatedFlows = data.aggregated_data.map((item: any) => ({
          path: [
            [item.source_lon, item.source_lat],
            [item.dest_lon, item.dest_lat],
          ],
          totalBusses: item.total_busses,
          operator: item.operator,
          color: getOperatorColor(item.operator),
        }));
        setBusFlows(aggregatedFlows);
        const uniqueOperators = [
          ...new Set(aggregatedFlows.map((r: any) => r.operator))
        ].filter((op) => op && op !== "Unknown");
        setOperators(uniqueOperators);
      })
      .catch((error) => {
        console.error("Error fetching aggregated data:", error);
      });
  }, [selectedFile]);

  // Allow filtering by operator.
  const filteredFlows = useMemo(() => {
    return selectedOperator ? busFlows.filter((f) => f.operator === selectedOperator) : busFlows;
  }, [busFlows, selectedOperator]);

  const displayedBusCount = filteredFlows.length;

  // const stationLayer = new ScatterplotLayer<Station>({
  //   id: "stations-layer",
  //   data: stations,
  //   getPosition: (d) => [d.lon, d.lat],
  //   getFillColor: [0, 60, 120, 180],
  //   getRadius: (d) => 25 + 10 * Math.sin((performance.now() / 1000 + d.id.charCodeAt(0)) * 2),
  //   radiusUnits: "meters",
  //   stroked: true,
  //   getLineColor: [255, 255, 255],
  //   lineWidthMinPixels: 2,
  //   pickable: true,
  //   onHover: setHoverInfo,
  //   updateTriggers: {
  //     getRadius: performance.now(),
  //   },
  // });

  const pathLayer = new PathLayer({
    id: "static-path-layer",
    data: filteredFlows,
    getPath: (d) => d.path,
    getColor: (d) => d.color,
    getWidth: (d) => Math.max(2, Math.min(10, d.totalBusses)),
    widthUnits: "pixels",
    capRounded: true,
    jointRounded: true,
  });

  // File navigation handlers.
  const currentFileIndex = fileList.indexOf(selectedFile);
  const goToPreviousFile = () => {
    if (currentFileIndex > 0) {
      setSelectedFile(fileList[currentFileIndex - 1]);
    }
  };

  const goToNextFile = () => {
    if (currentFileIndex < fileList.length - 1) {
      setSelectedFile(fileList[currentFileIndex + 1]);
    }
  };

  return (
    <>
      {/* Insights div on top of map */}
      <div className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-4 w-72 text-sm text-gray-800">
        <h2 className="text-lg font-semibold mb-2">📊 Insights</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s.
        </p>
      </div>

      {/* Controls div on top of map */}
      <div style={{ position: "absolute", zIndex: 10, top: 4, left: 4, textAlign: "left", color: "white" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Select File:</label>
          <select
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
            style={{ backgroundColor: "#fff", color: "#000" }}
          >
            {fileList.map((file) => (
              <option key={file} value={file}>
                {file}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Operator:</label>
          <select
            value={selectedOperator || ""}
            onChange={(e) => setSelectedOperator(e.target.value || null)}
            style={{ backgroundColor: "#fff", color: "#000" }}
          >
            <option value="">All Operators</option>
            {operators.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Simulated Minutes per Real Minute:</label>
          <input
            type="number"
            min={1}
            max={1440}
            value={simSpeed}
            onChange={(e) => setSimSpeed(Number(e.target.value))}
            style={{ backgroundColor: "#fff", color: "#000", paddingInline: "0.5rem" }}
          />
        </div>
        <div className="flex gap-4" style={{ marginTop: "10px" }}>
          {/* Additional operator-data loading buttons can be added here if needed */}
        </div>
        {/* <div style={{ marginTop: 8 }}>
          <strong>Buses Displayed:</strong> {displayedBusCount}
        </div> */}
      </div>

      {/* Navigation div on bottom center */}
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          padding: 10,
          color: "white",
          left: 0,
          right: 0,
          margin: "0 auto",
          width: "fit-content",
          bottom: "1rem",
        }}
      >
        <button onClick={goToPreviousFile} disabled={currentFileIndex <= 0}>
          ⬅ Previous
        </button>
        <button onClick={goToNextFile} disabled={currentFileIndex >= fileList.length - 1} style={{ marginLeft: "10px" }}>
          Next ➡
        </button>
      </div>

      <DeckGL initialViewState={initialViewState} controller layers={[pathLayer]}>
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

export default TrajectoryMap;
