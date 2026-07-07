import { motion } from "framer-motion";
import { PiArrowUpRightBold, PiArrowDownRightBold } from "react-icons/pi";
import { Card } from "../common/UIKit";

const StatCard = ({ label, value, icon: Icon, trend, trendUp = true, tint = "royal" }) => {
  const tints = {
    royal: { bg: "bg-[#0B1F4D]", text: "text-white", iconBg: "bg-white/15" },
    cream: { bg: "bg-white", text: "text-[#0B1F4D]", iconBg: "bg-[#0B1F4D]/8" },
  };
  const t = tints[tint];

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Card className={`${t.bg} ${t.text} relative overflow-hidden`}>
        {tint === "royal" && (
          <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-[#C9A227]/10" />
        )}
        <div className="flex items-start justify-between relative">
          <div>
            <p className={`text-xs font-medium ${tint === "royal" ? "text-white/60" : "text-gray-400"}`}>{label}</p>
            <p className="font-display text-2xl font-semibold mt-2">{value}</p>
            {trend && (
              <div className={`flex items-center gap-1 mt-2.5 text-xs font-semibold ${trendUp ? "text-emerald-400" : "text-red-400"}`}>
                {trendUp ? <PiArrowUpRightBold size={13} /> : <PiArrowDownRightBold size={13} />}
                {trend}
              </div>
            )}
          </div>
          {Icon && (
            <div className={`w-10 h-10 rounded-xl ${t.iconBg} flex items-center justify-center`}>
              <Icon size={19} className={tint === "royal" ? "text-[#E4C766]" : "text-[#0B1F4D]"} />
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;
