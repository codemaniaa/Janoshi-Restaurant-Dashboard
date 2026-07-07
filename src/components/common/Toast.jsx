import { AnimatePresence, motion } from "framer-motion";
import { PiCheckCircleBold, PiXCircleBold } from "react-icons/pi";
import { useUI } from "../../contexts/UIContext";

const ToastStack = () => {
  const { toasts } = useUI();
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 items-end">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40 }}
            className="glass-dark text-white rounded-xl px-4 py-3 shadow-xl flex items-center gap-2 text-sm min-w-[220px]"
          >
            {t.tone === "danger" ? <PiXCircleBold className="text-red-400" size={18} /> : <PiCheckCircleBold className="text-[#C9A227]" size={18} />}
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastStack;
