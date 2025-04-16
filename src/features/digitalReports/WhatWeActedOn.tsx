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

  return (
    <section
      className="w-full px-4 py-16 bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/assets/actedonBackground.png')",
      }}
    >
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        {/* Title */}
        <p className="mb-6 text-3xl font-bold md:text-5xl text-primary">
          What We Acted On
        </p>

        {/* Combined Image */}
        <div className="p-4 mb-12 overflow-hidden bg-white shadow rounded-xl">
          <img
            src="/assets/actedon.png"
            alt="What We Acted On"
            className="object-cover w-full h-auto"
          />
        </div>

        {/* Stats */}
        <div className="grid max-w-5xl grid-cols-1 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-white shadow-md rounded-xl"
            >
              <p className="text-2xl font-bold text-primary md:text-3xl whitespace-nowrap">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2}
                    suffix={stat.suffix || ""}
                  />
                ) : (
                  "0"
                )}
              </p>
              <p className="text-sm font-medium leading-snug text-start text-subtitle md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeActedOn;
