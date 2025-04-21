import React from "react";
import { motion } from "framer-motion";
import pilgrims_route_tracking from "../../../public/assets/pilgrims_route_tracking.svg";

const PilgrimsRouteTracking: React.FC = () => {
  return (
    <section className="w-full h-screen py-4 bg-[#fff]">
      <div className="mx-auto text-center">
        {/* Section Title */}
        <p className="mb-6 text-xl font-medium md:text-3xl text-primary">Pilgrim Route Tracking</p>

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
  );
};

export default PilgrimsRouteTracking;
