import { AnimatePresence, motion } from "framer-motion";
import { PiXBold } from "react-icons/pi";

const Modal = ({ open, onClose, title, children, width = "max-w-lg" }) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#081633]/50 backdrop-blur-[2px]"
        />
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`relative bg-white rounded-2xl shadow-2xl w-full ${width} max-h-[88vh] overflow-hidden flex flex-col`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-display font-semibold text-[#0B1F4D] text-lg">{title}</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500">
              <PiXBold size={16} />
            </button>
          </div>
          <div className="px-6 py-5 overflow-y-auto">{children}</div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default Modal;
