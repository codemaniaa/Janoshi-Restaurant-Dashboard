import Drawer from "../common/Drawer";
import { Badge, Button } from "../common/UIKit";
import OrderStatusBadge, { PAYMENT_STATUS_TONE } from "./OrderStatusBadge";
import { formatCurrency, formatDateTime } from "../../utils/format";
import { useRestaurant } from "../../contexts/RestaurantContext";
import { useUI } from "../../contexts/UIContext";

const FLOW = ["Pending", "Preparing", "Ready", "Completed"];

const OrderDrawer = ({ order, onClose, onDelete }) => {
  const { updateOrderStatus, updatePaymentStatus, staff } = useRestaurant();
  const { pushToast } = useUI();
  if (!order) return null;

  const chef = staff.find((s) => s.id === order.chef);
  const flowIndex = FLOW.indexOf(order.status);

  return (
    <Drawer open={!!order} onClose={onClose} title={order.id} width="max-w-lg">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">{order.type} {order.tableId ? `· Table ${order.tableId.split("-")[1]}` : ""}</p>
            <p className="font-display text-lg font-semibold text-[#0B1F4D]">{order.customerName}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
        {order.status !== "Cancelled" && (
          <div className="flex items-center">
            {FLOW.map((s, i) => (
              <div key={s} className="flex-1 flex items-center">
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className={`w-3 h-3 rounded-full ${i <= flowIndex ? "bg-[#C9A227]" : "bg-gray-200"}`} />
                  <span className={`text-[10px] font-medium ${i <= flowIndex ? "text-[#0B1F4D]" : "text-gray-300"}`}>{s}</span>
                </div>
                {i < FLOW.length - 1 && <div className={`h-0.5 flex-1 -mt-4 ${i < flowIndex ? "bg-[#C9A227]" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          {FLOW.map((s) => (
            <button
              key={s}
              onClick={() => { updateOrderStatus(order.id, s); pushToast(`Order marked ${s}`); }}
              className={`py-2 rounded-lg text-xs font-semibold border ${order.status === s ? "bg-[#0B1F4D] text-white border-[#0B1F4D]" : "border-gray-200 text-gray-500 hover:border-[#0B1F4D]/40"}`}
            >
              {s}
            </button>
          ))}
          <button
            onClick={() => { updateOrderStatus(order.id, "Cancelled"); pushToast("Order cancelled", "danger"); }}
            className={`py-2 rounded-lg text-xs font-semibold border col-span-2 ${order.status === "Cancelled" ? "bg-red-500 text-white border-red-500" : "border-red-200 text-red-500 hover:bg-red-50"}`}
          >
            Cancel Order
          </button>
        </div>

        <div className="border border-gray-100 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Invoice Preview</p>
          <div className="space-y-2 text-sm">
            {order.items.map((i) => (
              <div key={i.menuId} className="flex justify-between">
                <span className="text-gray-600">{i.qty} x {i.name}</span>
                <span className="text-gray-800 font-medium">{formatCurrency(i.qty * i.price)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-dashed border-gray-200 mt-3 pt-3 space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-{formatCurrency(order.discount)}</span></div>}
            <div className="flex justify-between text-gray-500"><span>Tax (5%)</span><span>{formatCurrency(order.tax)}</span></div>
            <div className="flex justify-between font-display text-base font-semibold text-[#0B1F4D] pt-1"><span>Total</span><span>{formatCurrency(order.total)}</span></div>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Payment</p>
          <div className="flex items-center justify-between">
            <Badge tone={PAYMENT_STATUS_TONE[order.paymentStatus]}>{order.paymentStatus} · {order.paymentMethod}</Badge>
            <select
              value={order.paymentStatus}
              onChange={(e) => { updatePaymentStatus(order.id, e.target.value); pushToast("Payment status updated"); }}
              className="text-xs rounded-lg border border-gray-200 px-2.5 py-1.5 outline-none"
            >
              <option>Pending</option><option>Paid</option><option>Failed</option><option>Refunded</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-400">Chef Assigned</p>
            <p className="font-medium text-gray-700">{chef?.name || "Unassigned"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Order Time</p>
            <p className="font-medium text-gray-700">{formatDateTime(order.createdAt)}</p>
          </div>
        </div>

        <Button variant="danger" className="w-full" onClick={() => { onDelete(order.id); onClose(); }}>Delete Order</Button>
      </div>
    </Drawer>
    
  );
};

export default OrderDrawer;
