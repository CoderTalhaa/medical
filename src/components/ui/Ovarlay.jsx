// src/Overlay.jsx
import useModelStore from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

const contentVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export default function Overlay() {
  const { content, setContent } = useModelStore();

  const closeContent = () => {
    setContent(null);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ zIndex: content ? 50 : 0 }}
    >
      <AnimatePresence mode="wait">
        {content && (
          <motion.div
            key="content-panel"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-stone-900 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 backdrop-saturate-100 backdrop-contrast-100 p-8 rounded-lg h-[90%] w-[90%] overflow-y-auto"
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="relative flex flex-col h-full px-5">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeContent}
                className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors z-10"
              >
                <X size={32} />
              </motion.button>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-start items-start text-white">
                <div className="w-full">
                  <h2 className="text-4xl md:text-5xl font-headings font-bold mb-6 text-left drop-shadow-md underline">
                    {content[0].category}
                  </h2>
                  <div className="text-lg md:text-xl text-left drop-shadow-sm">
                    {content[0].items ? (
                      <>
                        <ol className="list-inside space-y-3">
                          {content[0].items.map((item, i) => (
                            <li key={i} className="flex flex-col gap-2">
                              <div className="flex justify-center items-center w-full">
                                {item.img && (
                                  <div className="w-80 pb-5">
                                    <Image
                                      alt="logo"
                                      src={item.img}
                                      width={1000}
                                      height={1000}
                                    />
                                  </div>
                                )}
                              </div>
                              <strong className="text-teal-300 font-headings font-semibold text-2xl">
                                {item.name}:
                              </strong>
                              {item.challengeOwner && (
                                <p className="font-text text-purple-300">
                                  Challenge Owner:
                                  <span className="text-stone-100 font-semibold font-manrope">
                                    {" "}
                                    {item.challengeOwner}
                                  </span>
                                </p>
                              )}
                              <p className="font-text">{item.description}</p>
                            </li>
                          ))}
                        </ol>
                        {content[0].description && (
                          <p className="font-text ~text-xl/4xl mt-20 text-center text-teal-200">
                            {content[0].description}
                          </p>
                        )}
                      </>
                    ) : content[0].subcategories ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {content[0].subcategories.map((subcat, j) => (
                          <div
                            key={j}
                            className="bg-stone-800 bg-opacity-50 p-4 rounded-md"
                          >
                            <h4 className="text-2xl font-semibold text-purple-300 mb-3 underline">
                              {subcat.name}
                            </h4>
                            <ol className="list-decimal list-inside space-y-2">
                              {subcat.items.map((item, k) => (
                                <li key={k} className="flex flex-col gap-1">
                                  <strong className="text-teal-300 font-manrope text-xl">
                                    {item.name}:
                                  </strong>
                                  {item.img && (
                                    <Image
                                      src={item.img}
                                      alt={item.name}
                                      width={100}
                                      height={100}
                                      className="w-20"
                                    />
                                  )}
                                  <p className="font-text text-sm md:text-base">
                                    {item.description}
                                  </p>
                                </li>
                              ))}
                            </ol>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        {content[0].title && (
                          <h3 className="text-2xl md:text-3xl font-headings font-semibold mb-4 text-teal-300">
                            {content[0].title}
                          </h3>
                        )}
                        <p className="font-text">{content[0].description}</p>
                        {content[0].panelists && (
                          <div className="mt-8">
                            <h4 className="text-xl font-semibold text-purple-300 mb-16">
                              Panelists:
                            </h4>
                            <ul className="flex justify-evenly">
                              {content[0].panelists.map((panelist, i) => (
                                <div
                                  key={i}
                                  className="flex flex-col items-center text-center"
                                >
                                  <div className="w-36 h-36 mb-2">
                                    <Image
                                      src={"/img/user.png"}
                                      width={100}
                                      height={100}
                                      alt="panelist image"
                                      className="rounded-full"
                                    />
                                  </div>
                                  <p className="font-semibold font-text">
                                    {panelist.name}
                                  </p>
                                  <p className="font-manrope text-sm max-w-60">
                                    {panelist.position}
                                  </p>
                                </div>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
