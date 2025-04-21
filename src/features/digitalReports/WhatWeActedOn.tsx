import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: 12, suffix: "+", label: "Stakeholders Interviews" },
  { value: 3, label: "Entities Integrated" },
  { value: 60000, suffix: "+", label: "Public Transport Buses Live Location" },
  { value: 8, suffix: "+", label: "Site Visits Conducted Across the City" },
  { value: 540, label: "Hours Of Live Operations Daily During Ramadan" },
  { value: 15, label: "Live Camera Locations" },
];

const WhatWeActedOn: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.8,
    triggerOnce: true,
  });

  const firstRowWidths = ["w-[27%]", "w-[20%]", "w-[43%]"];
  const secondRowWidths = ["w-[34%]", "w-[35%]", "w-[24%]"];

  return (
    <section
      className="w-full h-screen px-4 pt-8 bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/assets/actedonBackground.png')",
      }}
    >
      <div className="mx-auto" ref={ref}>
        {/* Title */}
        <p className="mb-16 text-3xl font-bold md:text-5xl text-primary text-center">What We Acted On</p>

        <div className="flex gap-8 justify-center">
          <div className="flex flex-col gap-4 font-medium text-2xl text-[#939598]">
            <div className="w-[38rem] h-full flex items-center gap-3 rounded-[12.82px] border-[1.07px] border-[#F3FCF6] bg-white px-6 py-3 shadow-[0px_4.27px_6.41px_#B4C9C21A]">
              <img src="/assets/acted_1.svg" />
              <span className="text-3xl text-[#343A40]">12+</span>
              <span>Stakeholders Interviews</span>
            </div>

            <div className="w-[38rem] h-full flex items-center gap-3 rounded-[12.82px] border-[1.07px] border-[#F3FCF6] bg-white px-6 py-3 shadow-[0px_4.27px_6.41px_#B4C9C21A]">
              <img src="/assets/acted_2.svg" />
              <span className="text-3xl text-[#343A40]">3</span>
              <span>Entities Integrated</span>
            </div>

            <div className="w-[38rem] h-full flex items-center gap-3 rounded-[12.82px] border-[1.07px] border-[#F3FCF6] bg-white px-6 py-3 shadow-[0px_4.27px_6.41px_#B4C9C21A]">
              <img src="/assets/acted_3.svg" />
              <span className="text-3xl text-[#343A40]">60K+</span>
              <span>Public Transport Buses Live Location</span>
            </div>

            <div className="w-[38rem] h-full flex items-center gap-3 rounded-[12.82px] border-[1.07px] border-[#F3FCF6] bg-white px-6 py-3 shadow-[0px_4.27px_6.41px_#B4C9C21A]">
              <img src="/assets/acted_4.svg" />
              <span className="text-3xl text-[#343A40]">8+</span>
              <span>Site Visits Conducted Across the City</span>
            </div>

            <div className="w-[38rem] h-full flex items-center gap-3 rounded-[12.82px] border-[1.07px] border-[#F3FCF6] bg-white px-6 py-3 shadow-[0px_4.27px_6.41px_#B4C9C21A]">
              <img src="/assets/acted_5.svg" />
              <span className="text-3xl text-[#343A40]">540</span>
              <span>Hours Of Live Operations Daily During Ramadan</span>
            </div>

            <div className="w-[38rem] h-full flex items-center gap-3 rounded-[12.82px] border-[1.07px] border-[#F3FCF6] bg-white px-6 py-3 shadow-[0px_4.27px_6.41px_#B4C9C21A]">
              <img src="/assets/acted_6.svg" />
              <span className="text-3xl text-[#343A40]">15</span>
              <span>Live Camera Locations</span>
            </div>
          </div>

          <div className="w-[39rem] flex flex-wrap">
            <img src="/assets/acted_image_1.svg" />
            <img src="/assets/acted_image_2.svg" />
            <img src="/assets/acted_image_3.svg" />
            <img src="/assets/acted_image_4.svg" />
            <img src="/assets/acted_image_5.svg" />
            <img src="/assets/acted_image_6.svg" />
            <img src="/assets/acted_image_7.svg" />
            <img src="/assets/acted_image_8.svg" />
          </div>
        </div>

        {/* Stats */}
        {/* <div className="flex flex-wrap justify-center gap-4 mb-4">
          {stats.slice(0, 3).map((stat, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-6 rounded-xl shadow-md bg-white text-start ${firstRowWidths[index]} min-w-[200px]`}
            >
              <p className="text-3xl font-bold text-primary md:text-4xl">
                {inView ? (
                  <CountUp start={0} end={stat.value} duration={2} suffix={stat.suffix || ""} />
                ) : (
                  "0"
                )}
              </p>
              <p className="mt-2 text-sm font-medium leading-snug text-subtitle md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {stats.slice(3, 6).map((stat, index) => (
            <div
              key={index + 3}
              className={`flex items-center gap-4 p-6 rounded-xl shadow-md bg-white text-start ${secondRowWidths[index]} min-w-[200px]`}
            >
              <p className="text-3xl font-bold text-primary md:text-4xl">
                {inView ? (
                  <CountUp start={0} end={stat.value} duration={2} suffix={stat.suffix || ""} />
                ) : (
                  "0"
                )}
              </p>
              <p className="mt-2 text-sm font-medium leading-snug text-subtitle md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div> */}

        {/* Combined Image */}
        {/* <div className="p-4 mt-5 overflow-hidden bg-white shadow rounded-xl">
          <img src="/assets/actedon.svg" alt="What We Acted On" className="object-cover w-full h-auto" />
        </div> */}
      </div>
    </section>
  );
};

export default WhatWeActedOn;
