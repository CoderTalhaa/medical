import useModelStore from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import ChangeModel from "./ChangeModel";
import { X } from "lucide-react";
const contentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } },
};

const overlayVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, transition: { duration: 0.4, ease: "easeIn" } },
};

export default function Ovarlay() {
  const {
    content,
    setContent,
    spread,
    setSpread,
    setCameraPosition,
    currentModel,
  } = useModelStore();

  const resetCamera = () => {
    setCameraPosition([3, 1.5, 4], [0, 0.5, 0]);
  };

  const closeContent = () => {
    setContent(null);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentModel.name}
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 bg-transparent"
      >
        <ChangeModel />

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          {content && (
            <motion.div
              key={content.heading}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-28 left-5 bg-slate-100 text-text2 p-6 rounded-lg h-[80%] max-w-[400px]"
            >
              <motion.button
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeContent}
                className="absolute top-2 right-2"
              >
                <X />
              </motion.button>
              <div className="overflow-y-auto max-h-full flex flex-col gap-2">
                <h2
                  className="~text-xl/4xl font-headings"
                  style={{ color: currentModel.color }}
                >
                  {content.heading}
                </h2>
                <p className="text-xl font-text font-light pl-1 tracking-tight">
                  {content.text}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls on Right */}
        <motion.div className="absolute bottom-5 right-5 p-3 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm rounded-lg flex flex-col gap-2">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-text text-white">Spread</span>
              <span className="font-text text-white">
                {(spread * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={spread}
              onChange={(e) => setSpread(parseFloat(e.target.value))}
              style={{
                width: "200px",
                height: "20px",
                cursor: "pointer",
                accentColor: "#ff7e5f",
                WebkitAppearance: "none",
                appearance: "none",
                background:
                  "linear-gradient(to right, #ff7e5f 0%, #ff7e5f " +
                  spread * 100 +
                  "%, #444 " +
                  spread * 100 +
                  "%, #444 100%)",
                outline: "none",
                borderRadius: "5px",
                height: "8px",
              }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetCamera}
            style={{
              padding: "10px 20px",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Reset Camera
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
