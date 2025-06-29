import AnimatedFlowMap from "../AnimatedFlowMap/AnimatedFlowMap";
import BarMap from "../BarMap/BarMap";
import TrajectoryMap from "../TrajectoryMap/TrajectoryMap";
import SwipeCard from "./SwipeCard";
import SwipeContainer from "./SwipeContainer";
import ExcelReaderRadar from "./componnets/charts/radarChart/ExcelReaderRadar";
import light_bulb from "../../../public/assets/light_bulb.svg";

const SwipeDashboard = ({
  setCurrentSlide,
}: {
  setCurrentSlide: (index: number) => void;
}) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute w-full h-[95%] top-0 bottom-0 m-auto bg-[#B4C9C240] rounded-2xl"></div>
      <div className="m-auto w-[97%] overflow-x-hidden text-white bg-black border rounded-3xl relative">
        <SwipeContainer setCurrentSlide={setCurrentSlide}>
          <SwipeCard title="trajectory-map">
            <AnimatedFlowMap />
          </SwipeCard>
          <SwipeCard title="Live Map View">
            <div className="insights absolute flex flex-col z-10 text-left overflow-y-auto text-sm top-16 right-16 w-80 h-32 rounded-[11.76px] p-4 gap-2 border border-[#939598] bg-transparent backdrop-blur-[12px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-white">
              <h2 className="text-lg font-semibold">Insights</h2>
              <div className="flex items-start gap-2">
                <img src={light_bulb} className="" />
                <span>
                  This visualization highlights the top destinations frequently
                  visited by pilgrims and visitors, with a total of over 130,000
                  recorded visits. The five most visited locations are:
                  <li>Central Area – 60,040 visits</li>
                  <li>Sayyid Al-Shuhada – 28,155 visits</li>
                  <li>Quba Mosque – 17,106 visits</li>
                  <li>Miqat – 11,084 visits</li>
                  <li>Pilgrims and Umrah Station – 5,596 visits</li>
                </span>
              </div>
            </div>
            <iframe
              // src="https://flowmap.blue/1XeBWSrv6Rkbk6gEjdUdXtPV1SBCeR5MoXlZhjsrrpgc"
              src="https://www.flowmap.blue/1zUO0LjjJ_NTdMdqR9AVgJucCprD-0Zxo26_yQ2zV8DE"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allowFullScreen
            ></iframe>
          </SwipeCard>
          <SwipeCard title="bar-map">
            <BarMap />
          </SwipeCard>
          <SwipeCard title="trajectory-map">
            <TrajectoryMap />
          </SwipeCard>
          {/* <SwipeCard title="od-map">
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
        </SwipeCard> */}
          <SwipeCard title="ExcelReaderRadar">
            <ExcelReaderRadar />
          </SwipeCard>
          {/* <SwipeCard title="BarChart">
          <BusTrafficChart />
        </SwipeCard> */}
        </SwipeContainer>
      </div>
    </div>
  );
};

export default SwipeDashboard;
