import React, { useState } from "react";
import { deliveryItems } from "./deliveryData";
import DeliveryItem from "./DeliveryItem";

import { AnimatePresence, motion } from "framer-motion";
import LiveMap from "./views/LiveMap";
import LiveDashboard from "./views/LiveDashboard";
import LiveCamera from "./views/LiveCamera";
import LiveOperations from "./views/LiveOperations";

const views: Record<string, React.ReactNode> = {
  map: <LiveMap />,
  dashboard: <LiveDashboard />,
  camera: <LiveCamera />,
  operations: <LiveOperations />,
};

const WhatWeDelivered: React.FC = () => {
  const [activeKey, setActiveKey] = useState("map");

  return (
    <section className="w-full h-screen px-4 py-10 bg-gradient-to-b from-white to-[#dff1ed]">
      <div className="max-w-[80%] mx-auto">
        <h2 className="mb-28 text-3xl font-bold text-center md:text-5xl text-primary">What We Delivered</h2>

        <div className="flex flex-col-reverse items-center gap-8 md:flex-row">
          {/* Tabs List */}
          <div className="flex flex-col gap-4 w-2/6">
            {deliveryItems.map((item) => (
              <DeliveryItem
                key={item.key}
                title={item.title}
                description={item.description}
                active={activeKey === item.key}
                onClick={() => setActiveKey(item.key)}
              />
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 min-h-[300px] h-[38rem] relative my-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeKey}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full overflow-hidden"
              >
                {views[activeKey]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDelivered;
