/* eslint-disable @typescript-eslint/ban-ts-comment */

//@ts-nocheck
import DeckGL from '@deck.gl/react';
import StaticMap from 'react-map-gl';
import  FlowMapLayer  from 'flowmap.gl';

const FlowMap = () => {
  // Centered around Makkah
  const initialViewState = {
    latitude: 21.3891,
    longitude: 39.8579,
    zoom: 11,
    bearing: 0,
    pitch: 30,
  };

  const locations = [
    { id: 'A', name: 'Station A', lat: 21.42, lon: 39.83 },
    { id: 'B', name: 'Station B', lat: 21.39, lon: 39.85 },
    { id: 'C', name: 'Station C', lat: 21.4, lon: 39.88 },
  ];

  const flows = [
    { origin: 'A', destination: 'B', count: 70 },
    { origin: 'B', destination: 'C', count: 120 },
    { origin: 'C', destination: 'A', count: 30 },
  ];

  const flowLayer = new FlowMapLayer({
    id: 'flowmap-layer',
    locations,
    flows,
    getLocationId: (loc) => loc.id,
    getLocationCentroid: (loc) => [loc.lon, loc.lat],
    getFlowOriginId: (flow) => flow.origin,
    getFlowDestId: (flow) => flow.destination,
    getFlowMagnitude: (flow) => flow.count,
  }).getDeckGLLayer();

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={[flowLayer]}
    >
      <StaticMap mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN} />
    </DeckGL>
  );
};

export default FlowMap;
