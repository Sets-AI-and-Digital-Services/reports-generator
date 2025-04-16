import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { ScrollableCharts } from "./features/digitalReports/ScrollableCharts";
import HeroSection from "./features/digitalReports/HeroSection";
import WhatWePromised from "./features/digitalReports/WhatWePromised";
import WhatWeActedOn from "./features/digitalReports/WhatWeActedOn";
import { useEffect } from "react";
import WhatWeDelivered from "./features/digitalReports/WhatWeDelivered/WhatWeDelivered";
import WhatWeFound from "./features/digitalReports/WhatWeFound";
import ThankYou from "./features/digitalReports/ThankYou";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top
  }, []);
  return (
    <>
      <HeroSection />
      <WhatWePromised />
      <WhatWeActedOn />
      <WhatWeDelivered />
      <WhatWeFound />
      <ThankYou />
    </>
  );
}

export default App;
