/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import StaticMap from "react-map-gl";
import DeckGL from "@deck.gl/react";
import  FlowMapLayer  from "flowmap.gl";

const ODMap = () => {
  const viewport = {
    latitude: 21.3891, // Example: Makkah
    longitude: 39.8579,
    zoom: 11,
    bearing: 0,
    pitch: 30,
  };

  const locations: {
    type: "FeatureCollection";
    features: {
      type: "Feature";
      properties: { id: string; name: string };
      geometry: { type: "Point"; coordinates: number[] };
    }[];
  } = {
    type: "FeatureCollection",
    features: [
      { type: "Feature", properties: { id: "A", name: "Station A" }, geometry: { type: "Point", coordinates: [39.83, 21.42] } },
      { type: "Feature", properties: { id: "B", name: "Station B" }, geometry: { type: "Point", coordinates: [39.85, 21.39] } },
      { type: "Feature", properties: { id: "C", name: "Station C" }, geometry: { type: "Point", coordinates: [39.88, 21.4] } },
    ],
  };

  const flows = [
    { origin: "A", destination: "B", count: 70 },
    { origin: "B", destination: "C", count: 120 },
  ];

  const layer = new FlowMapLayer({
    id: "flowmap",
    locations,
    flows,
    getLocationId: (loc: { properties: { id: string } }) => loc.properties.id,
    getLocationCentroid: (loc: { geometry: { coordinates: number[] } }) => loc.geometry.coordinates,
    getFlowOriginId: (flow: { origin: string }) => flow.origin,
    getFlowDestId: (flow: { destination: string }) => flow.destination,
    getFlowMagnitude: (flow: { count: number }) => flow.count,
    colors: {
      flows: {
        scheme: "blues",
      },
    },
  });

  return (
    <DeckGL initialViewState={viewport} controller={true} layers={[layer]}>
      <StaticMap mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} />
    </DeckGL>
  );
};

export default ODMap;
