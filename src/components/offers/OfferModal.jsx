import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { Button } from "../common/UIKit";
import { useRestaurant } from "../../contexts/RestaurantContext";
import { useUI } from "../../contexts/UIContext";

const TYPES = ["Combo Deal", "Seasonal Deal", "Flash Sale", "Buy One Get One", "Happy Hour", "Coupon", "Limited Time Offer"];
const EMPTY = { title: "", type: "Combo Deal", discountPercent: 10, code: "", startDate: "", endDate: "", status: "Active", appliesTo: [] };

const OfferModal = ({ open, onClose, offer }) => {
  const { upsertOffer, rawMenu } = useRestaurant();
  const { pushToast } = useUI();
  const [form, setForm] = useState(EMPTY);

  useEffect(() => setForm(offer || EMPTY), [offer, open]);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const toggleItem = (id) => setForm((f) => ({
    ...f,
    appliesTo: f.appliesTo.includes(id) ? f.appliesTo.filter((x) => x !== id) : [...f.appliesTo, id],
  }));

  const submit = () => {
    if (!form.title || !form.code) { pushToast("Title and code are required", "danger"); return; }
    upsertOffer({ ...form, id: offer?.id, discountPercent: Number(form.discountPercent) });
    pushToast(offer ? "Offer updated" : "Offer created");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={offer ? "Edit Offer" : "Create Offer"}>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Offer Title</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Type</label>
            <select value={form.type} onChange={(e) => set("type", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none">
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Discount %</label>
            <input type="number" value={form.discountPercent} onChange={(e) => set("discountPercent", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Start Date</label>
            <input type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">End Date</label>
            <input type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Promo Code</label>
          <input value={form.code} onChange={(e) => set("code", e.target.value.toUpperCase())} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0B1F4D]/40" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Applies To</label>
          <div className="max-h-32 overflow-y-auto border border-gray-100 rounded-xl p-2 space-y-1">
            {rawMenu.map((m) => (
              <label key={m.id} className="flex items-center gap-2 text-sm px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="checkbox" checked={form.appliesTo.includes(m.id)} onChange={() => toggleItem(m.id)} />
                {m.name}
              </label>
            ))}
          </div>
        </div>
        <Button className="w-full" size="lg" onClick={submit}>{offer ? "Save Changes" : "Create Offer"}</Button>
      </div>
    </Modal>
  );
};

export default OfferModal;
