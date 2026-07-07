import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { Button } from "../common/UIKit";
import { useRestaurant } from "../../contexts/RestaurantContext";
import { useUI } from "../../contexts/UIContext";

const CATEGORIES = ["Fast Food", "Ice Cream", "Drinks", "Cakes", "Brownies"];
const EMPTY = { name: "", category: "Fast Food", price: "", prepTime: "", available: true, variants: "", toppings: "", image: "" };

const MenuItemModal = ({ open, onClose, item }) => {
  const { upsertMenuItem } = useRestaurant();
  const { pushToast } = useUI();
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (item) {
      setForm({
        ...item,
        variants: (item.variants || []).join(", "),
        toppings: (item.toppings || []).join(", "),
      });
    } else setForm(EMPTY);
  }, [item, open]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name || !form.price) { pushToast("Name and price are required", "danger"); return; }
    upsertMenuItem({
      ...form,
      id: item?.id,
      price: Number(form.price),
      prepTime: Number(form.prepTime) || 5,
      ingredients: item?.ingredients || [],
      variants: form.variants.split(",").map((v) => v.trim()).filter(Boolean),
      toppings: form.toppings.split(",").map((v) => v.trim()).filter(Boolean),
      image: form.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=60",
    });
    pushToast(item ? "Menu item updated" : "Menu item added");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={item ? "Edit Menu Item" : "Add Menu Item"}>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Item Name</label>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Category</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Price (Rs.)</label>
            <input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Prep Time (min)</label>
            <input type="number" value={form.prepTime} onChange={(e) => set("prepTime", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Availability</label>
            <select value={form.available ? "1" : "0"} onChange={(e) => set("available", e.target.value === "1")} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none">
              <option value="1">Available</option><option value="0">Unavailable</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Variants (comma separated)</label>
          <input value={form.variants} onChange={(e) => set("variants", e.target.value)} placeholder="Regular, Large" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Extra Toppings (comma separated)</label>
          <input value={form.toppings} onChange={(e) => set("toppings", e.target.value)} placeholder="Extra Cheese, Extra Mayo" className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
        </div>
        <Button className="w-full" size="lg" onClick={submit}>{item ? "Save Changes" : "Add Item"}</Button>
      </div>
    </Modal>
  );
};

export default MenuItemModal;
