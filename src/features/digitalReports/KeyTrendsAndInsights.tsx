import React from "react";
import { motion } from "framer-motion";
import light_bulb from "../../../public/assets/light_bulb.svg";

const KeyTrendsAndInsights: React.FC = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-white to-[#dff1ed]">
      <div className="mx-auto text-center">
        {/* Section Title */}
        <p className="mb-6 text-3xl font-bold md:text-5xl text-primary">Key Trends and Insights</p>

        {/* Slider Component with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="rounded-3xl"
        >
          <div className="w-3/5 m-auto pt-12 flex flex-col gap-6 text-left text-2xl font-normal">
            <div className="w-full h-[156px] rounded-[12px] p-[16px] pt-[16px] pb-[16px] pr-[12px] pl-[12px] gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)] flex items-start">
              <div className="w-12 h-12 flex-shrink-0">
                <img src={light_bulb} className="w-full" />
              </div>
              <p>
                Based on our review of the documents outlining the costs associated with public transport projects, the operation of{" "}
                <b>the control room </b>
                shall fall under the responsibility of <b>the Madinah Development Authority</b>.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 flex-wrap">
              <div className="rounded-[12px] p-[16px] pt-[16px] pb-[16px] pr-[12px] pl-[12px] gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)] flex items-start w-full md:w-[calc(50%-0.5rem)]">
              <div className="w-12 h-12 flex-shrink-0">
                  <img src={light_bulb} className="w-full" />
                </div>
                <p>
                  Establish clear <b>policies </b> for <b>bus entry </b> into the <b>central area </b>, in coordination with hotels.
                </p>
              </div>
              <div className="rounded-[12px] p-[16px] pt-[16px] pb-[16px] pr-[12px] pl-[12px] gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)] flex items-start w-full md:w-[calc(50%-0.5rem)]">
                <div className="w-12 h-12 flex-shrink-0">
                  <img src={light_bulb} className="w-full" />
                </div>
                <p>
                  <b>Restrict the role </b> of the General Syndicate of Cars (GSC) buses to transporting pilgrims and visitors to and{" "}
                  <b>from hotels </b> without allowing them to roam within the city.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 flex-wrap">
              <div className="rounded-[12px] p-[16px] pt-[16px] pb-[16px] pr-[12px] pl-[12px] gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)] flex items-start w-full md:w-[calc(50%-0.5rem)]">
                <div className="w-12 h-12 flex-shrink-0">
                  <img src={light_bulb} className="w-full" />
                </div>
                <p>
                  Prepare a <b>dedicated fleet </b> for city sightseeing <b>tours </b> (Jawlah), while <b>preventing GSC </b> buses from{" "}
                  <b>circulating within the city</b>.
                </p>
              </div>
              <div className="rounded-[12px] p-[16px] pt-[16px] pb-[16px] pr-[12px] pl-[12px] gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)] flex items-start w-full md:w-[calc(50%-0.5rem)]">
                <div className="w-12 h-12 flex-shrink-0">
                  <img src={light_bulb} className="w-full" />
                </div>
                <p>
                  Operate Madinah Buses <b>shuttle buses </b> to serve <b>main corridors </b> with high demand such as Airport, Abyar Ali, Train
                  Station and Quba Mosque.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 flex-wrap">
              <div className="rounded-[12px] p-[16px] pt-[16px] pb-[16px] pr-[12px] pl-[12px] gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)] flex items-start w-full md:w-[calc(50%-0.5rem)]">
                <div className="w-12 h-12 flex-shrink-0">
                  <img src={light_bulb} className="w-full" />
                </div>
                <p>
                  Establish <b>seasonal terminals at city entry points </b> to absorb future congestion, with shuttle buses operating to and from the
                  city's main corridors.
                </p>
              </div>
              <div className="rounded-[12px] p-[16px] pt-[16px] pb-[16px] pr-[12px] pl-[12px] gap-[12px] bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)] flex items-start w-full md:w-[calc(50%-0.5rem)]">
                <div className="w-12 h-12 flex-shrink-0">
                  <img src={light_bulb} className="w-full" />
                </div>
                <p>
                  Allocate <b>seasonal parking </b> areas <b>outside the city </b> for GSC buses, where pilgrims will be transported to their
                  destinations via city buses.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyTrendsAndInsights;
