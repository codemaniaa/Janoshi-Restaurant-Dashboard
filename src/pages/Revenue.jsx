import { PiTrendUpBold, PiTrendDownBold } from "react-icons/pi";
import { useRestaurant } from "../contexts/RestaurantContext";
import { Card, Badge, SectionHeader } from "../components/common/UIKit";
import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/charts/RevenueChart";
import CategoryPie from "../components/charts/CategoryPie";
import TopSellingList from "../components/dashboard/TopSellingList";
import { formatCurrency } from "../utils/format";

const Revenue = () => {
  const { kpis, revenueTrend, categorySales, topSelling, offers, orders } = useRestaurant();

  const yearlyRevenue = kpis.monthRevenue * 12;
  const estimatedExpenses = Math.round(kpis.monthRevenue * 0.42);
  const profit = kpis.monthRevenue - estimatedExpenses;
  const topDeals = [...offers].sort((a, b) => b.used - a.used).slice(0, 4);

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Financials" title="Revenue Stats" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard tint="royal" label="Today's Revenue" value={formatCurrency(kpis.todayRevenue)} icon={PiTrendUpBold} />
        <StatCard tint="cream" label="Weekly Revenue" value={formatCurrency(kpis.weekRevenue)} icon={PiTrendUpBold} />
        <StatCard tint="cream" label="Monthly Revenue" value={formatCurrency(kpis.monthRevenue)} icon={PiTrendUpBold} />
        <StatCard tint="cream" label="Yearly Projection" value={formatCurrency(yearlyRevenue)} icon={PiTrendUpBold} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard tint="cream" label="Estimated Profit" value={formatCurrency(profit)} icon={PiTrendUpBold} />
        <StatCard tint="cream" label="Estimated Expenses" value={formatCurrency(estimatedExpenses)} icon={PiTrendDownBold} trendUp={false} />
        <StatCard tint="cream" label="Growth (MoM)" value="12.4%" icon={PiTrendUpBold} trend="vs last month" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <SectionHeader eyebrow="Trend" title="Revenue Over Time" />
          <RevenueChart data={revenueTrend} />
        </Card>
        <Card>
          <SectionHeader eyebrow="Split" title="Category Revenue" />
          <CategoryPie data={categorySales} />
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <TopSellingList items={topSelling} />
        <Card>
          <SectionHeader eyebrow="Marketing ROI" title="Top Performing Deals" />
          <div className="space-y-3">
            {topDeals.map((d) => (
              <div key={d.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-gray-700">{d.title}</p>
                  <p className="text-xs text-gray-400">{d.code}</p>
                </div>
                <Badge tone="gold">{d.used} redemptions</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Revenue;
