import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

const OrdersChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={260}>
    <BarChart data={data} margin={{ left: -20, right: 10, top: 10 }}>
      <CartesianGrid vertical={false} stroke="#EEF0F3" />
      <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#98A2B3" }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fontSize: 11, fill: "#98A2B3" }} axisLine={false} tickLine={false} allowDecimals={false} />
      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #EEF0F3", fontSize: 12 }} />
      <Bar dataKey="orders" radius={[8, 8, 0, 0]}>
        {data.map((_, i) => (
          <Cell key={i} fill={i === data.length - 1 ? "#C9A227" : "#0B1F4D"} fillOpacity={i === data.length - 1 ? 1 : 0.85} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default OrdersChart;
