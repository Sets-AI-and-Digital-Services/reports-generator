import AnimatedFlowMap from "../AnimatedFlowMap/AnimatedFlowMap";
import BarMap from "../BarMap/BarMap";
import TrajectoryMap from "../TrajectoryMap/TrajectoryMap";
import SwipeCard from "./SwipeCard";
import SwipeContainer from "./SwipeContainer";
import { BarChart } from "./componnets/charts/BarChart";
import BusTrafficChart from "./componnets/charts/BarPopulationChart";
import ExcelReaderRadar from "./componnets/charts/radarChart/ExcelReaderRadar";

const SwipeDashboard = () => {
  return (
    <div className="w-full overflow-x-hidden text-white bg-black border rounded-xl">
      <SwipeContainer>
        <SwipeCard title="trajectory-map">
          <AnimatedFlowMap />
        </SwipeCard>
        <SwipeCard title="bar-map">
          <BarMap />
        </SwipeCard>
        <SwipeCard title="trajectory-map">
          <TrajectoryMap />
        </SwipeCard>
        <SwipeCard title="od-map">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 z-0 object-cover object-top w-full h-full"
          >
            <source src="/assets/bus-flow-map.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </SwipeCard>
        <SwipeCard title="od-map">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 z-0 object-cover object-top w-full h-full"
          >
            <source src="/assets/od-map-centralarea.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </SwipeCard>
        <SwipeCard title="3d map">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 z-0 object-cover object-top w-full h-full"
          >
            <source src="/assets/3d_map.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </SwipeCard>
        <SwipeCard title="trajectory map">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 z-0 object-cover object-top w-full h-full"
          >
            <source src="/assets/trajectory-map.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </SwipeCard>
        <SwipeCard title="ExcelReaderRadar">
          <ExcelReaderRadar />
        </SwipeCard>
        <SwipeCard title="BarChart">
          <BusTrafficChart />
        </SwipeCard>
      </SwipeContainer>
    </div>
  );
};

export default SwipeDashboard;
