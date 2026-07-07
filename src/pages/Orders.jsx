import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PiPlusBold, PiTableBold, PiSquaresFourBold } from "react-icons/pi";
import { useRestaurant } from "../contexts/RestaurantContext";
import { useUI } from "../contexts/UIContext";
import { Card, Button, Badge, SearchInput, Pagination, SectionHeader } from "../components/common/UIKit";
import Table from "../components/common/Table";
import ConfirmDialog from "../components/common/ConfirmDialog";
import OrderStatusBadge, { PAYMENT_STATUS_TONE } from "../components/orders/OrderStatusBadge";
import OrderDrawer from "../components/orders/OrderDrawer";
import NewOrderModal from "../components/orders/NewOrderModal";
import { formatCurrency, timeAgo } from "../utils/format";

const STATUS_FILTERS = ["All", "Pending", "Preparing", "Ready", "Completed", "Cancelled"];
const PAGE_SIZE = 7;

const Orders = () => {
  const { orders, deleteOrder } = useRestaurant();
  const { pushToast } = useUI();
  const location = useLocation();

  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    if (location.state?.openCreate) setCreateOpen(true);
  }, [location.state]);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus = status === "All" || o.status === status;
      const matchesSearch = `${o.id} ${o.customerName}`.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [orders, status, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    { key: "id", header: "Order ID", render: (o) => <span className="font-semibold text-[#0B1F4D]">{o.id}</span> },
    { key: "customerName", header: "Customer" },
    { key: "type", header: "Type", render: (o) => <Badge tone="royal">{o.type}</Badge> },
    { key: "total", header: "Total", render: (o) => formatCurrency(o.total) },
    { key: "status", header: "Status", render: (o) => <OrderStatusBadge status={o.status} /> },
    { key: "paymentStatus", header: "Payment", render: (o) => <Badge tone={PAYMENT_STATUS_TONE[o.paymentStatus]}>{o.paymentStatus}</Badge> },
    { key: "createdAt", header: "Placed", render: (o) => timeAgo(o.createdAt) },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <SectionHeader eyebrow="Live Operations" title="Order Management" />
        <Button icon={PiPlusBold} onClick={() => setCreateOpen(true)}>New Order</Button>
      </div>

      <Card noPadding className="p-4 md:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-5">
          <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by order ID or customer..." className="lg:max-w-xs" />
          <div className="flex gap-2 flex-wrap flex-1">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => { setStatus(s); setPage(1); }}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors ${status === s ? "bg-[#0B1F4D] text-white border-[#0B1F4D]" : "border-gray-200 text-gray-500 hover:border-[#0B1F4D]/40"}`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-1 bg-gray-50 rounded-lg p-1">
            <button onClick={() => setView("table")} className={`w-8 h-8 rounded-md flex items-center justify-center ${view === "table" ? "bg-white shadow-sm text-[#0B1F4D]" : "text-gray-400"}`}><PiTableBold size={15} /></button>
            <button onClick={() => setView("cards")} className={`w-8 h-8 rounded-md flex items-center justify-center ${view === "cards" ? "bg-white shadow-sm text-[#0B1F4D]" : "text-gray-400"}`}><PiSquaresFourBold size={15} /></button>
          </div>
        </div>

        {view === "table" ? (
          <Table columns={columns} rows={paged} onRowClick={setSelected} emptyTitle="No orders match your filters" />
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {paged.map((o) => (
              <div key={o.id} onClick={() => setSelected(o)} className="border border-gray-100 rounded-xl p-4 hover:border-[#C9A227]/50 hover:shadow-md transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-[#0B1F4D]">{o.id}</p>
                  <OrderStatusBadge status={o.status} />
                </div>
                <p className="text-sm text-gray-500 mb-3">{o.customerName} · {o.type}</p>
                <div className="flex justify-between items-center">
                  <span className="font-display font-semibold text-[#0B1F4D]">{formatCurrency(o.total)}</span>
                  <span className="text-xs text-gray-400">{timeAgo(o.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </Card>

      <OrderDrawer order={selected} onClose={() => setSelected(null)} onDelete={(id) => setToDelete(id)} />
      <NewOrderModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Delete this order?"
        message="This action cannot be undone."
        onConfirm={() => { deleteOrder(toDelete); pushToast("Order deleted"); }}
      />
    </div>
  );
};

export default Orders;
