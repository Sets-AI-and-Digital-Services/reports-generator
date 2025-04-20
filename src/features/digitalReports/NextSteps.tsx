import { motion } from "framer-motion";

const NextSteps = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-white to-[#dff1ed]">
      <div className="mx-auto text-center">
        {/* Section Title */}
        <p className="mb-6 text-3xl font-bold md:text-5xl text-primary">Next Steps</p>

        {/* Slider Component with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="rounded-3xl text-left w-[70%] m-auto"
        >
          {/* Row 1 (Grid with 3 items) */}
          <div className="grid grid-cols-[27%_25%_36%] gap-5 mx-auto pt-12">
            <div className="h-[86px] flex items-center rounded-[12.82px] px-[24px] py-[12px] gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <span className="text-[#00977D] font-bold text-3xl">1</span>
              Select and prepare the control center location.
            </div>
            <div className="h-[86px] flex items-center rounded-[12.82px] px-[24px] py-[12px] gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <span className="text-[#00977D] font-bold text-3xl">2</span>
              Develop the control center system.
            </div>
            <div className="h-[86px] flex items-center rounded-[12.82px] px-[24px] py-[12px] gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <span className="text-[#00977D] font-bold text-3xl">3</span>
              Enhance integration and coordination with stakeholders.
            </div>
          </div>

          {/* Row 2 (Grid with 4 items) */}
          <div className="grid grid-cols-[29%_20%_20%_17%] gap-5 mx-auto pt-12">
            <div className="h-[86px] flex items-center rounded-[12.82px] px-[24px] py-[12px] gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <span className="text-[#00977D] font-bold text-3xl">4</span>
              Development of the control center’s operational system.
            </div>
            <div className="h-[86px] flex items-center rounded-[12.82px] px-[24px] py-[12px] gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <span className="text-[#00977D] font-bold text-3xl">5</span>
              Hajj operational assessment.
            </div>
            <div className="h-[86px] flex items-center rounded-[12.82px] px-[24px] py-[12px] gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <span className="text-[#00977D] font-bold text-3xl">6</span>
              Control center governance.
            </div>
            <div className="h-[86px] flex items-center rounded-[12.82px] px-[24px] py-[12px] gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <span className="text-[#00977D] font-bold text-3xl">7</span>
              Operation of the center
            </div>
          </div>

          <div className="p-4 overflow-hidden bg-white shadow rounded-xl my-5 w-[91%]">
            <img src="/assets/next_steps.svg" alt="Next Steps" className="object-cover w-full h-auto" />
          </div>

          <div className="rounded-xl text-[#515B64] w-[91%] px-6 py-3 bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
            <b>To ensure the effective operation of the control room, the following positions are recommended: </b> Control Room Manager, Shift
            Coordinators, Control Room Supervisor, Representatives from relevant authorities, Data Analyst, GIS Expert.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NextSteps;
