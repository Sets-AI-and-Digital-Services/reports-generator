const WhatWePromised: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-white">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 z-0 object-cover object-top w-full h-screen pt-12">
        <source src="/assets/what-promised.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Text Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center py-14">
        {/* Title */}
        <p className="mb-6 text-3xl font-bold md:text-5xl text-primary">What We Promised</p>

        {/* Subtitle */}
        <p className="max-w-3xl mt-4 text-4xl font-light leading-relaxed md:text-4xl text-subtitle">
          A Functioning Mobility Management System <span className="font-semibold">MVP</span>
          <br />
          During <span className="font-bold">Ramadan</span> in <span className="font-bold">8 Weeks</span>
        </p>

        <p className="my-16 font-medium text-5xl">Foundations for</p>

        <div className="flex gap-4 text-[#F3FCF6] font-medium text-[2.125rem]">
          <div className="flex flex-col px-2 pt-6 pb-12 items-center gap-5 w-[265px] h-[341px] rounded-[12px] border-[0.74px] border-[#939598] bg-black/25 backdrop-blur-[12px] shadow-[0px_4px_4px_#00000040]">
            <img src="/assets/benefits_1.svg" className="w-32 h-32" />
            <p>Faster Traffic Response</p>
          </div>

          <div className="flex flex-col px-2 pt-6 pb-12 items-center gap-5 w-[265px] h-[341px] rounded-[12px] border-[0.74px] border-[#939598] bg-black/25 backdrop-blur-[12px] shadow-[0px_4px_4px_#00000040]">
            <img src="/assets/benefits_2.svg" className="w-32 h-32" />
            <p>Data-Driven Decision Making</p>
          </div>

          <div className="flex flex-col px-2 pt-6 pb-12 items-center gap-5 w-[265px] h-[341px] rounded-[12px] border-[0.74px] border-[#939598] bg-black/25 backdrop-blur-[12px] shadow-[0px_4px_4px_#00000040]">
            <img src="/assets/benefits_3.svg" className="w-32 h-32" />
            <p>Improved Stakeholder Collaboration</p>
          </div>

          <div className="flex flex-col px-2 pt-6 pb-12 items-center gap-5 w-[265px] h-[341px] rounded-[12px] border-[0.74px] border-[#939598] bg-black/25 backdrop-blur-[12px] shadow-[0px_4px_4px_#00000040]">
            <img src="/assets/benefits_4.svg" className="w-32 h-32" />
            <p>Seamless Visitor Experience</p>
          </div>

          <div className="flex flex-col px-2 pt-6 pb-12 items-center gap-5 w-[265px] h-[341px] rounded-[12px] border-[0.74px] border-[#939598] bg-black/25 backdrop-blur-[12px] shadow-[0px_4px_4px_#00000040]">
            <img src="/assets/benefits_5.svg" className="w-32 h-32" />
            <p>Alignment with Vision 2030</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWePromised;
