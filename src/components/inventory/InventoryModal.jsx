import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { Button } from "../common/UIKit";
import { useRestaurant } from "../../contexts/RestaurantContext";
import { useUI } from "../../contexts/UIContext";

const UNITS = ["kg", "g", "L", "ml", "pcs"];
const EMPTY = { name: "", unit: "kg", stock: "", threshold: "", supplier: "", expiry: "", costPerUnit: "" };

const InventoryModal = ({ open, onClose, item }) => {
  const { upsertInventoryItem } = useRestaurant();
  const { pushToast } = useUI();
  const [form, setForm] = useState(EMPTY);

  useEffect(() => setForm(item || EMPTY), [item, open]);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name) { pushToast("Ingredient name is required", "danger"); return; }
    upsertInventoryItem({ ...form, id: item?.id, stock: Number(form.stock) || 0, threshold: Number(form.threshold) || 0, costPerUnit: Number(form.costPerUnit) || 0 });
    pushToast(item ? "Inventory item updated" : "Inventory item added");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={item ? "Edit Ingredient" : "Add Ingredient"}>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Ingredient Name</label>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Stock</label>
            <input type="number" value={form.stock} onChange={(e) => set("stock", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Unit</label>
            <select value={form.unit} onChange={(e) => set("unit", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none">
              {UNITS.map((u) => <option key={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Threshold</label>
            <input type="number" value={form.threshold} onChange={(e) => set("threshold", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Supplier</label>
            <input value={form.supplier} onChange={(e) => set("supplier", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Expiry Date</label>
            <input type="date" value={form.expiry} onChange={(e) => set("expiry", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Cost per Unit (Rs.)</label>
          <input type="number" value={form.costPerUnit} onChange={(e) => set("costPerUnit", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
        </div>
        <Button className="w-full" size="lg" onClick={submit}>{item ? "Save Changes" : "Add Ingredient"}</Button>
      </div>
    </Modal>
  );
};

export default InventoryModal;
