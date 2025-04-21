import { motion } from "framer-motion";
import { useState } from "react";

const NextSteps = () => {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  const markers = [
    { id: 1, top: "62%", left: "14%", text: "Select and prepare the control center location.", width: "20rem" },
    { id: 2, top: "30%", left: "27%", text: "Develop the control center system.", width: "20rem" },
    { id: 3, top: "50%", left: "40%", text: "Enhance integration and coordination with stakeholders.", width: "25rem" },
    { id: 4, top: "78%", left: "32%", text: "Development of the control center’s operational system.", width: "25rem" },
    { id: 5, top: "65%", left: "56%", text: "Hajj operational assessment.", width: "15rem" },
    { id: 6, top: "57%", left: "81%", text: "Control center governance.", width: "15rem" },
    { id: 7, top: "38%", left: "60%", text: "Operation of the center.", width: "14rem" },
    {
      id: 8,
      top: "90%",
      left: "95%",
      text: "To ensure the effective operation of the control room, the following positions are recommended: Control Room Manager, Shift Coordinators, Control Room Supervisor, Representatives from relevant authorities, Data Analyst, GIS Expert.",
      width: "38rem",
    },
  ];
  return (
    <section className="w-full h-screen bg-gradient-to-b from-white to-[#dff1ed]">
      <div className="mx-auto text-center relative">
        {/* Section Title */}
        <p className="mb-6 text-3xl font-bold md:text-5xl text-primary absolute top-14 left-0 right-0">Next Steps</p>

        {/* Slider Component with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="rounded-3xl text-left w-full m-auto text-xl"
        >
          <img src="assets/next_steps.jpeg" className="w-screen h-screen object-cover" />
          <div className="absolute top-52 flex flex-col items-center left-0 right-0 m-auto w-fit font-medium">
            <p className="px-40 py-6 mb-6 rounded-xl bg-[#007367] shadow-[0px_4.27px_6.41px_#B4C9C21A] text-[#F3FCF6] text-5xl">
              Control Center Governance
            </p>
            <div className="flex flex-col gap-3 text-[#323E48] font-medium text-2xl">
              <p className="w-full h-full pr-6 pl-10 py-7 flex gap-7 rounded-[12.82px] border-[1.07px] border-[#F3FCF6] bg-white shadow-[0px_4.27px_6.41px_#B4C9C21A]">
                <span className="text-[#007367]">1</span>
                Select and Prepare Control Center Location
              </p>

              <p className="w-full h-full pr-6 pl-10 py-7 flex gap-7 rounded-[12.82px] border-[1.07px] border-[#F3FCF6] bg-white shadow-[0px_4.27px_6.41px_#B4C9C21A]">
                <span className="text-[#007367]">2</span>
                Develop the Control Center's Operational System
              </p>

              <p className="w-full h-full pr-6 pl-10 py-7 flex gap-7 rounded-[12.82px] border-[1.07px] border-[#F3FCF6] bg-white shadow-[0px_4.27px_6.41px_#B4C9C21A]">
                <span className="text-[#007367]">3</span>
                Enhance Integration and Coordination with Stakeholders
              </p>

              <p className="w-full h-full pr-6 pl-10 py-7 flex gap-7 rounded-[12.82px] border-[1.07px] border-[#F3FCF6] bg-white shadow-[0px_4.27px_6.41px_#B4C9C21A]">
                <span className="text-[#007367]">4</span>
                Conduct Hajj Operational Assessment
              </p>

              <p className="w-full h-full pr-6 pl-10 py-7 flex gap-7 rounded-[12.82px] border-[1.07px] border-[#F3FCF6] bg-white shadow-[0px_4.27px_6.41px_#B4C9C21A]">
                <span className="text-[#007367]">5</span>
                Operation of the Center
              </p>
            </div>
          </div>
          {/* {markers.map((marker) => (
            <div key={marker.id} style={{ top: marker.top, left: marker.left }} className="absolute z-10">
              <div className="absolute inset-0 bg-white opacity-50 rounded-full w-[140%] h-[140%] -left-1/2 -right-1/2 m-auto" />
              <button
                onClick={() => setActiveMarker(marker.id === activeMarker ? null : marker.id)}
                className={`${
                  marker.id !== 8
                    ? `w-10 h-10 text-center flex justify-center items-center p-2 rounded-full text-3xl ${
                        activeMarker === marker.id ? "bg-[#007367] text-white" : "bg-white text-[#007367]"
                      } font-medium shadow-xl shadow-[#ffffff50] relative z-10`
                    : ""
                }`}
              >
                {marker.id === 8 ? (
                  marker.id === activeMarker ? (
                    <img src="assets/next_steps_help_active.svg" className="w-full h-full relative z-10" />
                  ) : (
                    <img src="assets/next_steps_help.svg" className="w-full h-full relative z-10" />
                  )
                ) : (
                  marker.id
                )}
              </button>

              {activeMarker === marker.id && (
                <div
                  className={`mb-4 bottom-full px-6 py-3 rounded-xl ${
                    marker.id === 8 ? "text-left right-0 transform" : "text-center left-1/2 transform -translate-x-1/2"
                  } bg-white text-[#515B64] text-2xl font-medium shadow-lg absolute`}
                   style={{ width: marker.width }}
                >
                  {marker.text}
                </div>
              )}
            </div>
          ))} */}
          {/* <div className="grid grid-cols-[27%_25%_36%] gap-2 mx-auto pt-12">
            <div className="h-[86px] flex items-center rounded-[12.82px] px-6 py-3 gap-3 bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <span className="text-[#00977D] font-bold text-3xl">1</span>
              Select and prepare the control center location.
            </div>
            <div className="h-[86px] flex items-center rounded-[12.82px] px-6 py-3 gap-3 bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <span className="text-[#00977D] font-bold text-3xl">2</span>
              Develop the control center system.
            </div>
            <div className="h-[86px] flex items-center rounded-[12.82px] px-6 py-3 gap-3 bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <span className="text-[#00977D] font-bold text-3xl">3</span>
              Enhance integration and coordination with stakeholders.
            </div>
          </div>

          <div className="grid grid-cols-[29%_20%_20%_17%] gap-2 mx-auto pt-4">
            <div className="h-[86px] flex items-center rounded-[12.82px] px-6 py-3 gap-3 bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <span className="text-[#00977D] font-bold text-3xl">4</span>
              Development of the control center’s operational system.
            </div>
            <div className="h-[86px] flex items-center rounded-[12.82px] px-6 py-3 gap-3 bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <span className="text-[#00977D] font-bold text-3xl">5</span>
              Hajj operational assessment.
            </div>
            <div className="h-[86px] flex items-center rounded-[12.82px] px-6 py-3 gap-3 bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
              <span className="text-[#00977D] font-bold text-3xl">6</span>
              Control center governance.
            </div>
            <div className="h-[86px] flex items-center rounded-[12.82px] px-6 py-3 gap-3 bg-white border border-[#F3FCF6] shadow-[0px_4.27px_6.41px_rgba(180,201,194,0.1)]">
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
          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default NextSteps;
