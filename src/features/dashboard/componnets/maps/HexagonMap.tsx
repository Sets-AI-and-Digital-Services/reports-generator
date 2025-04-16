import { useEffect, useRef, useState } from "react";
import DeckGL from "@deck.gl/react";
import StaticMap from "react-map-gl";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { useInView } from "../../../../shared/hooks/useInView";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});
const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [39.8262, 21.4225, 8000], // Makkah centered
});
const lightingEffect = new LightingEffect({ ambientLight, pointLight });

const INITIAL_VIEW_STATE = {
  longitude: 39.86,
  latitude: 21.41,
  zoom: 10,
  pitch: 40.5,
  bearing: -27,
};

const colorRange = [
  new Uint8ClampedArray([1, 152, 189]),
  new Uint8ClampedArray([73, 227, 206]),
  new Uint8ClampedArray([216, 254, 181]),
  new Uint8ClampedArray([254, 237, 177]),
  new Uint8ClampedArray([254, 173, 84]),
  new Uint8ClampedArray([209, 55, 78]),
];

const MAKKAH_POINTS: number[][] = [
  [39.8262, 21.4225], // Al Haram
  [39.8261, 21.4224],
  [39.8942, 21.4123], // Mina
  [39.8941, 21.4122],
  [39.9441, 21.3844], // Muzdalifah
  [39.944, 21.3843],
  [39.9836, 21.3556], // Arafat
  [39.9835, 21.3555],
  [39.83, 21.43], // Near Haram
  [39.85, 21.41], // Road point
];

export default function HexagonMapOfficial() {
  const { ref: containerRef, inView } = useInView(0.6);
  const animationRef = useRef<number | null>(null);
  const [elevationScale, setElevationScale] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setElevationScale(0);
    let scale = 0;
    const animate = () => {
      scale += 1;
      setElevationScale(scale);
      if (scale < 50) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current!);
  }, [inView]);

  const hexLayer = new HexagonLayer({
    id: "heatmap",
    data: MAKKAH_POINTS,
    getPosition: (d: any) => d,
    radius: 600,
    elevationScale,
    extruded: true,
    pickable: true,
    colorRange,
    elevationRange: [0, 3000],
    material: {
      ambient: 0.64,
      diffuse: 0.6,
      shininess: 32,
      specularColor: [51, 51, 51],
    },
  });

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller
        layers={[hexLayer]}
        effects={[lightingEffect]}
        getTooltip={({ object }) =>
          object && {
            html: `Lat: ${object.position[1].toFixed(
              4
            )}, Lng: ${object.position[0].toFixed(4)}<br/>Count: ${
              object.count
            }`,
          }
        }
      >
        <StaticMap
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v10"
        />
      </DeckGL>
    </div>
  );
}
