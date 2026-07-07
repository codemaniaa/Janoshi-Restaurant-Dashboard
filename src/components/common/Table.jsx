import { EmptyState } from "./UIKit";

const Table = ({ columns, rows, keyField = "id", emptyTitle = "No records found", onRowClick }) => {
  if (!rows.length) return <EmptyState title={emptyTitle} />;
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400 text-[11px] uppercase tracking-wider border-b border-gray-100">
            {columns.map((c) => (
              <th key={c.key} className="py-3 px-3 font-semibold whitespace-nowrap">{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row[keyField]}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-gray-50 last:border-0 hover:bg-[#0B1F4D]/[0.02] transition-colors ${onRowClick ? "cursor-pointer" : ""}`}
            >
              {columns.map((c) => (
                <td key={c.key} className="py-3.5 px-3 align-middle whitespace-nowrap">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
