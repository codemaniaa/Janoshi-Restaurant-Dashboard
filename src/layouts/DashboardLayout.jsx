import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import ToastStack from "../components/common/Toast";

const DashboardLayout = () => {
  const location = useLocation();
  return (
    <div className="flex min-h-screen bg-[#F4F5F7]">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-7">
          <AnimatePresence mode="wait">
            <motion.div  key={location.pathname}   initial={{ opacity: 0, y: 8 }}   animate={{ opacity: 1, y: 0 }}   exit={{ opacity: 0, y: -8 }}   transition={{ duration: 0.2, ease: "easeOut" }}>
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <ToastStack />
    </div>
  );
};

export default DashboardLayout;
