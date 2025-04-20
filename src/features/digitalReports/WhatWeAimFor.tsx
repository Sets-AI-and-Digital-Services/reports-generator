import React from "react";
import { motion } from "framer-motion";
import what_we_aim_for from "../../../public/assets/what_we_aim_for.svg"

const WhatWeAimFor: React.FC = () => {
  return (
    <section className="w-full px-4 py-16 bg-[#fff]">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <p className="mb-6 text-3xl font-bold md:text-5xl text-primary">
          What We Aim For
        </p>

        {/* Slider Component with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="rounded-3xl"
        >
          <img src={what_we_aim_for} />
        </motion.div>
      </div>
    </section>
  )
}

export default WhatWeAimFor
