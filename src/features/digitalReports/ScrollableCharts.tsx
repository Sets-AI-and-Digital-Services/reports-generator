import { useState } from "react";
import SwipeDashboard from "../dashboard/SwipeDashboard";

export const ScrollableCharts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const mapSlide = ["Flow Map", "OD Map", "3D Bar Map", "Trajectory Map", "Radar Chart"];
  return (
    <div className="relative">
      {/* Map Title */}
      <p className="m-auto w-[97%] mb-4 text-2xl font-medium rounded-xl p-4 text-[#F3FCF6] bg-[#40968D] flex justify-between">
        <span>{mapSlide[currentSlide]}</span>
        <span>{currentSlide + 1}/5</span>
      </p>
      <SwipeDashboard setCurrentSlide={setCurrentSlide} />
    </div>
  );
};
