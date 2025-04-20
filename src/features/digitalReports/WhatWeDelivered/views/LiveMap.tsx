const LiveMap = () => {
  return (
    <div className="h-full">
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 z-0 object-cover object-top w-full h-full">
        <source src="/assets/live_map.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LiveMap;
