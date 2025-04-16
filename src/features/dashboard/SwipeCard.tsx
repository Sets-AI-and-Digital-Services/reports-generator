interface SwipeCardProps {
  title?: string;
  children: React.ReactNode;
}

const SwipeCard = ({ children }: SwipeCardProps) => (
  <div className="relative flex-shrink-0 w-full overflow-x-hidden snap-center">
    <div className="flex items-center justify-center w-full h-full">
      {children}
    </div>
  </div>
);

export default SwipeCard;
