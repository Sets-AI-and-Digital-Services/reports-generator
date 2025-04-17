import { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import StaticMap from "react-map-gl";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { parse } from "@loaders.gl/core";
import { CSVLoader } from "@loaders.gl/csv";
import { ColumnLayer } from "@deck.gl/layers";
import light_bulb from "../../../public/assets/light_bulb.svg";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// 📁 Your file list
const CSV_FILES = [
  "north_axis_start_station.csv",
  // "north_axis_end_station.csv",
  // "nw_axis_internal_station.csv",
  // "nw_axis_end_station.csv",
  "train_station.csv",
  "airport.csv",
  "central_area.csv",
  "sw_axis_start_station_1.csv",
  "sw_axis_start_station_2.csv",
  "sw_axis_start_station_3.csv",
  // "sw_axis_end_station.csv",
  "quba_parking.csv",
];

// 📍 Define a center for each file
const FILE_CENTERS = {
  "north_axis_start_station.csv": [24.5000096, 39.6113084],
  "north_axis_end_station.csv": [24.4745393, 39.6111428],
  "nw_axis_internal_station.csv": [24.4775847, 39.6023218],
  "nw_axis_end_station.csv": [24.4750739, 39.6052609],
  "train_station.csv": [24.4708703, 39.6995331],
  "airport.csv": [24.5535509, 39.7174223],
  "central_area.csv": [24.468919, 39.6110695],
  "sw_axis_start_station_1.csv": [24.3420148, 39.5564176],
  "sw_axis_start_station_2.csv": [24.3838133, 39.5456716],
  "sw_axis_start_station_3.csv": [24.4142042, 39.5411111],
  "sw_axis_end_station.csv": [24.4629488, 39.6024006],
  "quba_parking.csv": [24.4370756, 39.6179817],
};

const FILE_THRESHOLDS = {
  north_axis_start_station: { low: 24.36, high: 45.24 },
  north_axis_end_station: { low: 0.84, high: 1.56 },
  nw_axis_internal_station: { low: 200.45, high: 372.27 },
  nw_axis_end_station: { low: 0.5, high: 0.92 },
  train_station: { low: 18.09, high: 33.59 },
  airport: { low: 38.32, high: 71.17 },
  central_area: { low: 13.61, high: 25.28 },
  sw_axis_start_station_1: { low: 521.34, high: 968.21 },
  sw_axis_start_station_2: { low: 27.2, high: 50.51 },
  sw_axis_start_station_3: { low: 46.15, high: 85.72 },
  sw_axis_end_station: { low: 0.4, high: 0.75 },
  quba_parking: { low: 40.18, high: 68 },
  default: { low: 12, high: 22 },
};

const ambientLight = new AmbientLight({ color: [255, 255, 255], intensity: 1.0 });
const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [39.6122, 24.4709, 8000],
});
const lightingEffect = new LightingEffect({ ambientLight, pointLight });

const INITIAL_VIEW_STATE = {
  longitude: 39.6122,
  latitude: 24.4709,
  zoom: 11,
  pitch: 45,
  bearing: -20,
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];

function generatePointAround(lat, lng) {
  const latOffset = (Math.random() - 0.5) * 0.02;
  const lngOffset = (Math.random() - 0.5) * 0.02;
  return [lng + lngOffset, lat + latOffset];
}

export default function BarMap() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const loadFiles = async () => {
      const fetchFile = async (fileName) => {
        const center = FILE_CENTERS[fileName] || [24.4709, 39.6122];
        const [lat, lng] = center;
        const filePath = `/data/dwelling_time/${fileName}`;
        try {
          const response = await fetch(filePath);
          const text = await response.text();
          const parsed = await parse(text, CSVLoader);
          // For each row, generate a point around the file's defined center.
          const pointsFromFile = parsed.data
            .map((row) => {
              const total = parseFloat(row.Average_Time_Spent);
              if (!isNaN(total) && total > 0) {
                const [x, y] = generatePointAround(lat, lng);
                return {
                  position: [x, y],
                  value: total,
                  operator: row.Operator || fileName.replace(".csv", ""),
                  source: fileName.replace(".csv", ""),
                };
              }
              return null;
            })
            .filter(Boolean);
          return pointsFromFile;
        } catch (error) {
          console.error(`Failed to load ${fileName}:`, error);
          return [];
        }
      };

      // Load all CSV files concurrently.
      const allFiles = await Promise.all(CSV_FILES.map(fetchFile));
      // Flatten all points from each file.
      const allPoints = allFiles.flat();
      setPoints(allPoints);
    };

    loadFiles();
  }, []);

  const columnLayer = new ColumnLayer({
    id: "operator-column-layer",
    data: points,
    diskResolution: 12,
    radius: 35,
    extruded: true,
    pickable: true,
    elevationScale: 10,
    getPosition: (d) => d.position,
    getElevation: (d) => d.value,
    getFillColor: (d) => {
      const fileKey = d.source || "default";
      const { low, high } = FILE_THRESHOLDS[fileKey] || FILE_THRESHOLDS["default"];
      const v = d.value;

      if (v < low) return [34, 197, 94]; // green
      if (v < high) return [255, 179, 8]; // yellow
      return [239, 68, 68]; // red
    },
    material: {
      ambient: 0.64,
      diffuse: 0.6,
      shininess: 32,
      specularColor: [51, 51, 51],
    },
  });

  return (
    <>
      <div className="absolute flex flex-col z-10 text-left overflow-y-auto text-sm top-8 right-8 w-80 h-72 rounded-[11.76px] p-4 gap-2 border border-[#939598] bg-white/16 backdrop-blur-[12px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-white">
        <h2 className="text-lg font-semibold">Insights</h2>
        <div className="flex items-start gap-2">
          <img src={light_bulb} className="" />
          <span>
            The dwell time analysis reveals operational pressure points across the city, with top destinations accounting for over 75,000 hours of bus
            stoppage, and the Central Area alone contributing 20,000 hours. This highlights the need for better crowd flow management and real-time
            scheduling at key locations.
          </span>
        </div>
        <div className="flex items-start gap-2">
          <img src={light_bulb} className="" />
          <span>Dwell Time at top destinations 75K hours</span>
        </div>
        <div className="flex items-start gap-2">
          <img src={light_bulb} className="" />
          <span>Dwell Time at Central Area 20K hours</span>
        </div>
      </div>

      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller
        layers={[columnLayer]}
        effects={[lightingEffect]}
        getTooltip={({ object }) => {
          if (!object) return null;

          const name = object.operator || "Unknown";
          const source = object.source || "Unknown Source";
          const value = typeof object.value === "number" ? object.value.toFixed(2) : "N/A";

          return {
            html: `
              <div>
                <b>Operator:</b> ${name}<br/>
                <b>Source:</b> ${source}<br/>
                <b>Avg Time:</b> ${value} min
              </div>
            `,
          };
        }}
      >
        <StaticMap mapboxAccessToken={MAPBOX_TOKEN} mapStyle="mapbox://styles/mapbox/dark-v10" />
      </DeckGL>
    </>
  );
}
