import React, { ReactNode } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";

interface DragCloseDrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: ReactNode;
}

const DragCloseDrawer: React.FC<DragCloseDrawerProps> = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    await animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  if (!open) return null;

  return (
    <motion.div
      ref={scope}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm"
    >
      <motion.div
        id="drawer"
        ref={drawerRef}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ ease: "easeInOut" }}
        className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-gray-800 border-t border-gray-700"
        style={{ y }}
        drag="y"
        dragControls={controls}
        onDragEnd={() => {
          if (y.get() >= 100) {
            handleClose();
          }
        }}
        dragListener={false}
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={{
          top: 0,
          bottom: 0.5,
        }}
      >
        <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-gray-800 p-4 border-b border-gray-700">
          <button
            onPointerDown={(e) => {
              controls.start(e);
            }}
            className="h-2 w-14 cursor-grab touch-none rounded-full bg-gray-600 active:cursor-grabbing"
          ></button>
        </div>
        <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DragCloseDrawer;