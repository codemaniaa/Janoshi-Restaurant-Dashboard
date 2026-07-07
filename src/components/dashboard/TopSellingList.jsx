import { Card, SectionHeader } from "../common/UIKit";
import { formatCurrency } from "../../utils/format";

const TopSellingList = ({ items }) => {
  const max = Math.max(...items.map((i) => i.qty), 1);
  return (
    <Card>
      <SectionHeader eyebrow="Bestsellers" title="Top Selling Items" />
      <div className="space-y-4">
        {items.map((i) => (
          <div key={i.name}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-medium text-gray-700">{i.name}</span>
              <span className="text-gray-400">{i.qty} sold · {formatCurrency(i.revenue)}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#0B1F4D] to-[#C9A227] rounded-full" style={{ width: `${(i.qty / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TopSellingList;
