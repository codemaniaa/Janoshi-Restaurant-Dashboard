import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { PiCaretLineLeftBold } from "react-icons/pi";
import { NAV_ITEMS } from "../../constants/navigation";
import { useUI } from "../../contexts/UIContext";
import Logo from "../common/Logo";
import {
  PiListBold,
  PiSidebarSimpleBold,
} from "react-icons/pi";
const Sidebar = () => {
  const { collapsed, toggleCollapsed, mobileOpen, setMobileOpen } = useUI();

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <motion.aside
        animate={{ width: collapsed ? 84 : 264 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={`fixed lg:sticky top-0 h-screen z-50 bg-[#0B1F4D] flex flex-col shrink-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} transition-transform duration-300`}
      >
        <div className="h-20 flex items-center px-5 border-b border-white/10">
          <Logo dark withText={!collapsed} size={38} />
        </div>

        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1">
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
            <NavLink key={path} to={path} end={path === "/"} onClick={() => setMobileOpen(false)} className={({ isActive }) =>
                `group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive ? "bg-white/10 text-white" : "text-white/55 hover:text-white hover:bg-white/5"}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span layoutId="active-pill" className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-[#C9A227]" />
                  )}
                  <Icon size={19} className={isActive ? "text-[#E4C766]" : ""} />
                  {!collapsed && <span className="truncate">{label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="ml-5">
          <button onClick={toggleCollapsed} className="hidden lg:flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] active:scale-95">
            <span className="relative flex items-center justify-center">
          {collapsed ? (
            <PiListBold
              size={20}
              className="transition-all duration-300 animate-in fade-in zoom-in"
            />
          ) : (
            <PiSidebarSimpleBold size={20}  className="transition-all duration-300 animate-in fade-in zoom-in"/>
          )}
        </span>

   </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
