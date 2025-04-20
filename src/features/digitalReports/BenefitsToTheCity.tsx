import { motion } from "framer-motion";

const BenefitsToTheCity = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-white to-[#dff1ed]">
      <div className="mx-auto text-center">
        {/* Section Title */}
        <p className="mb-12 text-3xl font-bold md:text-5xl text-primary">Benefits to the City of Madinah</p>

        {/* Slider Component with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="rounded-3xl text-left w-[70%] m-auto"
        >
          <div className="flex mb-6 items-center rounded-xl px-6 py-4 gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
            <img src="/assets/benefits_1.svg" />
            Accelerated response to traffic challenges through smart systems and effective institutional coordination.
          </div>

          <div className="flex mb-6 justify-between">
            <div className="flex items-center w-[49%] rounded-xl px-6 py-4 gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <img src="/assets/benefits_2.svg" />
              Data-driven decision-making to support urban mobility planning.
            </div>
            <div className="flex items-center w-[49%] rounded-xl px-6 py-4 gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <img src="/assets/benefits_3.svg" />
              Improved collaboration with key stakeholders in transport, safety, and operations.
            </div>
          </div>

          <div className="flex mb-6 justify-between">
            <div className="flex items-center w-[49%] rounded-xl px-6 py-4 gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <img src="/assets/benefits_4.svg" />
              Alignment with Vision 2030 smart city objectives.
            </div>
            <div className="flex items-center w-[49%] rounded-xl px-6 py-4 gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <img src="/assets/benefits_5.svg" />
              Enhanced experience for residents, visitors, and pilgrims.
            </div>
          </div>

          <div className="p-4 overflow-hidden bg-white shadow rounded-xl my-5">
            <img src="/assets/benefits_to_the_city.svg" alt="Benefits to the City of Madinah    " className="object-cover w-full h-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsToTheCity;
