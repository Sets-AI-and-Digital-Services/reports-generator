const WhatWePromised: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 z-0 object-cover object-top w-full h-screen pt-12"
      >
        <source src="/assets/what-promised.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>



      {/* Text Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center py-14">
        {/* Title */}
        <p className="mb-6 text-3xl font-bold md:text-5xl text-primary">
          What We Promised
        </p>

        {/* Subtitle */}
        <p className="max-w-3xl mt-4 text-4xl font-light leading-relaxed md:text-4xl text-subtitle">
          A Functioning Mobility Management System{" "}
          <span className="font-semibold">MVP</span>
          <br />
          During <span className="font-bold">Ramadan</span> in{" "}
          <span className="font-bold">8 Weeks</span>
        </p>
      </div>
    </div>
  );
};

export default WhatWePromised;
