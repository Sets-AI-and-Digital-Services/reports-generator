// AnimatedFlowMap.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { DeckGL } from "@deck.gl/react";
import StaticMap from "react-map-gl";
import { PathLayer, ScatterplotLayer } from "@deck.gl/layers";
// import stations from "../../assets/data/stations.json";
import left_arrow from "../../../public/assets/left_arrow.svg";
import right_arrow from "../../../public/assets/right_arrow.svg";
import loader_img from "../../../public/assets/loader.svg";
import light_bulb from "../../../public/assets/light_bulb.svg";
import { ChevronDown } from "lucide-react";

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

  const [loadingFile, setLoadingFile] = useState<boolean>(false);
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
    setLoadingFile(true);
    // Build a full file path for the CSV file.
    fetch(`${API_BASE_URL}/aggregated-transitions?file_path=${selectedFile}&resolution=0.01`)
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
        const uniqueOperators = [...new Set(aggregatedFlows.map((r: any) => r.operator))].filter((op) => op && op !== "Unknown");
        setOperators(uniqueOperators);
      })
      .catch((error) => {
        console.error("Error fetching aggregated data:", error);
      })
      .finally(() => {
        setLoadingFile(false);
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
  // const currentFileIndex = fileList.indexOf(selectedFile);
  // const goToPreviousFile = () => {
  //   if (currentFileIndex > 0) {
  //     setSelectedFile(fileList[currentFileIndex - 1]);
  //   }
  // };

  // const goToNextFile = () => {
  //   if (currentFileIndex < fileList.length - 1) {
  //     setSelectedFile(fileList[currentFileIndex + 1]);
  //   }
  // };
  const [isOpen, setIsOpen] = useState(false);
  const [isOperatorOpen, setIsOperatorOpen] = useState(false);

  return (
    <>
      <div className="insights absolute flex flex-col z-10 text-left overflow-y-auto text-sm top-8 right-8 w-80 h-32 rounded-[11.76px] p-4 gap-2 border border-[#939598] bg-transparent backdrop-blur-[12px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-white">
        <h2 className="text-lg font-semibold">Insights</h2>
        <div className="flex items-start gap-2">
          <img src={light_bulb} className="" />
          <span>The visualization reveals the top source cities sending buses to Madinah, with Jeddah, Makkah, and Riyadh leading in volume.</span>
        </div>
        <div className="flex items-start gap-2">
          <img src={light_bulb} className="" />
          <span>
            Top Sources:
            <li>Jeddah</li>
            <li>Makkah</li>
            <li>Riyadh</li>
            <li>Khaybar</li>
            <li>Khulays</li>
            <li>Al Majma'ah Al Hanakiyah</li>
            <li>Buraydah Najran</li>
          </span>
        </div>
        <div className="flex items-start gap-2">
          <img src={light_bulb} className="" />
          <span>
            <b>Abu Sarhad</b> demonstrates the most structured and consistent bus movement across the city. This reflects strong route planning,
            minimal deviation, and high operational discipline—making it a potential model for other operators.
          </span>
        </div>
        <div className="flex items-start gap-2">
          <img src={light_bulb} className="" />
          <span>
            <b>Abu Sarhad</b> Seems to be the most organized Footprint
          </span>
        </div>
      </div>

      {/* Controls div on top of map */}
      <div className="absolute top-8 left-8 text-left text-white z-10 w-56">
        <div style={{ marginBottom: "1rem" }}>
          <div className="relative w-full">
            {/* Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full text-white bg-gray-700 bg-transparent backdrop-blur-[12px] rounded-[11.76px] px-2 py-2 border border-[#939598] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] flex justify-between items-center"
            >
              <span className="truncate">
                <span className="opacity-70">Select Date:</span> {selectedFile ? selectedFile.replace(".csv", "") : "None"}
              </span>
              <ChevronDown className="ml-2 w-4 h-4" />
            </button>

            {/* Dropdown */}
            {isOpen && (
              <ul className="insights absolute z-50 mt-1 w-full max-h-60 overflow-y-auto bg-white bg-opacity-10 backdrop-blur-lg text-white rounded-[11.76px] shadow-lg border border-[#939598] scrollbar-thin scrollbar-thumb-[#00977D] scrollbar-track-transparent">
                {fileList.map((file) => (
                  <li
                    key={file}
                    onClick={() => {
                      setSelectedFile(file);
                      setIsOpen(false);
                    }}
                    className={`
                px-4 py-2 cursor-pointer hover:bg-white hover:bg-opacity-20
                ${selectedFile === file && "bg-[#00977D]"} bg-opacity-60`}
                  >
                    {file.replace(".csv", "")}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="relative w-full">
          {/* Trigger Button */}
          <button
            onClick={() => setIsOperatorOpen(!isOperatorOpen)}
            className="w-full text-white bg-gray-700 bg-transparent backdrop-blur-[12px] rounded-[11.76px] px-2 py-2 border border-[#939598] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] flex justify-between items-center"
          >
            <span className="truncate">{selectedOperator ?? "Operator Name"}</span>
            <ChevronDown className="ml-2 w-4 h-4" />
          </button>

          {/* Dropdown List */}
          {isOperatorOpen && (
            <ul className="insights absolute z-50 mt-1 w-full max-h-60 overflow-y-auto bg-white bg-opacity-10 backdrop-blur-lg text-white rounded-[11.76px] shadow-lg border border-[#939598] scrollbar-thin scrollbar-thumb-[#00977D] scrollbar-track-transparent">
              {/* None option */}
              <li
                onClick={() => {
                  setSelectedOperator(null);
                  setIsOperatorOpen(false);
                }}
                className={`
                      px-4 py-2 cursor-pointer hover:bg-white hover:bg-opacity-20 ${selectedOperator === null && "bg-[#00977D]"} bg-opacity-60`}
              >
                None
              </li>

              {/* Operator list */}
              {operators.map((op) => (
                <li
                  key={op}
                  onClick={() => {
                    setSelectedOperator(op);
                    setIsOperatorOpen(false);
                  }}
                  className={`
                        px-4 py-2 cursor-pointer hover:bg-white hover:bg-opacity-20 ${selectedOperator === op && "bg-[#00977D]"} bg-opacity-60`}
                >
                  {op}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex gap-4" style={{ marginTop: "10px" }}>
          {/* Additional operator-data loading buttons can be added here if needed */}
        </div>
        {/* <div style={{ marginTop: 8 }}>
          <strong>Buses Displayed:</strong> {displayedBusCount}
        </div> */}
      </div>

      {/* Navigation div on bottom center */}
      {loadingFile && (
        <div className="absolute left-0 right-0 bottom-24 z-10 m-auto w-fit flex rounded-[11.76px] px-2 py-2 gap-1 border border-[#939598] bg-transparent backdrop-blur-[12px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-white">
          <img src={loader_img} /> The map will be updated shortly
        </div>
      )}
      {/* <div
        className="flex gap-2"
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
        <button
          onClick={goToPreviousFile}
          disabled={currentFileIndex <= 0}
          className="flex items-center justify-center rounded-[11.76px] px-2 py-2 gap-1 border border-[#939598] bg-transparent backdrop-blur-[12px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-white w-[104px]"
        >
          <img src={left_arrow} /> Previous
        </button>
        <button
          onClick={goToNextFile}
          disabled={currentFileIndex >= fileList.length - 1}
          style={{ marginLeft: "10px" }}
          className="flex items-center justify-center rounded-[11.76px] px-2 py-2 gap-1 border border-[#939598] bg-transparent backdrop-blur-[12px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-white w-[104px]"
        >
          Next <img src={right_arrow} />
        </button>
      </div> */}

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
