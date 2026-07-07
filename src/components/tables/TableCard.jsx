import { PiUsersBold } from "react-icons/pi";

const STATUS_STYLE = {
  Available: "border-emerald-200 bg-emerald-50",
  Occupied: "border-[#0B1F4D]/30 bg-[#0B1F4D]/5",
  Reserved: "border-amber-200 bg-amber-50",
  Cleaning: "border-gray-200 bg-gray-50",
};
const DOT = { Available: "bg-emerald-500", Occupied: "bg-[#0B1F4D]", Reserved: "bg-amber-500", Cleaning: "bg-gray-400" };

const TableCard = ({ table, onClick }) => (
  <button
    onClick={() => onClick(table)}
    className={`rounded-2xl border-2 p-4 text-left w-full hover:shadow-md transition-all ${STATUS_STYLE[table.status]}`}
  >
    <div className="flex items-center justify-between mb-3">
      <span className="font-display font-semibold text-[#0B1F4D] text-lg">T{table.number}</span>
      <span className={`w-2.5 h-2.5 rounded-full ${DOT[table.status]}`} />
    </div>
    <p className="text-xs text-gray-500 flex items-center gap-1"><PiUsersBold size={12} /> {table.capacity} seats</p>
    <p className="text-[11px] text-gray-400 mt-1">{table.section}</p>
    <p className="text-xs font-semibold text-[#0B1F4D] mt-2">{table.status}</p>
  </button>
);

export default TableCard;
