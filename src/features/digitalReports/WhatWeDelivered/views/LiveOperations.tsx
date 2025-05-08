const LiveOperations = () => {
  return (
    <div className="h-full">
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 z-0 w-full h-full">
        <source src="/assets/live_operations.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LiveOperations;
