import { useNavigate } from "react-router-dom";
import { PiPlusBold, PiCalendarPlusBold, PiTagBold, PiChefHatBold } from "react-icons/pi";
import { Card, SectionHeader } from "../common/UIKit";

const ACTIONS = [
  { label: "New Order", icon: PiPlusBold, path: "/orders" },
  { label: "New Booking", icon: PiCalendarPlusBold, path: "/bookings" },
  { label: "Create Offer", icon: PiTagBold, path: "/offers" },
  { label: "Kitchen Board", icon: PiChefHatBold, path: "/kitchen" },
];

const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <SectionHeader eyebrow="Shortcuts" title="Quick Actions" />
      <div className="grid grid-cols-2 gap-3">
        {ACTIONS.map((a) => (
          <button
            key={a.label}
            onClick={() => navigate(a.path, { state: { openCreate: true } })}
            className="flex flex-col items-start gap-2.5 p-4 rounded-xl border border-gray-100 hover:border-[#C9A227]/50 hover:bg-[#C9A227]/[0.04] transition-colors text-left"
          >
            <span className="w-9 h-9 rounded-lg bg-[#0B1F4D]/6 flex items-center justify-center">
              <a.icon size={17} className="text-[#0B1F4D]" />
            </span>
            <span className="text-xs font-semibold text-[#0B1F4D]">{a.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
