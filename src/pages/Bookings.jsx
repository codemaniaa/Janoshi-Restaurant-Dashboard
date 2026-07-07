import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PiPlusBold } from "react-icons/pi";
import { useRestaurant } from "../contexts/RestaurantContext";
import { useUI } from "../contexts/UIContext";
import { Card, Button, Badge, SectionHeader } from "../components/common/UIKit";
import ConfirmDialog from "../components/common/ConfirmDialog";
import TableCard from "../components/tables/TableCard";
import BookingModal from "../components/tables/BookingModal";
import { formatDateTime } from "../utils/format";

const STATUS_TONE = { Confirmed: "royal", Seated: "success", Waitlist: "warning", Completed: "neutral", Cancelled: "danger" };
const TABLE_STATUSES = ["Available", "Occupied", "Reserved", "Cleaning"];

const Bookings = () => {
  const { tables, bookings, updateTableStatus, deleteBooking } = useRestaurant();
  const { pushToast } = useUI();
  const location = useLocation();

  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [activeTable, setActiveTable] = useState(null);

  useEffect(() => {
    if (location.state?.openCreate) { setEditing(null); setModalOpen(true); }
  }, [location.state]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <SectionHeader eyebrow="Floor & Reservations" title="Bookings & Table Management" />
        <Button icon={PiPlusBold} onClick={() => { setEditing(null); setModalOpen(true); }}>New Booking</Button>
      </div>

      <Card>
        <SectionHeader title="Restaurant Floor Layout" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {tables.map((t) => <TableCard key={t.id} table={t} onClick={setActiveTable} />)}
        </div>
        {activeTable && (
          <div className="mt-5 pt-5 border-t border-gray-100 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 mr-2">Table {activeTable.number} status:</span>
            {TABLE_STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => { updateTableStatus(activeTable.id, s); setActiveTable({ ...activeTable, status: s }); pushToast(`Table ${activeTable.number} marked ${s}`); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${activeTable.status === s ? "bg-[#0B1F4D] text-white border-[#0B1F4D]" : "border-gray-200 text-gray-500"}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </Card>

      <Card noPadding className="p-4 md:p-6">
        <SectionHeader eyebrow="Upcoming" title="Reservations & Waitlist" />
        <div className="space-y-2">
          {bookings.map((b) => {
            const table = tables.find((t) => t.id === b.tableId);
            return (
              <div key={b.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="font-medium text-[#0B1F4D] text-sm">{b.customerName} · {b.guests} guests</p>
                  <p className="text-xs text-gray-400">{table ? `Table ${table.number}` : "Unassigned"} · {formatDateTime(b.time)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={STATUS_TONE[b.status]}>{b.status}</Badge>
                  <button onClick={() => { setEditing(b); setModalOpen(true); }} className="text-xs font-semibold text-[#0B1F4D]">Edit</button>
                  <button onClick={() => setToDelete(b.id)} className="text-xs font-semibold text-red-500">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} booking={editing} />
      <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} title="Cancel this booking?" onConfirm={() => { deleteBooking(toDelete); pushToast("Booking removed"); }} />
    </div>
  );
};

export default Bookings;
