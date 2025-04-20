import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import HeroSection from "./features/digitalReports/HeroSection";
import WhatWePromised from "./features/digitalReports/WhatWePromised";
import WhatWeActedOn from "./features/digitalReports/WhatWeActedOn";
import { useEffect } from "react";
import WhatWeDelivered from "./features/digitalReports/WhatWeDelivered/WhatWeDelivered";
import WhatWeFound from "./features/digitalReports/WhatWeFound";
import ThankYou from "./features/digitalReports/ThankYou";
import WhatWeAimFor from "./features/digitalReports/WhatWeAimFor";
import KeyTrendsAndInsights from "./features/digitalReports/KeyTrendsAndInsights";
import NextSteps from "./features/digitalReports/NextSteps";
import BenefitsToTheCity from "./features/digitalReports/BenefitsToTheCity";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top
  }, []);
  return (
    <>
      <HeroSection />
      <WhatWePromised />
      <BenefitsToTheCity />
      <WhatWeActedOn />
      <WhatWeDelivered />
      <WhatWeFound />
      <WhatWeAimFor />
      <KeyTrendsAndInsights />
      <NextSteps />
      <ThankYou />
    </>
  );
}

export default App;
