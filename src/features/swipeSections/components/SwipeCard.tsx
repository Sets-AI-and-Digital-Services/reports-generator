interface SwipeCardProps {
  title?: string;
  children: React.ReactNode;
}

const SwipeCard = ({ title, children }: SwipeCardProps) => (
  <div className="relative flex-shrink-0 w-screen h-screen snap-center">
    <div className="w-full h-full">{children}</div>
  </div>
);

export default SwipeCard;
