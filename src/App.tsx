
import "./App.css";
import AnimatedFlowMap from "./features/AnimatedFlowMap/AnimatedFlowMap";
import { ScrollableCharts } from "./features/reports/components/ScrollableCharts";
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {

  return (
    <>
      {/* <ScrollableCharts /> */}
      <div style={{ height: '100vh' }}>
        <AnimatedFlowMap />
      </div>
    </>
  );
}

export default App;
