import { useNavigate } from "react-router-dom";
import { Badge, Card, SectionHeader } from "../common/UIKit";
import { timeAgo, formatCurrency } from "../../utils/format";

const STATUS_TONE = { Pending: "warning", Preparing: "royal", Ready: "gold", Completed: "success", Cancelled: "danger" };

const RecentOrdersList = ({ orders }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <SectionHeader
        eyebrow="Live Feed"
        title="Recent Orders"
        action={<button onClick={() => navigate("/orders")} className="text-xs font-semibold text-[#C9A227]">View all</button>}
      />
      <div className="space-y-1">
        {orders.slice(0, 6).map((o) => (
          <div key={o.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
            <div>
              <p className="text-sm font-semibold text-[#0B1F4D]">{o.id}</p>
              <p className="text-xs text-gray-400">{o.customerName} · {o.type}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{formatCurrency(o.total)}</p>
              <Badge tone={STATUS_TONE[o.status]}>{o.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentOrdersList;
