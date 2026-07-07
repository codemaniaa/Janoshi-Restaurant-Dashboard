import { PiPencilSimpleBold, PiTrashBold, PiPhoneBold } from "react-icons/pi";
import { Avatar, Badge, Card } from "../common/UIKit";
import { formatCurrency } from "../../utils/format";

const STATUS_TONE = { "On Shift": "success", "On Break": "warning", "On Delivery": "royal", "Off Duty": "neutral" };

const StaffCard = ({ member, onEdit, onDelete }) => (
  <Card className="relative">
    <div className="flex justify-between items-start mb-3">
      <Avatar name={member.name} color={member.color} size={44} />
      <div className="flex gap-2">
        <button onClick={() => onEdit(member)} className="text-[#0B1F4D]"><PiPencilSimpleBold size={15} /></button>
        <button onClick={() => onDelete(member.id)} className="text-red-500"><PiTrashBold size={15} /></button>
      </div>
    </div>
    <p className="font-display font-semibold text-[#0B1F4D]">{member.name}</p>
    <p className="text-xs text-gray-400 mb-2">{member.role}</p>
    <Badge tone={STATUS_TONE[member.status]}>{member.status}</Badge>

    <div className="mt-4 space-y-2 text-xs text-gray-500">
      <div className="flex justify-between"><span>Shift</span><span className="font-medium text-gray-700">{member.shift}</span></div>
      <div className="flex justify-between"><span>Salary</span><span className="font-medium text-gray-700">{formatCurrency(member.salary)}</span></div>
      <div className="flex justify-between items-center"><span>Performance</span><span className="font-medium text-gray-700">{member.performance}%</span></div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#0B1F4D] to-[#C9A227]" style={{ width: `${member.performance}%` }} />
      </div>
    </div>

    <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-3 pt-3 border-t border-gray-50">
      <PiPhoneBold size={12} /> {member.phone}
    </div>
  </Card>
);

export default StaffCard;
