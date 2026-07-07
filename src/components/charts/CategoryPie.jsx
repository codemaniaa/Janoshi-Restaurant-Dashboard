import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatCurrency } from "../../utils/format";

const PALETTE = ["#0B1F4D", "#C9A227", "#1E9E5A", "#D68A0C", "#8593B8", "#D64545"];

const CategoryPie = ({ data }) => (
  <ResponsiveContainer width="100%" height={260}>
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={90} paddingAngle={3}>
        {data.map((_, i) => (
          <Cell key={i} fill={PALETTE[i % PALETTE.length]} stroke="none" />
        ))}
      </Pie>
      <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ borderRadius: 12, border: "1px solid #EEF0F3", fontSize: 12 }} />
      <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
    </PieChart>
  </ResponsiveContainer>
);

export default CategoryPie;
