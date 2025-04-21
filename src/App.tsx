import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

// Sections
import HeroSection from "./features/digitalReports/HeroSection";
import WhatWePromised from "./features/digitalReports/WhatWePromised";
import WhatWeActedOn from "./features/digitalReports/WhatWeActedOn";
import WhatWeDelivered from "./features/digitalReports/WhatWeDelivered/WhatWeDelivered";
import WhatWeFound from "./features/digitalReports/WhatWeFound";
import ThankYou from "./features/digitalReports/ThankYou";
import WhatWeAimFor from "./features/digitalReports/WhatWeAimFor";
import KeyTrendsAndInsights from "./features/digitalReports/KeyTrendsAndInsights";
import NextSteps from "./features/digitalReports/NextSteps";
import BenefitsToTheCity from "./features/digitalReports/BenefitsToTheCity";
import PilgrimsRouteTracking from "./features/digitalReports/PilgrimsRouteTracking";
import BusCountAndDwellingTimes from "./features/digitalReports/BusCountAndDwellingTimes";

function App() {
  const sectionRefs = useRef<HTMLElement[]>([]);
  const isScrolling = useRef(false);

  const scrollToSection = (index: number) => {
    const vh = window.innerHeight;
    const targetY = index * vh;

    isScrolling.current = true;
    animate(window.scrollY, targetY, {
      duration: 0.6,
      onUpdate: (latest) => {
        window.scrollTo(0, latest);
      },
      onComplete: () => {
        isScrolling.current = false;
      },
    });
  };


  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = (direction: number) => {
      if (isScrolling.current) return;

      const vh = window.innerHeight;
      const currentIndex = Math.round(window.scrollY / vh);
      const nextIndex = Math.max(
        0,
        Math.min(sectionRefs.current.length - 1, currentIndex + direction)
      );

      scrollToSection(nextIndex);
    };


    const isScrollable = (el: HTMLElement): boolean => {
      return el.scrollHeight > el.clientHeight;
    };
    
    const isScrollingInsideScrollableElement = (target: EventTarget | null): boolean => {
      let node = target as HTMLElement | null;
    
      while (node && node !== document.body) {
        if (isScrollable(node)) return true;
        node = node.parentElement;
      }
    
      return false;
    };

    const isNoScrollZone = (target: EventTarget | null): boolean => {
      let node = target as HTMLElement | null;
      while (node && node !== document.body) {
        if (node.dataset?.noScroll !== undefined) return true;
        node = node.parentElement;
      }
      return false;
    };
    
    
    const handleWheel = (e: WheelEvent) => {
      if (isNoScrollZone(e.target)) return; // ✅ Let the child handle it
    
      e.preventDefault();
      handleScroll(e.deltaY > 0 ? 1 : -1);
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isNoScrollZone(e.target)) return;
    
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        handleScroll(1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        handleScroll(-1);
      }
    };
    

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  const registerRef = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <>
      <div ref={registerRef} className="h-screen"><HeroSection /></div>
      <div ref={registerRef} className="h-screen"><WhatWePromised /></div>
      <div ref={registerRef} className="h-screen"><BenefitsToTheCity /></div>
      <div ref={registerRef} className="h-screen"><WhatWeActedOn /></div>
      <div ref={registerRef} className="h-screen"><WhatWeDelivered /></div>
      <div ref={registerRef} className="h-screen"><WhatWeFound /></div>
      <div ref={registerRef} className="h-screen"><PilgrimsRouteTracking /></div>
      <div ref={registerRef} className="h-screen"><BusCountAndDwellingTimes /></div>
      {/* <div ref={registerRef} className="h-screen"><WhatWeAimFor /></div> */}
      <div ref={registerRef} className="h-screen"><KeyTrendsAndInsights /></div>
      <div ref={registerRef} className="h-screen"><NextSteps /></div>
      <div ref={registerRef} className="h-screen"><ThankYou /></div>
    </>
  );
}

export default App;
