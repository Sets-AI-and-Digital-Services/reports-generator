import "./App.css";
import HexagonMapOfficial from "./features/liveMap/components/HexagonMap";
import { ScrollableCharts } from "./features/reports/components/ScrollableCharts";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  return (
    <>
      {/* <ScrollableCharts /> */}
      <div style={{ height: "100vh" }}>
        <HexagonMapOfficial />
      </div>
    </>
  );
}

export default App;
