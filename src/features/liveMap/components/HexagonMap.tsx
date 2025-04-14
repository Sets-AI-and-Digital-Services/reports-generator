import { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import  StaticMap  from "react-map-gl";
import { ColumnLayer } from "@deck.gl/layers";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { parse } from "@loaders.gl/core";
import { CSVLoader } from "@loaders.gl/csv";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const CSV_PATH = "/data/dwelling_time/north_axis_start_station.csv";

// ✅ Mimic official deck.gl lighting
const ambientLight = new AmbientLight({ color: [255, 255, 255], intensity: 1.0 });
const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [39.6122, 24.4709, 8000],
});
const lightingEffect = new LightingEffect({ ambientLight, pointLight });

// ✅ Official-style color gradient
const colorRamp = [
  [1, 152, 189],   // Cyan
  [73, 227, 206],  // Light Teal
  [216, 254, 181], // Yellow-green
  [254, 237, 177], // Soft Yellow
  [254, 173, 84],  // Orange
  [209, 55, 78],   // Red
];

function getColorForElevation(elevation: number): number[] {
  if (elevation < 5000) return colorRamp[0];
  if (elevation < 10000) return colorRamp[1];
  if (elevation < 30000) return colorRamp[2];
  if (elevation < 60000) return colorRamp[3];
  if (elevation < 100000) return colorRamp[4];
  return colorRamp[5];
}

const INITIAL_VIEW_STATE = {
  longitude: 39.6122,
  latitude: 24.4709,
  zoom: 6.6,
  pitch: 40.5,
  bearing: -27,
};

function getRandomOffset() {
  return (Math.random() - 0.5) * 0.05;
}

export default function OperatorColumnMapStyled() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(CSV_PATH);
      const text = await response.text();
      const parsed: any = await parse(text, CSVLoader);

      const centerLat = 24.4709;
      const centerLng = 39.6122;

      const operatorPoints = parsed.data
        .map((row: any) => {
          const total = parseFloat(row.Total_Time_Spent);
          if (!isNaN(total)) {
            return {
              position: [centerLng + getRandomOffset(), centerLat + getRandomOffset()],
              elevation: total,
              operator: row.Operator,
            };
          }
          return null;
        })
        .filter(Boolean);

      setData(operatorPoints);
    };

    fetchData();
  }, []);

  const columnLayer = new ColumnLayer({
    id: "styled-column-layer",
    data,
    diskResolution: 12,
    radius: 250,
    extruded: true,
    pickable: true,
    getPosition: (d) => d.position,
    getElevation: (d) => d.elevation,
    getFillColor: (d) => getColorForElevation(d.elevation),
    material: {
      ambient: 0.64,
      diffuse: 0.6,
      shininess: 32,
      specularColor: [51, 51, 51],
    },
    transitions: {
      elevationScale: 3000,
    },
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller
      layers={[columnLayer]}
      effects={[lightingEffect]}
      getTooltip={({ object }) =>
        object && {
          html: `<b>${object.operator}</b><br/>Time: ${object.elevation.toFixed(2)}`,
        }
      }
    >
      <StaticMap
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v10"
      />
    </DeckGL>
  );
}
