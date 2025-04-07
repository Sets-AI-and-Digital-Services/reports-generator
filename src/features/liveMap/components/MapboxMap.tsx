// import MapGL, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import FlowMap from "./FlowMap";
// import MeccaFlowMap from "./ArcFlowMap";
import SwipeDashboard from "../../SwipeDashboard";

// const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

const MapboxMap = () => {
  return (
    <>
      <div className="shadow-lg rounded-xl">
        {/* <MapGL
        initialViewState={{
          longitude: 39.8262,
          latitude: 21.4225,
          zoom: 13,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" />
        <Marker longitude={39.8262} latitude={21.4225} />
      </MapGL> */}
        {/* <MeccaFlowMap />
        <iframe
          src="https://flowmap.blue/1XeBWSrv6Rkbk6gEjdUdXtPV1SBCeR5MoXlZhjsrrpgc"
          width="100%"
          height="100%"
          // style="border:0;"
          // allowfullscreen
        ></iframe> */}

        <SwipeDashboard />
      </div>
    </>
  );
};

export default MapboxMap;
