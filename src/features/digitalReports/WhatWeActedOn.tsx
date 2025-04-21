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
      className="w-full h-screen px-4 py-16 bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/assets/actedonBackground.png')",
      }}
    >
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        {/* Title */}
        <p className="mb-8 text-3xl font-bold md:text-5xl text-primary">What We Acted On</p>

        {/* Stats */}
        {/* First Row */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
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

        {/* Second Row */}
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
        </div>

        {/* Combined Image */}
        <div className="p-4 mt-5 overflow-hidden bg-white shadow rounded-xl">
          <img src="/assets/actedon.svg" alt="What We Acted On" className="object-cover w-full h-auto" />
        </div>
      </div>
    </section>
  );
};

export default WhatWeActedOn;
