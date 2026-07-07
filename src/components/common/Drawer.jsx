import { AnimatePresence, motion } from "framer-motion";
import { PiXBold } from "react-icons/pi";

const Drawer = ({ open, onClose, title, children, width = "max-w-md" }) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-50 flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#081633]/50 backdrop-blur-[2px]"
        />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={`relative bg-white h-full w-full ${width} shadow-2xl flex flex-col`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h3 className="font-display font-semibold text-[#0B1F4D] text-lg">{title}</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500">
              <PiXBold size={16} />
            </button>
          </div>
          <div className="px-6 py-5 overflow-y-auto flex-1">{children}</div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default Drawer;
