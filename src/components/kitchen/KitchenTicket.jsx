import { PiTimerBold } from "react-icons/pi";
import { Badge } from "../common/UIKit";
import { timeAgo } from "../../utils/format";
import { useRestaurant } from "../../contexts/RestaurantContext";

const KitchenTicket = ({ order, onDragStart }) => {
  const { staff, assignChef } = useRestaurant();
  const minsOld = Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 60000);
  const priority = minsOld > 20 ? "danger" : minsOld > 10 ? "warning" : "success";
  const priorityLabel = minsOld > 20 ? "Urgent" : minsOld > 10 ? "Attention" : "On Track";

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, order.id)}
      className="bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-sm text-[#0B1F4D]">{order.id}</span>
        <Badge tone={priority}>{priorityLabel}</Badge>
      </div>
      <p className="text-xs text-gray-400 mb-2">{order.type} {order.tableId ? `· T${order.tableId.split("-")[1]}` : ""}</p>
      <ul className="text-xs text-gray-600 space-y-0.5 mb-3">
        {order.items.map((i) => <li key={i.menuId}>{i.qty}x {i.name}</li>)}
      </ul>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-[11px] text-gray-400"><PiTimerBold size={12} /> {timeAgo(order.createdAt)}</span>
        <select
          value={order.chef || ""}
          onChange={(e) => assignChef(order.id, e.target.value || null)}
          className="text-[11px] rounded-md border border-gray-200 px-1.5 py-1 outline-none max-w-[110px]"
        >
          <option value="">Unassigned</option>
          {staff.filter((s) => s.role.includes("Chef")).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
    </div>
  );
};

export default KitchenTicket;
