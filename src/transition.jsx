import { motion } from "framer-motion";

const transition = (OgComponent) => {
  const TransitionComponent = () => (
    <>
      <OgComponent />
      <motion.div
        className="slide-out"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );

  return TransitionComponent;
};

export default transition;
