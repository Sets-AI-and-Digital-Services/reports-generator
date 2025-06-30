import React from "react";
import { motion } from "framer-motion";
// import light_bulb from "../../../public/assets/light_bulb.svg";

const KeyTrendsAndInsights: React.FC = () => {
  return (
    <section className="w-full h-screen py-8 bg-gradient-to-b from-white to-[#dff1ed] relative z-10">
      <div className="mx-auto text-center">
        {/* Section Title */}
        <p className="text-3xl md:text-7xl text-primary font-medium mb-12">
          Recommendations
        </p>

        {/* Slider Component with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="rounded-3xl"
        >
          <div className="flex flex-col gap-3 items-center w-[75rem] m-auto font-normal text-2xl">
            <div className="w-full rounded-[12px] border-[1.07px] border-[#F3FCF6] bg-white pl-4 py-3 flex items-center gap-3 shadow-[0px_4.27px_6.41px_#B4C9C21A]">
              <img src="/assets/recommendations_1.svg" />
              <span>
                Establish clear policies for bus entry into the central area
              </span>
            </div>

            <div className="w-full rounded-[12px] border-[1.07px] border-[#F3FCF6] bg-white pl-4 py-3 flex items-center gap-3 shadow-[0px_4.27px_6.41px_#B4C9C21A]">
              <img src="/assets/recommendations_2.svg" />
              <span>Restrict the role of the GSC buses to and from hotels</span>
            </div>

            <div className="w-full rounded-[12px] border-[1.07px] border-[#F3FCF6] bg-white pl-4 py-3 flex items-center gap-3 shadow-[0px_4.27px_6.41px_#B4C9C21A]">
              <img src="/assets/recommendations_3.svg" />
              <span>
                Jawlah dedicated fleet for city sightseeing tours, preventing
                GSC buses{" "}
              </span>
            </div>

            <div className="w-full rounded-[12px] border-[1.07px] border-[#F3FCF6] bg-white pl-4 py-3 flex items-center gap-3 shadow-[0px_4.27px_6.41px_#B4C9C21A]">
              <img src="/assets/recommendations_4.svg" />
              <span>Madinah Buses shuttle buses to serve main corridors</span>
            </div>

            <div className="w-full rounded-[12px] border-[1.07px] border-[#F3FCF6] bg-white pl-4 py-3 flex items-center gap-3 shadow-[0px_4.27px_6.41px_#B4C9C21A]">
              <img src="/assets/recommendations_5.svg" />
              <span>
                Seasonal terminals at city entry points, shuttle buses operating
                on main corridors
              </span>
            </div>

            <div className="w-full rounded-[12px] border-[1.07px] border-[#F3FCF6] bg-white pl-4 py-3 flex items-center gap-3 shadow-[0px_4.27px_6.41px_#B4C9C21A]">
              <img src="/assets/recommendations_6.svg" />
              <span>
                Allocate seasonal parking areas outside the city for GSC buses
              </span>
            </div>
          </div>
          {/* <div className="w-3/5 m-auto pt-12 flex flex-col gap-4 text-left text-2xl font-normal">
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
          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default KeyTrendsAndInsights;
