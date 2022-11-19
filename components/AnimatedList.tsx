import { AnimatePresence, motion, usePresence } from "framer-motion";

interface AnimatedListProps {
  children: React.ReactNode;
}

type AnimatedListItemProps = AnimatedListProps;

const AnimatedList = ({ children }: AnimatedListProps) => (
  <AnimatePresence initial={false}>{children}</AnimatePresence>
);

const AnimatedListItem = ({ children }: AnimatedListItemProps) => {
  const [isPresent, safeToRemove] = usePresence();

  return (
    <div className="relative">
      <motion.div
        layout
        initial="out"
        style={{
          position: isPresent ? "static" : "absolute",
          originY: 0,
          width: "100%",
        }}
        variants={{
          in: { scaleY: 1, opacity: 1 },
          out: { scaleY: 0, opacity: 0, zIndex: -1 },
        }}
        animate={isPresent ? "in" : "out"}
        onAnimationComplete={() => !isPresent && safeToRemove()}
      >
        {children}
      </motion.div>
    </div>
  );
};

AnimatedList.Item = AnimatedListItem;

export default AnimatedList;
