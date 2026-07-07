import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { Button } from "../common/UIKit";
import { useRestaurant } from "../../contexts/RestaurantContext";
import { useUI } from "../../contexts/UIContext";

const STATUSES = ["Confirmed", "Seated", "Waitlist", "Completed", "Cancelled"];
const EMPTY = { tableId: "", customerName: "", phone: "", guests: 2, time: "", status: "Confirmed" };

const BookingModal = ({ open, onClose, booking }) => {
  const { tables, upsertBooking } = useRestaurant();
  const { pushToast } = useUI();
  const [form, setForm] = useState(EMPTY);

  useEffect(() => setForm(booking || EMPTY), [booking, open]);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.customerName || !form.tableId) { pushToast("Customer and table are required", "danger"); return; }
    upsertBooking({ ...form, id: booking?.id, guests: Number(form.guests) });
    pushToast(booking ? "Booking updated" : "Booking created");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={booking ? "Edit Booking" : "New Booking"}>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Customer Name</label>
          <input value={form.customerName} onChange={(e) => set("customerName", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Phone</label>
            <input value={form.phone} onChange={(e) => set("phone", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Guests</label>
            <input type="number" value={form.guests} onChange={(e) => set("guests", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Table</label>
            <select value={form.tableId} onChange={(e) => set("tableId", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none">
              <option value="">Select table</option>
              {tables.map((t) => <option key={t.id} value={t.id}>Table {t.number} · {t.section}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Status</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none">
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Booking Time</label>
          <input type="datetime-local" value={form.time?.slice(0, 16)} onChange={(e) => set("time", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
        </div>
        <Button className="w-full" size="lg" onClick={submit}>{booking ? "Save Changes" : "Create Booking"}</Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
