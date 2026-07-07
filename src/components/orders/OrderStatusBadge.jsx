import { Badge } from "../common/UIKit";

export const ORDER_STATUS_TONE = { Pending: "warning", Preparing: "royal", Ready: "gold", Completed: "success", Cancelled: "danger" };
export const PAYMENT_STATUS_TONE = { Pending: "warning", Paid: "success", Failed: "danger", Refunded: "neutral" };

const OrderStatusBadge = ({ status }) => <Badge tone={ORDER_STATUS_TONE[status] || "neutral"}>{status}</Badge>;

export default OrderStatusBadge;
