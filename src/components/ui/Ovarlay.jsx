import useModelStore from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

const contentVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const Accordion = ({ title, children, isOpen, toggle }) => (
  <div className="border-b border-gray-300">
    <button
      onClick={toggle}
      className="w-full text-left py-3 px-4 flex justify-between items-center focus:outline-none hover:bg-gray-100 transition-colors"
    >
      <h3 className="~text-lg/xl font-manrope font-semibold text-blue-700">
        {title}
      </h3>
      <span className="text-gray-600">{isOpen ? "−" : "+"}</span>
    </button>
    {isOpen && (
      <div className="px-4 pb-4 text-gray-800 font-text font-light tracking-tight">
        {children}
      </div>
    )}
  </div>
);

export default function Overlay() {
  const { content, setContent } = useModelStore();
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const closeContent = () => {
    setContent(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {content && (
          <motion.div
            key="content-panel"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-[#f5f5f5] p-6 rounded-lg h-[80%] w-[50%] z-50 overflow-clip"
          >
            <div className="flex justify-between p-3 mb-5">
              <h2 className="~text-xl/4xl font-manrope font-bold">
                Brain Model Data
              </h2>
              <motion.button
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeContent}
                className=" text-gray-700 hover:text-red-500 transition-colors"
              >
                <X size={24} />
              </motion.button>
            </div>

            <div className="overflow-y-auto max-h-full flex flex-col space-y-4">
              {content.map((category, index) => (
                <Accordion
                  key={index}
                  title={category.category}
                  isOpen={openAccordion === index}
                  toggle={() => toggleAccordion(index)}
                >
                  {category.items ? (
                    <ul className="space-y-2">
                      {category.items.map((item, i) => (
                        <li key={i}>
                          <strong className="text-teal-600">
                            {item.name}:
                          </strong>{" "}
                          <span className="text-gray-700">
                            {item.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : category.subcategories ? (
                    <div className="space-y-3">
                      {category.subcategories.map((subcat, j) => (
                        <div key={j}>
                          <h4 className="font-semibold text-purple-600">
                            {subcat.name}
                          </h4>
                          <ul className="space-y-1 pl-4">
                            {subcat.items.map((item, k) => (
                              <li key={k}>
                                <strong className="text-teal-600">
                                  {item.name}:
                                </strong>{" "}
                                <span className="text-gray-700">
                                  {item.description}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700">{category.description}</p>
                  )}
                </Accordion>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
