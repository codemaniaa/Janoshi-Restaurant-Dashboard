import { useState, useMemo } from "react";
import { PiWalletBold } from "react-icons/pi";
import { useRestaurant } from "../contexts/RestaurantContext";
import { useUI } from "../contexts/UIContext";
import { Card, Badge, SearchInput, Pagination, SectionHeader } from "../components/common/UIKit";
import Table from "../components/common/Table";
import { PAYMENT_STATUS_TONE } from "../components/orders/OrderStatusBadge";
import { formatCurrency, formatDateTime } from "../utils/format";

const METHODS = ["All", "Cash", "Card", "Online"];
const STATUSES = ["All", "Pending", "Paid", "Failed", "Refunded"];
const PAGE_SIZE = 8;

const Payments = () => {
  const { payments, updatePaymentStatus } = useRestaurant();
  const { pushToast } = useUI();

  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return payments.filter((p) =>
      (method === "All" || p.method === method) &&
      (status === "All" || p.status === status) &&
      `${p.id} ${p.orderId} ${p.customerName || ""}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [payments, method, status, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalCollected = payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);

  const columns = [
    { key: "id", header: "Transaction", render: (p) => <span className="font-semibold text-[#0B1F4D]">{p.id}</span> },
    { key: "orderId", header: "Order", render: (p) => <span className="text-gray-500">{p.orderId}</span> },
    { key: "amount", header: "Amount", render: (p) => formatCurrency(p.amount) },
    { key: "method", header: "Method", render: (p) => <Badge tone="royal">{p.method}</Badge> },
    { key: "status", header: "Status", render: (p) => (
      <select
        value={p.status}
        onChange={(e) => { if (p.orderId) { updatePaymentStatus(p.orderId, e.target.value); pushToast("Payment status updated"); } }}
        className="text-xs rounded-lg border border-gray-200 px-2 py-1.5 outline-none bg-transparent"
      >
        {["Pending", "Paid", "Failed", "Refunded"].map((s) => <option key={s}>{s}</option>)}
      </select>
    )},
    { key: "date", header: "Date", render: (p) => formatDateTime(p.date) },
  ];

  return (
    <div className="space-y-5">
      <SectionHeader eyebrow="Finance" title="Payment Management" />

      <Card className="bg-[#0B1F4D] text-white flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center"><PiWalletBold size={20} className="text-[#E4C766]" /></div>
        <div>
          <p className="text-xs text-white/60">Total Collected</p>
          <p className="font-display text-xl font-semibold">{formatCurrency(totalCollected)}</p>
        </div>
      </Card>

      <Card noPadding className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-3 mb-5">
          <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search transactions..." className="lg:max-w-xs" />
          <div className="flex gap-2 flex-wrap">
            {METHODS.map((m) => (
              <button key={m} onClick={() => { setMethod(m); setPage(1); }} className={`px-3.5 py-2 rounded-lg text-xs font-semibold border ${method === m ? "bg-[#0B1F4D] text-white border-[#0B1F4D]" : "border-gray-200 text-gray-500"}`}>{m}</button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {STATUSES.map((s) => (
              <button key={s} onClick={() => { setStatus(s); setPage(1); }} className={`px-3.5 py-2 rounded-lg text-xs font-semibold border ${status === s ? "bg-[#C9A227] text-[#0B1F4D] border-[#C9A227]" : "border-gray-200 text-gray-500"}`}>{s}</button>
            ))}
          </div>
        </div>
        <Table columns={columns} rows={paged} emptyTitle="No transactions found" />
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </Card>
    </div>
  );
};

export default Payments;
