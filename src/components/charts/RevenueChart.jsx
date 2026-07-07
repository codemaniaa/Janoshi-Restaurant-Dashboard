import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { formatCurrency } from "../../utils/format";

const RevenueChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={260}>
    <AreaChart data={data} margin={{ left: -20, right: 10, top: 10 }}>
      <defs>
        <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B1F4D" stopOpacity={0.28} />
          <stop offset="100%" stopColor="#0B1F4D" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid vertical={false} stroke="#EEF0F3" />
      <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#98A2B3" }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fontSize: 11, fill: "#98A2B3" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
      <Tooltip
        formatter={(v) => [formatCurrency(v), "Revenue"]}
        contentStyle={{ borderRadius: 12, border: "1px solid #EEF0F3", fontSize: 12 }}
      />
      <Area type="monotone" dataKey="revenue" stroke="#0B1F4D" strokeWidth={2.5} fill="url(#revFill)" />
    </AreaChart>
  </ResponsiveContainer>
);

export default RevenueChart;
