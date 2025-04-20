import React from "react";
import { motion } from "framer-motion";
import { ScrollableCharts } from "./ScrollableCharts";
import pilgrims_route_tracking from "../../../public/assets/pilgrims_route_tracking.svg";
import BusVolumeTable from "../BusVolumeTable/BusVolumeTable";

const WhatWeFound: React.FC = () => {
  return (
    <>
      <section className="w-full py-16 bg-[#fff]">
        <div className="mx-auto text-center">
          {/* Section Title */}
          <p className="mb-6 text-3xl font-bold md:text-5xl text-primary">What We Found</p>
          <p className="mb-6 text-xl font-medium md:text-3xl text-[#939598]">Pilgrim route tracking</p>

          {/* Slider Component with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="rounded-3xl"
          >
            <img src={pilgrims_route_tracking} className="w-full h-full" />
          </motion.div>
        </div>
      </section>

      <section className="w-full py-16 bg-gradient-to-b from-white to-[#dff1ed]">
        <div className="mx-auto text-center">
          {/* Section Title */}
          <p className="mb-6 text-3xl font-bold md:text-5xl text-primary">What We Found</p>

          {/* Slider Component with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="rounded-3xl"
          >
            <BusVolumeTable />
          </motion.div>
        </div>
      </section>

      <section className="w-full px-4 py-16 bg-[#dff1ed]">
        <div className="max-w-6xl mx-auto text-center">
          {/* Section Title */}
          <p className="mb-6 text-3xl font-bold md:text-5xl text-primary">What We Found</p>

          {/* Slider Component with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="rounded-3xl"
          >
            <ScrollableCharts />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WhatWeFound;
