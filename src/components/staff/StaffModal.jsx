import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { Button } from "../common/UIKit";
import { useRestaurant } from "../../contexts/RestaurantContext";
import { useUI } from "../../contexts/UIContext";

const ROLES = ["Head Chef", "Sous Chef", "Cashier", "Waiter", "Delivery Rider", "Barista", "Manager"];
const STATUSES = ["On Shift", "On Break", "On Delivery", "Off Duty"];
const EMPTY = { name: "", role: "Waiter", status: "On Shift", shift: "", salary: "", phone: "", performance: 80, color: "#0B1F4D" };

const StaffModal = ({ open, onClose, member }) => {
  const { upsertStaff } = useRestaurant();
  const { pushToast } = useUI();
  const [form, setForm] = useState(EMPTY);

  useEffect(() => setForm(member || EMPTY), [member, open]);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name) { pushToast("Name is required", "danger"); return; }
    upsertStaff({ ...form, id: member?.id, salary: Number(form.salary) || 0, performance: Number(form.performance) || 80 });
    pushToast(member ? "Staff profile updated" : "Staff member added");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={member ? "Edit Staff Profile" : "Add Staff Member"}>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Full Name</label>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Role</label>
            <select value={form.role} onChange={(e) => set("role", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none">
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Status</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none">
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Shift Timing</label>
            <input value={form.shift} onChange={(e) => set("shift", e.target.value)} placeholder="10:00 AM - 07:00 PM" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Salary (Rs.)</label>
            <input type="number" value={form.salary} onChange={(e) => set("salary", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Phone</label>
          <input value={form.phone} onChange={(e) => set("phone", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
        </div>
        <Button className="w-full" size="lg" onClick={submit}>{member ? "Save Changes" : "Add Staff Member"}</Button>
      </div>
    </Modal>
  );
};

export default StaffModal;
