import SwipeCard from "./swipeSections/components/SwipeCard";
import SwipeContainer from "./swipeSections/components/SwipeContainer";
import RadarChart from "./dashboard/componnets/RadarChart";
import BusTrafficChart from "./dashboard/componnets/BarPopulationChart";
import MeccaFlowMap from "./liveMap/components/ArcFlowMap";
import HexagonMap from "./liveMap/components/HexagonMap";
import SankeyChart from "./dashboard/componnets/SankeyChart";
import DiskTreemapChart from "./dashboard/componnets/DiskTreemapChart";
import MakkahLineChart from "./dashboard/componnets/MakkahLineChart";
import MakkahCalendarHeatmap from "./liveMap/components/MakkahCalendarHeatmap";

const SwipeDashboard = () => {
  return (
    <div className="w-screen h-screen overflow-hidden text-white bg-black">
      {" "}
      <SwipeContainer>
        <SwipeCard title="Live Map View">
          <iframe
            src="https://flowmap.blue/1XeBWSrv6Rkbk6gEjdUdXtPV1SBCeR5MoXlZhjsrrpgc"
            width="100%"
            height="100%"
            style={{ border: "0" }}
            allowFullScreen
          ></iframe>
        </SwipeCard>

        <SwipeCard title="Flow Map View">
          <MeccaFlowMap />
        </SwipeCard>
        <SwipeCard title="Hexagon View">
          <HexagonMap />
        </SwipeCard>
        <SwipeCard title="Passenger Chart">
          <RadarChart />
        </SwipeCard>
        <SwipeCard title="Bus Traffic Stats">
          <BusTrafficChart />
        </SwipeCard>
        <SwipeCard title="Sankey ">
          <SankeyChart />
        </SwipeCard>
        <SwipeCard title="FullSanke ">
          <DiskTreemapChart />
        </SwipeCard>
        <SwipeCard title="Line Chart ">
          <MakkahLineChart />
        </SwipeCard>
        <SwipeCard title="Heatmap Chart ">
          <MakkahCalendarHeatmap />
        </SwipeCard>
      </SwipeContainer>
    </div>
  );
};

export default SwipeDashboard;
