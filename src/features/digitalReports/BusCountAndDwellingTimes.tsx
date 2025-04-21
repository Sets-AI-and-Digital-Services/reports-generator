import React from "react";
import { motion } from "framer-motion";
import BusVolumeTable from "../BusVolumeTable/BusVolumeTable";

const BusCountAndDwellingTimes: React.FC = () => {
  return (
    <section className="w-full h-screen py-16 bg-gradient-to-b from-white to-[#dff1ed] relative z-10">
      <div className="mx-auto text-center">
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
  );
};

export default BusCountAndDwellingTimes;
