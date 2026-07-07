import { motion } from "framer-motion";
import Logo from "../components/common/Logo";

const Splash = () => (
  <div className="min-h-screen bg-[#0B1F4D] flex items-center justify-center relative overflow-hidden">
    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C9A227]/10 blur-3xl" />
    <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#C9A227]/10 blur-3xl" />
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center relative"
    >
      <Logo size={72} withText={false} />
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="font-display text-3xl font-semibold text-white mt-6 tracking-wide"
      >
        Janoshi
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-[#E4C766] text-xs uppercase tracking-[0.3em] mt-2"
      >
        Okara · Restaurant OS
      </motion.p>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 1.1, ease: "easeInOut" }}
        className="h-[2px] w-40 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent mt-8 origin-left"
      />
    </motion.div>
  </div>
);

export default Splash;
