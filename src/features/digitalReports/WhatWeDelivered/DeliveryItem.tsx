import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

const DeliveryItem: React.FC<Props> = ({
  title,
  description,
  active,
  onClick,
}) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 1.06 }}
    whileHover={{ scale: 1.06 }}
    initial={false}
    animate={{ scale: active ? 1.06 : 1 }}
    transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}
    className={`text-left p-4 rounded-xl shadow w-full transition-all duration-200 ${
      active ? "bg-primary text-white" : "bg-white text-subtitle"
    }`}
  >
    <p
      className={`font-medium text-xl mb-1 ${
        active ? "text-white" : "text-primary"
      }`}
    >
      {title}
    </p>
    <p className="text-base leading-snug">{description}</p>
  </motion.button>
);

export default DeliveryItem;
