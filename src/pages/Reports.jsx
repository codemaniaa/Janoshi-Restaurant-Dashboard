import { useState } from "react";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { useRestaurant } from "../contexts/RestaurantContext";
import { Card, Badge, SectionHeader, Button } from "../components/common/UIKit";
import Table from "../components/common/Table";
import RevenueChart from "../components/charts/RevenueChart";
import OrdersChart from "../components/charts/OrdersChart";
import CategoryPie from "../components/charts/CategoryPie";
import { formatCurrency, formatDate } from "../utils/format";

const TABS = ["Revenue", "Sales & Orders", "Inventory", "Menu & Offers", "Staff", "Reservations", "Payments"];

const ExportBtn = () => <Button variant="outline" size="sm" icon={PiDownloadSimpleBold}>Export</Button>;

const Reports = () => {
  const {
    revenueTrend, ordersTrend, categorySales, orders, inventory, menu,
    offers, staff, bookings, payments, kpis,
  } = useRestaurant();
  const [tab, setTab] = useState("Revenue");

  return (
    <div className="space-y-5">
      <SectionHeader eyebrow="Analytics" title="Reports" />

      <div className="flex gap-2 flex-wrap">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors ${tab === t ? "bg-[#0B1F4D] text-white border-[#0B1F4D]" : "border-gray-200 text-gray-500 hover:border-[#0B1F4D]/40"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Revenue" && (
        <div className="grid lg:grid-cols-3 gap-5">
          <Card className="lg:col-span-2">
            <SectionHeader eyebrow="Trend" title="Revenue Report" action={<ExportBtn />} />
            <RevenueChart data={revenueTrend} />
          </Card>
          <Card>
            <SectionHeader eyebrow="Split" title="Category Revenue" />
            <CategoryPie data={categorySales} />
          </Card>
        </div>
      )}

      {tab === "Sales & Orders" && (
        <Card noPadding className="p-5">
          <SectionHeader eyebrow="Volume" title="Orders Report" action={<ExportBtn />} />
          <OrdersChart data={ordersTrend} />
          <div className="mt-5">
            <Table
              columns={[
                { key: "id", header: "Order" }, { key: "customerName", header: "Customer" },
                { key: "status", header: "Status", render: (o) => <Badge tone="royal">{o.status}</Badge> },
                { key: "total", header: "Total", render: (o) => formatCurrency(o.total) },
              ]}
              rows={orders.slice(0, 8)}
            />
          </div>
        </Card>
      )}

      {tab === "Inventory" && (
        <Card noPadding className="p-5">
          <SectionHeader eyebrow="Stock Health" title="Inventory Report" action={<ExportBtn />} />
          <Table
            columns={[
              { key: "name", header: "Ingredient" }, { key: "stock", header: "Stock", render: (i) => `${i.stock} ${i.unit}` },
              { key: "status", header: "Status", render: (i) => <Badge tone={i.stock <= i.threshold ? "danger" : "success"}>{i.stock <= i.threshold ? "Low" : "OK"}</Badge> },
              { key: "value", header: "Stock Value", render: (i) => formatCurrency(i.stock * i.costPerUnit) },
            ]}
            rows={inventory}
          />
        </Card>
      )}

      {tab === "Menu & Offers" && (
        <div className="grid lg:grid-cols-2 gap-5">
          <Card noPadding className="p-5">
            <SectionHeader eyebrow="Catalogue" title="Menu Report" action={<ExportBtn />} />
            <Table columns={[{ key: "name", header: "Item" }, { key: "category", header: "Category" }, { key: "price", header: "Price", render: (m) => formatCurrency(m.price) }]} rows={menu.slice(0, 8)} />
          </Card>
          <Card noPadding className="p-5">
            <SectionHeader eyebrow="Promotions" title="Offers Report" action={<ExportBtn />} />
            <Table columns={[{ key: "title", header: "Offer" }, { key: "status", header: "Status", render: (o) => <Badge tone="gold">{o.status}</Badge> }, { key: "used", header: "Redemptions" }]} rows={offers} />
          </Card>
        </div>
      )}

      {tab === "Staff" && (
        <Card noPadding className="p-5">
          <SectionHeader eyebrow="Team" title="Staff Performance Report" action={<ExportBtn />} />
          <Table columns={[{ key: "name", header: "Employee" }, { key: "role", header: "Role" }, { key: "performance", header: "Performance", render: (s) => `${s.performance}%` }]} rows={staff} />
        </Card>
      )}

      {tab === "Reservations" && (
        <Card noPadding className="p-5">
          <SectionHeader eyebrow="Floor" title="Reservation Report" action={<ExportBtn />} />
          <Table columns={[{ key: "customerName", header: "Customer" }, { key: "guests", header: "Guests" }, { key: "time", header: "Time", render: (b) => formatDate(b.time) }, { key: "status", header: "Status", render: (b) => <Badge tone="royal">{b.status}</Badge> }]} rows={bookings} />
        </Card>
      )}

      {tab === "Payments" && (
        <Card noPadding className="p-5">
          <SectionHeader eyebrow="Finance" title="Payment Report" action={<ExportBtn />} />
          <Table columns={[{ key: "id", header: "Transaction" }, { key: "amount", header: "Amount", render: (p) => formatCurrency(p.amount) }, { key: "method", header: "Method" }, { key: "status", header: "Status", render: (p) => <Badge tone="success">{p.status}</Badge> }]} rows={payments.slice(0, 8)} />
        </Card>
      )}
    </div>
  );
};

export default Reports;
