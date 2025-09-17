import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 sm:mx-auto sm:w-3/4 ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-3 px-5 transition-all duration-300 hover:bg-slate-200 cursor-pointer"
      >
        <span className="font-semibold capitalize">{title}</span>
        <span className="size-6">{isOpen ? <FiMinus /> : <FiPlus />}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto",  }}
            exit={{ height: 0, }}
            transition={{ duration: 0.5 }}
            className=" text-sm text-gray-600 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
