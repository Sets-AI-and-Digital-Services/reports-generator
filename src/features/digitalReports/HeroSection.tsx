import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 z-0 object-cover w-full h-full"
      >
        <source src="/assets/banner-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black bg-opacity-50" />

      {/* Top-right Logo */}
      <img
        src="/assets/banner-logo.svg"
        alt="Madinah Logo"
        className="absolute z-30 top-6 right-6 w-36 md:w-48"
      />

      {/* Centered Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          Madinah Mobility <br /> Management Center
        </h1>
      </motion.div>

      {/* Scroll Indicator - Mouse Style */}
      <motion.button
        onClick={handleScrollClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute z-20 flex flex-col items-center justify-center transform -translate-x-1/2 animate-bounce bottom-8 left-1/2 focus:outline-none"
      >
        <div className="relative flex items-center justify-center w-10 h-16 border-2 border-white rounded-full">
          <img
            src="/assets/vector.svg"
            alt="Scroll Arrow"
            className="absolute object-contain w-4 bottom-3"
          />
        </div>
        <p className="mt-2 text-xs tracking-widest text-white uppercase">Scroll</p>
      </motion.button>
    </div>
  );
};

export default HeroSection;
