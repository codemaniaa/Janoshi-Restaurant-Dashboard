import {
  PiWalletBold, PiClipboardTextBold, PiChartLineUpBold, PiReceiptBold,
  PiTimerBold, PiCheckCircleBold, PiXCircleBold, PiChefHatBold,
  PiArmchairBold, PiTableBold, PiCalendarCheckBold, PiWarningBold,
} from "react-icons/pi";
import { useRestaurant } from "../contexts/RestaurantContext";
import { useUI } from "../contexts/UIContext";
import StatCard from "../components/dashboard/StatCard";
import ChartCard from "../components/dashboard/ChartCard";
import RecentOrdersList from "../components/dashboard/RecentOrdersList";
import RecentActivityFeed from "../components/dashboard/RecentActivityFeed";
import QuickActions from "../components/dashboard/QuickActions";
import TopSellingList from "../components/dashboard/TopSellingList";
import RevenueChart from "../components/charts/RevenueChart";
import OrdersChart from "../components/charts/OrdersChart";
import CategoryPie from "../components/charts/CategoryPie";
import PaymentDistribution from "../components/charts/PaymentDistribution";
import { Card, Badge, SectionHeader } from "../components/common/UIKit";
import { formatCurrency } from "../utils/format";

const Dashboard = () => {
  const {
    kpis, revenueTrend, ordersTrend, categorySales, paymentDistribution,
    topSelling, orders, recentActivity, lowStockItems, offers,
  } = useRestaurant();
  const { pushToast } = useUI();

  const activeOffers = offers.filter((o) => o.status === "Active");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#C9A227] font-semibold mb-1">Welcome back</p>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#0B1F4D]">Janoshi · Okara Dashboard</h1>
        </div>
        {lowStockItems.length > 0 && (
          <button onClick={() => pushToast(`${lowStockItems.length} ingredients need restocking`, "danger")}>
            <Badge tone="danger" className="text-[12px] px-3 py-1.5">
              <PiWarningBold size={13} /> {lowStockItems.length} Low Stock Alerts
            </Badge>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard tint="royal" label="Today's Revenue" value={formatCurrency(kpis.todayRevenue)} icon={PiWalletBold} trend="8.2% vs yesterday" />
        <StatCard label="Today's Orders" value={kpis.todayOrders} icon={PiClipboardTextBold} trend="5 new orders" />
        <StatCard label="Weekly Revenue" value={formatCurrency(kpis.weekRevenue)} icon={PiChartLineUpBold} trend="12.4% growth" />
        <StatCard label="Avg. Order Value" value={formatCurrency(kpis.avgOrderValue)} icon={PiReceiptBold} trend="steady" trendUp={false} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard tint="cream" label="Pending Orders" value={kpis.pendingOrders} icon={PiTimerBold} />
        <StatCard tint="cream" label="Completed Orders" value={kpis.completedOrders} icon={PiCheckCircleBold} />
        <StatCard tint="cream" label="Cancelled Orders" value={kpis.cancelledOrders} icon={PiXCircleBold} />
        <StatCard tint="cream" label="Monthly Revenue" value={formatCurrency(kpis.monthRevenue)} icon={PiChartLineUpBold} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard tint="cream" label="Available Tables" value={kpis.availableTables} icon={PiArmchairBold} />
        <StatCard tint="cream" label="Occupied Tables" value={kpis.occupiedTables} icon={PiTableBold} />
        <StatCard tint="cream" label="Reservations" value={kpis.reservations} icon={PiCalendarCheckBold} />
        <StatCard tint="cream" label="Kitchen Load" value={`${kpis.preparingOrders} active`} icon={PiChefHatBold} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard eyebrow="Last 7 Days" title="Revenue Trend" className="lg:col-span-2">
          <RevenueChart data={revenueTrend} />
        </ChartCard>
        <ChartCard eyebrow="Breakdown" title="Category Sales">
          <CategoryPie data={categorySales} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ChartCard eyebrow="Last 7 Days" title="Orders Volume">
          <OrdersChart data={ordersTrend} />
        </ChartCard>
        <ChartCard eyebrow="Methods" title="Payment Distribution">
          <PaymentDistribution data={paymentDistribution} />
        </ChartCard>
        <TopSellingList items={topSelling} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <RecentOrdersList orders={orders} />
        <RecentActivityFeed activities={recentActivity} />
        <div className="space-y-5">
          <QuickActions />
          <Card>
            <SectionHeader eyebrow="Marketing" title="Offers Performance" />
            <div className="space-y-3">
              {activeOffers.slice(0, 3).map((o) => (
                <div key={o.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-700">{o.title}</p>
                    <p className="text-xs text-gray-400">{o.code}</p>
                  </div>
                  <Badge tone="gold">{o.used} used</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
