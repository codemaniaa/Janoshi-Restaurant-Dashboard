const StockBar = ({ stock, threshold, max }) => {
  const pct = Math.min(100, (stock / (max || threshold * 3)) * 100);
  const low = stock <= threshold;
  return (
    <div className="w-28">
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${low ? "bg-red-400" : "bg-emerald-400"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default StockBar;
