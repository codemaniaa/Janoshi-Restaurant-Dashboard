import { AnimatePresence, motion } from "framer-motion";
import { PiWarningCircleBold } from "react-icons/pi";
import { Button } from "./UIKit";

const ConfirmDialog = ({ open, onClose, onConfirm, title = "Are you sure?", message, tone = "danger" }) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#081633]/50" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center"
        >
          <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4 ${tone === "danger" ? "bg-red-50 text-red-500" : "bg-amber-50 text-amber-600"}`}>
            <PiWarningCircleBold size={24} />
          </div>
          <h3 className="font-display font-semibold text-lg text-[#0B1F4D]">{title}</h3>
          {message && <p className="text-sm text-gray-500 mt-2">{message}</p>}
          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button variant={tone === "danger" ? "danger" : "primary"} className="flex-1" onClick={() => { onConfirm(); onClose(); }}>
              Confirm
            </Button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default ConfirmDialog;
