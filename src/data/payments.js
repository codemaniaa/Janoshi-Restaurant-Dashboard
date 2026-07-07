// Payment records are derived primarily from orders at runtime inside the context,
// this file seeds a few standalone historical/refund transactions.
export const initialStandalonePayments = [
  { id: "PAY-9001", orderId: "ORD-3008", amount: 1200, method: "Online", status: "Refunded", date: "2026-07-05T14:30:00" },
];
