import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PiPlusBold, PiPencilSimpleBold, PiTrashBold, PiTagBold } from "react-icons/pi";
import { useRestaurant } from "../contexts/RestaurantContext";
import { useUI } from "../contexts/UIContext";
import { Card, Button, Badge, SectionHeader, EmptyState } from "../components/common/UIKit";
import ConfirmDialog from "../components/common/ConfirmDialog";
import OfferModal from "../components/offers/OfferModal";

const FILTERS = ["All", "Active", "Upcoming", "Expired"];
const TONE = { Active: "success", Upcoming: "gold", Expired: "neutral" };

const Offers = () => {
  const { offers, deleteOffer } = useRestaurant();
  const { pushToast } = useUI();
  const location = useLocation();

  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    if (location.state?.openCreate) { setEditing(null); setModalOpen(true); }
  }, [location.state]);

  const filtered = useMemo(() => offers.filter((o) => filter === "All" || o.status === filter), [offers, filter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <SectionHeader eyebrow="Marketing" title="Offers & Deals" />
        <Button icon={PiPlusBold} onClick={() => { setEditing(null); setModalOpen(true); }}>Create Offer</Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors ${filter === f ? "bg-[#0B1F4D] text-white border-[#0B1F4D]" : "border-gray-200 text-gray-500 hover:border-[#0B1F4D]/40"}`}>
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card><EmptyState title="No offers in this category" icon={PiTagBold} /></Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((o) => (
            <Card key={o.id} className="relative">
              <div className="flex justify-between items-start mb-3">
                <Badge tone={TONE[o.status]}>{o.status}</Badge>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(o); setModalOpen(true); }} className="text-[#0B1F4D]"><PiPencilSimpleBold size={15} /></button>
                  <button onClick={() => setToDelete(o.id)} className="text-red-500"><PiTrashBold size={15} /></button>
                </div>
              </div>
              <p className="font-display font-semibold text-[#0B1F4D] text-lg">{o.title}</p>
              <p className="text-xs text-gray-400 mb-4">{o.type}</p>
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-semibold text-[#C9A227]">{o.discountPercent}% OFF</span>
                <Badge tone="royal">{o.code}</Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-4 pt-4 border-t border-gray-50">
                <span>{o.startDate} → {o.endDate}</span>
                <span>{o.used} used</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      <OfferModal open={modalOpen} onClose={() => setModalOpen(false)} offer={editing} />
      <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} title="Delete this offer?" onConfirm={() => { deleteOffer(toDelete); pushToast("Offer deleted"); }} />
    </div>
  );
};

export default Offers;
