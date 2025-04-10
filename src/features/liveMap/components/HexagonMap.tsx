import { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import StaticMap from "react-map-gl";
import { ColumnLayer } from "@deck.gl/layers";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import Papa from "papaparse";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const ambientLight = new AmbientLight({ color: [255, 255, 255], intensity: 1.0 });
const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [39.6122, 24.4709, 8000],
});
const lightingEffect = new LightingEffect({ ambientLight, pointLight });

const INITIAL_VIEW_STATE = {
  latitude: 24.4709,
  longitude: 39.6122,
  zoom: 11,
  bearing: 0,
  pitch: 30,
};

// Dummy coordinates around the view
const OPERATOR_COORDINATES: Record<string, [number, number]> = {};
let lng = 39.6122;
let lat = 24.4709;
for (let i = 0; i < 70; i++) {
  OPERATOR_COORDINATES[`Operator_${i}`] = [lng + Math.random() * 0.015, lat + Math.random() * 0.015];
}

export default function HexagonMapOfficial() {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Parse CSV file on mount
  useEffect(() => {
    fetch("/data/daily_operators_avg_central_area_dwelling_time.csv")
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const data = result.data as any[];
            setCsvData(data);
            const allDates = data.map((row) => row.Date).filter(Boolean);
            setDates(allDates);
            setSelectedDate(allDates[0]);
          },
        });
      });
  }, []);

  // Prepare data for selected date
  const mapData = selectedDate
    ? Object.entries(csvData.find((row) => row.Date === selectedDate) || {})
        .filter(([key]) => key !== "Date")
        .map(([operator, value], index) => {
          const coords = OPERATOR_COORDINATES[`Operator_${index}`];
          return {
            position: coords,
            value: parseFloat(value || 0),
            operator,
          };
        })
    : [];

  const columnLayer = new ColumnLayer({
    id: "3d-bars",
    data: mapData,
    diskResolution: 12,
    radius: 80,
    elevationScale: 100,
    getPosition: (d) => d.position,
    getFillColor: (d) => [255 - d.value * 5, d.value * 10, 140],
    getElevation: (d) => d.value,
    pickable: true,
    extruded: true,
  });

  return (
    <div className="w-full h-full relative">
      {/* Dropdown for Date Selection */}
      <div className="absolute top-2 left-2 z-10 bg-white p-2 rounded shadow-md">
        <label className="block text-sm font-medium mb-1">Select Date:</label>
        <select className="border p-1 text-sm" value={selectedDate || ""} onChange={(e) => setSelectedDate(e.target.value)}>
          {dates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller
        layers={[columnLayer]}
        effects={[lightingEffect]}
        getTooltip={({ object }) =>
          object && {
            html: `
              <b>Operator:</b> ${object.operator}<br/>
              <b>Value:</b> ${object.value}
            `,
          }
        }
      >
        <StaticMap mapboxAccessToken={MAPBOX_TOKEN} mapStyle="mapbox://styles/mapbox/dark-v10" />
      </DeckGL>
    </div>
  );
}
