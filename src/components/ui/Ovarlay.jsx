import useModelStore from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const contentVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export default function Overlay() {
  const { content, setContent } = useModelStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const closeContent = () => {
    setContent(null);
  };

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % content.length);
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + content.length) % content.length);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        {content && (
          <motion.div
            key="content-panel"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-black/20 backdrop-blur-lg p-8 rounded-lg h-[90%] w-[70%] overflow-y-auto"
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="relative flex flex-col h-full">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeContent}
                className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
              >
                <X size={32} />
              </motion.button>

              {/* Content Aligned to the Left */}
              <div className="flex-1 flex flex-col justify-start items-start text-white ">
                <div className="w-full md:pr-20">
                  {/* Heading */}
                  <h2 className="text-4xl md:text-5xl font-headings font-bold mb-6 text-left drop-shadow-md underline">
                    {content[currentIndex].category}
                  </h2>

                  {/* Content Layout */}
                  <div className="text-lg md:text-xl font-manrope font-light tracking-tight text-left drop-shadow-sm">
                    {content[currentIndex].items ? (
                      <>
                        <ol className=" list-inside space-y-3">
                          {content[currentIndex].items.map((item, i) => (
                            <li key={i} className="flex flex-col gap-2 ">
                              <strong className="text-teal-300 font-manrope text-4xl">
                                {item.name}:
                              </strong>
                              <p className="font-text">{item.description}</p>
                            </li>
                          ))}
                        </ol>
                      </>
                    ) : content[currentIndex].subcategories ? (
                      <>
                        {content[currentIndex].subcategories.map(
                          (subcat, j) => (
                            <div key={j} className="mb-6">
                              <h4 className="text-3xl font-semibold text-purple-300 mb-2">
                                {subcat.name}
                              </h4>
                              <ol className="list-decimal list-inside space-y-2">
                                {subcat.items.map((item, k) => (
                                  <li key={k} className="flex flex-col gap-1">
                                    <strong className="text-teal-300 font-manrope text-2xl">
                                      {item.name}:
                                    </strong>
                                    <p className="font-text">
                                      {item.description}
                                    </p>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          )
                        )}
                      </>
                    ) : (
                      <p className="font-text">
                        {content[currentIndex].description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-start mt-6 pl-8 space-x-4">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevItem}
                  className="text-white hover:text-teal-300 transition-colors"
                >
                  <ChevronLeft size={40} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextItem}
                  className="text-white hover:text-teal-300 transition-colors"
                >
                  <ChevronRight size={40} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
