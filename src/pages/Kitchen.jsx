import { useState } from "react";
import { useRestaurant } from "../contexts/RestaurantContext";
import { useUI } from "../contexts/UIContext";
import { SectionHeader, Badge } from "../components/common/UIKit";
import KitchenTicket from "../components/kitchen/KitchenTicket";

const COLUMNS = ["Pending", "Preparing", "Ready", "Completed"];
const COLUMN_TONE = { Pending: "warning", Preparing: "royal", Ready: "gold", Completed: "success" };

const Kitchen = () => {
  const { orders, updateOrderStatus } = useRestaurant();
  const { pushToast } = useUI();
  const [dragId, setDragId] = useState(null);

  const active = orders.filter((o) => o.status !== "Cancelled");

  const handleDrop = (e, status) => {
    e.preventDefault();
    if (dragId) {
      updateOrderStatus(dragId, status);
      pushToast(`${dragId} moved to ${status}`);
      setDragId(null);
    }
  };

  return (
    <div className="space-y-5">
      <SectionHeader eyebrow="Live Board" title="Kitchen Management" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const items = active.filter((o) => o.status === col);
          return (
            <div
              key={col}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, col)}
              className="bg-white rounded-2xl border border-gray-100 p-4 min-h-[420px]"
            >
              <div className="flex items-center justify-between mb-4">
                <Badge tone={COLUMN_TONE[col]}>{col}</Badge>
                <span className="text-xs text-gray-400">{items.length} orders</span>
              </div>
              <div className="space-y-3">
                {items.map((o) => (
                  <KitchenTicket key={o.id} order={o} onDragStart={(e, id) => setDragId(id)} />
                ))}
                {items.length === 0 && <p className="text-xs text-gray-300 text-center py-8">Drop orders here</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Kitchen;
