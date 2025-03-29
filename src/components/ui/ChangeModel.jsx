import useModelStore from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ChangeModel() {
  const { models, currentModel, setCurrentModel } = useModelStore();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };
  return (
    <div className="absolute right-5 top-28 ">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-text text-white font-text rounded-lg focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        Select Organ:{" "}
        <span
          className="font-bold uppercase font-manrope "
          style={{ color: currentModel.color }}
        >
          {currentModel.name}
        </span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute left-0 mt-2 w-full bg-text text-white rounded-md shadow-lg "
          >
            {models.map((model, index) => (
              <motion.div
                key={model.name}
                whileHover={{ backgroundColor: "rgba(0, 0,150, 0.5)" }}
                className="px-4 py-2 flex items-center  uppercase cursor-pointer gap-1"
                style={{ color: model.color }}
                onClick={() => {
                  setCurrentModel(model.name);
                  setIsOpen(false);
                }}
              >
                <span className="font-bungee text-sm">{index + 1}:</span>
                <span className="font-manrope font-bold">{model.name}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
