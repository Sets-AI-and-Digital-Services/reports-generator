import { useEffect, useRef, useState } from "react";
import useDraggableScroll from "use-draggable-scroll";
import left_arrow from "../../../public/assets/left_arrow.svg";
import right_arrow from "../../../public/assets/right_arrow.svg";

const SwipeContainer = ({ children, setCurrentSlide }: { children: React.ReactNode; setCurrentSlide: (index: number) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { onMouseDown } = useDraggableScroll(ref as React.RefObject<HTMLElement>);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scrollByCard = (direction: "left" | "right") => {
    if (ref.current) {
      const cardWidth = ref.current?.firstElementChild?.clientWidth || window.innerWidth;
      ref.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, offsetWidth } = ref.current;
      setIsAtStart(ref.current.scrollLeft <= 0);
      setIsAtEnd(ref.current.scrollLeft + ref.current.offsetWidth >= ref.current.scrollWidth);
      const currentIndex = Math.round(scrollLeft / offsetWidth);
      setCurrentSlide(currentIndex);
    }
  };

  useEffect(() => {
    const container = ref.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div data-no-scroll className="relative w-full">
      {!isAtStart && (
        <button onClick={() => scrollByCard("left")} className="absolute z-10 p-2 transform -translate-y-1/2 rounded-full left-2 top-1/2">
          <img src={left_arrow} width={24} />
        </button>
      )}
      {!isAtEnd && (
        <button onClick={() => scrollByCard("right")} className="absolute z-10 p-2 transform -translate-y-1/2 rounded-full right-2 top-1/2">
          <img src={right_arrow} width={24} />
        </button>
      )}

      <div ref={ref} onMouseDown={onMouseDown} className="flex overflow-hidden overflow-y-hidden scroll-smooth snap-x snap-mandatory">
        {children}
      </div>
    </div>
  );
};

export default SwipeContainer;
