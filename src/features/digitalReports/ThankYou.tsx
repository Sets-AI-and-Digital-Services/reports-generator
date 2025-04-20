import React from "react";

const ThankYou: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center w-full h-screen px-4 overflow-hidden text-center bg-[#dff1ed]">
      {/* Background Grid Image (bottom-aligned) */}
      <div className="absolute inset-0 z-10 bg-white bg-opacity-40" />
      <img
        src="/assets/grid-bg.png" // or .png depending on your file
        alt="grid"
        className="absolute -bottom-64 left-0 object-cover w-full h-full pointer-events-none select-none"
        // style={{ zIndex: -1 }}
      />

      {/* Centered Content */}
      <div className="z-10">
        <p className="mb-6 text-3xl font-bold md:text-7xl text-primary">
          Thank You
        </p>
        <p className="max-w-6xl mx-auto mb-20 text-lg md:text-5xl text-[#939598] font-medium">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        {/* Logo */}
        <img
          src="/assets/madinah-logo.svg"
          alt="Madinah Regional Municipality"
          className="mx-auto w-44 md:w-72"
        />
      </div>
    </section>
  );
};

export default ThankYou;
