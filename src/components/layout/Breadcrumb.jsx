import { useLocation } from "react-router-dom";
import { NAV_ITEMS } from "../../constants/navigation";

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const current = NAV_ITEMS.find((n) => (n.path === "/" ? pathname === "/" : pathname.startsWith(n.path)));
  return (
    <div className="hidden md:flex items-center gap-2 text-sm">
      <span className="text-gray-400">Janoshi</span>
      <span className="text-gray-300">/</span>
      <span className="text-[#0B1F4D] font-semibold">{current?.label || "Dashboard"}</span>
    </div>
  );
};

export default Breadcrumb;
