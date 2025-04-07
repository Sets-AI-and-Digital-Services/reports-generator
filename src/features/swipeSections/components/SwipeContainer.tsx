import { useRef } from "react";
import useDraggableScroll from "use-draggable-scroll";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SwipeContainer = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { onMouseDown } = useDraggableScroll(ref);

  const scrollByCard = (direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = window.innerWidth;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      <button
        onClick={() => scrollByCard("left")}
        className="absolute z-10 left-2 top-1/2 transform -translate-y-1/2 bg-neutral-800 p-2 rounded-full hover:bg-neutral-700"
      >
        <ArrowLeft size={24} />
      </button>
      <button
        onClick={() => scrollByCard("right")}
        className="absolute z-10 right-2 top-1/2 transform -translate-y-1/2 bg-neutral-800 p-2 rounded-full hover:bg-neutral-700"
      >
        <ArrowRight size={24} />
      </button>

      <div
        ref={ref}
        onMouseDown={onMouseDown}
        className="flex overflow-x-auto overflow-y-hidden  scroll-smooth snap-x snap-mandatory"
      >
        {children}
      </div>
    </div>
  );
};

export default SwipeContainer;
